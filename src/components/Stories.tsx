import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API = "https://functions.poehali.dev/ff30a0c9-4f00-4ff5-bc18-b097a607aad1";

interface Story {
  id: number;
  author_name: string;
  city: string;
  story: string;
  created_at: string;
}

export default function Stories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [form, setForm] = useState({ author_name: "", city: "", story: "" });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const loadStories = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setStories(data.stories || []);
  };

  useEffect(() => {
    loadStories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSending(false);
    if (data.ok) {
      setSuccess(true);
      setForm({ author_name: "", city: "", story: "" });
      loadStories();
      setTimeout(() => setSuccess(false), 4000);
    } else {
      setError(data.error || "Что-то пошло не так");
    }
  };

  return (
    <section id="stories" className="bg-neutral-900 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="uppercase text-neutral-500 text-sm tracking-widest mb-3">Живые голоса</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Расскажи свою<br />историю
          </h2>
          <p className="mt-4 text-neutral-400 text-lg max-w-xl">
            Поделитесь воспоминанием, семейной традицией или историей о дружбе с соседом другой культуры.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-neutral-400 text-xs uppercase tracking-wide mb-2 block">Ваше имя *</label>
                <input
                  type="text"
                  value={form.author_name}
                  onChange={(e) => setForm((f) => ({ ...f, author_name: e.target.value }))}
                  required
                  maxLength={100}
                  placeholder="Имя"
                  className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors placeholder-neutral-600"
                />
              </div>
              <div>
                <label className="text-neutral-400 text-xs uppercase tracking-wide mb-2 block">Город</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                  maxLength={100}
                  placeholder="Симферополь..."
                  className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors placeholder-neutral-600"
                />
              </div>
            </div>
            <div>
              <label className="text-neutral-400 text-xs uppercase tracking-wide mb-2 block">Ваша история *</label>
              <textarea
                value={form.story}
                onChange={(e) => setForm((f) => ({ ...f, story: e.target.value }))}
                required
                minLength={10}
                maxLength={2000}
                rows={6}
                placeholder="Расскажите о традиции, воспоминании или истории добрососедства..."
                className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors placeholder-neutral-600 resize-none"
              />
              <p className="text-neutral-600 text-xs mt-1 text-right">{form.story.length}/2000</p>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <AnimatePresence>
              {success && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-green-400 text-sm"
                >
                  Спасибо! Ваша история опубликована.
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={sending}
              className="bg-amber-500 text-neutral-900 font-semibold px-8 py-3 text-sm uppercase tracking-widest hover:bg-amber-400 transition-colors duration-200 cursor-pointer disabled:opacity-50 w-fit"
            >
              {sending ? "Отправляю..." : "Поделиться историей"}
            </button>
          </form>

          <div className="flex flex-col gap-5 max-h-[520px] overflow-y-auto pr-2">
            {stories.length === 0 ? (
              <p className="text-neutral-500 text-sm">Пока историй нет — будьте первым!</p>
            ) : (
              stories.map((s) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t border-neutral-700 pt-5"
                >
                  <p className="text-neutral-300 text-sm leading-relaxed mb-3 italic">«{s.story}»</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-white text-xs font-semibold uppercase tracking-wide">{s.author_name}</span>
                      {s.city && <span className="text-neutral-500 text-xs ml-2">· {s.city}</span>}
                    </div>
                    <span className="text-neutral-600 text-xs">{s.created_at}</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
