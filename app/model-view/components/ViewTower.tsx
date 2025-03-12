"use client";

export default function ViewTower() {
    return (
        <>
            <group position={[-16, -1, -5]}>
                {/* 塔基 */}
                <mesh position={[0, 0, 0]} receiveShadow>
                    <cylinderGeometry args={[4, 4, 1, 8]} />
                    <meshStandardMaterial color="#9e8c7d" />
                </mesh>

                {/* 螺旋上升结构 */}
                {[...Array(7)].map((_, i) => (
                    <group key={i} position={[0, i * 2.5, 0]}>
                        <mesh rotation={[0, Math.PI / 4 * i, 0]}>
                            <boxGeometry args={[3 - i * 0.3, 2, 3 - i * 0.3]} />
                            <meshStandardMaterial color="#8b7355" />
                        </mesh>
                    </group>
                ))}

                {/* 观景平台 */}
                <mesh position={[0, 16, 0]}>
                    <cylinderGeometry args={[5, 5, 0.5, 8]} />
                    <meshStandardMaterial
                        color="#d4c9b8"
                        transparent
                        opacity={0.8}
                    />
                </mesh>
            </group>
        </>
    )
}