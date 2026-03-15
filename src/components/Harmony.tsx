import { useInView } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";

const VALUES = [
  { number: "80+", label: "народностей", desc: "живут на полуострове бок о бок" },
  { number: "3", label: "государственных языка", desc: "русский, украинский, крымскотатарский" },
  { number: "100+", label: "лет традиций", desc: "совместных праздников и общих базаров" },
  { number: "1", label: "общий дом", desc: "где каждая культура — часть целого" },
];

const STORIES = [
  {
    image: "https://cdn.poehali.dev/projects/994f11f0-268a-4490-8741-dd654f45a39f/files/c7222b5a-c47e-468b-86b1-e5a558a8eeb1.jpg",
    quote: "Мы всю жизнь соседи. Его бабушка учила меня готовить долму, моя — угощала его семью пасхальным куличом.",
    author: "Анна и Решат, соседи из Симферополя",
  },
  {
    image: "https://cdn.poehali.dev/projects/994f11f0-268a-4490-8741-dd654f45a39f/files/215d4bc7-6c2c-494a-b42e-a4892f5a7ab9.jpg",
    quote: "Дети во дворе не делятся по национальностям. Они просто играют вместе — и это и есть настоящий Крым.",
    author: "Мариам, воспитатель детского сада, Евпатория",
  },
  {
    image: "https://cdn.poehali.dev/projects/994f11f0-268a-4490-8741-dd654f45a39f/files/46b09800-5dc4-4b56-bf20-197e4eb38fdc.jpg",
    quote: "На нашем рынке торгуют рядом русские, татары и греки. Мы знаем рецепты друг друга и угощаем покупателей.",
    author: "Продавцы центрального рынка, Бахчисарай",
  },
];

function StatItem({ item, index }: { item: typeof VALUES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="border-t border-neutral-700 pt-6"
    >
      <p className="text-5xl md:text-6xl font-bold text-white mb-1">{item.number}</p>
      <p className="text-amber-400 text-sm uppercase tracking-widest mb-2">{item.label}</p>
      <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
    </motion.div>
  );
}

export default function Harmony() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section id="harmony" className="bg-neutral-950">
      <div className="px-6 py-20 max-w-7xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="uppercase text-neutral-500 text-sm tracking-widest mb-3">Единство в многообразии</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-2xl">
            Согласие —<br />главная традиция
          </h2>
          <p className="mt-4 text-neutral-400 text-lg max-w-xl">
            Крымское добрососедство — не политический лозунг, а живая повседневность, проверенная поколениями.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {VALUES.map((item, i) => (
            <StatItem key={item.label} item={item} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STORIES.map((story, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group flex flex-col"
            >
              <div className="relative overflow-hidden h-[260px] mb-5">
                <img
                  src={story.image}
                  alt={story.author}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
              <blockquote className="text-neutral-300 text-base leading-relaxed mb-4 italic flex-1">
                «{story.quote}»
              </blockquote>
              <p className="text-neutral-500 text-xs uppercase tracking-wide">{story.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
