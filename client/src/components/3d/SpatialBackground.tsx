import { useEffect, useRef } from "react";
import * as THREE from "three";
import { isWebGLAvailable, disposeThreeScene, getOptimizedDPR } from "../../lib/three";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

export default function SpatialBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReduced || !isWebGLAvailable()) return;

    // Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(getOptimizedDPR());
    container.appendChild(renderer.domElement);

    // Floating Data Polyhedra Group
    const nodeGroup = new THREE.Group();
    const geometries = [
      new THREE.IcosahedronGeometry(1.2, 0),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TetrahedronGeometry(0.9, 0),
      new THREE.DodecahedronGeometry(0.8, 0),
    ];

    const materials = [
      new THREE.MeshBasicMaterial({
        color: 0xf97316, // Orange primary accent
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8, // Cyan secondary
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      }),
      new THREE.MeshBasicMaterial({
        color: 0xa855f7, // Purple secondary
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      }),
    ];

    const nodes: THREE.Mesh[] = [];
    const count = window.innerWidth < 768 ? 12 : 28;

    for (let i = 0; i < count; i++) {
      const geo = geometries[i % geometries.length];
      const mat = materials[i % materials.length];
      const mesh = new THREE.Mesh(geo, mat);

      mesh.position.set(
        (Math.random() - 0.5) * 45,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 20
      );

      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      const scale = 0.5 + Math.random() * 0.8;
      mesh.scale.set(scale, scale, scale);

      nodes.push(mesh);
      nodeGroup.add(mesh);
    }
    scene.add(nodeGroup);

    // Ambient Glowing Particle Field
    const particleCount = window.innerWidth < 768 ? 60 : 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 50;
      particlePos[i + 1] = (Math.random() - 0.5) * 40;
      particlePos[i + 2] = (Math.random() - 0.5) * 30;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePos, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: 0xf97316,
      size: 0.12,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Smooth Mouse Parallax Target
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.0008;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.0008;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(getOptimizedDPR());
    };

    window.addEventListener("resize", handleResize);

    // Visibility Listener (Pause when tab inactive)
    let animationFrameId: number;
    let isTabVisible = true;

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isTabVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax easing
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      camera.position.x = targetX * 12;
      camera.position.y = -targetY * 12;
      camera.lookAt(scene.position);

      // Rotate Nodes
      nodes.forEach((node, idx) => {
        node.rotation.x += 0.003 * (idx % 2 === 0 ? 1 : -1);
        node.rotation.y += 0.004 * (idx % 3 === 0 ? 1 : -1);
        node.position.y += Math.sin(elapsedTime + idx) * 0.003;
      });

      // Slowly rotate particle field
      particles.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Clean Up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      disposeThreeScene(scene);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [prefersReduced]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Fallback Ambient Radial Lighting Mesh */}
      <div className="absolute top-0 left-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-[450px] w-[450px] rounded-full bg-sky-500/5 blur-[160px] pointer-events-none" />
    </div>
  );
}
