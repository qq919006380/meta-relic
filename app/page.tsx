'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { NFT_TAGS } from './constants';
import Image from 'next/image';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 新的视差效果
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setIsLoaded(true);
    // 在客户端运行时获取窗口尺寸
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <div className="h-screen relative overflow-hidden bg-museum-sand">
        {/* 背景视差层 */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{ y }}
        >
          {[...Array(20)].map((_, i) => {
            // 使用 windowSize 而不是直接访问 window
            const randomX = Math.random() * (windowSize.width || 1000);
            const randomY = Math.random() * (windowSize.height || 800);
            
            const tag1 = NFT_TAGS[Math.floor(Math.random() * NFT_TAGS.length)];
            const tag2 = NFT_TAGS[Math.floor(Math.random() * NFT_TAGS.length)];
            
            return (
              <motion.div
                key={i}
                className="absolute text-6xl text-museum-ink/10"
                initial={{ 
                  x: randomX,
                  y: randomY,
                  rotate: 0,
                  scale: 0
                }}
                animate={{
                  x: randomX,
                  y: randomY,
                  rotate: 360,
                  scale: 1
                }}
                transition={{
                  duration: Math.random() * 10 + 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                {tag1 + tag2}
              </motion.div>
            );
          })}
        </motion.div>

        {/* 主标题内容 - 反向视差 */}
        <motion.div
          className="relative z-10 h-full flex items-center justify-center"
          style={{ y: textY, opacity }}
        >
          <div className="text-center">
            <Image
              src="/logo.png"
              alt="Meta Relic Logo"
              width={547}
              height={238}
              className=" "
            />
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-8xl font-bold mb-8 text-museum-ink"
            >
              Meta Relic
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl mb-12 text-museum-slate max-w-2xl mx-auto"
            >
              探索雷州石狗文化的数字艺术传承
            </motion.p>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                href="/nft"
                className="inline-block px-8 py-4 bg-museum-ink/80 text-museum-sand rounded-lg 
                         hover:bg-museum-stone transition-all duration-300 transform hover:scale-105"
              >
                开始探索
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 文化介绍部分 */}
      <div className="min-h-screen bg-museum-sand text-museum-ink py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "图腾起源",
                content: "雷州石狗信仰源于狗图腾崇拜，是古代百越族居民的精神寄托。"
              },
              {
                title: "文化传承",
                content: "融合了俚、瑶、僮、侗等少数民族的文化精髓，展现了独特的艺术价值。"
              },
              {
                title: "数字永存",
                content: "通过NFT技术，让这份珍贵的文化遗产得以数字化保存与传播。"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-museum-stone/60 backdrop-blur-sm p-6 rounded-lg hover:bg-museum-stone/80 
                         cursor-pointer transition-all"
              >
                <h3 className="text-2xl font-bold mb-4 text-museum-cream">{item.title}</h3>
                <p className="text-museum-cream">{item.content}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* 历史渊源部分 */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-20 text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-8 text-museum-ink">历史渊源</h2>
            <p className="text-museum-slate leading-relaxed">
              雷州石狗具有明显的图腾感生与"古巫术"意念。早期的石狗造型是平头方脸、昂首朝天，
              是古代"天人合一"的图腾感生与"古巫术"意念的崇拜物象。通过数字艺术的形式，
              我们致力于传承和发扬这份珍贵的文化遗产。
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
