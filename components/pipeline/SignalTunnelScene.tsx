"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function useTunnelCurve() {
  return useMemo(() => {
    const points = [
      new THREE.Vector3(0, 0.1, 7),
      new THREE.Vector3(0.7, 0.35, 3),
      new THREE.Vector3(-0.5, -0.25, -1),
      new THREE.Vector3(0.35, 0.4, -5),
      new THREE.Vector3(-0.55, -0.3, -9),
      new THREE.Vector3(0, 0, -13),
    ];
    return new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.4);
  }, []);
}

function CameraRig({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  const { camera, pointer } = useThree();
  const start = useMemo(() => curve.getPointAt(0).clone().add(new THREE.Vector3(0, 0.15, 2.4)), [curve]);

  useFrame(() => {
    camera.position.x += (start.x + pointer.x * 0.4 - camera.position.x) * 0.04;
    camera.position.y += (start.y + pointer.y * 0.25 - camera.position.y) * 0.04;
    camera.position.z += (start.z - camera.position.z) * 0.04;
    camera.lookAt(0, 0, -4);
  });

  return null;
}

function Tunnel({
  curve,
  active,
  count,
}: {
  curve: THREE.CatmullRomCurve3;
  active: number;
  count: number;
}) {
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 140, 0.62, 28, false), [curve]);
  const glowRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const progress = useRef(0);

  const markers = useMemo(
    () => Array.from({ length: count }, (_, i) => curve.getPointAt(i / (count - 1))),
    [curve, count]
  );

  useFrame((_, delta) => {
    const target = active / (count - 1);
    progress.current += (target - progress.current) * Math.min(delta * 2.6, 1);
    const t = Math.max(0.001, Math.min(0.999, progress.current));
    const point = curve.getPointAt(t);
    if (glowRef.current) glowRef.current.position.copy(point);
    if (lightRef.current) lightRef.current.position.copy(point);
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
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>

      {markers.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[i === active ? 0.15 : 0.075, 16, 16]} />
          <meshBasicMaterial
            color={i === active ? "#17E8D8" : "#17C9C4"}
            transparent
            opacity={i === active ? 1 : 0.5}
          />
        </mesh>
      ))}

      <group ref={glowRef}>
        <mesh>
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshBasicMaterial color="#EFFFFC" />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshBasicMaterial color="#17E8D8" transparent opacity={0.22} />
        </mesh>
      </group>
      <pointLight ref={lightRef} color="#17E8D8" intensity={9} distance={7} decay={2} />
    </group>
  );
}

export function SignalTunnelScene({ active, count }: { active: number; count: number }) {
  const curve = useTunnelCurve();

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ fov: 55, near: 0.1, far: 30 }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.Fog(0x0b0f17, 4, 13);
      }}
    >
      <ambientLight intensity={0.25} />
      <CameraRig curve={curve} />
      <Tunnel curve={curve} active={active} count={count} />
    </Canvas>
  );
}
