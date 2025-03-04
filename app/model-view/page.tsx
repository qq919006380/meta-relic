"use client";

import React, { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { FBXLoader } from 'three-stdlib';
import * as THREE from 'three';

interface PartMapping {
  [key: string]: string;
}

// 详情组件
function DetailPanel({ part, position }: { part: string; position: THREE.Vector3 }) {
  const details = {
    身体: "身体",
    眼睛: "眼睛",
    鼻子: "鼻子",
    头: "头部",
    配饰: "配饰"
  };

  return (
    <Html position={position}>
      <div className="bg-white p-2 rounded shadow-lg flex items-center gap-2">
        <h3 className="text-lg font-bold">{part}</h3>
        <span className="text-gray-600">-</span>
        <p className="text-gray-800">{details[part as keyof typeof details]}</p>
      </div>
    </Html>
  );
}

// 模型组件
function Model() {
  const fbx = useLoader(FBXLoader, '/models/IP.fbx');
  const model = useRef<THREE.Group>(null);
  const [hoveredPart, setHoveredPart] = useState(null);
  const [hoverPoint, setHoverPoint] = useState([0, 0, 0]);
  const { camera, raycaster, mouse, scene } = useThree();

  // 添加点击状态
  const [clickedPart, setClickedPart] = useState(null);

  // 映射模型的部分名称（这需要根据实际模型调整）
  const partMapping: PartMapping = {
    '眼睛': '眼睛',
    '身体': '身体',
    '鼻子': '鼻子',
    '头': '头部',
    '配饰': '装饰品'
  };

  // 确保模型加载后处理子对象和材质
  useEffect(() => {
    if (fbx) {
      // 调整模型整体缩放
      fbx.scale.set(0.005, 0.005, 0.005); // 减小初始大小，根据实际需要调整数值

      // 设置模型位置
      fbx.position.set(0, -1, 0); // 调整Y轴位置，使模型居中

      // 为每个mesh设置材质和颜色
      fbx.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // 为不同部位设置不同颜色
          let color = new THREE.Color(0x808080); // 默认灰色
          
          if (child.name.includes('眼睛')) {
            color = new THREE.Color(0x000000); // 黑色
          } else if (child.name.includes('身体')) {
            color = new THREE.Color(0xA0522D); // 棕色
          } else if (child.name.includes('鼻子')) {
            color = new THREE.Color(0x8B4513); // 深棕色
          }

          child.material = new THREE.MeshStandardMaterial({ 
            color: color,
            metalness: 0.3,
            roughness: 0.7,
            // 添加环境光遮蔽以增强细节
            aoMapIntensity: 1,
          });

          // 添加阴影
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [fbx]);

  // 优化交互检测
  useFrame(() => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(fbx.children, true); // 改为检测子对象
    
    if (intersects.length > 0) {
      const object = intersects[0].object;
      const partName = object.name;
      
      // 调试输出模型部件名称
      console.log('Detected part:', partName);
      
      // 更精确的匹配逻辑
      const matchedPart = Object.entries(partMapping).find(([key]) => 
        partName.toLowerCase().includes(key.toLowerCase())
      );
      
      if (matchedPart) {
        setHoveredPart(matchedPart[1]);
        setHoverPoint(intersects[0].point.toArray().map((v, i) => 
          i === 1 ? v + 0.2 : v // 调整Y轴偏移防止遮挡
        ));
      }
    } else {
      setHoveredPart(null);
    }
  });

  return (
    <group ref={model}>
      <primitive object={fbx} />
      {hoveredPart && (
        <DetailPanel part={hoveredPart} position={hoverPoint} />
      )}
    </group>
  );
}

export default function ModelViewPage() {
  return (
    <div className="w-full h-screen">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        shadows // 启用阴影
      >
        {/* 增强光照效果 */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true}
          minDistance={2} // 限制最小缩放距离
          maxDistance={10} // 限制最大缩放距离
        />
      </Canvas>
    </div>
  );
}