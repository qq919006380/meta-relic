"use client";

export default function TreeRight() {
    return (
        <>
            {/* 云雾效果 - 远景装饰 */}
            {[0, 1, 2, 3, 4].map((i) => {
                const x = -15 + i * 8;
                const y = 5 + Math.random() * 3;
                const z = -12 - Math.random() * 5;
                const scale = 1 + Math.random() * 0.5;
                return (
                    <group key={`cloud-${i}`} position={[x, y, z]}>
                        <mesh>
                            <sphereGeometry args={[1.5 * scale, 8, 8]} />
                            <meshStandardMaterial
                                color="#FFFFFF"
                                transparent={true}
                                opacity={0.4}
                                roughness={1}
                                metalness={0}
                            />
                        </mesh>
                        <mesh position={[1 * scale, -0.3 * scale, 0]}>
                            <sphereGeometry args={[1.2 * scale, 8, 8]} />
                            <meshStandardMaterial
                                color="#FFFFFF"
                                transparent={true}
                                opacity={0.4}
                                roughness={1}
                                metalness={0}
                            />
                        </mesh>
                        <mesh position={[-1 * scale, -0.2 * scale, 0]}>
                            <sphereGeometry args={[1.3 * scale, 8, 8]} />
                            <meshStandardMaterial
                                color="#FFFFFF"
                                transparent={true}
                                opacity={0.4}
                                roughness={1}
                                metalness={0}
                            />
                        </mesh>
                    </group>
                );
            })}
        </>
    )
}