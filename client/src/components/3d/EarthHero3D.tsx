import { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import {
  Sparkles,
  FolderKanban,
  CheckSquare,
  Users,
  BookOpen,
  ShoppingBag,
  User,
} from "lucide-react";
import { isWebGLAvailable, disposeThreeScene, getOptimizedDPR } from "../../lib/three";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

export interface OrbitModuleConfig {
  id: string;
  title: string;
  subtitle: string;
  path: string;
  icon: any;
  radiusX: number;
  radiusZ: number;
  tiltX: number;
  tiltZ: number;
  period: number; // Independent orbit speed (seconds)
  initialAngle: number; // Starting angle distributing cards 360° around Earth
  color: string;
  accentColor: string;
  rotX: number;
  rotY: number;
  floatPeriod: number; // Independent vertical float cycle
  floatPhase: number;
}

// 7 distinct StudentOS modules distributed evenly in 360° matching the reference image
const ECOSYSTEM_MODULES: OrbitModuleConfig[] = [
  {
    id: "ai",
    title: "AI Assistant",
    subtitle: "Your study copilot",
    path: "/ai",
    icon: Sparkles,
    radiusX: 4.2,
    radiusZ: 3.4,
    tiltX: -0.52,
    tiltZ: 0.16,
    period: 30, // Specified: 28-35s
    initialAngle: Math.PI * 0.48, // TOP (~12:15 position, floating above Earth)
    color: "#5EEAD4",
    accentColor: "#14B8A6",
    rotX: 6,
    rotY: -4,
    floatPeriod: 7.2,
    floatPhase: 0.0,
  },
  {
    id: "marketplace",
    title: "Marketplace",
    subtitle: "Buy, Sell, Learn",
    path: "/marketplace",
    icon: ShoppingBag,
    radiusX: 5.2,
    radiusZ: 4.1,
    tiltX: -0.22,
    tiltZ: -0.32,
    period: 40, // Specified: 35-45s
    initialAngle: Math.PI * 0.28, // UPPER-RIGHT (~2:00 position)
    color: "#A3AD7A",
    accentColor: "#78864A",
    rotX: 4,
    rotY: -10,
    floatPeriod: 8.5,
    floatPhase: 1.4,
  },
  {
    id: "profile",
    title: "Profile",
    subtitle: "Your journey",
    path: "/profile",
    icon: User,
    radiusX: 5.0,
    radiusZ: 3.9,
    tiltX: 0.20,
    tiltZ: 0.42,
    period: 25, // Specified: 22-28s
    initialAngle: Math.PI * 0.14, // MID/LOWER-RIGHT (~3:45 position)
    color: "#5EEAD4",
    accentColor: "#14B8A6",
    rotX: -2,
    rotY: -10,
    floatPeriod: 9.1,
    floatPhase: 2.8,
  },
  {
    id: "resources",
    title: "Resources",
    subtitle: "Learn anything",
    path: "/resources",
    icon: BookOpen,
    radiusX: 4.6,
    radiusZ: 3.7,
    tiltX: 0.18,
    tiltZ: 0.36,
    period: 29, // Specified: 26-34s
    initialAngle: Math.PI * 1.94, // LOWER-RIGHT (~5:15 position)
    color: "#14B8A6",
    accentColor: "#5EEAD4",
    rotX: -4,
    rotY: -8,
    floatPeriod: 6.8,
    floatPhase: 4.1,
  },
  {
    id: "communities",
    title: "Communities",
    subtitle: "Find your people",
    path: "/communities",
    icon: Users,
    radiusX: 4.5,
    radiusZ: 3.6,
    tiltX: -0.34,
    tiltZ: -0.42,
    period: 35, // Specified: 30-38s
    initialAngle: Math.PI * 1.58, // LOWER-LEFT (~7:15 position)
    color: "#A3AD7A",
    accentColor: "#78864A",
    rotX: -3,
    rotY: 10,
    floatPeriod: 10.4,
    floatPhase: 5.2,
  },
  {
    id: "tasks",
    title: "Tasks",
    subtitle: "Stay on track",
    path: "/tasks",
    icon: CheckSquare,
    radiusX: 4.8,
    radiusZ: 3.8,
    tiltX: 0.36,
    tiltZ: 0.34,
    period: 27, // Specified: 24-30s
    initialAngle: Math.PI * 1.28, // MID-LEFT (~8:45 position)
    color: "#5EEAD4",
    accentColor: "#14B8A6",
    rotX: 2,
    rotY: 10,
    floatPeriod: 6.4,
    floatPhase: 1.9,
  },
  {
    id: "projects",
    title: "Projects",
    subtitle: "Build your ideas",
    path: "/projects",
    icon: FolderKanban,
    radiusX: 4.8,
    radiusZ: 3.7,
    tiltX: 0.30,
    tiltZ: -0.28,
    period: 23, // Specified: 20-26s
    initialAngle: Math.PI * 0.96, // UPPER-LEFT (~10:30 position)
    color: "#14B8A6",
    accentColor: "#5EEAD4",
    rotX: 3,
    rotY: 8,
    floatPeriod: 8.8,
    floatPhase: 3.3,
  },
];

export default function EarthHero3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const cardElementsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const navigate = useNavigate();
  const prefersReduced = usePrefersReducedMotion();

  const [hoveredModuleId, setHoveredModuleId] = useState<string | null>(null);
  const [earthCenter, setEarthCenter] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const hoveredRef = useRef<string | null>(null);
  hoveredRef.current = hoveredModuleId;

  const dims = useMemo(() => ({ width: 1200, height: 750 }), []);

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container || !isWebGLAvailable()) return;

    let width = container.clientWidth || dims.width;
    let height = container.clientHeight || dims.height;

    // 1. Scene, Camera & Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 200);
    camera.position.set(0, 0.2, 13.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(getOptimizedDPR());
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    container.appendChild(renderer.domElement);

    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 2. High-Fidelity Earth Textures (Canvas-generated)
    const earthCanvas = document.createElement("canvas");
    earthCanvas.width = 2048;
    earthCanvas.height = 1024;
    const ctx = earthCanvas.getContext("2d");

    const bumpCanvas = document.createElement("canvas");
    bumpCanvas.width = 1024;
    bumpCanvas.height = 512;
    const bCtx = bumpCanvas.getContext("2d");

    const nightCanvas = document.createElement("canvas");
    nightCanvas.width = 1024;
    nightCanvas.height = 512;
    const nCtx = nightCanvas.getContext("2d");

    if (ctx && bCtx && nCtx) {
      // Oceanic gradient: deep green-black abyssal water
      const oceanGrad = ctx.createLinearGradient(0, 0, 0, 1024);
      oceanGrad.addColorStop(0, "#030604");
      oceanGrad.addColorStop(0.25, "#050E0A");
      oceanGrad.addColorStop(0.5, "#081812");
      oceanGrad.addColorStop(0.75, "#050E0A");
      oceanGrad.addColorStop(1, "#030604");
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, 2048, 1024);

      bCtx.fillStyle = "#000000";
      bCtx.fillRect(0, 0, 1024, 512);

      nCtx.fillStyle = "#000000";
      nCtx.fillRect(0, 0, 1024, 512);

      // Procedural continents with glowing coastal shelves & night clusters
      const drawContinent = (
        cx: number,
        cy: number,
        rx: number,
        ry: number,
        segments: number,
        roughness: number,
        mountainStrength: number
      ) => {
        ctx.save();
        ctx.beginPath();
        for (let i = 0; i <= segments; i++) {
          const a = (i / segments) * Math.PI * 2;
          const harmonic1 = Math.sin(a * 4 + cx * 0.01) * 0.16;
          const harmonic2 = Math.cos(a * 7 + cy * 0.02) * 0.12;
          const harmonic3 = Math.sin(a * 11) * roughness;
          const rMod = 1 + harmonic1 + harmonic2 + harmonic3;
          const px = cx + Math.cos(a) * rx * rMod;
          const py = cy + Math.sin(a) * ry * rMod;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();

        const landGrad = ctx.createRadialGradient(cx, cy, rx * 0.1, cx, cy, rx * 1.1);
        landGrad.addColorStop(0, "#193527");
        landGrad.addColorStop(0.45, "#12261C");
        landGrad.addColorStop(0.8, "#0C1B14");
        landGrad.addColorStop(1, "#07120D");
        ctx.fillStyle = landGrad;
        ctx.fill();

        ctx.strokeStyle = "rgba(45, 212, 191, 0.35)";
        ctx.lineWidth = 1.4;
        ctx.stroke();
        ctx.restore();

        // Bump map
        bCtx.save();
        bCtx.beginPath();
        for (let i = 0; i <= segments; i++) {
          const a = (i / segments) * Math.PI * 2;
          const harmonic = Math.sin(a * 4 + cx * 0.01) * 0.16 + Math.sin(a * 11) * roughness;
          const px = (cx / 2) + Math.cos(a) * (rx / 2) * (1 + harmonic);
          const py = (cy / 2) + Math.sin(a) * (ry / 2) * (1 + harmonic);
          if (i === 0) bCtx.moveTo(px, py);
          else bCtx.lineTo(px, py);
        }
        bCtx.closePath();
        bCtx.fillStyle = `rgb(${Math.floor(mountainStrength * 160)}, ${Math.floor(mountainStrength * 160)}, ${Math.floor(mountainStrength * 160)})`;
        bCtx.fill();
        bCtx.restore();

        // Night lights
        nCtx.save();
        const lightDots = Math.floor(rx * 0.4);
        for (let j = 0; j < lightDots; j++) {
          const angle = Math.random() * Math.PI * 2;
          const distFrac = 0.2 + Math.random() * 0.7;
          const lx = (cx / 2) + Math.cos(angle) * (rx / 2) * distFrac;
          const ly = (cy / 2) + Math.sin(angle) * (ry / 2) * distFrac;
          const isWarm = Math.random() > 0.45;
          nCtx.fillStyle = isWarm ? "rgba(240, 225, 160, 0.85)" : "rgba(94, 234, 212, 0.90)";
          nCtx.beginPath();
          nCtx.arc(lx, ly, 0.6 + Math.random() * 0.8, 0, Math.PI * 2);
          nCtx.fill();
        }
        nCtx.restore();
      };

      drawContinent(460, 380, 260, 180, 32, 0.18, 0.85);
      drawContinent(620, 680, 220, 240, 28, 0.16, 0.70);
      drawContinent(1080, 360, 310, 200, 36, 0.20, 0.95);
      drawContinent(1140, 640, 240, 220, 28, 0.15, 0.75);
      drawContinent(1580, 380, 290, 220, 32, 0.19, 0.90);
      drawContinent(1680, 720, 190, 160, 22, 0.14, 0.65);
      drawContinent(200, 340, 170, 150, 20, 0.13, 0.60);
    }

    const earthTexture = new THREE.CanvasTexture(earthCanvas);
    earthTexture.wrapS = THREE.RepeatWrapping;
    earthTexture.wrapT = THREE.ClampToEdgeWrapping;

    const bumpTexture = new THREE.CanvasTexture(bumpCanvas);
    bumpTexture.wrapS = THREE.RepeatWrapping;

    const nightTexture = new THREE.CanvasTexture(nightCanvas);
    nightTexture.wrapS = THREE.RepeatWrapping;

    // 3. Central Earth Globe
    const baseEarthRadius = 2.45;
    const earthGeo = new THREE.SphereGeometry(baseEarthRadius, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.045,
      roughness: 0.70,
      metalness: 0.14,
      emissiveMap: nightTexture,
      emissive: new THREE.Color("#5EEAD4"),
      emissiveIntensity: 0.42,
    });

    const earth = new THREE.Mesh(earthGeo, earthMat);
    earth.rotation.z = THREE.MathUtils.degToRad(23.4);
    worldGroup.add(earth);

    // 4. Subtle Cloud Sphere
    const cloudCanvas = document.createElement("canvas");
    cloudCanvas.width = 1024;
    cloudCanvas.height = 512;
    const cCtx = cloudCanvas.getContext("2d");
    if (cCtx) {
      cCtx.fillStyle = "rgba(0,0,0,0)";
      cCtx.fillRect(0, 0, 1024, 512);
      cCtx.fillStyle = "rgba(225, 245, 240, 0.18)";
      for (let i = 0; i < 45; i++) {
        const cx = Math.random() * 1024;
        const cy = 110 + Math.random() * 290;
        const w = 90 + Math.random() * 210;
        const h = 14 + Math.random() * 36;
        cCtx.beginPath();
        cCtx.ellipse(cx, cy, w, h, Math.sin(i) * 0.25, 0, Math.PI * 2);
        cCtx.fill();
      }
    }
    const cloudTexture = new THREE.CanvasTexture(cloudCanvas);
    cloudTexture.wrapS = THREE.RepeatWrapping;

    const cloudGeo = new THREE.SphereGeometry(baseEarthRadius * 1.012, 48, 48);
    const cloudMat = new THREE.MeshStandardMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.24,
      blending: THREE.AdditiveBlending,
      roughness: 1.0,
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    worldGroup.add(cloudMesh);

    // 5. Fresnel Atmospheric Glow
    const atmosphereVertexShader = `
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const atmosphereFragmentShader = `
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      uniform vec3 uRimColorPrimary;
      uniform vec3 uRimColorSecondary;
      uniform vec3 uKeyLightDir;
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);
        float fresnel = 1.0 - max(dot(viewDir, normal), 0.0);
        float rimPower = pow(fresnel, 3.2);

        float lightFacing = dot(normal, normalize(uKeyLightDir));
        float lightFactor = smoothstep(-0.4, 0.8, lightFacing);
        vec3 rimColor = mix(uRimColorSecondary, uRimColorPrimary, lightFactor);

        float alpha = rimPower * (0.20 + 0.80 * lightFactor) * 0.78;
        gl_FragColor = vec4(rimColor, alpha);
      }
    `;

    const atmosphereGeo = new THREE.SphereGeometry(baseEarthRadius * 1.036, 64, 64);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      uniforms: {
        uRimColorPrimary: { value: new THREE.Color("#5EEAD4") },
        uRimColorSecondary: { value: new THREE.Color("#78864A") },
        uKeyLightDir: { value: new THREE.Vector3(6.5, 4.5, 8.0) },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    worldGroup.add(atmosphere);

    // 6. Multiple Luminous 3D Orbit Rings Matching Module Paths
    let currentScaleRatio = 1.0;
    const orbitGroups: THREE.Group[] = [];

    ECOSYSTEM_MODULES.forEach((cfg, idx) => {
      const group = new THREE.Group();
      group.rotation.x = cfg.tiltX;
      group.rotation.z = cfg.tiltZ;

      const curve = new THREE.EllipseCurve(
        0, 0,
        cfg.radiusX, cfg.radiusZ,
        0, 2 * Math.PI,
        false,
        0
      );

      const points = curve.getPoints(140);
      const ringGeo = new THREE.BufferGeometry().setFromPoints(
        points.map((p) => new THREE.Vector3(p.x, 0, p.y))
      );

      // Alternating teal and sage luminous rings
      const ringColor = idx % 2 === 0 ? 0x2dd4bf : 0x5eead4;
      const ringMat = new THREE.LineBasicMaterial({
        color: ringColor,
        transparent: true,
        opacity: idx === 0 ? 0.35 : idx === 3 ? 0.30 : 0.22,
        linewidth: 1,
      });

      const ring = new THREE.Line(ringGeo, ringMat);
      group.add(ring);
      worldGroup.add(group);
      orbitGroups.push(group);
    });

    // 7. Orbiting Moons & Space Objects (Reference Storytelling)
    // Moonlet 1: Marbled Cyan Sphere on Orbit 0
    const moon1 = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 16, 16),
      new THREE.MeshStandardMaterial({
        color: 0x14B8A6,
        emissive: 0x14B8A6,
        emissiveIntensity: 0.35,
        roughness: 0.5,
      })
    );
    worldGroup.add(moon1);

    // Moonlet 2: Golden/Amber Satellite on Orbit 1
    const moon2 = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 16, 16),
      new THREE.MeshStandardMaterial({
        color: 0xE8D07A,
        emissive: 0xB89A4A,
        emissiveIntensity: 0.40,
        roughness: 0.6,
      })
    );
    worldGroup.add(moon2);

    // Moonlet 3: Obsidian / Dark Planetoid on Orbit 4 (Community world)
    const moon3 = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 16, 16),
      new THREE.MeshStandardMaterial({
        color: 0x101A16,
        roughness: 0.85,
        metalness: 0.3,
      })
    );
    worldGroup.add(moon3);

    // Moonlet 4: Small Emerald Sphere on Orbit 2 (Projects world)
    const moon4 = new THREE.Mesh(
      new THREE.SphereGeometry(0.11, 16, 16),
      new THREE.MeshStandardMaterial({
        color: 0x10B981,
        emissive: 0x059669,
        emissiveIntensity: 0.30,
        roughness: 0.6,
      })
    );
    worldGroup.add(moon4);

    // Moonlet 5: Sage/Teal Planetoid on Orbit 5 (Growth world)
    const moon5 = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 16, 16),
      new THREE.MeshStandardMaterial({
        color: 0x78864A,
        emissive: 0x555D32,
        emissiveIntensity: 0.30,
        roughness: 0.7,
      })
    );
    worldGroup.add(moon5);

    // 8. Floating Faceted Basalt Asteroids (At varying spatial depths)
    const asteroids: THREE.Mesh[] = [];
    const astGeo = new THREE.DodecahedronGeometry(0.24, 1);
    const astMat = new THREE.MeshStandardMaterial({
      color: 0x0E1714,
      roughness: 0.85,
      metalness: 0.15,
    });

    const astPositions = [
      { x: -3.8, y: 1.8, z: 1.8, scale: 0.9 },
      { x: -2.4, y: 2.9, z: -1.2, scale: 0.6 },
      { x: 3.4, y: 2.8, z: 0.9, scale: 0.8 },
      { x: 4.6, y: -1.4, z: 1.4, scale: 1.1 },
      { x: -1.6, y: -2.6, z: 2.4, scale: 0.7 },
      { x: 5.2, y: 1.2, z: -1.8, scale: 0.65 },
      { x: -4.5, y: -0.6, z: -1.0, scale: 0.85 },
      { x: 2.2, y: -3.0, z: -0.8, scale: 0.75 },
    ];

    astPositions.forEach((pos) => {
      const mesh = new THREE.Mesh(astGeo, astMat);
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.scale.setScalar(pos.scale);
      worldGroup.add(mesh);
      asteroids.push(mesh);
    });

    // 9. Distant Moon in Upper Right Horizon
    const distantMoonGeo = new THREE.SphereGeometry(1.6, 32, 32);
    const distantMoonMat = new THREE.MeshStandardMaterial({
      color: 0x0C1511,
      roughness: 0.9,
      metalness: 0.1,
    });
    const distantMoon = new THREE.Mesh(distantMoonGeo, distantMoonMat);
    scene.add(distantMoon);

    // 10. Cosmic Dust Swarm
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 40;
      particlePos[i + 1] = (Math.random() - 0.5) * 24;
      particlePos[i + 2] = -14 + Math.random() * 20;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x5eead4,
      size: 0.04,
      transparent: true,
      opacity: 0.28,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 11. Curved Highway Transport Ring in Background Right
    const highwayPoints = [];
    for (let i = 0; i <= 60; i++) {
      const t = (i / 60) * Math.PI * 0.8 - Math.PI * 0.4;
      const x = 3.5 + Math.sin(t) * 9.0;
      const z = -6.5 + Math.cos(t) * 3.5;
      const y = -1.5 + Math.sin(t * 1.8) * 0.8;
      highwayPoints.push(new THREE.Vector3(x, y, z));
    }
    const highwayCurve = new THREE.CatmullRomCurve3(highwayPoints);
    const highwayGeo = new THREE.TubeGeometry(highwayCurve, 60, 0.032, 6, false);
    const highwayMat = new THREE.MeshBasicMaterial({
      color: 0x2dd4bf,
      transparent: true,
      opacity: 0.22,
    });
    const highwayMesh = new THREE.Mesh(highwayGeo, highwayMat);
    scene.add(highwayMesh);

    // 12. Directional & Volumetric Lighting
    const keyLight = new THREE.DirectionalLight(0xE8FAF4, 2.8);
    keyLight.position.set(7.5, 6.0, 9.0);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x78864A, 1.2);
    rimLight.position.set(-8.0, -4.5, -6.0);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0x08100C, 0.26);
    scene.add(ambientLight);

    // 13. Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = relX * 1.0;
      mouseY = relY * 1.0;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 14. Responsive Resize & Sizing
    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      if (width === 0 || height === 0) return;

      const aspect = width / height;
      camera.aspect = aspect;

      if (aspect > 2.0) {
        camera.fov = 34;
        camera.position.z = 13.2;
      } else if (aspect > 1.5) {
        camera.fov = 36;
        camera.position.z = 13.8;
      } else if (aspect < 1.15) {
        camera.fov = 42;
        camera.position.z = 15.2;
      } else {
        camera.fov = 37;
        camera.position.z = 14.0;
      }
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(getOptimizedDPR());

      const visibleH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const visibleW = visibleH * aspect;
      const targetRadius = THREE.MathUtils.clamp(visibleH * 0.27, 2.3, 3.2);
      currentScaleRatio = targetRadius / baseEarthRadius;

      earth.scale.setScalar(currentScaleRatio);
      cloudMesh.scale.setScalar(currentScaleRatio);
      atmosphere.scale.setScalar(currentScaleRatio);
      orbitGroups.forEach((grp) => grp.scale.setScalar(currentScaleRatio));

      // Earth sits naturally centered in the right hero area
      worldGroup.position.set(0, 0.15, 0);

      // Position distant moon in upper right
      distantMoon.position.set(visibleW * 0.36, visibleH * 0.28, -9.5);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // 15. Animation Loop with Independent Motion for Every Single Element
    let animId: number;
    const clock = new THREE.Clock();
    const tempVec = new THREE.Vector3();
    const earthPos = new THREE.Vector3();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = prefersReduced ? 0.0 : clock.getElapsedTime();

      // Parallax
      targetX += (mouseX - targetX) * 0.035;
      targetY += (mouseY - targetY) * 0.035;
      camera.position.x = targetX * 0.8;
      camera.position.y = 0.2 - targetY * 0.5;
      camera.lookAt(0, 0.15, 0);

      // Earth rotation
      if (!prefersReduced) {
        earth.rotation.y = elapsed * 0.035;
        cloudMesh.rotation.y = elapsed * 0.042;
      }

      // Asteroid drifts
      asteroids.forEach((ast, idx) => {
        ast.rotation.x += 0.005 * ((idx % 3) + 1);
        ast.rotation.y += 0.007 * ((idx % 2) + 1);
        if (!prefersReduced) {
          ast.position.y += Math.sin(elapsed * 0.6 + idx) * 0.0015;
        }
      });

      // Moonlet 1 (along Orbit 0)
      const a1 = elapsed * (Math.PI * 2 / 22) + 0.8;
      const orb1 = ECOSYSTEM_MODULES[0];
      tempVec.set(
        Math.cos(a1) * orb1.radiusX * currentScaleRatio,
        0,
        Math.sin(a1) * orb1.radiusZ * currentScaleRatio
      );
      tempVec.applyEuler(new THREE.Euler(orb1.tiltX, 0, orb1.tiltZ));
      tempVec.add(worldGroup.position);
      moon1.position.copy(tempVec);

      // Moonlet 2 (along Orbit 1)
      const a2 = -elapsed * (Math.PI * 2 / 27) + 2.4;
      const orb2 = ECOSYSTEM_MODULES[1];
      tempVec.set(
        Math.cos(a2) * orb2.radiusX * currentScaleRatio,
        0,
        Math.sin(a2) * orb2.radiusZ * currentScaleRatio
      );
      tempVec.applyEuler(new THREE.Euler(orb2.tiltX, 0, orb2.tiltZ));
      tempVec.add(worldGroup.position);
      moon2.position.copy(tempVec);

      // Moonlet 3 (along Orbit 4)
      const a3 = elapsed * (Math.PI * 2 / 33) + 4.2;
      const orb3 = ECOSYSTEM_MODULES[4];
      tempVec.set(
        Math.cos(a3) * orb3.radiusX * currentScaleRatio,
        0,
        Math.sin(a3) * orb3.radiusZ * currentScaleRatio
      );
      tempVec.applyEuler(new THREE.Euler(orb3.tiltX, 0, orb3.tiltZ));
      tempVec.add(worldGroup.position);
      moon3.position.copy(tempVec);

      // Moonlet 4 (along Orbit 2 - Projects)
      const a4 = -elapsed * (Math.PI * 2 / 42) + 1.1;
      const orb4 = ECOSYSTEM_MODULES[2];
      tempVec.set(
        Math.cos(a4) * orb4.radiusX * currentScaleRatio,
        0,
        Math.sin(a4) * orb4.radiusZ * currentScaleRatio
      );
      tempVec.applyEuler(new THREE.Euler(orb4.tiltX, 0, orb4.tiltZ));
      tempVec.add(worldGroup.position);
      moon4.position.copy(tempVec);

      // Moonlet 5 (along Orbit 5 - Growth)
      const a5 = elapsed * (Math.PI * 2 / 52) + 3.7;
      const orb5 = ECOSYSTEM_MODULES[5];
      tempVec.set(
        Math.cos(a5) * orb5.radiusX * currentScaleRatio,
        0,
        Math.sin(a5) * orb5.radiusZ * currentScaleRatio
      );
      tempVec.applyEuler(new THREE.Euler(orb5.tiltX, 0, orb5.tiltZ));
      tempVec.add(worldGroup.position);
      moon5.position.copy(tempVec);

      // Earth Center Screen Projection
      earthPos.set(0, 0, 0);
      earthPos.add(worldGroup.position);
      earthPos.project(camera);
      const eScreenX = ((earthPos.x + 1) / 2) * width;
      const eScreenY = ((-earthPos.y + 1) / 2) * height;
      setEarthCenter({ x: eScreenX, y: eScreenY });

      // Earth pixel radius on screen for physical occlusion
      const earthWorldRadius = baseEarthRadius * currentScaleRatio;
      const earthScreenRadius = (earthWorldRadius / (camera.position.z * Math.tan((camera.fov * Math.PI) / 360))) * (height / 2);

      // 16. INDEPENDENT MODULE ORBIT CALCULATIONS & DIRECT DOM POSITIONING
      const isMobile = width < 640;
      const baseWidthFactor = isMobile
        ? THREE.MathUtils.clamp(width / 680, 0.72, 0.88)
        : THREE.MathUtils.clamp(width / 1300, 0.90, 1.18);

      ECOSYSTEM_MODULES.forEach((mod) => {
        const cardEl = cardElementsRef.current[mod.id];
        if (!cardEl) return;

        // True independent orbital angle
        const currentAngle = prefersReduced
          ? mod.initialAngle
          : mod.initialAngle + elapsed * ((Math.PI * 2) / mod.period);

        // Orbital coordinates on tilted 3D ellipse
        const localX = Math.cos(currentAngle) * mod.radiusX * currentScaleRatio;
        const localZ = Math.sin(currentAngle) * mod.radiusZ * currentScaleRatio;

        tempVec.set(localX, 0, localZ);
        tempVec.applyEuler(new THREE.Euler(mod.tiltX, 0, mod.tiltZ));
        tempVec.add(worldGroup.position);

        const isHovered = hoveredRef.current === mod.id;
        if (isHovered) {
          tempVec.z += 0.6;
        }

        const worldZ = tempVec.z;
        tempVec.project(camera);

        const screenX = ((tempVec.x + 1) / 2) * width;
        const screenY = ((-tempVec.y + 1) / 2) * height;

        // Depth Factor:
        // Front hemisphere (z > 0): larger, brighter
        // Back hemisphere (z < 0): smaller, lower opacity
        const depthFactor = THREE.MathUtils.clamp((worldZ + 5.2) / 10.4, 0.75, 1.15) * baseWidthFactor;

        // Distance from Earth center in screen pixels
        const dx = screenX - eScreenX;
        const dy = screenY - eScreenY;
        const distFromCenter = Math.sqrt(dx * dx + dy * dy);

        let finalOpacity = 1.0;
        let zIndex = 25;

        if (worldZ < -0.3) {
          if (distFromCenter < earthScreenRadius * 0.92) {
            // Physically behind Earth globe: smoothly occluded!
            finalOpacity = 0.08;
            zIndex = 2;
          } else {
            // Visible in background behind orbital plane
            finalOpacity = 0.65;
            zIndex = 8;
          }
        } else {
          // Front hemisphere: passing cleanly in front of Earth!
          finalOpacity = 1.0;
          zIndex = 35 + Math.floor(depthFactor * 10);
        }

        if (isHovered) {
          finalOpacity = 1.0;
          zIndex = 50;
        }

        // INDEPENDENT vertical floating motion for this specific card
        const floatY = prefersReduced
          ? 0
          : Math.sin(elapsed * (Math.PI * 2 / mod.floatPeriod) + mod.floatPhase) * 3.5;

        // Safe bounds padding
        const padX = isMobile ? 65 : 85;
        const boundedX = THREE.MathUtils.clamp(screenX, padX, width - padX);
        const finalScale = isHovered ? depthFactor * 1.08 : depthFactor;

        // Apply hardware-accelerated 3D transform directly to DOM
        cardEl.style.transform = `translate3d(${boundedX}px, ${screenY + floatY}px, 0px) translate(-50%, -50%) scale(${finalScale}) rotateY(${mod.rotY}deg) rotateX(${mod.rotX}deg)`;
        cardEl.style.opacity = finalOpacity.toString();
        cardEl.style.zIndex = zIndex.toString();
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      resizeObserver.disconnect();
      disposeThreeScene(scene);
      earthTexture.dispose();
      bumpTexture.dispose();
      nightTexture.dispose();
      cloudTexture.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [dims, prefersReduced]);

  return (
    <div
      ref={containerRef}
      className="hero-earth-container relative w-full h-full min-h-[480px] sm:min-h-[540px] lg:min-h-[clamp(540px,62vh,880px)] flex items-center justify-center select-none pointer-events-none"
      style={{ overflow: "visible" }}
    >
      {/* Three.js Canvas Container */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ overflow: "visible" }}
      />

      {/* Volumetric Sunbeam from Top Right */}
      <div className="absolute -top-16 -right-16 w-[60vw] max-w-[900px] h-[55vh] max-h-[750px] bg-gradient-to-bl from-[#2DD4BF]/16 via-[#14B8A6]/6 to-transparent rounded-full blur-[130px] pointer-events-none transform -rotate-15" />

      {/* Integrated StudentOS Core Wordmark Inside Planet Atmosphere */}
      {earthCenter.x > 0 && (
        <div
          style={{
            left: `${earthCenter.x}px`,
            top: `${earthCenter.y}px`,
            transform: "translate(-50%, -50%)",
          }}
          className="absolute text-center pointer-events-none z-10 hidden sm:flex flex-col items-center justify-center transition-all duration-100"
        >
          <div className="absolute -inset-10 bg-radial from-[#14B8A6]/14 via-[#060D0A]/30 to-transparent rounded-full blur-[18px] pointer-events-none" />

          <h2 className="relative text-2xl sm:text-3xl 2xl:text-4xl font-black tracking-tight text-[#E8ECE7]/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] select-none">
            Student<span className="text-[#5EEAD4] drop-shadow-[0_0_14px_rgba(94,234,212,0.45)]">OS</span>
          </h2>

          <p className="relative text-[9px] sm:text-[10px] 2xl:text-[11px] font-mono tracking-[0.32em] text-[#A3AD7A]/85 uppercase font-semibold mt-1 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)] select-none">
            LEARN · BUILD · CONNECT · GROW
          </p>
        </div>
      )}

      {/* 7 Floating 3D Module Cards (Pre-rendered, smooth 60fps independent orbit animation) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ overflow: "visible", perspective: "1200px" }}
      >
        {ECOSYSTEM_MODULES.map((cfg) => {
          const Icon = cfg.icon;
          const isHovered = hoveredModuleId === cfg.id;

          return (
            <div
              key={cfg.id}
              ref={(el) => {
                cardElementsRef.current[cfg.id] = el;
              }}
              onClick={() => navigate(cfg.path)}
              onMouseEnter={() => setHoveredModuleId(cfg.id)}
              onMouseLeave={() => setHoveredModuleId(null)}
              className="absolute pointer-events-auto cursor-pointer group select-none"
              style={{
                willChange: "transform, opacity",
                transformStyle: "preserve-3d",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              }}
              aria-label={`Open ${cfg.title}: ${cfg.subtitle}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate(cfg.path);
                }
              }}
            >
              {/* Glass Card Panel Matching Reference (145px - 175px wide, 72px - 82px high) */}
              <div
                style={{
                  background: isHovered
                    ? "rgba(10, 24, 18, 0.95)"
                    : "rgba(6, 18, 14, 0.82)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  borderColor: isHovered
                    ? cfg.color
                    : "rgba(45, 212, 191, 0.42)",
                  boxShadow: isHovered
                    ? `0 14px 44px rgba(0,0,0,0.95), 0 0 28px ${cfg.color}55, inset 0 1px 0 rgba(255,255,255,0.15)`
                    : "0 10px 40px rgba(0,0,0,0.45), 0 0 20px rgba(45,212,191,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
                className="relative flex items-center gap-3 w-[148px] sm:w-[168px] h-[72px] sm:h-[80px] px-3.5 sm:px-4 rounded-2xl border transition-all duration-200"
              >
                {/* Top glass specular reflection */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/8 via-transparent to-transparent pointer-events-none" />

                {/* Glowing Module Icon Enclosure */}
                <div
                  style={{
                    backgroundColor: `${cfg.color}22`,
                    borderColor: `${cfg.color}50`,
                    color: cfg.color,
                  }}
                  className="flex items-center justify-center w-10 h-10 rounded-xl border shrink-0 transition-transform group-hover:scale-110 shadow-inner"
                >
                  <Icon size={19} />
                </div>

                {/* Module Title & Subtitle */}
                <div className="text-left overflow-hidden">
                  <p className="text-xs sm:text-[13px] font-bold text-white leading-tight truncate group-hover:text-[#5EEAD4] transition-colors">
                    {cfg.title}
                  </p>
                  <p className="text-[10px] text-[#A2ADA5] font-medium mt-1 leading-tight line-clamp-1">
                    {cfg.subtitle}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
