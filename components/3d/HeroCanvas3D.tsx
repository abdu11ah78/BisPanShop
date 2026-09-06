"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// Interactive Herbal Bottle & Floating Botanical Leaves Scene
function HerbalBottleModel() {
  const bottleRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (bottleRef.current) {
      bottleRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      bottleRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.1;
    }
  });

  return (
    <group ref={bottleRef} position={[0, -0.2, 0]} scale={1.2}>
      {/* Bottle Glass Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.9, 1, 2.4, 32]} />
        <meshPhysicalMaterial
          color="#2A5C43"
          roughness={0.15}
          metalness={0.1}
          transmission={0.6}
          thickness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Golden Label */}
      <mesh position={[0, -0.1, 0.01]}>
        <cylinderGeometry args={[0.91, 1.01, 1.3, 32, 1, true, -Math.PI / 2.5, Math.PI / 1.25]} />
        <meshStandardMaterial
          color="#E5BD47"
          roughness={0.3}
          metalness={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Bottle Neck */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.35, 0.5, 0.5, 32]} />
        <meshStandardMaterial color="#1E3E2E" roughness={0.3} />
      </mesh>

      {/* Cap */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.4, 32]} />
        <meshStandardMaterial color="#C9A033" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Inner Oil Liquid Amber Glow */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.82, 0.92, 2.1, 32]} />
        <meshStandardMaterial color="#52B882" roughness={0.2} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

// Floating Leaves Component
function FloatingLeaf({ position, rotation, scale = 1 }: { position: [number, number, number]; rotation: [number, number, number]; scale?: number }) {
  const leafRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (leafRef.current) {
      leafRef.current.rotation.x += 0.005;
      leafRef.current.rotation.y += 0.008;
      leafRef.current.position.y += Math.sin(state.clock.getElapsedTime() * 2 + position[0]) * 0.002;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={leafRef} position={position} rotation={rotation} scale={scale}>
        <coneGeometry args={[0.35, 0.8, 16]} />
        <MeshDistortMaterial color="#52B882" speed={2} distort={0.2} roughness={0.2} />
      </mesh>
    </Float>
  );
}

export default function HeroCanvas3D() {
  return (
    <div className="w-full h-[450px] lg:h-[550px] relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-4, 3, -2]} intensity={1} color="#E5BD47" />
        <pointLight position={[3, -2, 3]} intensity={1.2} color="#52B882" />

        <HerbalBottleModel />

        {/* Floating Leaves */}
        <FloatingLeaf position={[-2.2, 1.2, 0.5]} rotation={[0.5, 0.2, 0.8]} scale={0.9} />
        <FloatingLeaf position={[2.1, 0.8, -0.5]} rotation={[-0.4, 0.5, -0.6]} scale={1.1} />
        <FloatingLeaf position={[-1.8, -1.2, 0.8]} rotation={[0.2, -0.8, 0.4]} scale={0.75} />
        <FloatingLeaf position={[1.9, -1.1, 0.2]} rotation={[0.8, 0.4, -0.3]} scale={0.85} />

        <ContactShadows position={[0, -1.8, 0]} opacity={0.6} scale={6} blur={2.5} far={4} color="#1E3E2E" />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} maxPolarAngle={Math.PI / 2 + 0.1} minPolarAngle={Math.PI / 3} />
      </Canvas>
    </div>
  );
}
