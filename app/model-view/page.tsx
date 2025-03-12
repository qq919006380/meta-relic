"use client";

import React, { Suspense, useEffect, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { FBXLoader } from 'three-stdlib';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import * as THREE from 'three';
import Base from './components/Base';
import Baseplate from './components/Baseplate';
import Ground from './components/Ground';
import DecorativePillar from './components/DecorativePillar';
import MemorialArchway from './components/MemorialArchway';
import Pavilion from './components/Pavilion';
import StoneBridge from './components/StoneBridge';
import Censer from './components/Censer';
import Background from './components/Background';
import Mountain from './components/Mountain';
import StoneDog from './components/StoneDog';
import Tower from './components/Tower';
import TreeRight from './components/TreeRight';
import TreeLeft from './components/TreeLeft';
import Lantern from './components/Lantern';
import Cloud from './components/Cloud';
import MountainBg from './components/MountainBg';
import CloudPattern from './components/CloudPattern';
import LandscapeStone from './components/LandscapeStone';
import ViewTower from './components/ViewTower';
import Museum from './components/Museum';

// 定义可用的模型
const AVAILABLE_MODELS = [
  { id: 'IP1', name: '守护石狗' },
  // { id: 'IP2', name: '石狗二号' },
  { id: 'IP3', name: '勤劳石狗' },
  { id: 'IP4', name: '忠诚石狗' },
  // { id: 'IP5', name: '石狗五号' },
  // { id: 'IP6', name: '石狗六号' },
  { id: 'IP7', name: '勇敢石狗' },
  // { id: 'IP8', name: '石狗八号' },
];

// 添加类型定义
type ModelMapping = Record<string, Record<string, string>>;

// 在贴图应用逻辑前添加名称映射
const MODEL_NAME_MAPPING: ModelMapping = {
  'IP3': {
    '第三个ip004': '铃铛',
    '第三个ip': '身体',
    '第三个ip005': '眼睛',
    '第三个ip006': '鼻子',
    '第三个ip003': '头部'
  },
  'IP4': {
    '嘴巴': '头部'
  },
  'IP6': {
    '6号': '身体'
  },
  'IP8': {
    'polySurface20': '头部',
    'polySurface19': '身体',
  }
};

// 手动贴图模型组件
function Model({ modelId }: { modelId: string }) {
  // 加载FBX模型
  const fbx = useLoader(FBXLoader, `/models/${modelId}/${modelId}.fbx`);

  // 调整模型整体缩放和位置
  fbx.scale.set(0.005, 0.005, 0.005);
  fbx.position.set(0, -1, 0);

  // 手动加载贴图
  useEffect(() => {
    if (!fbx) return;

    console.log(`开始加载 ${modelId} 的贴图...`);

    // 创建纹理加载器
    const textureLoader = new THREE.TextureLoader();

    // 加载所有贴图 - 根据模型ID动态确定路径
    const textures = {
      body: textureLoader.load(`/models/${modelId}/${modelId}.fbm/身体.png`),
      head: textureLoader.load(`/models/${modelId}/${modelId}.fbm/头部.png`),
      eyes: textureLoader.load(`/models/${modelId}/${modelId}.fbm/眼睛.png`),
      nose: textureLoader.load(`/models/${modelId}/${modelId}.fbm/鼻子.png`),
      bell: textureLoader.load(`/models/${modelId}/${modelId}.fbm/铃铛.png`),
      line: textureLoader.load(`/models/${modelId}/${modelId}.fbm/法线贴图.png`),
    };

    // 设置贴图颜色空间
    Object.values(textures).forEach(texture => {
      texture.colorSpace = THREE.SRGBColorSpace;
    });

    // 在fbx.traverse之前添加
    console.log('所有网格名称:');
    fbx.traverse(child => {
      if (child instanceof THREE.Mesh) {
        console.log('完整网格名称:', child.name);
      }
    });

    // 更可靠的检测方式
    fbx.traverse(child => {
      if ((child as any).isMesh) { // 替代 instanceof 检查
        console.log('网格类型:', child.type);
        console.log('网格名称:', child.name || '<未命名>');
        console.log('子级深度:', child.id);
      }
    });

    // 添加统计计数器
    let meshCount = 0;
    fbx.traverse(child => {
      if ((child as any).isMesh) meshCount++;
    });
    console.log(`共检测到 ${meshCount} 个网格`);



    // 将贴图应用到模型
    fbx.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // 确保法线计算正确
        child.geometry.computeVertexNormals();

        // 设置双面渲染，解决某些面反向问题
        child.material.side = THREE.DoubleSide;

        // 设置阴影
        child.castShadow = true;
        child.receiveShadow = true;

        // 获取映射后的部件名称
        const mappedName = MODEL_NAME_MAPPING[modelId]?.[child.name] || child.name;
        const meshName = mappedName.toLowerCase();

        // 根据网格名称应用不同贴图
        if (meshName.includes('body') || meshName.includes('身体')) {
          child.material = new THREE.MeshStandardMaterial({
            map: textures.body,
            roughness: 0.7,
            metalness: 0.2,
            side: THREE.DoubleSide,  // 双面渲染
            transparent: false,      // 确保不透明
            alphaTest: 0.5           // 处理半透明边缘
          });
        }
        else if (meshName.includes('head') || meshName.includes('头')) {
          child.material = new THREE.MeshStandardMaterial({
            map: textures.head,
            roughness: 0.7,
            metalness: 0.2
          });
        }
        else if (meshName.includes('eye') || meshName.includes('眼')) {
          child.material = new THREE.MeshStandardMaterial({
            map: textures.eyes,
            roughness: 0.5,
            metalness: 0.3
          });
        }
        else if (meshName.includes('nose') || meshName.includes('鼻')) {
          child.material = new THREE.MeshStandardMaterial({
            map: textures.nose,
            roughness: 0.6,
            metalness: 0.2
          });
        }
        else if (meshName.includes('bell') || meshName.includes('铃铛')) {
          child.material = new THREE.MeshStandardMaterial({
            map: textures.bell,
            roughness: 0.4,
            metalness: 0.6
          });
        }
        else if (meshName.includes('line') || meshName.includes('法线')) {
          child.material = new THREE.MeshStandardMaterial({
            map: textures.line,
            roughness: 0.4,
            metalness: 0.6
          });
        }
        // 对于其他部分
        else {
          console.log('未匹配的网格:', child.name);
          // 默认使用身体贴图
          child.material = new THREE.MeshStandardMaterial({
            map: textures.body,
            roughness: 0.7,
            metalness: 0.2
          });
        }

        console.log(`贴图应用到: ${child.name}`);
      }
    });

  }, [fbx, modelId]);

  return <primitive object={fbx} />;
}

// 模型选择器UI组件
function ModelSelector({ currentModel, onChange }: { currentModel: string, onChange: (modelId: string) => void }) {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 
                   md:bg-white/80 md:backdrop-blur-md rounded-full px-4 py-2 max-w-[90vw]">
      {/* 移动端下拉菜单 - 只在移动端显示 */}
      <div className="block md:hidden">
        <Select value={currentModel} onValueChange={onChange}>
          <SelectTrigger
            className="px-6 py-6 bg-[#3a2b23] text-museum-sand rounded-full shadow-lg 
               transition-colors duration-300 
                text-lg md:text-xl font-zhanku whitespace-nowrap"
          >
            <SelectValue
              placeholder="选择模型"
              className="placeholder:text-[#3a2b23]/60"
            />
          </SelectTrigger>
          <SelectContent
            position="popper"
            side="bottom"
            className="bg-white/90 text-museum-sand backdrop-blur-xl rounded-xl border border-[#3a2b23]/15
               shadow-lg max-h-[50vh] overflow-y-auto py-2 px-2
               animate-in fade-in slide-in-from-top-2"
          >
            {AVAILABLE_MODELS.map(model => (
              <SelectItem
                key={model.id}
                value={model.id}
                className="data-[state=active]:bg-[#3a2b23]/8 data-[state=checked]:bg-[#3a2b23]/15
                   text-[#3a2b23]/90 text-sm px-6 py-2 hover:bg-[#3a2b23]/5 rounded-xl
                   transition-colors duration-150 border-b border-[#3a2b23]/5 last:border-0"
              >
                {model.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 桌面端按钮组 - 只在桌面端显示 */}
      <div className="hidden md:flex gap-4 overflow-x-auto scrollbar-hide">
        {AVAILABLE_MODELS.map(model => (
          <button
            key={model.id}
            onClick={() => onChange(model.id)}
            className="px-6 py-3 bg-[#3a2b23] text-museum-sand rounded-full shadow-lg 
               transition-colors duration-300 
                text-lg md:text-xl font-zhanku whitespace-nowrap"
          >
            {model.name}
          </button>
        ))}
      </div>
    </div>
  );
}

// 添加一个场景组件，包含地面和环境元素
function Scene() {
  return (
    <>

      {/* 博物馆 */}
      < Museum />

      {/* 观景塔 */}
      < ViewTower />

      {/* 传统风格底座 */}
      < Base />

      {/* 装饰纹样底盘 */}
      < Baseplate />

      {/* 地面 - 模拟古代地砖 */}
      < Ground />

      {/* 传统装饰柱 - 东 */}
      < DecorativePillar position={[6, -1, -2]} />

      {/* 传统装饰柱 - 西 */}
      < DecorativePillar position={[-6, -1, -2]} />

      {/* 传统中式牌坊 - 背景 */}
      < MemorialArchway />

      {/* 古代亭子 - 右侧 */}
      < Pavilion />

      {/* 古代石桥 - 左侧 */}
      < StoneBridge />

      {/* 香炉 - 模型前方 */}
      < Censer />

      {/* 远景背景 - 传统山水画风格 */}
      < Background />

      {/* 远景山脉 - 左侧 */}
      < Mountain position={[-10, 2, -14]} opacity={0.6} args={[8, 7, 16, 1, true]} />

      {/* 远景山脉 - 右侧 */}
      < Mountain position={[10, 1, -14]} opacity={0.5} args={[10, 5, 16, 1, true]} />

      {/* 点缀小石狗装饰 - 左侧 */}
      < StoneDog position={[-3, -0.95, 2]} />

      {/* 点缀小石狗装饰 - 右侧 */}
      < StoneDog position={[3, -0.95, 2]} />

      {/* 添加远处的塔楼 - 远景点缀 */}
      < Tower />

      {/* 传统松树群 - 右前方 */}
      < TreeRight />

      {/* 传统松树群 - 左前方 */}
      < TreeLeft />

      {/* 传统灯笼 - 成对放置 */}
      < Lantern />

      {/* 云雾效果 - 远景装饰 */}
      < Cloud />

      {/* 更多远景山脉 - 层叠效果 */}
      < MountainBg />

      {/* 装饰云纹图案 - 地面上 */}
      < CloudPattern />

      {/* 景观石 - 右侧装饰 */}
      < LandscapeStone position1={[6, -1, 6]} position2={[0.8, 0.6, 0.3]} position3={[-0.5, 0.3, 0.5]} args1={[1.2]} args2={[0.7]} args3={[0.6]} />
      < LandscapeStone position1={[10, -1, 3]} position2={[0.8, 0.6, 0.3]} position3={[-0.5, 0.3, 0.5]} args1={[1.2]} args2={[0.7]} args3={[0.6]} />

      {/* 景观石 - 左侧装饰 */}
      < LandscapeStone position1={[-6, -1, 6]} position2={[0.6, 0.7, -0.2]} position3={[-0.7, 0.4, 0.3]} args1={[1]} args2={[0.6]} args3={[0.5]} />
      < LandscapeStone position1={[-10, -1, 3]} position2={[0.8, 0.6, 0.3]} position3={[-0.5, 0.3, 0.5]} args1={[1.2]} args2={[0.7]} args3={[0.6]} />
    </>
  );
}

export default function ModelViewPage() {
  // 添加状态来跟踪当前选择的模型
  const [currentModel, setCurrentModel] = useState('IP1');

  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#FBF8F1] to-[#F5F0E6]">
      {/* 添加模型选择器 */}
      <ModelSelector
        currentModel={currentModel}
        onChange={setCurrentModel}
      />

      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        shadows
      >
        {/* 柔和环境光 */}
        <ambientLight intensity={0.4} color="#FFF1DB" />

        {/* 主光源 - 模拟傍晚阳光 */}
        <directionalLight
          position={[5, 8, 3]}
          intensity={1.2}
          color="#FFE0B2"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        {/* 侧光源 - 增强轮廓感 */}
        <directionalLight
          position={[-3, 2, -3]}
          intensity={0.7}
          color="#E1BEE7"
        />

        {/* 点光源 - 增强模型关键部位亮度 */}
        <pointLight position={[-2, 3, 2]} intensity={0.8} color="#FFD54F" />

        {/* 环境贴图 - 使用中国传统风格环境 */}
        {/* <Environment preset="sunset" /> */}
        <Environment files="/models/venice_sunset_1k.hdr" />

        {/* 轻雾效果 - 增加传统山水画氛围 */}
        <fog attach="fog" args={["#FBF8F1", 15, 30]} />

        <Suspense fallback={null}>
          <Scene />
          <Model modelId={currentModel} />
        </Suspense>

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
          autoRotate={true}
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
}