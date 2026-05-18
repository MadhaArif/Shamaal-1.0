"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Stars } from "@react-three/drei";
import * as THREE from "three";

function Mountains() {
  const geomRef = useRef<THREE.PlaneGeometry>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  // Programmatically generate beautiful mountain ridges on the plane
  useEffect(() => {
    if (!geomRef.current) return;
    const pos = geomRef.current.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      
      // Multi-frequency sine/cosine waves for organic looking peaks
      const peak1 = Math.sin(x * 0.15) * Math.cos(y * 0.15) * 4.5;
      const peak2 = Math.cos(x * 0.3) * Math.sin(y * 0.3) * 2.0;
      const peak3 = Math.sin(x * 0.6) * Math.cos(y * 0.6) * 0.8;
      
      // Calculate distance from center to fade edges
      const dist = Math.sqrt(x * x + y * y);
      const fade = Math.max(0, 1 - dist / 25);
      
      // Displace Z coordinate (height)
      pos.setZ(i, (peak1 + peak2 + peak3) * fade);
    }
    pos.needsUpdate = true;
    geomRef.current.computeVertexNormals();
  }, []);

  // Rotate slowly and smoothly
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -3, -6]} rotation={[-Math.PI / 2.5, 0, 0]}>
      <planeGeometry ref={geomRef} args={[60, 60, 48, 48]} />
      <meshStandardMaterial
        color="#0D2B5E"
        wireframe={true}
        emissive="#1A4FA0"
        emissiveIntensity={0.25}
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  );
}

export default function MountainScene() {
  return (
    <div className="absolute inset-0 z-0 bg-[#06142e]">
      {/* Set devicePixelRatio bounds (dpr={[1, 1.5]}) to prevent mobile lag on retina displays */}
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <PerspectiveCamera makeDefault position={[0, 2, 6]} fov={55} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 3]} intensity={1.5} color="#D4860A" />
        <pointLight position={[-5, 5, -2]} intensity={0.8} color="#1A4FA0" />
        {/* Lower star count to 1000 for amazing 60fps performance */}
        <Stars radius={90} depth={40} count={1200} factor={4} saturation={0.2} fade speed={1} />
        <Mountains />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-shamaal-navy/40 to-shamaal-navy pointer-events-none" />
    </div>
  );
}

