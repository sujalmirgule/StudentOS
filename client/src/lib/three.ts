import * as THREE from "three";

/**
 * Check if WebGL is supported in the current browser environment
 */
export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Clean up Three.js scene objects recursively to prevent memory leaks
 */
export function disposeThreeScene(scene: THREE.Scene) {
  scene.traverse((object) => {
    const obj = object as THREE.Mesh | THREE.Points;
    if ('geometry' in obj && obj.geometry) {
      obj.geometry.dispose();
    }
    if ('material' in obj && obj.material) {
      if (Array.isArray(obj.material)) {
        obj.material.forEach((mat) => mat.dispose());
      } else {
        (obj.material as THREE.Material).dispose();
      }
    }
  });
}

/**
 * Get device pixel ratio capped at 2 for performance optimization
 */
export function getOptimizedDPR(): number {
  return Math.min(window.devicePixelRatio || 1, 2);
}
