"use client";

export default function Lantern() {
    return (
        <>
            {/* 传统灯笼 - 成对放置 */}
            {[-3, 3].map((x, i) => (
                <group key={`lantern-${i}`} position={[x, -1, 1]}>
                    {/* 灯笼支架 */}
                    <mesh castShadow>
                        <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
                        <meshStandardMaterial color="#8B4513" roughness={0.8} metalness={0.2} />
                    </mesh>

                    {/* 灯笼主体 - 位置上移到支架顶部 */}
                    <mesh position={[0, 0.9, 0]} castShadow>
                        <cylinderGeometry args={[0.3, 0.3, 0.8, 8]} />
                        <meshStandardMaterial color="#FF4500" roughness={0.7} metalness={0.2} />
                    </mesh>

                    {/* 灯笼顶部 */}
                    <mesh position={[0, 1.4, 0]} castShadow>
                        <coneGeometry args={[0.3, 0.3, 8]} />
                        <meshStandardMaterial color="#FFD700" roughness={0.5} metalness={0.5} />
                    </mesh>

                    {/* 灯笼底部 */}
                    <mesh position={[0, 0.4, 0]} castShadow>
                        <coneGeometry args={[0.3, 0.3, 8]} />
                        <meshStandardMaterial color="#FFD700" roughness={0.5} metalness={0.5} />
                    </mesh>

                    {/* 灯光效果 */}
                    <pointLight position={[0, 0.9, 0]} intensity={0.8} distance={2} color="#FFD54F" />
                </group>
            ))}
        </>
    )
}