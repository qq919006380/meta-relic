"use client";

import * as THREE from 'three';

// 莲叶组件
interface LotusLeafProps {
    position?: [number, number, number];
    scale?: number;
    rotation?: number;
  }

export default function LotusLeaf({ position = [0, 0, 0] as [number, number, number], scale = 1, rotation = 0 }: LotusLeafProps) {
    const leafColor = "#1b5e20";
    return (
        <>
            <group
      position={position}
      rotation={[0, rotation, 0] as [number, number, number]}
      scale={[scale, scale, scale] as [number, number, number]}
    >
      {/* 叶柄 */}
      <mesh position={[0, -0.1, -0.15]} rotation={[Math.PI / 8, 0, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.05, 0.4, 8]} />
        <meshStandardMaterial color="#2e7d32" roughness={0.8} />
      </mesh>

      {/* 叶片 - 使用圆盘几何体和材质的双面属性表示 */}
      <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2 - 0.2, 0, 0]} castShadow>
        <circleGeometry args={[0.35, 16]} />
        <meshStandardMaterial
          color={leafColor}
          roughness={0.7}
          side={THREE.DoubleSide}
          flatShading={true}
        />
      </mesh>

      {/* 叶片纹理 - 用线条表示叶脉 */}
      {[...Array(5)].map((_, i) => {
        const angle = (i / 5) * Math.PI;
        return (
          <mesh
            key={`vein-${i}`}
            position={[Math.cos(angle) * 0.15, 0.051, Math.sin(angle) * 0.15]}
            rotation={[Math.PI / 2 - 0.2, 0, angle]}
            castShadow
          >
            <boxGeometry args={[0.3, 0.005, 0.005]} />
            <meshStandardMaterial color="#0d3311" roughness={0.8} />
          </mesh>
        );
      })}

      {/* 叶片边缘褶皱效果 */}
      <mesh position={[0, 0.052, 0]} rotation={[Math.PI / 2 - 0.2, 0, 0]} castShadow>
        <ringGeometry args={[0.32, 0.35, 16, 8]} />
        <meshStandardMaterial
          color="#144a14"
          roughness={0.7}
          side={THREE.DoubleSide}
          transparent={true}
          opacity={0.7}
        />
      </mesh>

      {/* 叶片上的水珠 */}
      {[...Array(3)].map((_, i) => {
        const r = Math.random() * 0.2;
        const theta = Math.random() * Math.PI * 2;
        const x = r * Math.cos(theta);
        const z = r * Math.sin(theta);
        return (
          <mesh key={`waterdrop-${i}`} position={[x, 0.07, z]} castShadow>
            <sphereGeometry args={[0.02 + Math.random() * 0.01, 8, 8]} />
            <meshPhysicalMaterial
              color="#ffffff"
              roughness={0}
              metalness={0}
              transmission={1}
              thickness={0.3}
              clearcoat={1}
              clearcoatRoughness={0}
            />
          </mesh>
        );
      })}
    </group>
        </>
    )
}