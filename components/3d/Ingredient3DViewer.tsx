"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function BotanicalSeedsAndRoots() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Golden Zafran Stigma Core */}
      <Float speed={2} floatIntensity={1}>
        <mesh position={[0, 0, 0]}>
          <octahedronGeometry args={[0.9, 2]} />
          <MeshDistortMaterial color="#E5BD47" speed={3} distort={0.3} roughness={0.2} metalness={0.5} />
        </mesh>
      </Float>

      {/* Orbiting Raw Roots & Botanical Spheres */}
      <mesh position={[-1.6, 0.8, 0.5]}>
        <dodecahedronGeometry args={[0.4]} />
        <meshStandardMaterial color="#2A5C43" roughness={0.4} />
      </mesh>

      <mesh position={[1.5, -0.7, -0.3]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#C9A033" roughness={0.3} metalness={0.6} />
      </mesh>

      <mesh position={[0.8, 1.2, -0.6]}>
        <icosahedronGeometry args={[0.3]} />
        <meshStandardMaterial color="#52B882" roughness={0.2} />
      </mesh>
    </group>
  );
}

export default function Ingredient3DViewer() {
  return (
    <div className="w-full h-80 relative bg-brand-deep rounded-2xl overflow-hidden shadow-2xl border border-brand-gold/30 cursor-grab">
      <div className="absolute top-4 left-4 z-10">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-gold bg-brand-dark/80 px-3 py-1 rounded-full border border-brand-gold/30">
          3D Raw Botanical Ingredient Viewer
        </span>
      </div>
      <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} color="#FFFFFF" />
        <pointLight position={[-3, -2, -2]} color="#E5BD47" intensity={1.5} />
        <BotanicalSeedsAndRoots />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
}
