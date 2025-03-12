"use client";

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import ModelFactory from './components/models/ModelFactory';

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

// Add a loading fallback component
function LoadingFallback({ setIsLoading }: { setIsLoading: (loading: boolean) => void }) {
  useEffect(() => {
    return () => {
      // When fallback unmounts, we know the model has loaded
      setIsLoading(false);
    };
  }, [setIsLoading]);
  
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="#8b7355" wireframe />
    </mesh>
  );
}

// 模型选择器UI组件 with loading state
function ModelSelector({ 
  currentModel, 
  onChange, 
  isLoading 
}: { 
  currentModel: string, 
  onChange: (modelId: string) => void,
  isLoading: boolean 
}) {
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
  const [loadingModels, setLoadingModels] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  
  // 添加模型加载完成的处理器
  const handleModelLoaded = (modelId: string) => {
    setLoadingModels(prev => ({...prev, [modelId]: true}));
    
    // 如果当前显示的模型已加载完成，则设置loading为false
    if (modelId === currentModel) {
      setIsLoading(false);
    }
  };
  
  // 修改模型切换处理器
  const handleModelChange = (modelId: string) => {
    if (modelId !== currentModel) {
      // 如果切换到未加载完成的模型，显示加载状态
      setIsLoading(!loadingModels[modelId]);
      setCurrentModel(modelId);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#FBF8F1] to-[#F5F0E6]">
      {/* 添加模型选择器 */}
      <ModelSelector
        currentModel={currentModel}
        onChange={handleModelChange}
        isLoading={isLoading}
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
        <Environment files="/models/venice_sunset_1k.hdr" />

        {/* 轻雾效果 - 增加传统山水画氛围 */}
        <fog attach="fog" args={["#FBF8F1", 15, 30]} />

        {/* Scene is outside Suspense to prevent it from reloading */}
        <Scene />
        
        {/* 替换 ModelFactory 为 AllModels */}
        <Suspense fallback={<LoadingFallback setIsLoading={setIsLoading} />}>
          <ModelFactory 
            activeModelId={currentModel} 
            onLoad={handleModelLoaded}
          />
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