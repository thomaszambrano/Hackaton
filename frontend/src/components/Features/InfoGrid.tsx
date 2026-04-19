import {
  FileText,
  Home,
  ThumbsUp,
  Check,
  AlertCircle,
  Calendar,
  MessageCircle,
  ChevronDown,
  Flame,
} from "lucide-react";

export default function InfoGrid() {
  const cards = [
    { icon: FileText, line1: "Tipo de", line2: "solicitud" },
    { icon: Home, line1: "Certificado", line2: "de residencia" },
    { icon: ThumbsUp, line1: "Confirma que es", line2: "para la Alcaldía" },
    { icon: Check, line1: "Recomendaciones", line2: "" },
    { icon: AlertCircle, line1: "Ten", line2: "en cuenta" },
    { icon: Flame, line1: "Solicitud de inspección", line2: "(Bomberos)" },
    { icon: Calendar, line1: "Tiempos de", line2: "respuesta" },
    { icon: MessageCircle, line1: "Ayuda", line2: "adicional" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-md p-5 flex items-center gap-4 cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all group border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-[#58C4CF]"></div>
              <div className="bg-[#14b8ce] w-14 h-14 rounded-full flex items-center justify-center text-white shrink-0 ml-2">
                <Icon size={28} strokeWidth={2} />
              </div>
              <div className="flex-grow">
                <p className="text-gray-800 font-semibold text-[15px] leading-tight font-work">
                  {card.line1}
                  {card.line2 && (
                    <>
                      <br />
                      {card.line2}
                    </>
                  )}
                </p>
              </div>
              <div className="text-brand-cyan group-hover:translate-y-1 transition-transform">
                <ChevronDown size={20} strokeWidth={3} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-12 max-w-4xl text-gray-800 text-[16px] leading-relaxed">
        <p>
          <strong>
            Si después de leer las recomendaciones anteriores confirmas que tu
            solicitud sí corresponde a la Alcaldía de Medellín,
          </strong>{" "}
          elige la opción que se ajusta a lo que necesitas:
        </p>
        <ul className="list-disc pl-8 mt-4 space-y-2">
          <li>Radicación PQRSD.</li>
          <li>Radicación PQRSD anónima.</li>
          <li>Radicación correspondencia.</li>
          <li>Radicación correspondencia anónima.</li>
          <li>Consulta el estado de tu solicitud.</li>
        </ul>
      </div>
    </div>
  );
}
