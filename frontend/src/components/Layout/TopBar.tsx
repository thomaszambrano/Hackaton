import { Accessibility, Globe, User } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-brand-blue text-white py-2 px-4 shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm">
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <img
            src="https://cdnwordpresstest-f0ekdgevcngegudb.z01.azurefd.net/es/wp-content/themes/theme_alcaldia/img/logo_gov.png"
            alt="Gov.co"
            className="h-5 object-contain filter brightness-0 invert"
          />
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <button className="flex items-center gap-1 hover:text-gray-200 transition-colors">
            <Accessibility size={16} />
            <span>Opciones de Accesibilidad</span>
          </button>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 hover:text-gray-200 transition-colors">
              <Globe size={16} />
              <span>Idioma</span>
            </button>
            <div className="h-4 w-px bg-white/30 hidden sm:block"></div>
            <button className="flex items-center gap-1 hover:text-gray-200 transition-colors">
              <User size={16} />
              <span>Inicia sesión</span>
            </button>
          </div>
          <div className="hidden lg:flex items-center gap-2 border-l border-white/30 pl-4">
            <img
              src="https://cdnwordpresstest-f0ekdgevcngegudb.z01.azurefd.net/es/wp-content/themes/theme_alcaldia/img/escudo-de-armas.png"
              alt="Escudo"
              className="h-6"
            />
            <div className="flex flex-col text-[10px] leading-tight">
              <span className="font-bold">Alcaldía de Medellín</span>
              <span className="text-white/80">Secretarías y Dependencias</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
