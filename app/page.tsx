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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

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

  const autoplayRef = useRef(
    // 设置了 3000ms (3秒) 的轮播间隔 stopOnInteraction: false 确保用户交互后继续自动播放
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

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
      <div className="h-screen relative overflow-hidden bg-gradient-to-b from-[rgb(251,248,241)] to-[rgb(245,240,230)]">
        {/* 背景文化元素层 */}
        <div className="absolute inset-0">
          {/* 背景图片 - 调整混合模式和透明度 */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{ opacity: 0.12 }}
          >
            <Image
              src="/playbill/home.png"
              alt="文化元素"
              fill
              className="object-cover mix-blend-multiply"
            />
          </motion.div>

          {/* 底部装饰石狗群 */}
          <motion.div
            className="absolute bottom-0 w-full h-40 flex justify-center space-x-2 md:space-x-10 z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* 移动端显示3个，桌面端显示7个 */}
            {(windowSize.width < 768 ? [1, 2, 3] : [1, 2, 3, 4, 5, 6, 7]).map((num) => (
              <HoverCard key={num} openDelay={0} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <div
                    className="relative w-16 h-24 md:w-24 md:h-32 transition-all duration-300 cursor-pointer
                              hover:scale-110 hover:-translate-y-2"
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
                      className="object-contain drop-shadow-lg transition-all duration-300
                                hover:drop-shadow-xl"
                    />
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-[30rem] max-w-[90vw] p-0 
                                   bg-gradient-to-br from-[rgb(251,248,241)] to-[rgb(245,240,230)]
                                   border-2 border-[rgb(184,115,51)] rounded-xl shadow-xl
                                   transform transition-all duration-300">
                  <div className="flex flex-col sm:flex-row overflow-hidden">
                    {/* 移动端：图片+文案行 */}
                    <div className="sm:hidden flex flex-row p-4 border-b border-[rgb(184,115,51)]/20">
                      {/* 图片区域 */}
                      <div className="w-1/3 pr-2">
                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                          <Image
                            src={`/img/dogIp/IP${num}.png`}
                            alt={IP_TAGS[Math.min(num - 1, IP_TAGS.length - 1)].ipName}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>

                      {/* 文案区域 */}
                      <div className="w-2/3 pl-2 flex flex-col justify-center">
                        <h3 className="text-lg font-zhanku text-[rgb(139,69,19)] mb-2">
                          {IP_TAGS[Math.min(num - 1, IP_TAGS.length - 1)].ipName}
                        </h3>
                        <p className="text-xs text-[rgb(47,53,66)] leading-tight line-clamp-4">
                          {IP_TAGS[Math.min(num - 1, IP_TAGS.length - 1)].ipIntro}
                        </p>
                      </div>
                    </div>

                    {/* 桌面端左侧图片区域（保持原样） */}
                    <div className="hidden sm:flex sm:items-center w-1/3 p-4 bg-gradient-to-br from-[rgb(139,69,19)]/5 to-[rgb(184,115,51)]/5">
                      <div className="relative aspect-[3/4] w-full max-w-[150px] rounded-lg overflow-hidden 
                                    shadow-lg hover:shadow-xl transition-all duration-300">
                        <Image
                          src={`/img/dogIp/IP${num}.png`}
                          alt={IP_TAGS[Math.min(num - 1, IP_TAGS.length - 1)].ipName}
                          fill
                          className="object-contain md:object-cover transform hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    {/* 右侧内容区域 */}
                    <div className="w-full sm:w-2/3">
                      {/* 桌面端文案 */}
                      <div className="hidden sm:block p-6 space-y-3">
                        {/* IP名称 */}
                        <h3 className="text-2xl font-zhanku text-[rgb(139,69,19)]
                                     border-b-2 border-[rgb(255,215,0)] pb-2">
                          {IP_TAGS[Math.min(num - 1, IP_TAGS.length - 1)].ipName}
                        </h3>

                        {/* IP介绍 */}
                        <p className="text-sm text-[rgb(47,53,66)] leading-relaxed">
                          {IP_TAGS[Math.min(num - 1, IP_TAGS.length - 1)].ipIntro}
                        </p>

                        {/* 故事背景 */}
                        <div className="mt-2">
                          <h4 className="text-sm font-bold text-[rgb(184,115,51)] mb-2">故事背景</h4>
                          <p className="text-xs text-[rgb(47,53,66)] leading-relaxed
                                    bg-[rgb(255,215,0)]/5 p-3 rounded-lg">
                            {IP_TAGS[Math.min(num - 1, IP_TAGS.length - 1)].ipBg}
                          </p>
                        </div>
                      </div>

                      {/* 移动端故事背景 */}
                      <div className="sm:hidden p-4">
                        <h4 className="text-sm font-bold text-[rgb(184,115,51)] mb-2">故事背景</h4>
                        <p className="text-xs text-[rgb(47,53,66)] leading-relaxed
                                  bg-[rgb(255,215,0)]/5 p-3 rounded-lg">
                          {IP_TAGS[Math.min(num - 1, IP_TAGS.length - 1)].ipBg}
                        </p>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </motion.div>

          {/* 更新底部装饰纹样 */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-[20vh] bg-[url('/img/l13.png')] 
                       opacity-15 blur-[1px] mix-blend-multiply"
            initial={{ y: 0 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 1 }}
          />
        </div>

        {/* 主标题内容样式更新 */}
        <motion.div
          className="relative p-4 h-full flex items-center justify-center z-10"
          style={{ y: textY, opacity }}
        >
          <div className="text-center space-y-8">
            {/* 英文标题 */}
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="relative text-6xl md:text-8xl font-bold mb-4 font-['Cinzel']"
            >
              <span className="relative inline-block">
                {/* 浮雕阴影 */}
                <span className="absolute inset-0 text-[rgb(47,53,66)] 
                       [text-shadow:_2px_2px_0_rgb(139,69,19),4px_4px_0_rgb(184,115,51)]">
                  META RELIC
                </span>
                {/* 金属渐变 */}
                <span className="relative bg-gradient-to-b from-[rgb(255,215,0)] to-[rgb(139,69,19)] 
                       bg-clip-text text-transparent
                       [text-shadow:_1px_1px_2px_rgba(255,215,0,0.4)]">
                  META RELIC
                </span>
              </span>
            </motion.h1>

            {/* 副标题 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl font-serif font-bold text-[rgb(184,115,51)] 
                         mx-auto md:whitespace-nowrap"
            >
              <div className="md:inline-block">
                数字科技赋能传统
                <span className="hidden md:inline md:px-2 md:text-4xl">·</span>
              </div>
              <div className="md:inline-block">
                千年石狗焕发新生
              </div>
            </motion.div>

            {/* 开始探索按钮 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative z-40 pb-4"
            >
              <Link
                href="/nft"
                className="inline-block px-8 py-4 bg-gradient-to-r from-[rgb(139,69,19)] 
                         to-[rgb(184,115,51)] text-[rgb(251,248,241)] rounded-lg 
                         transition-all duration-300 transform hover:scale-105
                         shadow-lg hover:shadow-xl"
              >
                开始探索
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 文化介绍部分 */}
      <div className="min-h-screen py-20 relative overflow-hidden 
                      bg-gradient-to-b from-[rgb(245,240,230)] to-[rgb(251,248,241)]">
        {/* 新增背景文化元素 */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* 左侧装饰元素 - 文化纹样
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
          </motion.div> */}
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8"
          >
            {[
              {
                title: "图腾起源",
                content: "雷州石狗源于古代百越族的狗图腾崇拜。早期俚、瑶、僮、侗等少数民族都以不同动物为图腾，最终统一认同了狗作为最具代表性的图腾物。",
                bgColor: "from-[#c9a48e] to-[#b18b88]",
                borderColor: "#8d765e"
              },
              {
                title: "文化传承",
                content: "作为'天人合一'的象征，石狗造型融合了多种动物特征，体现了雷州半岛多民族文化的交融演变，是先民智慧的见证。",
                bgColor: "from-[#b99785] to-[#8d765e]",
                borderColor: "#b18b88"
              },
              {
                title: "数字永存",
                content: "通过NFT技术，我们致力于保护和传播这份珍贵的文化遗产，让古老的石狗文化在数字时代焕发新生。",
                bgColor: "from-[#bec3a9] to-[#8d765e]",
                borderColor: "#b99785"
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
                className={`
                  p-6 rounded-lg cursor-pointer transition-all duration-300
                  bg-gradient-to-br ${item.bgColor} bg-opacity-90
                  hover:bg-opacity-100 backdrop-blur-md
                  border-2 border-[${item.borderColor}]/30
                  hover:border-[${item.borderColor}]/50
                  shadow-lg hover:shadow-xl
                `}
              >
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15 + 0.2,
                    ease: "easeOut"
                  }}
                  className="font-zhanku text-2xl mb-4 text-white drop-shadow-md"
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
                  className="text-[#f5f5f5] leading-relaxed text-opacity-90
                             hover:text-opacity-100 transition-colors"
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
            className="mt-32 text-center max-w-4xl mx-auto 
                       bg-gradient-to-br from-[#c9a48e]/20 to-[#b99785]/30
                       rounded-2xl p-12 border-2 border-[#8d765e]/40 
                       shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <h2 className="font-zhanku text-5xl mb-12 
                           bg-gradient-to-r from-[#8d765e] to-[#695352] 
                           bg-clip-text text-transparent">
              历史渊源
            </h2>

            {/* 图文布局容器 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* 左侧文字 */}
              <div className="flex-1 text-left article-content">
                <div className="text-museum-slate leading-relaxed space-y-6">
                  <p>雷州是世界上第三大雷电频发区，古老传说中雷神常派遣天狗去食太阳，'日蚀'现象就被称为'天狗食日'。</p>
                  <p>先民对雷神的崇拜逐渐演变为对狗的强烈崇拜，形成了独特的石狗文化。</p>
                  <p>古雷州是俚、瑶、僮、侗、僚、黎等少数民族集居之地，亦称'南蛮'族。由于人们的原始蒙昧与社会生产力的低劣，无法解释自然现象，认为是天的意志或万物有灵的驱使。</p>
                </div>
              </div>

              {/* 右侧图片 */}
              <div className="md:w-60 flex-shrink-0">
                <div className="bg-gradient-to-br from-[rgb(139,69,19)]/10 to-[rgb(255,215,0)]/10 
                        rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  <Image
                    src="/img/realDog/1.png"
                    alt="雷州石狗历史"
                    width={400}
                    height={500}
                    className="rounded-lg object-cover w-full h-full transform scale-125 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* 信仰起源部分 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-32 max-w-4xl mx-auto 
                       bg-gradient-to-br from-[#bec3a9]/20 to-[#8d765e]/20
                       backdrop-blur-xl rounded-2xl p-12 
                       border-2 border-[#b99785]/30 shadow-lg"
          >
            <h2 className="text-5xl font-zhanku mb-12 text-[#645343] text-center">信仰起源</h2>

            {/* 图文布局容器 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* 左侧图片 */}
              <div className="md:w-64 flex-shrink-0 rounded-lg shadow-lg bg-gradient-to-br from-[black]/20 to-[black/10]/10">
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
                    <h3 className="text-3xl font-zhanku text-[#76634f] mb-4">图腾演变</h3>
                    <p className="text-museum-slate leading-relaxed">
                      起初俚人以狸为图腾，僚人以獠为图腾，僮人以獞为图腾，傜人则以犬为图腾。
                      这些部族的名字"狸、獠、獞、猺"都加犬旁，正是他们图腾的标志。
                    </p>
                  </div>
                  <div>
                    <h3 className="text-3xl font-zhanku text-[#76634f] mb-4">民族融合</h3>
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
          <div className="relative">
            {/* 新增装饰图片 */}
            <div className="absolute -right-32 md:-right-20 top-5 md:top-1/2 -translate-y-1/2 w-72 md:w-96 opacity-30
                          -z-10 transition-opacity duration-300">
              <Image
                src="/img/l10.png"
                alt="文化传承装饰"
                width={400}
                height={600}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* 原有文化传承区块 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative mt-32 max-w-4xl mx-auto rounded-2xl p-12 
                         bg-gradient-to-br from-[#c9a48e]/20 to-[#b18b88]/20
                         backdrop-blur-xl border-2 border-[#8d765e]/30 shadow-lg"
            >
              <h2 className="text-5xl font-zhanku mb-12 text-[#72604c] text-center">文化传承</h2>
              <div className="article-content space-y-8 text-museum-slate max-w-4xl mx-auto">
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
          </div>

          {/* 文化价值部分 - 深色毛玻璃效果 */}
          <div className="relative">
            {/* 新增装饰图片 */}
            <div className="absolute -left-10 md:-left-28 -top-28 md:-top-[70%] w-52 md:w-96 opacity-30
                          -z-10 transition-opacity duration-300">
              <Image
                src="/img/l11.png"
                alt="文化价值装饰"
                width={350}
                height={500}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* 原有文化价值区块 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative  mt-32 mb-20 rounded-2xl p-12 bg-black/10 backdrop-blur-xl 
                         border border-white/20 shadow-lg"
            >
              <h2 className="text-5xl font-zhanku mb-12 text-[#544738] text-center">文化价值</h2>
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
                    className="space-y-6 p-8 rounded-xl 
                               bg-gradient-to-br from-[#bec3a9]/30 to-[#b99785]/20
                               transition-all duration-300 
                               border-2 border-[#8d765e]/30 shadow-lg"
                  >
                    <h3 className="text-3xl font-zhanku text-[#6c5b48]">{item.title}</h3>
                    <p className="text-[#8d765e] leading-relaxed">{item.content}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* 在文化价值部分后添加NFT展示区域 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-32 mb-20 rounded-2xl p-12 bg-black/10 backdrop-blur-xl 
                       border border-white/20 shadow-lg"
          >
            <h2 className="text-5xl font-zhanku mb-12 text-[#6c5b48] text-center">数字藏品展示</h2>

            {/* NFT展示轮播 */}
            <div className="relative my-12">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[autoplayRef.current]}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <CarouselItem key={num} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                      <div className="relative h-[350px] rounded-2xl overflow-hidden group
                                    border-4 border-[rgb(184,115,51)] shadow-[0_0_15px_rgba(184,115,51,0.3)]
                                    hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]
                                    transition-all duration-300">
                        <Image
                          src={`/img/dogIp/IP${num}.png`}
                          alt={`石狗数字藏品${num}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <div className="p-6 text-white">
                            <h3 className="text-xl font-zhanku">
                              {IP_TAGS[Math.min(num - 1, IP_TAGS.length - 1)].ipName}
                            </h3>
                            <p className="text-sm mt-2 line-clamp-2">
                              {IP_TAGS[Math.min(num - 1, IP_TAGS.length - 1)].ipIntro}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex mx-2" />
                <CarouselNext className="hidden md:flex mx-2" />
              </Carousel>
            </div>

            <div className="text-center mt-8">
              <Link
                href="/nft"
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#45B1A3] to-[#4A4A4A] text-[#FFFFF0] rounded-lg 
                         transition-all duration-300 transform hover:scale-105"
              >
                探索全部藏品
              </Link>
            </div>
          </motion.div>
        </div>
      </div >
    </div >
  );
}
