import { useScroll, useTransform, motion, useInView } from "framer-motion";
import { useRef } from "react";

const ERAS = [
  {
    period: "VIII в. до н.э. — IV в. н.э.",
    title: "Античность",
    text: "Греки основали Херсонес и Пантикапей. Скифы, тавры и сарматы — первые народы, оставившие след в крымской земле. Полуостров стал перекрёстком цивилизаций Средиземноморья.",
    image: "https://cdn.poehali.dev/projects/994f11f0-268a-4490-8741-dd654f45a39f/files/32d35a21-7b4c-4c0a-893d-68d661f1c218.jpg",
  },
  {
    period: "XIII — XVIII вв.",
    title: "Крымское ханство",
    text: "Бахчисарай стал столицей могущественного государства. Ханский дворец, мечети и медресе — памятники эпохи, когда крымскотатарская культура переживала расцвет.",
    image: "https://cdn.poehali.dev/projects/994f11f0-268a-4490-8741-dd654f45a39f/files/db7a15fb-9e71-4cd1-ae76-13078f88fdba.jpg",
  },
  {
    period: "XIV — XV вв.",
    title: "Генуэзские крепости",
    text: "Торговые республики Генуи и Венеции воздвигли неприступные башни на крымских скалах. Кафа, Солдайя, Чембало — форпосты средиземноморской торговли на берегах Понта Эвксинского.",
    image: "https://cdn.poehali.dev/projects/994f11f0-268a-4490-8741-dd654f45a39f/files/f4bca9e0-9407-4aa9-9fe6-175ef2ab9985.jpg",
  },
];

function EraCard({ era, index }: { era: typeof ERAS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-0 min-h-[480px]`}
    >
      <div className="flex-1 relative overflow-hidden">
        <img
          src={era.image}
          alt={era.title}
          className="w-full h-full object-cover min-h-[300px] lg:min-h-0"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <div className={`flex-1 bg-neutral-100 flex flex-col justify-center px-10 py-12 lg:py-16 ${isEven ? "" : ""}`}>
        <span className="text-xs uppercase tracking-widest text-neutral-500 mb-3">{era.period}</span>
        <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-5">{era.title}</h3>
        <p className="text-neutral-600 text-base md:text-lg leading-relaxed">{era.text}</p>
      </div>
    </motion.div>
  );
}

export default function History() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], ["0px", "-60px"]);

  return (
    <section id="history" ref={containerRef} className="bg-white">
      <div className="px-6 py-20 max-w-7xl mx-auto">
        <motion.div style={{ y: titleY }} className="mb-14">
          <p className="uppercase text-neutral-400 text-sm tracking-widest mb-3">Сквозь века</p>
          <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 leading-tight">
            История<br />полуострова
          </h2>
          <p className="mt-4 text-neutral-500 text-lg max-w-xl">
            Крым — место, где каждый камень помнит несколько цивилизаций. Здесь история многонациональна так же, как и её люди.
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col">
        {ERAS.map((era, i) => (
          <EraCard key={era.title} era={era} index={i} />
        ))}
      </div>
    </section>
  );
}
