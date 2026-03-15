import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "#peoples", label: "Народы" },
  { href: "#history", label: "История" },
  { href: "#festivals", label: "Праздники" },
  { href: "#cuisine", label: "Кухня" },
  { href: "#harmony", label: "Согласие" },
];

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-neutral-950/95 backdrop-blur-sm py-3 shadow-lg" : "bg-transparent py-6"
      } px-6 ${className ?? ""}`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <button
          onClick={() => handleNav("#")}
          className="text-white text-sm uppercase tracking-widest font-semibold hover:text-neutral-300 transition-colors duration-300"
        >
          Крым
        </button>

        <nav className="hidden md:flex gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-white hover:text-amber-400 transition-colors duration-300 uppercase text-xs tracking-widest cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer p-1"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Меню"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-neutral-950/98 backdrop-blur-sm px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-white hover:text-amber-400 transition-colors duration-300 uppercase text-sm tracking-widest text-left cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
