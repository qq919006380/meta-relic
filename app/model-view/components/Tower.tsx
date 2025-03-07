"use client";

export default function Tower() {
    return (
        <>
            {/* 添加远处的塔楼 - 远景点缀 */}
            <group position={[0, -1, -20]}>
                {/* 塔楼底座 */}
                <mesh position={[0, 0, 0]} receiveShadow>
                    <boxGeometry args={[4, 1, 4]} />
                    <meshStandardMaterial color="#8B4513" roughness={0.8} metalness={0.2} />
                </mesh>

                {/* 塔楼主体 - 多层结构 */}
                {[0, 1, 2, 3, 4].map((i) => {
                    const scale = 1 - i * 0.15;
                    return (
                        <group key={`pagoda-level-${i}`} position={[0, 1.5 + i * 1.2, 0]}>
                            {/* 塔层主体 */}
                            <mesh castShadow>
                                <boxGeometry args={[3 * scale, 0.8, 3 * scale]} />
                                <meshStandardMaterial color="#A52A2A" roughness={0.7} metalness={0.2} />
                            </mesh>

                            {/* 塔层屋顶 */}
                            <mesh position={[0, 0.6, 0]} castShadow>
                                <boxGeometry args={[4 * scale, 0.3, 4 * scale]} />
                                <meshStandardMaterial color="#2F4F4F" roughness={0.6} metalness={0.3} />
                            </mesh>

                            {/* 屋檐翘角 */}
                            {[0, 1, 2, 3].map((j) => {
                                const angle = (j * Math.PI) / 2;
                                const x = 2 * scale * Math.cos(angle);
                                const z = 2 * scale * Math.sin(angle);
                                return (
                                    <mesh key={`eave-${i}-${j}`} position={[x, 0.5, z]} rotation={[0, -angle, Math.PI / 6]} castShadow>
                                        <boxGeometry args={[1.2 * scale, 0.2, 0.8 * scale]} />
                                        <meshStandardMaterial color="#2F4F4F" roughness={0.6} metalness={0.3} />
                                    </mesh>
                                );
                            })}
                        </group>
                    );
                })}

                {/* 塔顶尖 */}
                <mesh position={[0, 7.5, 0]} castShadow>
                    <coneGeometry args={[0.5, 1.5, 8]} />
                    <meshStandardMaterial color="#FFD700" roughness={0.3} metalness={0.8} />
                </mesh>
            </group>
        </>
    )
}