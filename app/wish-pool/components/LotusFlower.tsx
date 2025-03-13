"use client";

import * as THREE from 'three';

// 添加接口定义
interface LotusFlowerProps {
    position?: [number, number, number];
    scale?: number;
    rotation?: number;
    bloomLevel?: number;
}

export default function LotusFlower({ position = [0, 0, 0] as [number, number, number], scale = 1, rotation = 0, bloomLevel = 1 }: LotusFlowerProps) {
    // 基础颜色
    const petalColor = "#f8bbd0";
    const centerColor = "#fdd835";
    const stemColor = "#2e7d32";
    const leafColor = "#1b5e20";
    return (
        <>
            <group
                position={position}
                rotation={[0, rotation, 0] as [number, number, number]}
                scale={[scale, scale, scale] as [number, number, number]}
            >
                {/* 莲茎 */}
                <mesh position={[0, -0.1, 0]} castShadow>
                    <cylinderGeometry args={[0.03, 0.05, 0.3, 8]} />
                    <meshStandardMaterial color={stemColor} roughness={0.8} />
                </mesh>

                {/* 莲花底座 */}
                <mesh position={[0, 0.05, 0]} castShadow>
                    <cylinderGeometry args={[0.12, 0.08, 0.08, 8]} />
                    <meshStandardMaterial color="#43a047" roughness={0.7} />
                </mesh>

                {/* 花瓣 - 第一层（底层） */}
                {[...Array(8)].map((_, i) => {
                    const angle = (i / 8) * Math.PI * 2;
                    const radius = 0.22;
                    const x = Math.cos(angle) * radius;
                    const z = Math.sin(angle) * radius;

                    return (
                        <group key={`petal1-${i}`} position={[x, 0, z]} rotation={[0.3, angle, 0]}>
                            <mesh castShadow>
                                <coneGeometry args={[0.12, 0.25, 5, 1, true]} />
                                <meshStandardMaterial
                                    color={petalColor}
                                    roughness={0.6}
                                    side={THREE.DoubleSide}
                                    emissive={petalColor}
                                    emissiveIntensity={0.05}
                                />
                            </mesh>
                        </group>
                    );
                })}

                {/* 花瓣 - 第二层（中层） - 仅在bloom级别 >= 1时显示 */}
                {bloomLevel >= 1 && [...Array(8)].map((_, i) => {
                    const angle = ((i / 8) * Math.PI * 2) + (Math.PI / 8);
                    const radius = 0.15;
                    const x = Math.cos(angle) * radius;
                    const z = Math.sin(angle) * radius;

                    return (
                        <group key={`petal2-${i}`} position={[x, 0.08, z]} rotation={[0.1, angle, 0]}>
                            <mesh castShadow>
                                <coneGeometry args={[0.1, 0.22, 5, 1, true]} />
                                <meshStandardMaterial
                                    color={petalColor}
                                    roughness={0.6}
                                    side={THREE.DoubleSide}
                                    emissive={petalColor}
                                    emissiveIntensity={0.08}
                                />
                            </mesh>
                        </group>
                    );
                })}

                {/* 花瓣 - 第三层（内层） - 仅在bloom级别 >= 2时显示 */}
                {bloomLevel >= 2 && [...Array(5)].map((_, i) => {
                    const angle = ((i / 5) * Math.PI * 2);
                    const radius = 0.08;
                    const x = Math.cos(angle) * radius;
                    const z = Math.sin(angle) * radius;

                    return (
                        <group key={`petal3-${i}`} position={[x, 0.15, z]} rotation={[0, angle, 0]}>
                            <mesh castShadow>
                                <coneGeometry args={[0.07, 0.18, 5, 1, true]} />
                                <meshStandardMaterial
                                    color={petalColor}
                                    roughness={0.6}
                                    side={THREE.DoubleSide}
                                    emissive={petalColor}
                                    emissiveIntensity={0.1}
                                />
                            </mesh>
                        </group>
                    );
                })}

                {/* 莲蓬中心 */}
                <mesh position={[0, 0.15, 0]} castShadow>
                    <sphereGeometry args={[0.08, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color={centerColor} roughness={0.7} />
                </mesh>

                {/* 莲蓬中心的装饰点 */}
                {[...Array(12)].map((_, i) => {
                    const phi = Math.acos(-1 + (2 * i) / 12);
                    const theta = Math.sqrt(12 * Math.PI) * phi;
                    const x = 0.06 * Math.cos(theta) * Math.sin(phi);
                    const y = 0.16 + (0.06 * Math.cos(phi));
                    const z = 0.06 * Math.sin(theta) * Math.sin(phi);

                    return (
                        <mesh key={`seed-${i}`} position={[x, y, z]} castShadow>
                            <sphereGeometry args={[0.01, 4, 4]} />
                            <meshStandardMaterial color="#bf360c" roughness={0.7} />
                        </mesh>
                    );
                })}
            </group>
        </>
    )
}