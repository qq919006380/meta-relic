"use client";

export default function Pavilion() {
    return (
        <>
            {/* 古代亭子 - 右侧 */}
            <group position={[10, -1, -5]}>
                {/* 亭子底座 */}
                <mesh position={[0, 0, 0]} receiveShadow>
                    <cylinderGeometry args={[2, 2.2, 0.4, 8]} />
                    <meshStandardMaterial color="#7D6B5D" roughness={0.8} metalness={0.2} />
                </mesh>

                {/* 亭子柱子 */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                    const angle = (i * Math.PI) / 4;
                    const x = 1.5 * Math.cos(angle);
                    const z = 1.5 * Math.sin(angle);
                    return (
                        <mesh key={i} position={[x, 1.5, z]} castShadow receiveShadow>
                            <cylinderGeometry args={[0.15, 0.15, 3, 8]} />
                            <meshStandardMaterial color="#A52A2A" roughness={0.7} metalness={0.1} />
                        </mesh>
                    );
                })}

                {/* 亭子顶部 */}
                <group position={[0, 3.2, 0]}>
                    {/* 底层屋顶 - 八角攒尖顶 */}
                    <mesh castShadow>
                        <cylinderGeometry args={[2.5, 2, 0.6, 8]} />
                        <meshStandardMaterial color="#2F4F4F" roughness={0.6} metalness={0.3} />
                    </mesh>

                    {/* 屋檐翘角 - 8个方向 */}
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                        const angle = (i * Math.PI) / 4;
                        const x = 2.3 * Math.cos(angle);
                        const z = 2.3 * Math.sin(angle);
                        return (
                            <mesh key={`eave-${i}`} position={[x, -0.2, z]} rotation={[0, -angle, Math.PI / 8]} castShadow>
                                <boxGeometry args={[1, 0.2, 0.8]} />
                                <meshStandardMaterial color="#2F4F4F" roughness={0.6} metalness={0.3} />
                            </mesh>
                        );
                    })}

                    {/* 中层屋顶 */}
                    <mesh position={[0, 0.5, 0]} castShadow>
                        <cylinderGeometry args={[1.7, 1.3, 0.5, 8]} />
                        <meshStandardMaterial color="#2F4F4F" roughness={0.6} metalness={0.3} />
                    </mesh>

                    {/* 顶层屋顶 - 宝顶 */}
                    <mesh position={[0, 1, 0]} castShadow>
                        <coneGeometry args={[1, 1, 8]} />
                        <meshStandardMaterial color="#2F4F4F" roughness={0.6} metalness={0.3} />
                    </mesh>

                    {/* 装饰飞檐 - 向上翘起的边缘 */}
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                        const angle = (i * Math.PI) / 4 + Math.PI / 8;
                        const x = 1.5 * Math.cos(angle);
                        const z = 1.5 * Math.sin(angle);
                        return (
                            <mesh key={`ridge-${i}`} position={[x, 0.7, z]} rotation={[0, -angle, Math.PI / 6]} castShadow>
                                <boxGeometry args={[0.7, 0.15, 0.3]} />
                                <meshStandardMaterial color="#2F4F4F" roughness={0.6} metalness={0.3} />
                            </mesh>
                        );
                    })}

                    {/* 顶部宝珠装饰 */}
                    <group position={[0, 1.4, 0]}>
                        {/* 底座 */}
                        <mesh castShadow>
                            <cylinderGeometry args={[0.25, 0.3, 0.2, 8]} />
                            <meshStandardMaterial color="#CD7F32" roughness={0.4} metalness={0.6} />
                        </mesh>
                        {/* 宝珠 */}
                        <mesh position={[0, 0.3, 0]} castShadow>
                            <sphereGeometry args={[0.25, 16, 16]} />
                            <meshStandardMaterial color="#FFD700" roughness={0.3} metalness={0.8} />
                        </mesh>
                        {/* 尖顶 */}
                        <mesh position={[0, 0.6, 0]} castShadow>
                            <coneGeometry args={[0.1, 0.3, 8]} />
                            <meshStandardMaterial color="#FFD700" roughness={0.3} metalness={0.8} />
                        </mesh>
                    </group>
                </group>
            </group>
        </>
    )
}