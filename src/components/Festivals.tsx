const FESTIVALS = [
  {
    name: "Навруз",
    subtitle: "Крымскотатарский Новый год",
    date: "21 марта",
    description:
      "Праздник весеннего равноденствия. Накрывают стол с семью символическими блюдами, зажигают костры, поют и танцуют.",
    image:
      "https://cdn.poehali.dev/projects/994f11f0-268a-4490-8741-dd654f45a39f/files/a455ed20-6ce1-4ff9-8a72-7c1d524ffb6b.jpg",
    color: "from-amber-900/60",
  },
  {
    name: "Пасха",
    subtitle: "Православный праздник",
    date: "апрель–май",
    description:
      "Ночной крестный ход, куличи и расписные яйца. Храмы Крыма наполняются светом свечей и радостным «Христос Воскресе!»",
    image:
      "https://cdn.poehali.dev/projects/994f11f0-268a-4490-8741-dd654f45a39f/files/a983a94b-af07-476a-bb20-c4896c14c970.jpg",
    color: "from-yellow-900/60",
  },
  {
    name: "Хыдырлез",
    subtitle: "Праздник весны и плодородия",
    date: "6 мая",
    description:
      "Крымскотатарский праздник: прыжки через костёр, народные гуляния на природе, пожелания здоровья и благополучия на год.",
    image:
      "https://cdn.poehali.dev/projects/994f11f0-268a-4490-8741-dd654f45a39f/files/554c98ec-653f-46d5-a39c-49c853b39d1c.jpg",
    color: "from-orange-900/60",
  },
  {
    name: "Иван Купала",
    subtitle: "Славянский праздник лета",
    date: "6–7 июля",
    description:
      "Венки на воду, хороводы вокруг костра, поиск цветка папоротника. Один из древнейших праздников восточных славян.",
    image:
      "https://cdn.poehali.dev/projects/994f11f0-268a-4490-8741-dd654f45a39f/files/5c4482c0-fd7b-46ed-aa4f-54e5dee15e2b.jpg",
    color: "from-blue-900/60",
  },
];

export default function Festivals() {
  return (
    <section id="festivals" className="bg-neutral-950 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <p className="uppercase text-neutral-500 text-sm tracking-widest mb-3">Календарь торжеств</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Праздники<br />всех народов
          </h2>
          <p className="mt-4 text-neutral-400 text-lg max-w-xl">
            В Крыму отмечают праздники разных культур — и каждый становится поводом собраться вместе.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FESTIVALS.map((fest) => (
            <div
              key={fest.name}
              className="group relative h-[480px] overflow-hidden cursor-default"
            >
              <img
                src={fest.image}
                alt={fest.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${fest.color} via-black/30 to-transparent`} />
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <div>
                  <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs uppercase tracking-widest px-3 py-1 mb-2">
                    {fest.date}
                  </span>
                </div>
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wide mb-1">{fest.subtitle}</p>
                  <h3 className="text-white text-2xl font-bold mb-2">{fest.name}</h3>
                  <p className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    {fest.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
