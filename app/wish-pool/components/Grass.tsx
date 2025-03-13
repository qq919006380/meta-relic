"use client";

export default function Grass({ position }: { position: [number, number, number] }) {
    return (
        <>
            <group position={position}>
                {[...Array(5)].map((_, i) => (
                    <mesh
                        key={i}
                        position={[
                            (Math.random() - 0.5) * 0.2,
                            Math.random() * 0.1,
                            (Math.random() - 0.5) * 0.2
                        ]}
                        rotation={[0, Math.random() * Math.PI, 0]}
                    >
                        <boxGeometry args={[0.02, 0.1, 0.02]} />
                        <meshStandardMaterial color="#355E3B" />
                    </mesh>
                ))}
            </group>
        </>
    )
}