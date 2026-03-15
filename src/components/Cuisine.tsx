const DISHES = [
  {
    name: "Чебуреки",
    origin: "Крымскотатарская кухня",
    description:
      "Хрустящие жареные пирожки с сочной начинкой из мяса. Визитная карточка Крыма — их готовят у каждого базара и продают с пылу с жару.",
    image:
      "https://cdn.poehali.dev/projects/994f11f0-268a-4490-8741-dd654f45a39f/files/b6df04bd-c677-4684-bd6c-3c41061e286e.jpg",
  },
  {
    name: "Баклава",
    origin: "Крымскотатарская кухня",
    description:
      "Слоёное тесто с орехами, пропитанное мёдом и сиропом. Сладкое произведение кулинарного искусства, которое готовят к праздникам.",
    image:
      "https://cdn.poehali.dev/projects/994f11f0-268a-4490-8741-dd654f45a39f/files/d5e75daa-cad7-468f-9431-f8b2f9fdd8f6.jpg",
  },
  {
    name: "Плов",
    origin: "Восточная традиция",
    description:
      "Рассыпчатый рис с бараниной, морковью и специями. В Крыму каждая семья хранит свой рецепт, передавая его из поколения в поколение.",
    image:
      "https://cdn.poehali.dev/projects/994f11f0-268a-4490-8741-dd654f45a39f/files/b66123bd-75a9-4568-8bd6-8dc9db189ff4.jpg",
  },
  {
    name: "Голубцы",
    origin: "Славянская кухня",
    description:
      "Капустные листья с начинкой из риса и мяса, томлёные в томатном соусе. Блюдо-символ домашнего уюта, любимое и русскими, и украинцами.",
    image:
      "https://cdn.poehali.dev/projects/994f11f0-268a-4490-8741-dd654f45a39f/files/65979a2e-0920-46b1-ab90-485a38c1d28c.jpg",
  },
];

export default function Cuisine() {
  return (
    <section id="cuisine" className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <p className="uppercase text-neutral-500 text-sm tracking-widest mb-3">Стол без границ</p>
          <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 leading-tight">
            Кухня Крыма
          </h2>
          <p className="mt-4 text-neutral-500 text-lg max-w-xl">
            Когда за одним столом встречаются разные традиции — рождается особый вкус.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DISHES.map((dish, i) => (
            <div key={dish.name} className={`group flex flex-col ${i % 2 === 1 ? "md:mt-12" : ""}`}>
              <div className="relative overflow-hidden h-[320px]">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white text-neutral-900 text-xs uppercase tracking-widest px-3 py-1 font-medium">
                    {dish.origin}
                  </span>
                </div>
              </div>
              <div className="pt-5 border-t border-neutral-200 mt-0">
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">{dish.name}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{dish.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
