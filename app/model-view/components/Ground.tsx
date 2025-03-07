"use client";

export default function Ground() {
    return (
        <>
            {/* 地面 - 模拟古代地砖 */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]} receiveShadow>
                <planeGeometry args={[30, 30, 10, 10]} />
                <meshStandardMaterial
                    color="#F5F0E6" // 浅褐色背景
                    roughness={0.9}
                    metalness={0.1}
                    wireframe={false}
                />
            </mesh>
        </>
    )
}