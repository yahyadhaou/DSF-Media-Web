"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type ProgressSource = { get: () => number };

function useTunnelCurve() {
  return useMemo(() => {
    const points = [
      new THREE.Vector3(0, 0.15, 8),
      new THREE.Vector3(0.9, 0.4, 4.5),
      new THREE.Vector3(-0.6, -0.3, 1.5),
      new THREE.Vector3(0.5, 0.45, -2),
      new THREE.Vector3(-0.7, -0.35, -5.5),
      new THREE.Vector3(0.4, 0.2, -9),
      new THREE.Vector3(-0.3, -0.15, -12.5),
      new THREE.Vector3(0, 0, -16),
    ];
    return new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.45);
  }, []);
}

function CameraRig({ curve, progress }: { curve: THREE.CatmullRomCurve3; progress: ProgressSource }) {
  const { camera, pointer } = useThree();
  const lookTarget = useRef(new THREE.Vector3());

  useFrame(() => {
    const t = Math.max(0.001, Math.min(0.999, progress.get()));
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();

    camera.position.lerp(point, 0.18);
    camera.position.x += pointer.x * 0.18;
    camera.position.y += pointer.y * 0.12;

    lookTarget.current.copy(point).addScaledVector(tangent, 3);
    camera.lookAt(lookTarget.current);
  });

  return null;
}

function Tunnel({
  curve,
  progress,
  count,
}: {
  curve: THREE.CatmullRomCurve3;
  progress: ProgressSource;
  count: number;
}) {
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 200, 0.7, 28, false), [curve]);
  const glowRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const markers = useMemo(
    () => Array.from({ length: count }, (_, i) => curve.getPointAt(i / (count - 1))),
    [curve, count]
  );

  useFrame(() => {
    const t = Math.max(0.001, Math.min(0.999, progress.get()));
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();
    const lead = point.clone().addScaledVector(tangent, 1.4);
    if (glowRef.current) glowRef.current.position.copy(lead);
    if (lightRef.current) lightRef.current.position.copy(lead);
  });

  return (
    <group>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="#0B3D5C"
          emissive="#0B3D5C"
          emissiveIntensity={0.35}
          metalness={0.2}
          roughness={0.6}
          transparent
          opacity={0.32}
          side={THREE.BackSide}
        />
      </mesh>

      {markers.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshBasicMaterial color="#17C9C4" transparent opacity={0.75} />
        </mesh>
      ))}

      <group ref={glowRef}>
        <mesh>
          <sphereGeometry args={[0.14, 24, 24]} />
          <meshBasicMaterial color="#EFFFFC" />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.42, 16, 16]} />
          <meshBasicMaterial color="#17E8D8" transparent opacity={0.22} />
        </mesh>
      </group>
      <pointLight ref={lightRef} color="#17E8D8" intensity={10} distance={8} decay={2} />
    </group>
  );
}

export function SignalTunnelScene({
  progress,
  count,
}: {
  progress: ProgressSource;
  count: number;
}) {
  const curve = useTunnelCurve();

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ fov: 60, near: 0.1, far: 34 }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.Fog(0x0b0f17, 3, 15);
      }}
    >
      <ambientLight intensity={0.25} />
      <CameraRig curve={curve} progress={progress} />
      <Tunnel curve={curve} progress={progress} count={count} />
    </Canvas>
  );
}
