"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function ProductPackageMesh({ categoryName }: { categoryName?: string }) {
  const meshGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshGroup.current) {
      meshGroup.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  const isOilOrShampoo = categoryName?.toLowerCase().includes("oil") || categoryName?.toLowerCase().includes("hair");
  const isCapsule = categoryName?.toLowerCase().includes("men") || categoryName?.toLowerCase().includes("diabetes") || categoryName?.toLowerCase().includes("pain");

  return (
    <group ref={meshGroup} position={[0, -0.1, 0]}>
      {isCapsule ? (
        // Capsule Container Model
        <group>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.7, 0.7, 1.6, 32]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0.3, 0.01]}>
            <cylinderGeometry args={[0.71, 0.71, 0.9, 32, 1, true, -Math.PI / 2.5, Math.PI / 1.25]} />
            <meshStandardMaterial color="#3A9D6A" roughness={0.3} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0.9, 0]}>
            <cylinderGeometry args={[0.73, 0.73, 0.4, 32]} />
            <meshStandardMaterial color="#E5BD47" roughness={0.2} metalness={0.7} />
          </mesh>
        </group>
      ) : isOilOrShampoo ? (
        // Amber Oil Bottle Model
        <group>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.75, 0.85, 2.0, 32]} />
            <meshPhysicalMaterial color="#2A5C43" roughness={0.1} transmission={0.7} thickness={0.6} />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <cylinderGeometry args={[0.76, 0.86, 1.1, 32, 1, true, -Math.PI / 2.5, Math.PI / 1.25]} />
            <meshStandardMaterial color="#E5BD47" roughness={0.3} metalness={0.6} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 1.2, 0]}>
            <cylinderGeometry args={[0.35, 0.35, 0.4, 32]} />
            <meshStandardMaterial color="#C9A033" roughness={0.2} metalness={0.8} />
          </mesh>
        </group>
      ) : (
        // Herbal Powder Jar / Murabba Packaging Model
        <group>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.9, 0.9, 1.4, 32]} />
            <meshStandardMaterial color="#1E3E2E" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <cylinderGeometry args={[0.91, 0.91, 0.9, 32, 1, true, -Math.PI / 2.5, Math.PI / 1.25]} />
            <meshStandardMaterial color="#52B882" roughness={0.3} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0.8, 0]}>
            <cylinderGeometry args={[0.95, 0.95, 0.3, 32]} />
            <meshStandardMaterial color="#E5BD47" roughness={0.2} metalness={0.7} />
          </mesh>
        </group>
      )}
    </group>
  );
}

export default function ProductViewer3D({ categoryName }: { categoryName?: string }) {
  return (
    <div className="w-full h-72 sm:h-96 relative bg-gradient-to-b from-brand-softBg/50 to-white rounded-2xl border border-gray-100 overflow-hidden cursor-grab active:cursor-grabbing">
      <div className="absolute top-3 left-3 bg-brand-deep/80 text-brand-gold text-[10px] uppercase font-bold px-3 py-1 rounded-full z-10 tracking-wider">
        Interactive 360° Package Viewer
      </div>
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 6, 4]} intensity={1.5} />
        <pointLight position={[-3, 2, -2]} color="#E5BD47" intensity={1} />
        
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <ProductPackageMesh categoryName={categoryName} />
        </Float>

        <ContactShadows position={[0, -1.4, 0]} opacity={0.5} scale={4} blur={2} color="#1E3E2E" />
        <OrbitControls enableZoom={true} maxDistance={6} minDistance={3} />
      </Canvas>
    </div>
  );
}
