import Image from "next/image";

export default function Distribution() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[rgb(251,248,241)] to-[rgb(245,240,230)]">
            <div className="container mx-auto px-4 py-8 xl:px-32">
                <h1 className="text-4xl font-zhanku text-[rgb(139,69,19)] mb-12 text-center">
                    石狗分布及置放
                </h1>

                <div className="article-content space-y-8">
                    {/* 分布概况 */}
                    <section className="bg-white/30 backdrop-blur-sm rounded-lg p-6 shadow-lg
                                    border border-[rgb(184,115,51)]/20 hover:border-[rgb(255,215,0)]/30
                                    transition-all duration-300">
                        <h2 className="text-2xl font-zhanku text-[rgb(139,69,19)] mb-6">
                            分布概况
                        </h2>
                        <div className="prose text-[rgb(47,53,66)]">
                            <p className="indent-8 leading-relaxed">
                                雷州城乡普遍奉祀石狗，至今仍有十分浓重的民俗风习，考古发现雷州城乡至今仍遗存数万只石狗。这些石狗千姿百态、神采各异、数量之多、分布之广实属罕见，这其中一个原因是历来石狗的雕置不受社会等级、不受贫富贵贱限制。雷州现有近2500条村庄几乎村村有石狗，石狗存量较少的村庄有四至六尊，多者达到30-40尊。
                            </p>
                        </div>
                    </section>

                    {/* 地域分布 */}
                    <section className="bg-white/30 backdrop-blur-sm rounded-lg p-6 shadow-lg
                                    border border-[rgb(184,115,51)]/20 hover:border-[rgb(255,215,0)]/30
                                    transition-all duration-300">
                        <h2 className="text-2xl font-zhanku text-[rgb(139,69,19)] mb-6">
                            地域分布
                        </h2>
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="w-full md:w-1/3 bg-gradient-to-br from-[rgb(139,69,19)]/10 to-[rgb(255,215,0)]/10 relative group overflow-hidden rounded-lg 
                                          shadow-lg hover:shadow-xl transition-shadow">
                                <Image
                                    src="/img/realDog/3.png"
                                    alt="地域分布示意图"
                                    width={300}
                                    height={400}
                                    className="w-full h-80 object-cover scale-105 transform transition-transform duration-500"
                                />
                            </div>
                            <div className="prose text-[rgb(47,53,66)] flex-1">
                                <p className="indent-8 leading-relaxed">
                                    在雷州半岛上，放眼古城门、村口、古道、巷口、门口、水口或古墓前，定会看到一尊尊或坐、或蹲、或伏，大小不一，形态各异的用玄武岩石雕刻而成的石狗。石狗遍布雷州各镇2500多条村庄，但不同时期的石狗分布区域还是有其特殊性。
                                </p>
                                <p className="indent-8 leading-relaxed">
                                    俚人风格的雷州石狗，主要分布在英利、覃斗及"三家一水"（杨家、唐家、纪家、企水）。就广义的雷州地域而言，雷州石狗的分布以雷城为中心，划出一个半径为100公里的圆，其内均是民间石狗存在的地域，甚至包括茂名市的一些区域，从圆心往外，民间石狗的存在密度趋减。就现行政区域的湛江市而言，徐闻、麻章、遂溪这三个闽南语系较为盛行的县域民间石狗的存在次于雷州，但还是有一定数量，坡头、廉江、吴川等粤语语系地域民间石狗的存在较少。
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 村庄分布 */}
                    <section className="bg-white/30 backdrop-blur-sm rounded-lg p-6 shadow-lg
                                    border border-[rgb(184,115,51)]/20 hover:border-[rgb(255,215,0)]/30
                                    transition-all duration-300">
                        <h2 className="text-2xl font-zhanku text-[rgb(139,69,19)] mb-6">
                            村庄分布
                        </h2>
                        <div className="prose text-[rgb(47,53,66)]">
                            <p className="indent-8 leading-relaxed">
                                在村庄里雷州石狗主要分布在乡村的村头、巷口、庙宇旁，以及房屋门前、水塘边。不同地域发现的石狗形态差异很大，区域间发展演变的序列特征比较明显，一般发现石狗的村庄建村年代都比较早，最迟也在清末民国时期。据不完全统计，雷州半岛遗留的石狗数万只。目前，雷州博物馆收集的石狗已有近1000只，大部分石狗散置乡野荒郊、村头巷尾，或掩埋地下或由村民自行保管或仍"原生态坚守"。
                            </p>
                        </div>
                    </section>

                    {/* 文化传播 */}
                    <section className="bg-white/30 backdrop-blur-sm rounded-lg p-6 shadow-lg
                                    border border-[rgb(184,115,51)]/20 hover:border-[rgb(255,215,0)]/30
                                    transition-all duration-300 mt-8">
                        <h2 className="text-2xl font-zhanku text-[rgb(139,69,19)] mb-6">
                            文化传播
                        </h2>
                        <div className="flex flex-col md:flex-row-reverse gap-6 items-center">
                            <div className="w-full md:w-1/3 bg-gradient-to-br from-[rgb(139,69,19)]/10 to-[rgb(255,215,0)]/10 relative group overflow-hidden rounded-lg 
                                          shadow-lg hover:shadow-xl transition-shadow">
                                <Image
                                    src="/img/realDog/4.png"
                                    alt="文化传播示意图"
                                    width={300}
                                    height={400}
                                    className="w-full h-80 object-cover scale-105 transform transition-transform duration-500"
                                />
                            </div>
                            <div className="prose text-[rgb(47,53,66)] flex-1">
                                <p className="indent-8 leading-relaxed">
                                    历史上民族部属的迁徙与商贸往来，各族民俗的文化传播，使雷州石狗文化对周边地区产生了深远的影响。蒋廷瑜《铜鼓史话》中提到"制造和使用云雷纹铜鼓的部族原是东汉时代的'乌浒人'，到两晋南北朝叫'俚人'或'俚僚'，到唐代'这些部族的绝大部分与汉族融合'成为壮族和汉族的一支，但也有一部分保留原来的民族特性，发展成为海南岛上的黎族'俚'、'黎'和'雷'的读音相近，也可以看到其中的密切关系"。
                                </p>
                                <p className="indent-8 leading-relaxed">
                                    何光岳《南蛮源流史》写有"自汉至唐宋时，有一部分俚人自雷州半岛陆续南迁至海南岛，成为黎族的一分支，称加茂黎"；"俚人迁到海南后，成为当地最早用犁的农耕民族"。说明了俚僚人迁徙海南与越南时途径广西、云南等地时传播留下了雷文化，至今海南岛的北边地区琼海、儋州与广西云南东南地区有奉祀石狗的习俗，这些地区的石狗造型简单且形体小数量少。环北部湾地域的石狗文化遗存，反映着民族迁徙的亲缘关系以及商贸交往、文化交流与社会民俗的相互引力。
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 置放位置 */}
                    <section className="bg-white/30 backdrop-blur-sm rounded-lg p-6 shadow-lg
                                    border border-[rgb(184,115,51)]/20 hover:border-[rgb(255,215,0)]/30
                                    transition-all duration-300">
                        <h2 className="text-2xl font-zhanku text-[rgb(139,69,19)] mb-6">
                            置放位置
                        </h2>
                        <div className="prose text-[rgb(47,53,66)]">
                            <p className="indent-8 leading-relaxed">
                                从雷州石狗调查小组的普查材料看，唐朝前的雷州石狗主要摆放在公共祭祀地、祠庙以及聚居村落附近；宋元石狗的置放位置扩展到田野、鱼塘、宅门、渡口、桥梁、村场、街道等地；明清石狗置放位置除了在村口、路边、巷头、门口、墙壁、塘边、河畔、田洋、山坡、宗祠寺庙、坟前等地方，还扩展到了码头、商铺、干道，甚至作为船只的碇石。
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}