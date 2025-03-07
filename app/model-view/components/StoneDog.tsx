"use client";

export default function StoneDog(props: { position: [number, number, number] }) {
    return (
        <>
            {/* 点缀小石狗装饰 */}
            <mesh position={props.position} rotation={[0, Math.PI / 4, 0]} scale={[0.3, 0.3, 0.3]} castShadow>
                <boxGeometry args={[0.8, 0.6, 1.2]} />
                <meshStandardMaterial color="#8B4513" roughness={0.9} metalness={0.1} />
            </mesh>
        </>
    )
}