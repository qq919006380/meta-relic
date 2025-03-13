"use client";

import IP3Model from '../../model-view/components/models/IP3Model';
import IP4Model from '../../model-view/components/models/IP4Model';

export default function Temple({ position = [0, 0, -15] as [number, number, number], scale = 1 }: { position?: [number, number, number]; scale?: number }) {
    return (
        <>
            <group position={position} scale={[scale, scale, scale] as [number, number, number]}>
                {/* 寺庙台基 - 更宽更大的基座 */}
                <mesh position={[0, 0, 0]} receiveShadow castShadow>
                    <boxGeometry args={[16, 0.5, 12]} />
                    <meshStandardMaterial color="#d9d0c1" roughness={0.8} />
                </mesh>

                {/* 第二层台基 */}
                <mesh position={[0, 0.5, 0]} receiveShadow castShadow>
                    <boxGeometry args={[14, 0.4, 10]} />
                    <meshStandardMaterial color="#c9bfb0" roughness={0.7} />
                </mesh>

                {/* 正门台阶 */}
                <mesh position={[0, 0.3, 5.2]} receiveShadow castShadow>
                    <boxGeometry args={[8, 0.6, 2.5]} />
                    <meshStandardMaterial color="#c9bfb0" roughness={0.7} />
                </mesh>

                {/* 主殿 */}
                <mesh position={[0, 2.2, 0]} receiveShadow castShadow>
                    <boxGeometry args={[12, 3, 8]} />
                    <meshStandardMaterial color="#a0522d" roughness={0.6} />
                </mesh>

                {/* 传统中式屋顶 - 主体 */}
                <group position={[0, 3.8, 0]}>
                    {/* 主屋顶 */}
                    <mesh position={[0, 0.4, 0]} receiveShadow castShadow>
                        <boxGeometry args={[13, 0.4, 9]} />
                        <meshStandardMaterial color="#8B4513" roughness={0.7} />
                    </mesh>

                    {/* 屋顶上部 - 弯曲效果 */}
                    <mesh position={[0, 0.9, 0]} receiveShadow castShadow>
                        <boxGeometry args={[12, 0.6, 8]} />
                        <meshStandardMaterial color="#8B4513" roughness={0.7} />
                    </mesh>

                    {/* 屋顶尖顶 */}
                    <mesh position={[0, 1.4, 0]} receiveShadow castShadow>
                        <boxGeometry args={[10, 0.6, 6]} />
                        <meshStandardMaterial color="#8B4513" roughness={0.7} />
                    </mesh>

                    {/* 翘角效果 - 前方 */}
                    <mesh position={[0, 1, 4.2]} rotation={[0.3, 0, 0]} receiveShadow castShadow>
                        <boxGeometry args={[10, 0.3, 1.5]} />
                        <meshStandardMaterial color="#8B4513" roughness={0.7} />
                    </mesh>

                    {/* 翘角效果 - 后方 */}
                    <mesh position={[0, 1, -4.2]} rotation={[-0.3, 0, 0]} receiveShadow castShadow>
                        <boxGeometry args={[10, 0.3, 1.5]} />
                        <meshStandardMaterial color="#8B4513" roughness={0.7} />
                    </mesh>

                    {/* 翘角效果 - 左侧 */}
                    <mesh position={[6.2, 1, 0]} rotation={[0, 0, 0.3]} receiveShadow castShadow>
                        <boxGeometry args={[1.5, 0.3, 6]} />
                        <meshStandardMaterial color="#8B4513" roughness={0.7} />
                    </mesh>

                    {/* 翘角效果 - 右侧 */}
                    <mesh position={[-6.2, 1, 0]} rotation={[0, 0, -0.3]} receiveShadow castShadow>
                        <boxGeometry args={[1.5, 0.3, 6]} />
                        <meshStandardMaterial color="#8B4513" roughness={0.7} />
                    </mesh>
                </group>

                {/* 屋顶装饰 - 中央正脊 */}
                <mesh position={[0, 5.4, 0]} receiveShadow castShadow>
                    <boxGeometry args={[12, 0.5, 0.5]} />
                    <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.4} />
                </mesh>

                {/* 屋顶装饰 - 琉璃瓦效果 */}
                {[...Array(5)].map((_, i) => (
                    <mesh key={i} position={[0, 5.7, -3 + i * 1.5]} receiveShadow castShadow>
                        <sphereGeometry args={[0.4, 8, 8]} />
                        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
                    </mesh>
                ))}

                {/* 宝顶 */}
                <group position={[0, 5.9, 0]}>
                    <mesh receiveShadow castShadow>
                        <cylinderGeometry args={[0.5, 0.6, 0.8, 8]} />
                        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.3} />
                    </mesh>
                    <mesh position={[0, 0.8, 0]} receiveShadow castShadow>
                        <coneGeometry args={[0.4, 1, 8]} />
                        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
                    </mesh>
                </group>

                {/* 前柱子 - 8根柱子 */}
                {[-5, -3, 3, 5].map((x, i) => (
                    <group key={i}>
                        {/* 前排柱子 */}
                        <mesh position={[x, 2, 4]} receiveShadow castShadow>
                            <cylinderGeometry args={[0.35, 0.4, 3.4, 8]} />
                            <meshStandardMaterial color="#8d6e63" roughness={0.6} />
                        </mesh>
                        {/* 后排柱子 */}
                        <mesh position={[x, 2, -4]} receiveShadow castShadow>
                            <cylinderGeometry args={[0.35, 0.4, 3.4, 8]} />
                            <meshStandardMaterial color="#8d6e63" roughness={0.6} />
                        </mesh>
                    </group>
                ))}

                {/* 门 - 改用中式红色大门 */}
                <group position={[0, 1.8, 4.01]}>
                    {/* 门框 */}
                    <mesh receiveShadow castShadow>
                        <boxGeometry args={[4.1, 3.2, 0.3]} />
                        <meshStandardMaterial color="#5c3a21" roughness={0.8} />
                    </mesh>
                    {/* 左门扇 */}
                    <mesh position={[-1, 0, 0.2]} receiveShadow castShadow>
                        <boxGeometry args={[1.8, 3, 0.1]} />
                        <meshStandardMaterial color="#b71c1c" roughness={0.7} />
                    </mesh>
                    {/* 右门扇 */}
                    <mesh position={[1, 0, 0.2]} receiveShadow castShadow>
                        <boxGeometry args={[1.8, 3, 0.1]} />
                        <meshStandardMaterial color="#b71c1c" roughness={0.7} />
                    </mesh>
                    {/* 门环装饰 */}
                    {[-1, 1].map((x, i) => (
                        <mesh key={i} position={[x, 0, 0.3]} receiveShadow castShadow>
                            <torusGeometry args={[0.3, 0.05, 16, 16]} />
                            <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
                        </mesh>
                    ))}
                </group>

                {/* 窗户 - 传统中式花窗 */}
                {[-4, 4].map((x, i) => (
                    <group key={i} position={[x, 2.2, 4.01]}>
                        {/* 窗框 */}
                        <mesh receiveShadow castShadow>
                            <boxGeometry args={[1.8, 1.8, 0.1]} />
                            <meshStandardMaterial color="#5c3a21" roughness={0.7} />
                        </mesh>
                        {/* 窗格 - 横向 */}
                        {[0.4, 0, -0.4].map((y, j) => (
                            <mesh key={j} position={[0, y, 0.06]} receiveShadow castShadow>
                                <boxGeometry args={[1.7, 0.1, 0.02]} />
                                <meshStandardMaterial color="#8d6e63" roughness={0.5} />
                            </mesh>
                        ))}
                        {/* 窗格 - 纵向 */}
                        {[0.4, 0, -0.4].map((x, j) => (
                            <mesh key={j + 3} position={[x, 0, 0.06]} receiveShadow castShadow>
                                <boxGeometry args={[0.1, 1.7, 0.02]} />
                                <meshStandardMaterial color="#8d6e63" roughness={0.5} />
                            </mesh>
                        ))}
                    </group>
                ))}

                {/* 两侧石狗 */}
                <group position={[-5, 1.2, 5.5]}>
                    <IP3Model />
                </group>
                <group position={[5, 1.2, 5.5]}>
                    <IP4Model />
                </group>


                {/* 香炉 */}
                <group position={[0, 1.2, 6]}>
                    <mesh receiveShadow castShadow>
                        <cylinderGeometry args={[0.8, 0.6, 1.2, 16]} />
                        <meshStandardMaterial color="#5c5c5c" roughness={0.3} metalness={0.8} />
                    </mesh>
                    {/* 香炉盖 */}
                    <mesh position={[0, 0.8, 0]} receiveShadow castShadow>
                        <coneGeometry args={[0.6, 0.5, 16]} />
                        <meshStandardMaterial color="#5c5c5c" roughness={0.3} metalness={0.7} />
                    </mesh>
                    {/* 香 */}
                    {[...Array(5)].map((_, i) => (
                        <mesh key={i} position={[(i - 2) * 0.2, 1.2, 0]} rotation={[0.1 * (i - 2), 0, 0]} receiveShadow castShadow>
                            <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
                            <meshStandardMaterial color="#a1887f" roughness={0.8} />
                        </mesh>
                    ))}
                    {/* 烟雾 */}
                    <group position={[0, 1.8, 0]}>
                        {[...Array(4)].map((_, i) => (
                            <mesh key={i} position={[0, i * 0.2, 0]} receiveShadow={false}>
                                <sphereGeometry args={[0.25 + i * 0.1, 8, 8]} />
                                <meshStandardMaterial
                                    color="#e0e0e0"
                                    transparent
                                    opacity={0.4 - i * 0.1}
                                    roughness={1}
                                />
                            </mesh>
                        ))}
                    </group>
                </group>

                {/* 神龛/佛像 */}
                <group position={[0, 2, -3]}>
                    {/* 底座 */}
                    <mesh position={[0, 0, 0]} receiveShadow castShadow>
                        <boxGeometry args={[3, 0.5, 1.5]} />
                        <meshStandardMaterial color="#8B4513" roughness={0.7} />
                    </mesh>
                    {/* 佛像轮廓 */}
                    <mesh position={[0, 1.3, 0]} receiveShadow castShadow>
                        <boxGeometry args={[1.5, 2, 0.8]} />
                        <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.4} />
                    </mesh>
                </group>
                {/* 灯笼  */}
                {[-6, 6].map((x, i) => (
                    <group key={i} position={[x, 3, 4.5]}>
                        <mesh receiveShadow castShadow>
                            <cylinderGeometry args={[0.4, 0.4, 1, 8]} />
                            <meshStandardMaterial color="#b71c1c" roughness={0.7} emissive="#ff5252" emissiveIntensity={0.3} />
                        </mesh>
                        <mesh position={[0, -0.6, 0]} receiveShadow castShadow>
                            <boxGeometry args={[0.1, 0.2, 0.1]} />
                            <meshStandardMaterial color="#FFD700" metalness={0.7} roughness={0.3} />
                        </mesh>
                        <mesh position={[0, 0.6, 0]} receiveShadow castShadow>
                            <boxGeometry args={[0.2, 0.1, 0.2]} />
                            <meshStandardMaterial color="#5c3a21" roughness={0.7} />
                        </mesh>
                    </group>
                ))}

                {/* 围栏/栏杆 */}
                <group position={[0, 0.9, 0]}>
                    {/* 前栏杆 */}
                    <mesh position={[0, 0, 4.8]} receiveShadow castShadow>
                        <boxGeometry args={[12, 0.1, 0.1]} />
                        <meshStandardMaterial color="#a0522d" roughness={0.7} />
                    </mesh>

                    {/* 后栏杆 */}
                    <mesh position={[0, 0, -4.8]} receiveShadow castShadow>
                        <boxGeometry args={[12, 0.1, 0.1]} />
                        <meshStandardMaterial color="#a0522d" roughness={0.7} />
                    </mesh>

                    {/* 左栏杆 */}
                    <mesh position={[5.8, 0, 0]} receiveShadow castShadow>
                        <boxGeometry args={[0.1, 0.1, 10]} />
                        <meshStandardMaterial color="#a0522d" roughness={0.7} />
                    </mesh>

                    {/* 右栏杆 */}
                    <mesh position={[-5.8, 0, 0]} receiveShadow castShadow>
                        <boxGeometry args={[0.1, 0.1, 10]} />
                        <meshStandardMaterial color="#a0522d" roughness={0.7} />
                    </mesh>

                    {/* 栏杆柱子 - 周围分布 */}
                    {[...Array(10)].map((_, i) => (
                        <mesh key={i} position={[-5.8 + i * 1.3, -0.1, 4.8]} receiveShadow castShadow>
                            <boxGeometry args={[0.15, 0.8, 0.15]} />
                            <meshStandardMaterial color="#a0522d" roughness={0.7} />
                        </mesh>
                    ))}

                    {/* 后栏杆柱子 */}
                    {[...Array(10)].map((_, i) => (
                        <mesh key={i + 10} position={[-5.8 + i * 1.3, -0.1, -4.8]} receiveShadow castShadow>
                            <boxGeometry args={[0.15, 0.8, 0.15]} />
                            <meshStandardMaterial color="#a0522d" roughness={0.7} />
                        </mesh>
                    ))}

                    {/* 左右栏杆柱子 */}
                    {[...Array(8)].map((_, i) => (
                        <group key={i + 20}>
                            <mesh position={[5.8, -0.1, -4.8 + i * 1.25]} receiveShadow castShadow>
                                <boxGeometry args={[0.15, 0.8, 0.15]} />
                                <meshStandardMaterial color="#a0522d" roughness={0.7} />
                            </mesh>
                            <mesh position={[-5.8, -0.1, -4.8 + i * 1.25]} receiveShadow castShadow>
                                <boxGeometry args={[0.15, 0.8, 0.15]} />
                                <meshStandardMaterial color="#a0522d" roughness={0.7} />
                            </mesh>
                        </group>
                    ))}
                </group>

                {/* 牌匾 */}
                <group position={[0, 4, 4.8]}>
                    <mesh receiveShadow castShadow>
                        <boxGeometry args={[4, 1, 0.2]} />
                        <meshStandardMaterial color="#5c3a21" roughness={0.7} />
                    </mesh>
                    {/* 牌匾装饰边框 */}
                    <mesh position={[0, 0, 0.05]} receiveShadow castShadow>
                        <boxGeometry args={[3.8, 0.8, 0.05]} />
                        <meshStandardMaterial color="#FFD700" metalness={0.4} roughness={0.6} />
                    </mesh>
                </group>

                {/* 屋檐下的雕花装饰 */}
                <group position={[0, 3.75, 0]}>
                    {/* 前檐装饰 */}
                    <mesh position={[0, 0, 4.5]} receiveShadow castShadow>
                        <boxGeometry args={[12, 0.3, 0.6]} />
                        <meshStandardMaterial color="#8d6e63" roughness={0.7} />
                    </mesh>
                    {/* 后檐装饰 */}
                    <mesh position={[0, 0, -4.5]} receiveShadow castShadow>
                        <boxGeometry args={[12, 0.3, 0.6]} />
                        <meshStandardMaterial color="#8d6e63" roughness={0.7} />
                    </mesh>
                    {/* 左右檐装饰 */}
                    <mesh position={[6, 0, 0]} receiveShadow castShadow>
                        <boxGeometry args={[0.6, 0.3, 10]} />
                        <meshStandardMaterial color="#8d6e63" roughness={0.7} />
                    </mesh>
                    <mesh position={[-6, 0, 0]} receiveShadow castShadow>
                        <boxGeometry args={[0.6, 0.3, 10]} />
                        <meshStandardMaterial color="#8d6e63" roughness={0.7} />
                    </mesh>
                </group>

                {/* 石阶路径 */}
                <mesh position={[0, -0.1, 12]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                    <planeGeometry args={[6, 6]} />
                    <meshStandardMaterial color="#c9bfb0" roughness={0.8} />
                </mesh>

                {/* 香火钱箱 */}
                <mesh position={[2, 1, 6]} receiveShadow castShadow>
                    <boxGeometry args={[1, 0.7, 0.7]} />
                    <meshStandardMaterial color="#5c3a21" roughness={0.6} />
                </mesh>

                {/* 内部地板纹理 - 红色地砖 */}
                <mesh position={[0, 0.96, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                    <planeGeometry args={[11.5, 7.5]} />
                    <meshStandardMaterial color="#6d4c41" roughness={0.7} />
                </mesh>

                {/* 装饰性藻井(天花板) */}
                <mesh position={[0, 3.7, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow castShadow>
                    <circleGeometry args={[3, 16]} />
                    <meshStandardMaterial color="#FFD700" metalness={0.5} roughness={0.5} />
                </mesh>
            </group>
        </>
    )
}