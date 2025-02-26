'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IP_TAGS } from './constants';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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
    <div ref={containerRef} className="relative bg-museum-sand">
      {/* Hero Section */}
      <div className="h-screen relative overflow-hidden">
        {/* 背景文化元素层 */}
        <div className="absolute inset-0">
          {/* 背景图片 - 调整透明度和混合模式 */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{ opacity: 0.15 }} // 降低透明度
          >
            <Image
              src="/playbill/home.png"
              alt="文化元素"
              fill
              className="object-cover mix-blend-soft-light" // 添加混合模式
            />
          </motion.div>

          {/* 博物馆主图
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
          </motion.div> */}

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

          {/* 新增三元塔元素
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
          </motion.div> */}

          {/* 底部装饰石狗群 */}
          <div className="absolute bottom-0 w-full h-40 flex justify-center space-x-2 md:space-x-10 z-20">
            {/* 移动端显示3个，桌面端显示7个 */}
            {(windowSize.width < 768 ? [1, 2, 3] : [1, 2, 3, 4, 5, 6, 7]).map((num) => (
              <HoverCard key={num} openDelay={0} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <div
                    className="relative w-16 h-24 md:w-24 md:h-32 transition-opacity cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label={`查看石狗IP ${IP_TAGS[Math.min(num - 1, IP_TAGS.length - 1)].ipName}`}
                    // 添加触摸和键盘事件支持
                    onTouchStart={(e) => e.currentTarget.click()}
                  >
                    <Image
                      src={`/img/l${num}.png`}
                      alt="石狗"
                      fill
                      className="object-contain drop-shadow-lg"
                    />
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-[30rem] max-w-[90vw] p-0 bg-museum-sand border-museum-stone shadow-lg">
                  <div className="flex flex-col sm:flex-row">
                    {/* 左侧图片区域 - 垂直居中 */}
                    <div className="w-full sm:w-1/3 flex items-center justify-center rounded-lg bg-white m-2">
                      <Image
                        src={`/img/dogIp/IP${num}.png`}
                        alt={IP_TAGS[Math.min(num - 1, IP_TAGS.length - 1)].ipName}
                        width={150}
                        height={200}
                        className="object-contain h-full w-full rounded-lg shadow-xl p-2 py-2"
                      />
                    </div>

                    {/* 右侧文案区域 - 占据2/3宽度 */}
                    <div className="w-full sm:w-2/3 p-4 flex flex-col space-y-1">
                      {/* IP名称 */}
                      <h3 className="text-lg text-museum-ink font-zhanku">
                        {IP_TAGS[Math.min(num - 1, IP_TAGS.length - 1)].ipName}
                      </h3>

                      {/* IP介绍 */}
                      <p className="text-xs text-museum-slate">
                        {IP_TAGS[Math.min(num - 1, IP_TAGS.length - 1)].ipIntro}
                      </p>

                      {/* 故事背景 */}
                      <div>
                        <h4 className="text-xs font-semibold text-museum-stone mt-2">故事背景</h4>
                        <p className="text-xs text-museum-slate">
                          {IP_TAGS[Math.min(num - 1, IP_TAGS.length - 1)].ipBg}
                        </p>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>

          {/* 底部装饰纹样 - 调整透明度和模糊度 */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-[20vh] bg-[url('/img/l13.png')] opacity-20 blur-[2px]"
            initial={{ y: 0 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 1 }}
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
      <div className="min-h-screen py-20 relative overflow-hidden">
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
                className="bg-white/10 backdrop-blur-md p-6 rounded-lg 
                           hover:bg-white/15 cursor-pointer transition-all
                           border border-white/20 shadow-xl"
              >
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15 + 0.2,
                    ease: "easeOut"
                  }}
                  className="font-zhanku text-2xl mb-4 text-museum-ink"
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
                  className="text-museum-slate"
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
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-32 text-center max-w-4xl mx-auto bg-black/10 backdrop-blur-xl rounded-2xl p-12 border border-white/20 shadow-lg"
          >
            <h2 className="font-zhanku text-5xl mb-12 text-museum-ink bg-gradient-to-r from-museum-ink to-museum-stone bg-clip-text text-transparent">
              历史渊源
            </h2>
            
            {/* 图文布局容器 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* 左侧文字 */}
              <div className="flex-1 text-left">
                <div className="text-museum-slate leading-relaxed space-y-6">
                  <p>雷州是世界上第三大雷电频发区，古老传说中雷神常派遣天狗去食太阳，'日蚀'现象就被称为'天狗食日'。</p>
                  <p>先民对雷神的崇拜逐渐演变为对狗的强烈崇拜，形成了独特的石狗文化。</p>
                  <p>古雷州是俚、瑶、僮、侗、僚、黎等少数民族集居之地，亦称'南蛮'族。由于人们的原始蒙昧与社会生产力的低劣，无法解释自然现象，认为是天的意志或万物有灵的驱使。</p>
                </div>
              </div>
              
              {/* 右侧图片 */}
              <div className="md:w-64 flex-shrink-0">
                <Image
                  src="/img/realDog/1.png"
                  alt="雷州石狗历史"
                  width={256}
                  height={320}
                  className="rounded-lg shadow-lg object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* 信仰起源部分 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-32 max-w-4xl mx-auto bg-black/10 backdrop-blur-xl rounded-2xl p-12 border border-white/20 shadow-lg"
          >
            <h2 className="text-4xl font-zhanku mb-12 text-museum-ink text-center">信仰起源</h2>
            
            {/* 图文布局容器 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* 左侧图片 */}
              <div className="md:w-64 flex-shrink-0">
                <Image
                  src="/img/realDog/2.png"
                  alt="雷州石狗信仰"
                  width={256}
                  height={320}
                  className="rounded-lg shadow-lg object-cover"
                />
              </div>
              
              {/* 右侧文字 */}
              <div className="flex-1">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-zhanku text-museum-ink mb-4">图腾演变</h3>
                    <p className="text-museum-slate leading-relaxed">
                      起初俚人以狸为图腾，僚人以獠为图腾，僮人以獞为图腾，傜人则以犬为图腾。
                      这些部族的名字"狸、獠、獞、猺"都加犬旁，正是他们图腾的标志。
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-zhanku text-museum-ink mb-4">民族融合</h3>
                    <p className="text-museum-slate leading-relaxed">
                      俚僚人对雷神的崇拜以及对狗图腾的信奉，在生产生活过程中逐步被古越族文化所同化。
                      因此，雷州石狗具有多兽之形的特征。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 文化传承部分 - 深色毛玻璃效果 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-32 rounded-2xl p-12 bg-black/10 backdrop-blur-xl 
                       border border-white/20 shadow-lg"
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

          {/* 文化价值部分 - 深色毛玻璃效果 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-32 mb-20 rounded-2xl p-12 bg-black/10 backdrop-blur-xl 
                       border border-white/20 shadow-lg"
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
                  className="space-y-6 p-8 rounded-xl bg-white/5 backdrop-blur-lg
                             hover:bg-white/10 transition-all duration-300 
                             border border-white/20 shadow-lg"
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
