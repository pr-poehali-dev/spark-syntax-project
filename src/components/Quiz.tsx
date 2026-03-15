import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUESTIONS = [
  {
    question: "Какой праздник крымские татары отмечают в честь прихода весны?",
    options: ["Навруз", "Масленица", "Пасха", "Сабантуй"],
    correct: 0,
    fact: "Навруз — один из древнейших праздников человечества, отмечается 21 марта в день весеннего равноденствия.",
  },
  {
    question: "Сколько государственных языков в Республике Крым?",
    options: ["1", "2", "3", "4"],
    correct: 2,
    fact: "Три государственных языка: русский, украинский и крымскотатарский — отражают многонациональный характер полуострова.",
  },
  {
    question: "Какой древний город основали греки на территории современного Севастополя?",
    options: ["Пантикапей", "Херсонес", "Кафа", "Солдайя"],
    correct: 1,
    fact: "Херсонес Таврический основан в V веке до н.э. — сейчас это объект Всемирного наследия ЮНЕСКО.",
  },
  {
    question: "Как называется крымскотатарское слоёное пирожное с орехами и мёдом?",
    options: ["Чебурек", "Шурпа", "Баклава", "Долма"],
    correct: 2,
    fact: "Баклава — символ крымскотатарской кондитерской традиции, её готовят на все главные праздники.",
  },
  {
    question: "Столица Крымского ханства, где находится знаменитый Ханский дворец?",
    options: ["Симферополь", "Керчь", "Феодосия", "Бахчисарай"],
    correct: 3,
    fact: "Бахчисарай в переводе означает «дворец-сад». Ханский дворец — единственный сохранившийся образец крымскотатарской дворцовой архитектуры.",
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showFact, setShowFact] = useState(false);

  const q = QUESTIONS[current];

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowFact(true);
    if (idx === q.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= QUESTIONS.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowFact(false);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setShowFact(false);
  };

  const getResult = () => {
    if (score === QUESTIONS.length) return { text: "Отличный результат! Вы настоящий знаток Крыма.", emoji: "🌟" };
    if (score >= 3) return { text: "Хороший результат! Крым открывает вам свои тайны.", emoji: "👏" };
    return { text: "Крым хранит ещё много секретов — самое время узнать их!", emoji: "📖" };
  };

  return (
    <section id="quiz" className="bg-amber-50 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <p className="uppercase text-amber-700 text-sm tracking-widest mb-3">Проверь себя</p>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight">
            Викторина о<br />многонациональном Крыме
          </h2>
        </div>

        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-neutral-500 text-sm">Вопрос {current + 1} из {QUESTIONS.length}</span>
                <div className="flex gap-1.5">
                  {QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i < current ? "w-8 bg-amber-500" : i === current ? "w-8 bg-neutral-900" : "w-8 bg-neutral-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 mb-6 leading-snug">{q.question}</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {q.options.map((opt, idx) => {
                  let style = "border-neutral-200 bg-white text-neutral-900 hover:border-neutral-900";
                  if (selected !== null) {
                    if (idx === q.correct) style = "border-green-500 bg-green-50 text-green-800";
                    else if (idx === selected) style = "border-red-400 bg-red-50 text-red-700";
                    else style = "border-neutral-100 bg-neutral-50 text-neutral-400";
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className={`border-2 rounded-none px-5 py-4 text-left text-sm font-medium transition-all duration-200 cursor-pointer ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {showFact && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-amber-100 border-l-4 border-amber-500 px-5 py-4 mb-6 text-sm text-amber-900 leading-relaxed"
                  >
                    <strong>Интересный факт:</strong> {q.fact}
                  </motion.div>
                )}
              </AnimatePresence>

              {selected !== null && (
                <button
                  onClick={handleNext}
                  className="bg-neutral-900 text-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-neutral-700 transition-colors duration-200 cursor-pointer"
                >
                  {current + 1 < QUESTIONS.length ? "Следующий вопрос →" : "Узнать результат →"}
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <p className="text-6xl mb-6">{getResult().emoji}</p>
              <p className="text-5xl font-bold text-neutral-900 mb-3">{score}/{QUESTIONS.length}</p>
              <p className="text-neutral-600 text-lg mb-8 max-w-sm mx-auto">{getResult().text}</p>
              <button
                onClick={handleRestart}
                className="border-2 border-neutral-900 text-neutral-900 px-8 py-3 text-sm uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-all duration-200 cursor-pointer"
              >
                Пройти снова
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
