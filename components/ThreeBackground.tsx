'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // --- Scene setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // --- Particles ---
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const palette = [
      [0.91, 0.27, 0.19],  // coral-red  #E84530
      [1.0,  0.55, 0.26],  // orange     #ff8c42
      [0.85, 0.85, 0.90],  // dim white
      [0.5,  0.5,  0.55],  // mid gray
    ];
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = c[0];
      colors[i * 3 + 1] = c[1];
      colors[i * 3 + 2] = c[2];
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // --- Floating 3D shapes ---
    const shapeMeshes: THREE.Mesh[] = [];
    const shapeData = [
      { geo: new THREE.IcosahedronGeometry(0.35, 1), pos: [-3,   1.5, -1], color: 0xe84530, speed: 0.008 },
      { geo: new THREE.OctahedronGeometry(0.3, 0),   pos: [ 3.5, -1,  -2], color: 0xff8c42, speed: 0.012 },
      { geo: new THREE.TetrahedronGeometry(0.4, 0),  pos: [-4,  -2,   0],  color: 0xe84530, speed: 0.006 },
      { geo: new THREE.IcosahedronGeometry(0.2, 0),  pos: [ 4,   2,  -3],  color: 0xff8c42, speed: 0.01  },
      { geo: new THREE.OctahedronGeometry(0.18, 0),  pos: [ 0,   3,  -2],  color: 0xe84530, speed: 0.009 },
      { geo: new THREE.IcosahedronGeometry(0.28, 1), pos: [-1.5,-2.5,-1],  color: 0xff8c42, speed: 0.007 },
    ];
    shapeData.forEach(({ geo, pos, color, speed }) => {
      const wireMat = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      });
      const mesh = new THREE.Mesh(geo, wireMat);
      mesh.position.set(pos[0], pos[1], pos[2]);
      (mesh as any).rotSpeed = speed;
      (mesh as any).floatOffset = Math.random() * Math.PI * 2;
      scene.add(mesh);
      shapeMeshes.push(mesh);
    });

    // --- Mouse tracking ---
    const mouse = { x: 0, y: 0 };
    const handleMouse = (e: MouseEvent) => {
      mouse.x =  (e.clientX / window.innerWidth  - 0.5) * 0.4;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener('mousemove', handleMouse);

    // --- Resize handler ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Animation loop ---
    // Use a local `cancelled` flag so cleanup can stop the loop
    // without depending on sceneRef being non-null (fixes StrictMode crash).
    let cancelled = false;
    let animId = 0;
    let t = 0;

    const animate = () => {
      if (cancelled) return;          // stop loop when effect is cleaned up
      animId = requestAnimationFrame(animate);
      t += 0.01;

      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;

      camera.position.x += (mouse.x - camera.position.x) * 0.05;
      camera.position.y += (mouse.y - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      shapeMeshes.forEach((mesh) => {
        const s = (mesh as any).rotSpeed;
        const f = (mesh as any).floatOffset;
        mesh.rotation.x += s;
        mesh.rotation.y += s * 0.7;
        mesh.position.y += Math.sin(t + f) * 0.002;
      });

      renderer.render(scene, camera);
    };
    animate();

    // --- Cleanup ---
    return () => {
      cancelled = true;               // signals animate() to stop on next frame
      cancelAnimationFrame(animId);   // also cancel immediately
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
