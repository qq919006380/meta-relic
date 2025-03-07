"use client";

export default function MemorialArchway() {
    return (
        <>
            {/* 传统中式牌坊 - 背景 */}
            <group position={[0, -1, -8]}>
                {/* 牌坊底座 */}
                <mesh position={[0, 0, 0]} receiveShadow>
                    <boxGeometry args={[8, 0.5, 2]} />
                    <meshStandardMaterial color="#7D6B5D" roughness={0.8} metalness={0.2} />
                </mesh>

                {/* 左侧柱子 */}
                <mesh position={[-3.5, 2.5, 0]} castShadow receiveShadow>
                    <boxGeometry args={[0.8, 5, 0.8]} />
                    <meshStandardMaterial color="#A52A2A" roughness={0.7} metalness={0.1} />
                </mesh>

                {/* 右侧柱子 */}
                <mesh position={[3.5, 2.5, 0]} castShadow receiveShadow>
                    <boxGeometry args={[0.8, 5, 0.8]} />
                    <meshStandardMaterial color="#A52A2A" roughness={0.7} metalness={0.1} />
                </mesh>

                {/* 横梁 */}
                <mesh position={[0, 5.2, 0]} castShadow>
                    <boxGeometry args={[8, 0.6, 1]} />
                    <meshStandardMaterial color="#8B4513" roughness={0.6} metalness={0.2} />
                </mesh>

                {/* 牌匾 */}
                <mesh position={[0, 4.2, 0]} castShadow>
                    <boxGeometry args={[4, 1.2, 0.3]} />
                    <meshStandardMaterial color="#DAA520" roughness={0.4} metalness={0.6} />
                </mesh>

                {/* 屋顶 */}
                <group position={[0, 6, 0]}>
                    <mesh castShadow>
                        <boxGeometry args={[9, 0.2, 2]} />
                        <meshStandardMaterial color="#8B4513" roughness={0.7} metalness={0.2} />
                    </mesh>
                    <mesh position={[0, 0.6, 0]} castShadow>
                        <boxGeometry args={[9.5, 0.8, 2.5]} />
                        <meshStandardMaterial color="#2F4F4F" roughness={0.6} metalness={0.3} />
                    </mesh>
                    {/* 屋顶翘角 */}
                    <mesh position={[-4.5, 0.3, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
                        <boxGeometry args={[1.5, 0.2, 2.5]} />
                        <meshStandardMaterial color="#2F4F4F" roughness={0.6} metalness={0.3} />
                    </mesh>
                    <mesh position={[4.5, 0.3, 0]} rotation={[0, 0, -Math.PI / 6]} castShadow>
                        <boxGeometry args={[1.5, 0.2, 2.5]} />
                        <meshStandardMaterial color="#2F4F4F" roughness={0.6} metalness={0.3} />
                    </mesh>
                </group>
            </group>
        </>
    )
}