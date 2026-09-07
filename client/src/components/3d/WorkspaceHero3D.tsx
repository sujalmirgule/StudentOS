import { useEffect, useRef } from "react";
import * as THREE from "three";
import { isWebGLAvailable, disposeThreeScene, getOptimizedDPR } from "../../lib/three";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

export default function WorkspaceHero3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const container = mountRef.current;
    if (!container || prefersReduced || !isWebGLAvailable()) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(getOptimizedDPR());
    container.appendChild(renderer.domElement);

    // Central Core Sphere Node
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xf97316,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Inner Glowing Core
    const innerGeo = new THREE.SphereGeometry(0.9, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xff6b00,
      transparent: true,
      opacity: 0.25,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // Orbital Ring 1
    const ring1Geo = new THREE.TorusGeometry(3.2, 0.02, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.3,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    // Orbital Ring 2
    const ring2Geo = new THREE.TorusGeometry(4.2, 0.02, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.25,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    // Small Orbiting Nodes
    const orbitNodes: THREE.Mesh[] = [];
    const orbitCount = 4;
    const orbitRadius = 3.2;

    for (let i = 0; i < orbitCount; i++) {
      const geo = new THREE.SphereGeometry(0.18, 12, 12);
      const mat = new THREE.MeshBasicMaterial({ color: 0xf97316 });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      orbitNodes.push(mesh);
    }

    let animationFrameId: number;
    const clock = new THREE.Clock();

    let isTabVisible = true;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      if (!isTabVisible) return;
      const elapsed = clock.getElapsedTime();

      // Rotations
      coreMesh.rotation.y = elapsed * 0.25;
      coreMesh.rotation.x = elapsed * 0.15;
      innerMesh.rotation.y = -elapsed * 0.3;

      ring1.rotation.z = elapsed * 0.15;
      ring2.rotation.z = -elapsed * 0.2;

      // Animate Orbiting Nodes
      orbitNodes.forEach((node, i) => {
        const angle = elapsed * 0.5 + (i * Math.PI * 2) / orbitCount;
        node.position.x = Math.cos(angle) * orbitRadius;
        node.position.y = Math.sin(angle) * (orbitRadius * 0.5);
        node.position.z = Math.sin(angle) * orbitRadius;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      disposeThreeScene(scene);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [prefersReduced]);

  return (
    <div
      ref={mountRef}
      className="relative h-48 w-full sm:h-56 lg:h-64 flex items-center justify-center pointer-events-none"
    />
  );
}
