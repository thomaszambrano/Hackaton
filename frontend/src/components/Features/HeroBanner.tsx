export default function HeroBanner() {
  return (
    <div className="relative bg-white w-full">
      <div className="relative min-h-[250px] sm:min-h-[300px] flex items-center w-full">
        <div
          className="absolute inset-0 w-full h-full object-cover object-center z-0 hidden sm:block"
          style={{
            backgroundImage:
              "url('https://cdnwordpresstest-f0ekdgevcngegudb.z01.azurefd.net/es/wp-content/uploads/2022/03/20210312-Alpujarra-2.jpg')",
            backgroundPosition: "center right",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent w-2/3"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full py-12">
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-dark-blue mb-2 font-montserrat tracking-tight">
              Atención PQRSD
            </h1>
            <p className="text-lg sm:text-xl text-brand-dark-blue font-medium leading-snug">
              Peticiones, Quejas, Reclamos, Sugerencias, Denuncias
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#00aeef] text-white overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-6 sm:gap-10 py-3 whitespace-nowrap text-sm font-semibold">
            <li>
              <a href="#" className="hover:text-blue-100 transition-colors">
                Noticias
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-100 transition-colors">
                Eventos
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-100 transition-colors">
                Trámites y Servicios
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-100 transition-colors">
                Gabinete
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-100 transition-colors">
                Temas de Ciudad
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500 flex items-center gap-2">
        <a href="#" className="text-brand-cyan hover:underline">
          Alcaldía de Medellín
        </a>
        <span>›</span>
        <span className="text-gray-700">PQRSD</span>
      </div>
    </div>
  );
}
