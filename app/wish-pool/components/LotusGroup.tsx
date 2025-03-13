"use client";

import LotusFlower from "./LotusFlower"
import LotusLeaf from "./LotusLeaf"

export default function LotusGroup({ position = [0, 0, 0] as [number, number, number] }) {
    return (
        <>
            <group position={position}>
      {/* 莲花 - 不同的开放程度和旋转角度 */}
      <LotusFlower
        position={[0.3, 0.6, 0.2]}
        scale={0.9}
        rotation={Math.PI / 6}
        bloomLevel={2}
      />
      <LotusFlower
        position={[-0.5, 0.6, -0.3]}
        scale={0.8}
        rotation={Math.PI / 3}
        bloomLevel={1}
      />
      <LotusFlower
        position={[0.1, 0.6, -0.7]}
        scale={1.1}
        rotation={Math.PI / 2}
        bloomLevel={2}
      />

      {/* 莲叶 - 不同的大小和旋转角度 */}
      <LotusLeaf
        position={[-0.3, 0.6, 0.1]}
        scale={1.2}
        rotation={Math.PI / 4}
      />
      <LotusLeaf
        position={[0.6, 0.6, -0.4]}
        scale={1.4}
        rotation={Math.PI / 2}
      />
      <LotusLeaf
        position={[-0.7, 0.6, -0.6]}
        scale={1.3}
        rotation={-Math.PI / 3}
      />
      <LotusLeaf
        position={[0.4, 0.6, 0.7]}
        scale={1.1}
        rotation={-Math.PI / 6}
      />
    </group>
        </>
    )
}