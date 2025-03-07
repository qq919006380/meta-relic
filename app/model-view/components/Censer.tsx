"use client";

export default function Censer() {
    return (
        <>
            {/* 香炉 - 模型前方 */}
            <group position={[0, -1, 3]}>
                <mesh castShadow receiveShadow>
                    <cylinderGeometry args={[0.3, 0.4, 0.6, 16]} />
                    <meshStandardMaterial color="#B87333" roughness={0.4} metalness={0.7} />
                </mesh>
                {/* 炉盖 */}
                <mesh position={[0, 0.4, 0]} castShadow>
                    <coneGeometry args={[0.3, 0.3, 16]} />
                    <meshStandardMaterial color="#B87333" roughness={0.4} metalness={0.7} />
                </mesh>
                {/* 香火效果 - 使用粒子或光效果模拟 */}
                <pointLight position={[0, 0.7, 0]} intensity={0.6} color="#FF9E5E" distance={1.5} />
            </group>
        </>
    )
}