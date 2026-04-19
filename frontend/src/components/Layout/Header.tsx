import { Search, Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Participa", active: false },
    { label: "Transparencia", active: false },
    { label: "Servicios a la Ciudadanía", active: false },
    { label: "Sala de prensa", active: false },
    { label: "PQRSD", active: true },
    { label: "Impuestos", active: false },
    { label: "Trámites y Servicios", active: false, isOrange: true },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src="https://cdnwordpresstest-f0ekdgevcngegudb.z01.azurefd.net/es/wp-content/themes/theme_alcaldia/img/logo_2022.png"
            alt="Alcaldía de Medellín"
            className="h-10 sm:h-14 object-contain"
          />
        </div>
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href="#"
              className={`text-sm font-semibold transition-colors
                ${item.isOrange ? "text-brand-orange hover:text-orange-600" : "text-brand-dark-blue hover:text-brand-blue"}
                ${item.active ? "border-b-2 border-brand-orange pb-1" : ""}`}
            >
              {item.label}
            </a>
          ))}
          <button className="text-brand-dark-blue hover:text-brand-blue p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Search size={20} />
          </button>
        </nav>
        <div className="lg:hidden flex items-center gap-2">
          <button className="text-brand-dark-blue p-2">
            <Search size={24} />
          </button>
          <button
            className="text-brand-dark-blue p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={28} />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4 shadow-inner">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href="#"
              className={`text-base font-semibold block
                ${item.isOrange ? "text-brand-orange" : "text-brand-dark-blue"}
                ${item.active ? "bg-gray-50 p-2 rounded" : "p-2"}`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
