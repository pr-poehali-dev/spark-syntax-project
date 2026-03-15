const PEOPLES = [
  { name: "Русские", desc: "Хранители православной веры и великой литературной традиции полуострова" },
  { name: "Крымские татары", desc: "Коренной народ Крыма с богатым эпосом, музыкой и архитектурным наследием" },
  { name: "Украинцы", desc: "Сохраняют вышиванку, колядки и уникальные говоры крымских степей" },
  { name: "Армяне и греки", desc: "Тысячелетнее присутствие: храмы, виноделие и морские традиции" },
];

export default function Featured() {
  return (
    <div id="peoples" className="flex flex-col lg:flex-row lg:justify-between lg:items-center min-h-screen px-6 py-12 lg:py-0 bg-white">
      <div className="flex-1 h-[400px] lg:h-[800px] mb-8 lg:mb-0 lg:order-2">
        <img
          src="https://cdn.poehali.dev/projects/994f11f0-268a-4490-8741-dd654f45a39f/files/968a881d-96bc-48c3-8e2a-ad46faac3fa5.jpg"
          alt="Традиции народов Крыма"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 text-left lg:h-[800px] flex flex-col justify-center lg:mr-12 lg:order-1">
        <h3 className="uppercase mb-4 text-sm tracking-wide text-neutral-600" id="traditions">Народы Крыма</h3>
        <p className="text-2xl lg:text-4xl mb-8 text-neutral-900 leading-tight">
          Более 80 народностей живут на одном полуострове — и каждый вносит неповторимый след в общую культуру.
        </p>
        <div className="flex flex-col gap-4 mb-8">
          {PEOPLES.map((p) => (
            <div key={p.name} className="border-t border-neutral-200 pt-4">
              <span className="font-semibold text-neutral-900 uppercase text-sm tracking-wide">{p.name}</span>
              <p className="text-neutral-600 text-sm mt-1">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}