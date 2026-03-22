'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Capsule geometry helper ────────────────────── */
function createCapsuleGeometry(radius = 0.05, length = 0.15, segments = 8) {
  return new THREE.CapsuleGeometry(radius, length, segments, segments);
}

/* ── Particles system ───────────────────────────── */
function Particles({
  count = 300,
  magnetRadius = 6,
  ringRadius = 7,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 1.5,
  lerpSpeed = 0.05,
  color = '#09090b',
  autoAnimate = true,
  particleVariance = 1,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 3,
  particleShape = 'capsule',
  fieldStrength = 10,
}) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const clock = useRef(0);

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = ringRadius * (0.3 + Math.random() * 0.7) * particleVariance;

      arr.push({
        baseX: r * Math.sin(phi) * Math.cos(theta),
        baseY: r * Math.sin(phi) * Math.sin(theta),
        baseZ: r * Math.cos(phi) * depthFactor,
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi) * depthFactor,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 0.5,
        scale: 0.5 + Math.random() * 0.5,
      });
    }
    return arr;
  }, [count, ringRadius, particleVariance, depthFactor]);

  const geometry = useMemo(() => {
    if (particleShape === 'capsule') {
      return createCapsuleGeometry(0.02 * particleSize, 0.06 * particleSize, 4);
    }
    return new THREE.SphereGeometry(0.03 * particleSize, 6, 6);
  }, [particleShape, particleSize]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    clock.current += delta;
    const t = clock.current;

    for (let i = 0; i < count; i++) {
      const p = particles[i];

      // Wave motion
      const wave = Math.sin(t * waveSpeed + p.phase) * waveAmplitude * 0.3;
      const pulse = Math.sin(t * pulseSpeed * 0.1 + p.phase) * 0.15;

      // Target positions with wave
      const tx = p.baseX + wave * 0.5;
      const ty = p.baseY + wave;
      const tz = p.baseZ + wave * 0.3;

      // Lerp to target
      p.x += (tx - p.x) * lerpSpeed;
      p.y += (ty - p.y) * lerpSpeed;
      p.z += (tz - p.z) * lerpSpeed;

      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(p.scale * (1 + pulse));

      if (autoAnimate) {
        dummy.rotation.x = t * 0.5 * p.speed;
        dummy.rotation.z = t * 0.3 * p.speed;
      }

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;

    if (rotationSpeed && meshRef.current.parent) {
      meshRef.current.rotation.y += rotationSpeed * delta;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, null, count]}>
      <meshStandardMaterial
        color={color}
        roughness={0.6}
        metalness={0.1}
        transparent
        opacity={0.7}
      />
    </instancedMesh>
  );
}

/* ── Main component ─────────────────────────────── */
export default function Antigravity({
  count = 300,
  magnetRadius = 6,
  ringRadius = 7,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 1.5,
  lerpSpeed = 0.05,
  color = '#09090b',
  autoAnimate = true,
  particleVariance = 1,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 3,
  particleShape = 'capsule',
  fieldStrength = 10,
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} />
      <Particles
        count={count}
        magnetRadius={magnetRadius}
        ringRadius={ringRadius}
        waveSpeed={waveSpeed}
        waveAmplitude={waveAmplitude}
        particleSize={particleSize}
        lerpSpeed={lerpSpeed}
        color={color}
        autoAnimate={autoAnimate}
        particleVariance={particleVariance}
        rotationSpeed={rotationSpeed}
        depthFactor={depthFactor}
        pulseSpeed={pulseSpeed}
        particleShape={particleShape}
        fieldStrength={fieldStrength}
      />
    </Canvas>
  );
}
