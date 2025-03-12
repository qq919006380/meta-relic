"use client";

export default function Museum() {
    return (
        <>
            <group position={[0, -2, 15]} rotation={[0, Math.PI, 0]}>
                {/* 博物馆基座 - 仿传统台基 */}
                <mesh position={[0, 1, 0]} receiveShadow>
                    <boxGeometry args={[20, 2, 12]} />
                    <meshStandardMaterial color="#d4c9b8" roughness={0.8} />
                </mesh>
                {/* 博物馆主体建筑 */}
                <mesh position={[0, 4, 0]}>
                    <boxGeometry args={[18, 4, 10]} />
                    <meshStandardMaterial color="#e6dfd6" roughness={0.7} />
                </mesh>
                {/* 传统檐廊 */}
                <mesh position={[0, 6.5, 5.5]} rotation={[Math.PI / 10, 0, 0]}>
                    <boxGeometry args={[18, 0.5, 2]} />
                    <meshStandardMaterial color="#8b7355" roughness={0.6} />
                </mesh>
                {/* 柱子装饰 */}
                {[-8, -4, 0, 4, 8].map((x, i) => (
                    <mesh key={i} position={[x, 3, 5]} castShadow>
                        <cylinderGeometry args={[0.7, 0.7, 6.5, 8]} />
                        <meshStandardMaterial color="#8b7355" roughness={0.7} />
                    </mesh>
                ))}
                {/* 屋顶 */}
                <mesh position={[0, 7, 0]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[19, 0.5, 12]} />
                    <meshStandardMaterial color="#3a2b23" roughness={0.8} />
                </mesh>
                <mesh position={[0, 8, 0]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[16, 0.5, 9]} />
                    <meshStandardMaterial color="#3a2b23" roughness={0.8} />
                </mesh>
                {/* 博物馆招牌 */}
                <mesh position={[0, 8.5, 5.5]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[10, 1.2, 0.3]} />
                    <meshStandardMaterial color="#8b7355" roughness={0.5} />
                </mesh>
                {/* 玻璃窗 */}
                {[-6, -2, 2, 6].map((x, i) => (
                    <mesh key={i} position={[x, 4, 5.1]} castShadow>
                        <boxGeometry args={[2, 2, 0.1]} />
                        <meshStandardMaterial
                            color="#b8cee2"
                            transparent={true}
                            opacity={0.6}
                            metalness={0.3}
                            roughness={0.2}
                        />
                    </mesh>
                ))}
                {/* 室内光源效果 */}
                <pointLight position={[0, 4, 0]} intensity={3} color="#fffbef" distance={10} />
            </group>
        </>
    )
}