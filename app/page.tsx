'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
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
    <div ref={containerRef} className="relative from-museum-stone/80 via-museum-sand/90 to-museum-cream">
      {/* Hero Section */}
      <div className="h-screen relative overflow-hidden bg-gradient-to-br">
        {/* Logo - 添加动画效果 */}
        <motion.div
          className="absolute top-8 left-12 z-30"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.3,
            type: "spring",
            stiffness: 120,
            damping: 10
          }}
        >
          <Image
            src="/logo.png"
            alt="Meta Relic Logo"
            width={200}
            height={87}
            className="hover:opacity-90 transition-opacity"
          />
        </motion.div>

        {/* 背景文化元素层 */}
        <div className="absolute inset-0">
          {/* 博物馆主图 */}
          <motion.div
            className="absolute right-[8%] -translate-x-1/2 bottom-[40vh] w-[30vw] h-[40vh] z-20"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 1.2 }}
            whileHover={{ y: -10, scale: 1.05, opacity: 0.6, transition: { duration: 0.2, ease: 'easeOut' } }}
          >
            <Image
              src="/img/l10.png"
              alt="雷州博物馆"
              fill
              className="object-contain mix-blend-luminosity"
            />
          </motion.div>

          {/* 左侧骑楼元素
          <motion.div
            className="absolute left-[5%] bottom-[35vh] w-[15vw] h-[20vh] z-20"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 0.4 }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -10, scale: 1.05, opacity: 0.8, transition: { duration: 0.2, ease: 'easeOut' } }}
          >
            <Image
              src="/img/l8.png"
              alt="雷州骑楼"
              fill
              className="object-contain drop-shadow-[5px_5px_10px_rgba(0,0,0,0.2)]"
            />
          </motion.div> */}

          {/* 新增三元塔元素 */}
          <motion.div
            className="absolute right-[15%] bottom-[33vh] w-[10vw] h-[25vh] z-20"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 0.6 }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -10, scale: 1.05, opacity: 0.8, transition: { duration: 0.2, ease: 'easeOut' } }}
          >
            <Image
              src="/img/l11.png"
              alt="雷州三元塔"
              fill
              className="object-contain mix-blend-overlay"
            />
          </motion.div>

          {/* 底部装饰石狗群 */}
          <div className="absolute bottom-0 w-full h-40 flex justify-center space-x-10 z-20">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <motion.div
                key={num}
                className="relative w-24 h-32 opacity-50 hover:opacity-100 transition-opacity"
                whileHover={{ y: -10, scale: 1.05, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 0.7 }}
                transition={{ type: 'spring', stiffness: 120 }}
              >
                <Image
                  src={`/img/l${num}.png`}
                  alt="石狗"
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </motion.div>
            ))}
          </div>

          {/* 底部装饰纹样 */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-[20vh] bg-[url('/img/l13.png')] opacity-30"
            initial={{ y: 0 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 1}}
          />
        </div>

        {/* 主标题内容 - 反向视差 */}
        <motion.div
          className="relative h-full flex items-center justify-center z-10"
          style={{ y: textY, opacity }}
        >
          <div className="text-center space-y-8">
            {/* 英文标题 */}
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-8xl font-bold mb-8 text-museum-ink"
            >
              Meta Relic
            </motion.h1>

            {/* 副标题 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl font-serif font-bold text-museum-ink/80"
            >
              探索雷州石狗文化的数字艺术传承
            </motion.div>

            {/* 开始探索按钮 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative z-40 pb-4"
            >
              {/* 按钮容器增加防护间距 */}

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
      <div className="min-h-screen bg-gradient-to-b text-museum-ink py-20 relative overflow-hidden">
        {/* 新增背景文化元素 */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* 左侧装饰元素 - 文化纹样 */}
          <motion.div
            className="absolute left-[2%] top-[10%] w-[60vw] h-[80vh]"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 0.5 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            viewport={{ margin: "-30%", once: true }}
          >
            <Image
              src="/img/l13.png"
              alt="文化纹样1"
              fill
              className="object-contain mix-blend-luminosity"
            />
          </motion.div>

          {/* 右侧装饰元素 - 文化纹样
          <motion.div
            className="absolute right-[2%] top-1/3 w-[60vw] h-[80vh]"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 0.2 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            viewport={{ margin: "-30%", once: true }}
          >
            <Image
              src="/img/l12.png"
              alt="文化纹样2"
              fill
              className="object-contain mix-blend-overlay blur-[1px]"
            />
          </motion.div> */}
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "图腾起源",
                content: "雷州石狗源于古代百越族的狗图腾崇拜。早期俚、瑶、僮、侗等少数民族都以不同动物为图腾，最终统一认同了狗作为最具代表性的图腾物。"
              },
              {
                title: "文化传承",
                content: "作为'天人合一'的象征，石狗造型融合了多种动物特征，体现了雷州半岛多民族文化的交融演变，是先民智慧的见证。"
              },
              {
                title: "数字永存",
                content: "通过NFT技术，我们致力于保护和传播这份珍贵的文化遗产，让古老的石狗文化在数字时代焕发新生。"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  scale: 0.95,
                  y: 20
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.215, 0.610, 0.355, 1.000]
                }}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                  transition: {
                    duration: 0.2,
                    ease: "easeOut"
                  }
                }}
                className="bg-museum-stone backdrop-blur-sm p-6 rounded-lg hover:bg-museum-stone/80 
                           cursor-pointer transition-all"
              >
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15 + 0.2,
                    ease: "easeOut"
                  }}
                  className="font-zhanku text-2xl mb-4 text-museum-cream"
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15 + 0.3,
                    ease: "easeOut"
                  }}
                  className="text-museum-cream"
                >
                  {item.content}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>

          {/* 历史渊源部分 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.645, 0.045, 0.355, 1]
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-32 text-center max-w-4xl mx-auto"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                ease: [0.215, 0.610, 0.355, 1.000]
              }}
              className="font-zhanku text-5xl mb-12 text-museum-ink bg-gradient-to-r from-museum-ink to-museum-stone bg-clip-text text-transparent"
            >
              历史渊源
            </motion.h2>
            <div className="text-museum-slate leading-relaxed space-y-8 text-lg">
              {[
                "雷州是世界上第三大雷电频发区，古老传说中雷神常派遣天狗去食太阳，'日蚀'现象就被称为'天狗食日'。",
                "先民对雷神的崇拜逐渐演变为对狗的强烈崇拜，形成了独特的石狗文化。",
                "古雷州是俚、瑶、僮、侗、僚、黎等少数民族集居之地，亦称'南蛮'族。由于人们的原始蒙昧与社会生产力的低劣，无法解释自然现象，认为是天的意志或万物有灵的驱使，为求生存与发展，便依托百物之形为图腾化作精神力量。",
                "早期的石狗造型以平头方脸、昂首朝天为特征，体现了古代'天人合一'的图腾意念。随着时代发展，石狗的造型逐渐统一为头部类狗躯部类狮的独特形态，展现了多民族文化交融的成果。"
              ].map((text, index) => (
                <motion.p
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 20,
                    scale: 0.98
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.215, 0.610, 0.355, 1.000]
                  }}
                  viewport={{ once: true }}
                  className="leading-loose"
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* 信仰起源部分 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-32 rounded-2xl p-12 bg-gradient-to-b from-museum-stone/5 to-museum-stone/10 backdrop-blur-sm"
          >
            <h2 className="text-4xl font-zhanku mb-12 text-museum-ink text-center">信仰起源</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-zhanku text-museum-ink border-b border-museum-stone/20 pb-4">
                  图腾演变
                </h3>
                <p className="text-museum-slate leading-relaxed">
                  起初俚人以狸为图腾，僚人以獠为图腾，僮人以獞为图腾，傜人则以犬为图腾。
                  这些部族的名字"狸、獠、獞、猺"都加犬旁，正是他们图腾的标志。
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-zhanku text-museum-ink border-b border-museum-stone/20 pb-4">
                  民族融合
                </h3>
                <p className="text-museum-slate leading-relaxed">
                  俚僚人对雷神的崇拜以及对狗图腾的信奉，在生产生活过程中逐步被古越族文化所同化。
                  因此，雷州石狗具有多兽之形的特征。
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* 文化传承部分 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-32 rounded-2xl p-12 bg-gradient-to-b from-transparent to-museum-stone/5"
          >
            <h2 className="text-4xl font-zhanku mb-12 text-museum-ink text-center">文化传承</h2>
            <div className="space-y-8 text-museum-slate max-w-4xl mx-auto">
              {[
                "古雷州百越族中的俚、僚、僮人都是黄帝的亲族，他们从黄河中下游南迁至岭海之滨，一部分移徙雷州成为雷州先民。",
                "关于对雷的崇拜、盛大的祭雷仪式，史料记载比比皆是。最著名的莫过于明代小说家冯梦龙在《警世通言》中把盛大的祭雷仪式'雷州换鼓'与广德埋藏、钱塘江潮、登州海市并列为'天下四绝'。",
                "天下一大奇观的雷州石狗，不仅表现了雷州先民精湛的雕刻工艺，还深刻反映了聚居在古雷州的少数民族和汉闽人共同以智慧和力量创造的辉煌历史。"
              ].map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="leading-loose text-lg"
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* 文化价值部分 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-32 mb-20 rounded-2xl p-12 bg-gradient-to-b from-museum-stone/10 to-transparent"
          >
            <h2 className="text-4xl font-zhanku mb-12 text-museum-ink text-center">文化价值</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  title: "民族融合的见证",
                  content: "雷州石狗文化见证了俚、瑶、僮、侗等少数民族的变迁与融合过程，展现了中国南方民族文化的多样性与包容性。"
                },
                {
                  title: "精神文明的传承",
                  content: "石狗不仅是图腾崇拜的产物，更承载着先民对自然的敬畏、对生活的期望，以及对文化传承的坚守。"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-6 p-8 rounded-xl bg-museum-stone/5 hover:bg-museum-stone/10 transition-all duration-300"
                >
                  <h3 className="text-2xl font-zhanku text-museum-ink">{item.title}</h3>
                  <p className="text-museum-slate leading-relaxed">{item.content}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div >
    </div >
  );
}
