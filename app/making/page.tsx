import Image from "next/image";

export default function Making() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[rgb(251,248,241)] to-[rgb(245,240,230)]">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-zhanku text-[rgb(139,69,19)] mb-12 text-center">
                    石狗雕制起始
                </h1>

                <div className="article-content space-y-8">
                    <section className="bg-white/30 backdrop-blur-sm rounded-lg p-6 shadow-lg
                                    border border-[rgb(184,115,51)]/20 hover:border-[rgb(255,215,0)]/30
                                    transition-all duration-300">
                        <h2 className="text-2xl font-zhanku text-[rgb(139,69,19)] mb-6">
                            最早出现年代
                        </h2>
                        <div className="flex flex-col md:flex-row md:gap-8 mb-8">
                            {/* 左侧图片 */}
                            <div className="w-full md:w-64 flex-shrink-0 mx-auto md:mx-0 mb-8">
                                <div className="bg-gradient-to-br from-[rgb(139,69,19)]/10 to-[rgb(255,215,0)]/10 
                                    rounded-lg shadow-lg hover:shadow-xl transition-all duration-300
                                    max-w-[300px] md:max-w-none mx-auto">
                                    <Image
                                        src="/img/realDog/3.png"
                                        alt="雷州石狗历史"
                                        width={300}
                                        height={400}
                                        className="rounded-lg object-cover w-full h-full transform scale-125 
                                                 transition-all duration-300"
                                    />
                                </div>
                            </div>
                            <div className="prose text-[rgb(47,53,66)]">
                                <p className="indent-8 leading-relaxed">
                                    推测雷州石狗最早出现的年代约在春秋时期。区域民族关系史的考古学研究，通过环南海的华南大陆、台湾、中南半岛、东南亚群岛地带相对集中分布的凸纽形块的整理分析，认为"凸纽形玦是新石器晚期至早期铁器时代出现于环南海地区的一类特殊的玦形佩饰，是反映该时空民族文化特殊性的重要物质文化因素之一。从考古学探索民族关系史的一般方法，得出的结论也与国内外学者已经关注的环南海甚至更大范围分布的有肩与有段石器、树皮布石拍等文化因素时空分布吻合"。从专家上述考古研究结果与雷州出土的新石器时期石器比较来看，新石器时期雷州已普遍使用石器，土著生产力的提高及民族文化的交流促进了信仰文化的发展，但初始雕制石狗是否出现于其时仍难以定论。
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white/30 backdrop-blur-sm rounded-lg p-6 shadow-lg
                                    border border-[rgb(184,115,51)]/20 hover:border-[rgb(255,215,0)]/30
                                    transition-all duration-300">
                        <h2 className="text-2xl font-zhanku text-[rgb(139,69,19)] mb-6">
                            历史考证
                        </h2>
                        <div className="prose text-[rgb(47,53,66)]">
                            <p className="indent-8 leading-relaxed">
                                我国"公元前3500-前3000年铜石并用时代，传统制石业在长期发展过程中已积累起来对石材性能的理解经验和切割、管钻、磨光工艺"，"青铜冶铸是从石器加工和制陶业中产生和发展起来的"，"我国铁器的开始使用……至迟是在春秋时期"。春秋时期，雷州匠人对雕刻的立体造型设计以及空间测量技术达到了一定的水平，只是受制于低效的生产工具。
                            </p>

                            <p className="indent-8 leading-relaxed">
                                据《海康县志》记载，南北朝古合州（雷州）州治旧址附近有"石狗坡"，说明南北朝之前已出现石狗。但是，种种迹象表明，石狗最早出现的年代在春秋时期的可能性较大：
                            </p>

                            <ul className="list-disc pl-6 space-y-4">
                                <li>雷州出土的新石器时期大型有肩石铲、石拍、印纹陶器、万家坝型器物等说明，其时雷州石器加工已有一定水平。到了春秋时期雷州生产力发展水平应该可以雕刻动物形象，出现石狗雕刻物是可能的；</li>
                                <li>春秋时期，雷州居民仍以土著为主体，强烈的狗图腾信仰驱使人们想方设法雕制图腾物满足氏族崇拜需求，突出氏族标记，精神动力驱使人们雕制图腾信仰物；</li>
                                <li>天人感应、巫术意念、相信鬼神是春秋时期的民俗特征（参阅祝穆的《方舆胜览》），从石狗的雕制理念、技法、造型所反映的民俗特征来寻找，发现存有春秋时期初始民俗特征的石狗雕刻物；</li>
                                <li>现存雷州汉代女石人雕像表明，秦汉时期雷州动物石雕工艺己很先进，汉代铜制造技术在雷州出现并得到发展。相应时代的石狗雕制水平己达一定高度，因而应存有较之年代更早的雷州石狗。</li>
                            </ul>

                            <p className="indent-8 leading-relaxed mt-6">
                                把普查发现与征集到的石狗归类分析，根据刻工粗拙、平头方脸，五官与肢体作象征性的雕刻，古朴、粗简、肃穆造型的石狗应属于约秦汉期间的遗存。
                            </p>

                            <p className="indent-8 leading-relaxed">
                                综合推测，约在春秋时期雷州土著开始用石头（玄武岩为主）雕刻狗的形象（称之为石狗）予敬祀，狗是他们的图腾崇拜动物，石狗成为他们的图腾崇拜物。从此产生并开始了漫长的雷州石狗信仰与雕刻的演变历程。
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}