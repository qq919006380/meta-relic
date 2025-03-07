"use client";

export default function LandscapeStone(props:{
    position1: [number, number, number],
    position2: [number, number, number],
    position3: [number, number, number],
    args1: [number],
    args2: [number],
    args3: [number],
}) {
    return (
        <>
            {/* 景观石 */}
            <group position={props.position1}>
                <mesh castShadow receiveShadow>
                    <dodecahedronGeometry args={props.args1} />
                    <meshStandardMaterial color="#7D6B5D" roughness={0.9} metalness={0.1} />
                </mesh>
                <mesh position={props.position2} castShadow>
                    <dodecahedronGeometry args={props.args2} />
                    <meshStandardMaterial color="#7D6B5D" roughness={0.9} metalness={0.1} />
                </mesh>
                <mesh position={props.position3} castShadow>
                    <dodecahedronGeometry args={props.args3} />
                    <meshStandardMaterial color="#7D6B5D" roughness={0.9} metalness={0.1} />
                </mesh>
            </group>
        </>
    )
}