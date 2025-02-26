import Image from 'next/image';

export default function Origin() {
  return <div className="container mx-auto px-4 py-8 prose prose-stone max-w-4xl">
    <h1 className="text-4xl font-bold mb-8">雷州石狗信仰源流</h1>

    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">图腾崇拜的起源</h2>
      <div className="flex flex-col md:flex-row gap-4 items-start mb-4">
        <Image 
          src="/img/realDog/1.png" 
          alt="雷州石狗信仰源流" 
          width={240} 
          height={320} 
          className="rounded-lg shadow-md mx-auto md:mx-0"
        />
        <div className="flex-1">
          <p className="mb-3">
            雷州石狗源于古代百越族的狗图腾崇拜。在现存研究资料中，其起源可追溯至唐朝之前的古百越族居民。图腾文化是人类早期社会组织、风俗习惯和宗教信仰的重要体现，在雷州半岛这片土地上留下了深远的印记。
          </p>
          <p>
            古雷州是俚、瑶、僮、侗、僚、黎等少数民族的聚居地，这里的先民们以其独特的智慧认知世界。由于生产力水平的限制，他们无法解释诸多自然现象，便将万物赋予灵性，以此寻求生存与发展的力量。在众多图腾物中，狗最终成为了这片土地上多个民族共同认同的象征。
          </p>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">多元文化的融合</h2>
      <div className="flex flex-col md:flex-row-reverse gap-4 items-start mb-4">
        <Image 
          src="/img/l1.png" 
          alt="雷州石狗信仰源流" 
          width={200} 
          height={260} 
          className="rounded-lg shadow-md mx-auto md:mx-0"
        />
        <div className="flex-1">
          <p className="mb-3">
            雷州土著民族以农耕守猎为生，因此选择了具有保护农作物和狩猎能力的动物作为图腾。最初，不同部族有着各自的图腾崇拜：俚人以狸为图腾，僚人以獠为图腾，僮人以獞为图腾，傜人则以犬为图腾。这些部族的名字都加上了"犬"字旁，正是其图腾信仰的写照。
          </p>
          <p>
            随着生产方式的统一，这些部族逐渐以狗作为共同的图腾象征。值得注意的是，早期雷州石狗的造型融合了多种动物的特征，如猫的灵巧、青蛙的繁衍象征等。这种多元的形态特征，正是不同民族文化交融的见证。
          </p>
        </div>
      </div>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">自然崇拜与信仰演变</h2>
      <p>
        雷州石狗崇拜的形成与当地独特的自然环境密不可分。作为世界第三大雷电频发区，雷州半岛的先民对雷电现象产生了强烈的敬畏之情。在古老的传说中，雷神派遣天狗吞食太阳以保护万物，因此"日食"现象被称为"天狗食日"，体现了先民对自然现象的独特解读。
      </p>
      <p>
        这种对雷神的崇拜逐渐与狗图腾崇拜相融合，形成了独特的石狗祭祀文化。明代小说家冯梦龙在《警世通言》中记载的"雷州换鼓"祭雷仪式，与广德埋藏、钱塘江潮、登州海市并称为"天下四绝"，足见其文化影响之深远。这种祭祀传统延续至今，成为了雷州文化的重要组成部分。
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">文化传承与艺术价值</h2>
      <p>
        雷州石狗是先民智慧的结晶，其造型既有实用功能，又蕴含着丰富的文化内涵。早期石狗以平头方脸、昂首朝天为特征，体现了古代"天人合一"的哲学思想。这种造型特征不仅展现了先民高超的雕刻技艺，更反映了他们对自然的敬畏与理解。
      </p>
      <p>
        随着时代发展，石狗的形态逐渐统一为头部似狗、躯体似狮的独特造型，这种演变过程展现了多元文化交融的成果。今天，雷州石狗不仅是一种民间艺术形式，更是中国南方少数民族文化的重要见证，承载着先民对美好生活的向往与追求。
      </p>
    </section>
  </div>;
}
