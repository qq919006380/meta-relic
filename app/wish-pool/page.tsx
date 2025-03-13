"use client";

import React, { Suspense, useRef, useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import Butterfly from './components/Butterfly';
import FloatingPetal from './components/FloatingPetal';
import Grass from './components/Grass';
import Rock from './components/Rock';
import Tree from './components/Tree';
import LotusFlower from './components/LotusFlower';
import LotusLeaf from './components/LotusLeaf';
import LotusGroup from './components/LotusGroup';
import Mountain from './components/Mountain';
import Temple from './components/Temple';
import WishPool from './components/WishPool';
import WishCoin from './components/WishCoin';
import WishDialogComponent from './components/WishDialogComponent';
import { STONE_DOGS } from '../constants';

interface CompletedWish {
  id: number;
  dogId: string;
  dogName: string;
  wish: string;
  name: string;
  date: string;
  response: string;
}

// 类型定义
interface StoneDog {
  id: string;
  name: string;
  description: string;
  modelId: string;
}

// 调用deepseek API
async function callDeepSeekAPI(messages: any[]) {
  try {
    const response = await fetch('/api/deepseek', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    return null;
  }
}

// 简化的场景组件
function WishPoolScene({ onCoinThrow }: { onCoinThrow: () => void }) {
  // 定义池子半径，用于避免物体生成在池中
  const POOL_RADIUS = 6;

  // 判断位置是否在池子范围内
  const isInPoolArea = (x: number, z: number, buffer = 0) => {
    return Math.sqrt(x * x + z * z) < (POOL_RADIUS + buffer);
  };

  // 生成池外随机位置
  const generateOutsidePoolPosition = (maxDistance: number, buffer = 0) => {
    let x, z;
    do {
      x = (Math.random() - 0.5) * maxDistance * 2;
      z = (Math.random() - 0.5) * maxDistance * 2;
    } while (isInPoolArea(x, z, buffer));

    return [x, 0, z] as [number, number, number];
  };

  // 使用useMemo缓存随机生成的元素
  const trees = React.useMemo(() =>
    [...Array(20)].map((_, i) => (
      <Tree
        key={i}
        position={generateOutsidePoolPosition(30, 1)}
        scale={0.8 + Math.random() * 0.4}
      />
    ))
    , []);

  const rocks = React.useMemo(() =>
    [...Array(15)].map((_, i) => (
      <Rock
        key={i}
        position={generateOutsidePoolPosition(20, 1)}
        scale={0.5 + Math.random() * 1}
      />
    ))
    , []);

  const grasses = React.useMemo(() =>
    [...Array(100)].map((_, i) => (
      <Grass
        key={i}
        position={generateOutsidePoolPosition(25, 1)}
      />
    ))
    , []);

  // 修改水池中静态硬币的位置和材质
  const coins = React.useMemo(() =>
    [...Array(100)].map((_, i) => {
      const radius = Math.random() * 3.5;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const scale = 0.1 + Math.random() * 0.15;
      const rotation = Math.random() * Math.PI;

      return (
        <mesh
          key={i}
          position={[x, 0.4, z]} // 提高位置，使其更接近水面
          rotation={[0, 0, rotation]}
          scale={[scale, scale, scale]}
          castShadow
          receiveShadow
        >
          <cylinderGeometry args={[1, 1, 0.1, 16]} />
          <meshStandardMaterial
            color={Math.random() > 0.3 ? "#FFD700" : "#E6BE8A"}
            metalness={0.9}
            roughness={0.1}
            emissive={Math.random() > 0.5 ? "#FFD700" : "#000000"} // 增加发光硬币的比例
            emissiveIntensity={0.4} // 增强发光强度
          />
        </mesh>
      );
    })
    , []);

  // 修改漂浮愿望的位置和材质
  const wishes = React.useMemo(() =>
    [...Array(50)].map((_, i) => {
      const radius = Math.random() * 3.5;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      // const y = -0.5 + Math.random() * 0.1; // 提高位置
      const rotation = Math.random() * Math.PI * 2;

      return (
        <Float
          key={i}
          speed={1}
          rotationIntensity={1}
          floatIntensity={0.8} // 增强浮动效果
          position={[x, 0.6, z]}
        >
          <mesh rotation={[-Math.PI / 2, 0, rotation]} castShadow>
            <planeGeometry args={[0.3, 0.3]} />
            <meshStandardMaterial
              color="#f5e6cc"
              transparent
              opacity={0.95} // 提高不透明度
              side={THREE.DoubleSide}
              emissive="#f5e6cc"
              emissiveIntensity={0.3} // 增强发光效果
            />
          </mesh>
        </Float>
      );
    })
    , []);

  // 蝴蝶
  const butterfly = React.useMemo(() => (
    [...Array(5)].map((_, i) => (
      <Butterfly
        key={`butterfly-${i}`}
        position={[
          Math.sin(i * Math.PI * 0.4) * 6,
          1.5 + Math.random(),
          Math.cos(i * Math.PI * 0.4) * 6
        ]}
      />
    ))
  ), []);

  // 花瓣
  const petal = React.useMemo(() => (
    [...Array(20)].map((_, i) => (
      <FloatingPetal
        key={`petal-${i}`}
        position={[
          (Math.random() - 0.5) * 12,
          2 + Math.random() * 2,
          (Math.random() - 0.5) * 12
        ]}
      />
    ))
  ), []);

  return (
    <>
      {/* 天空和环境 */}
      <Environment files="/models/venice_sunset_1k.hdr" />
      {/* <fog attach="fog" args={['#FBF8F1', 15, 30]} /> */}

      {/* 地面 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#E8DFD3" />
      </mesh>

      {/* 远景山脉 */}
      <Mountain position={[-20, -1, -20]} scale={4} />
      <Mountain position={[-15, -1, -25]} scale={3.5} />
      <Mountain position={[20, -1, -20]} scale={4.5} />

      {/* 使用缓存的随机元素 */}
      {trees}
      {rocks}
      {grasses}
      {/* 使用缓存的硬币和纸条 */}
      {coins}
      {wishes}
      {butterfly}
      {petal}

      {/* 添加寺庙 - 放在许愿池后面 */}
      <Temple position={[0, -0.1, -15]} scale={1.2} />

      {/* 中央许愿池 */}
      <WishPool />

      {/* 添加莲花组 - 在水面上分布几组 */}
      <LotusGroup position={[-2.5, 0, -2]} />
      <LotusGroup position={[2, 0, 2.5]} />
      <LotusGroup position={[-2.5, 0, 2.5]} />
      <LotusGroup position={[2.5, 0, -2.5]} />


      {/* 单独添加几朵莲花和莲叶，增加变化 */}
      <LotusFlower position={[0, 0.6, 0]} scale={1.2} bloomLevel={2} />
      <LotusLeaf position={[1, 0.6, 0]} scale={1.5} rotation={Math.PI / 4} />
      <LotusLeaf position={[-1, 0.6, 0]} scale={1.3} rotation={-Math.PI / 4} />
      <LotusLeaf position={[0, 0.6, 1.5]} scale={1.4} rotation={Math.PI} />


      {/* 增强环境光效果 */}
      <ambientLight intensity={0.5} color="#FFF1DB" />
      <directionalLight
        position={[5, 8, 3]}
        intensity={1.4}
        color="#FFE0B2"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* 添加点光源制造氛围 */}
      <pointLight position={[0, 3, 0]} intensity={1.5} color="#FFD54F" distance={15} />
      <pointLight position={[8, 2, 8]} intensity={1} color="#FFA07A" distance={10} />
      <pointLight position={[-8, 2, -8]} intensity={1} color="#FFA07A" distance={10} />
    </>
  );
}

// 1. 使用React.memo包装场景组件，避免不必要的重渲染
const MemoizedWishPoolScene = React.memo(WishPoolScene);
// 5. 分离对话框组件并使用React.memo
const WishDialog = React.memo(WishDialogComponent);

// 2. 分离表单状态和3D场景状态
export default function WishPoolPage() {
  // 3D场景相关状态
  const [showCoin, setShowCoin] = useState(false);
  const [isWishComplete, setIsWishComplete] = useState(false);
  // 添加新状态来存储API返回的响应
  const [wishResponse, setWishResponse] = useState<string>('');
  // 添加状态控制愿望列表的显示
  const [showWishList, setShowWishList] = useState(false);
  // 添加状态控制动画
  const [showAddAnimation, setShowAddAnimation] = useState(false);
  const [animationPosition, setAnimationPosition] = useState({ x: 0, y: 0 });
  // 添加加载状态
  const [isLoading, setIsLoading] = useState(false);
  // 添加API调用标记，防止重复调用
  const isApiCallingRef = useRef(false);

  // 设置愿望上限
  const WISH_LIMIT = 20;

  // 从localStorage加载已完成的愿望
  const [completedWishes, setCompletedWishes] = useState<CompletedWish[]>([]);
  const [showLimitWarning, setShowLimitWarning] = useState(false);

  // 使用useEffect在客户端加载localStorage数据
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedWishes = localStorage.getItem('completedWishes');
      if (savedWishes) {
        setCompletedWishes(JSON.parse(savedWishes));
      }
    }
  }, []); // 只在组件挂载时运行

  // 当completedWishes变化时，保存到localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('completedWishes', JSON.stringify(completedWishes));
    }
  }, [completedWishes]);

  // 表单相关状态 - 使用useRef代替useState减少重渲染
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDog, setSelectedDog] = useState<StoneDog>(STONE_DOGS[0]);
  const wishRef = useRef('');
  const nameRef = useRef('');
  const sidebarRef = useRef<HTMLDivElement>(null);

  // 处理许愿
  const handleMakeWish = () => {
    if (!wishRef.current.trim()) return;

    // 检查是否达到愿望上限
    if (completedWishes.length >= WISH_LIMIT) {
      setShowLimitWarning(true);
      setTimeout(() => setShowLimitWarning(false), 3000);
      // 关闭对话框，让警告可见
      setIsDialogOpen(false);
      return;
    }

    // 显示投币动画
    setShowCoin(true);

    // 关闭对话框
    setIsDialogOpen(false);
  };

  // 投币动画完成 - 修改为等API调用成功后再添加愿望
  const handleCoinAnimationComplete = useCallback(async () => {
    // 防止重复调用API
    if (isApiCallingRef.current) return;
    isApiCallingRef.current = true;

    setShowCoin(false);
    setIsWishComplete(true);
    setIsLoading(true); // 开始加载

    // 准备新愿望对象，但暂不添加到列表
    const newWish = {
      id: Date.now(),
      dogId: selectedDog.id,
      dogName: selectedDog.name,
      wish: wishRef.current,
      name: nameRef.current || '匿名',
      date: new Date().toLocaleDateString('zh-CN'),
      response: '' // 新增属性用于存储API响应
    };

    // 调用API获取个性化响应
    try {
      const messages = [
        { role: "system", content: "你是一位古老的石狗守护神，负责守护人们的愿望。请用简短优美的语言回应这个愿望，不超过30个字。语气要温暖、神秘且充满希望。" },
        { role: "user", content: `我的愿望是：${wishRef.current}，我选择了${selectedDog.name}作为守护者。` }
      ];

      const response = await callDeepSeekAPI(messages);
      if (response && response.content) {
        newWish.response = response.content;
        setWishResponse(response.content);
      } else {
        // 如果API调用失败，使用默认响应
        const defaultResponse = `您的心愿已投入许愿池，由${selectedDog.name}守护。`;
        newWish.response = defaultResponse;
        setWishResponse(defaultResponse);
      }

      // API调用成功后，检查是否有重复愿望，然后添加到列表
      setCompletedWishes(prev => {
        // 检查是否已经存在相同内容的愿望
        const exists = prev.some(wish =>
          wish.wish === newWish.wish &&
          wish.dogId === newWish.dogId
        );
        if (exists) return prev;

        // 触发添加动画
        if (sidebarRef.current) {
          const rect = sidebarRef.current.getBoundingClientRect();
          setAnimationPosition({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          });
          setShowAddAnimation(true);
          setTimeout(() => setShowAddAnimation(false), 1000);
        }

        return [newWish, ...prev];
      });

    } catch (error) {
      console.error('获取愿望响应失败:', error);
      const defaultResponse = `您的心愿已投入许愿池，由${selectedDog.name}守护。`;
      newWish.response = defaultResponse;
      setWishResponse(defaultResponse);

      // 即使API调用失败，也添加愿望到列表
      setCompletedWishes(prev => {
        const exists = prev.some(wish =>
          wish.wish === newWish.wish &&
          wish.dogId === newWish.dogId
        );
        if (exists) return prev;
        return [newWish, ...prev];
      });
    } finally {
      setIsLoading(false); // 结束加载
      isApiCallingRef.current = false; // 重置API调用标记
    }

    // 重置状态
    setTimeout(() => {
      setIsWishComplete(false);
      setWishResponse('');
    }, 5000); // 延长显示时间，让用户有足够时间阅读响应
  }, [selectedDog, wishRef, nameRef]);

  // 删除愿望
  const handleDeleteWish = (id: number) => {
    setCompletedWishes(prev => prev.filter(wish => wish.id !== id));
  };

  // 4. 使用useCallback优化事件处理函数
  const handleWishChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    wishRef.current = e.target.value;
  }, []);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    nameRef.current = e.target.value;
  }, []);

  const handleDogSelect = useCallback((dog: StoneDog) => {
    setSelectedDog(dog);
  }, []);

  // 切换愿望列表显示
  const toggleWishList = useCallback(() => {
    setShowWishList(prev => !prev);
  }, []);

  return (
    <div className="w-full h-screen relative bg-gradient-to-b from-[#FBF8F1] to-[#F5F0E6] overflow-hidden">
      {/* 3D 场景 */}
      <Canvas
        camera={{ position: [5, 5, 10], fov: 45 }}
        shadows
        className="absolute inset-0"
      >
        {/* 场景光源 */}
        <ambientLight intensity={0.4} color="#FFF1DB" />
        <directionalLight
          position={[5, 8, 3]}
          intensity={1.2}
          color="#FFE0B2"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[0, 3, 0]} intensity={1.2} color="#FFD54F" distance={10} />

        {/* 环境和雾效 */}
        <Environment files="/models/venice_sunset_1k.hdr" />
        <fog attach="fog" args={["#FBF8F1", 15, 30]} />

        <Suspense fallback={null}>
          {/* 使用记忆化的场景组件 */}
          <MemoizedWishPoolScene
            onCoinThrow={() => setShowCoin(true)}
          />

          {/* 投币动画 */}
          {showCoin && (
            <WishCoin
              position={[0, 2, 0]}
              onAnimationComplete={handleCoinAnimationComplete}
            />
          )}
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={35}
          maxPolarAngle={Math.PI / 2 - 0.1}
          autoRotate={!isDialogOpen}
          autoRotateSpeed={0.2}
        />
      </Canvas>

      {/* 侧边愿望列表 */}
      <motion.div
        ref={sidebarRef}
        className="fixed top-15 right-0 bottom-0 h-[92vh] w-full md:w-80 bg-white/90 backdrop-blur-md shadow-lg z-10 overflow-hidden"
        initial={{ x: '100%' }}
        animate={{ x: showWishList ? '0%' : '100%' }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="p-6 space-y-4 h-full flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-zhanku text-[#3a2b23]">我的愿望</h3>
            <button
              onClick={toggleWishList}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#8B4513]/10 text-[#8B4513] hover:bg-[#8B4513]/20 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-between bg-[#f8f5f0] px-3 py-2 rounded-lg">
            <span className="text-[#5d4037] font-medium">愿望总数</span>
            <span className="text-[#8B4513] font-bold">{completedWishes.length}/{WISH_LIMIT}</span>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <div className="space-y-3">
              {completedWishes.length === 0 ? (
                <div className="text-center py-8 text-[#8d765e]">
                  <p>还没有许下愿望</p>
                  <p className="text-sm mt-2">点击"许下心愿"按钮开始</p>
                </div>
              ) : (
                completedWishes.map(w => (
                  <div
                    key={w.id}
                    className="text-sm text-[#5d4037] bg-[#f8f5f0] p-3 pl-4 pr-10 rounded-lg border-l-4 border-[#8B4513] hover:shadow-md transition-shadow relative"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#8B4513]"></div>
                        <span className="font-medium">{w.name}</span>
                      </div>
                      <span className="text-xs text-[#8d765e] bg-white/50 px-2 py-0.5 rounded-full">
                        {w.date}
                      </span>
                    </div>
                    <p className="pl-5 py-1">{w.wish}</p>
                    <p className="pl-5 py-1 text-[#5d4037] italic text-xs">{w.response}</p>
                    <div className="text-xs text-[#8d765e] mt-1 flex justify-between items-center">
                      <span className="pl-5">由 <span className="text-[#8B4513] font-medium">{w.dogName}</span> 守护</span>
                      <span className="text-[#8B4513]/70 text-xs">#{w.id.toString().slice(-4)}</span>
                    </div>

                    {/* 删除按钮 */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteWish(w.id);
                      }}
                      className="absolute top-3 right-3 w-7 h-7 rounded-md bg-[#f8f0e3] border border-[#8B4513]/30 flex items-center justify-center text-[#8B4513] hover:bg-[#8B4513]/10 transition-colors"
                      title="删除愿望"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 侧边栏触发按钮 - 无论是否有愿望都显示 */}
      {!showWishList && (
        <motion.button
          onClick={toggleWishList}
          className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-[#8B4513] text-white py-3 px-2 rounded-l-lg shadow-lg z-10"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <div className="writing-vertical text-sm mt-2">我的愿望</div>
            {completedWishes.length > 0 && (
              <div className="flex items-center justify-center w-6 h-6 bg-white text-[#8B4513] rounded-full text-xs mt-2 font-bold">
                {completedWishes.length}
              </div>
            )}
          </div>
        </motion.button>
      )}

      {/* 界面元素 */}
      <div className="absolute top-16 inset-0 pointer-events-none flex flex-col items-center justify-between p-6">
        {/* 顶部标题 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg pointer-events-auto"
        >
          <h1 className="text-2xl md:text-3xl font-zhanku text-[#3a2b23]">
            石狗许愿池
          </h1>
        </motion.div>

        {/* 中间区域 - 愿望完成通知或加载状态 */}
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 backdrop-blur-md px-8 py-6 rounded-xl shadow-xl max-w-md"
          >
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#8B4513] mb-3"></div>
              <h2 className="text-xl font-zhanku text-[#3a2b23] mb-2">
                {selectedDog.name}正在守护您的愿望...
              </h2>
              <p className="text-[#5d4037] text-center">
                请稍候，您的心愿正在被石狗守护神接收
              </p>
            </div>
          </motion.div>
        ) : isWishComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 backdrop-blur-md px-8 py-6 rounded-xl shadow-xl max-w-md"
          >
            <h2 className="text-xl font-zhanku text-[#3a2b23] mb-2">
              愿望已被{selectedDog.name}接收！
            </h2>
            <p className="text-[#5d4037]">
              {wishResponse || `您的心愿已投入许愿池，由${selectedDog.name}守护。`}
            </p>
            <div className="mt-3 text-xs text-[#8d765e] italic">
              - {selectedDog.name}
            </div>
          </motion.div>
        )}

        {/* 愿望上限警告 */}
        {showLimitWarning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 px-8 py-6 rounded-xl shadow-xl max-w-md"
          >
            <h2 className="text-xl font-medium mb-2">愿望数量已达上限！</h2>
            <p>您最多可以保存 {WISH_LIMIT} 条愿望，请删除一些旧愿望后再试。</p>
          </motion.div>
        )}

        {/* 底部按钮 */}
        <div className="w-full max-w-4xl flex flex-col md:flex-row justify-center items-center gap-4 pointer-events-auto">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            onClick={() => setIsDialogOpen(true)}
            className="px-6 py-3 bg-[#8B4513] text-white rounded-full shadow-lg 
                      hover:bg-[#A0522D] transition-colors duration-300 
                      text-lg md:text-xl font-zhanku"
          >
            许下心愿
          </motion.button>
        </div>
      </div>

      {/* 许愿对话框 - 使用React.memo优化 */}
      <WishDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedDog={selectedDog}
        onDogSelect={handleDogSelect}
        onWishChange={handleWishChange}
        onNameChange={handleNameChange}
        onSubmit={handleMakeWish}
      />

      {/* 添加CSS样式 */}
      <style jsx global>{`
        .writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: upright;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.4);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 69, 19, 0.5);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 69, 19, 0.7);
        }
      `}</style>
    </div>
  );
}