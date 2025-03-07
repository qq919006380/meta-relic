"use client";

export default function DecorativePillar(props: { position: [number, number, number] }) {
    return (
        <>
            {/* 传统装饰柱 */}
            <group position={props.position}>
                <mesh castShadow receiveShadow>
                    <cylinderGeometry args={[0.4, 0.5, 4, 16]} />
                    <meshStandardMaterial color="#8B4513" roughness={0.7} metalness={0.2} />
                </mesh>
                {/* 柱子顶部装饰 */}
                <mesh position={[0, 2.1, 0]} castShadow>
                    <boxGeometry args={[1.2, 0.2, 1.2]} />
                    <meshStandardMaterial color="#FFD700" roughness={0.3} metalness={0.8} />
                </mesh>
            </group>
        </>
    )
}