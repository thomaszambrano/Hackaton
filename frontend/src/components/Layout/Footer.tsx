export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 mb-12">
          <div className="w-full md:w-1/3">
            <h2 className="text-xl font-bold text-brand-dark-blue mb-6 font-montserrat">
              Acércate a la Alcaldía de Medellín
            </h2>
            <img
              src="https://cdnwordpresstest-f0ekdgevcngegudb.z01.azurefd.net/es/wp-content/themes/theme_alcaldia/img/logo_2022.png"
              alt="Logo Alcaldía"
              className="max-w-[200px] grayscale opacity-80"
            />
          </div>
          <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-600 font-work leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">
                Centro Administrativo Distrital:
              </h3>
              <p className="mb-4">
                Lunes a Jueves de 7:30 a. m. a 12:00 m. y de 1:30 p. m. a 5:00
                p. m
                <br />
                Viernes de 7:30 a. m. a 12:00 m. y de 1:30 p. m. a 4:00 p. m.
              </p>
              <h3 className="font-bold text-gray-900 mb-2">Dirección:</h3>
              <p className="mb-4">
                Calle 44 # 52 - 165, Centro Administrativo La Alpujarra,
                Medellín, Colombia
              </p>
              <h3 className="font-bold text-gray-900 mb-2">
                Canales de atención:
              </h3>
              <p>
                Línea Única de Atención a la Ciudadanía: (+57) 604 44 44 144.
              </p>
              <a href="#" className="text-brand-blue hover:underline">
                Flor, el WhatsApp de la Alcaldía: 301 604 44 44
              </a>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Correo Portal:</h3>
              <p className="mb-2">
                <a href="#" className="text-brand-blue hover:underline">
                  Contáctenos
                </a>
              </p>
              <p className="font-bold text-gray-900 mb-1 mt-4">
                Correo institucional para recepción de solicitudes:
              </p>
              <a
                href="mailto:atencion.ciudadana@medellin.gov.co"
                className="text-brand-blue hover:underline block mb-4"
              >
                atencion.ciudadana@medellin.gov.co
              </a>
              <p className="font-bold text-gray-900 mb-1">
                Correo exclusivo notificaciones judiciales:
              </p>
              <a
                href="mailto:notimedellin.oralidad@medellin.gov.co"
                className="text-brand-blue hover:underline block"
              >
                notimedellin.oralidad@medellin.gov.co
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500 font-work">
          <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center md:justify-start">
            <a href="#" className="hover:text-brand-blue">
              Centro documental
            </a>
            <span>/</span>
            <a href="#" className="hover:text-brand-blue">
              Preguntas frecuentes
            </a>
            <span>/</span>
            <a href="#" className="hover:text-brand-blue">
              Mapa del Sitio
            </a>
            <span>/</span>
            <a href="#" className="hover:text-brand-blue">
              Política de tratamiento de datos
            </a>
          </div>
          <div className="text-center md:text-right">
            <p>
              © 2026 / NIT: 890905211-1 / Distrito Especial de Ciencia,
              Tecnología e Innovación de Medellín
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-6 flex justify-center pb-4">
          <img
            src="https://cdnwordpresstest-f0ekdgevcngegudb.z01.azurefd.net/es/wp-content/themes/theme_alcaldia/img/logo_gov.png"
            alt="Gov.co"
            className="h-8 object-contain filter grayscale"
          />
        </div>
      </div>
      <a
        href="https://wa.me/573016044444"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25d366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-500 hover:scale-105 transition-all z-50"
        title="WhatsApp Flor"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.107.549 4.09 1.514 5.817L.057 23.882a.5.5 0 0 0 .614.614l6.064-1.457A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.65-.518-5.17-1.418l-.37-.22-3.827.92.934-3.83-.24-.38A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      </a>
    </footer>
  );
}
