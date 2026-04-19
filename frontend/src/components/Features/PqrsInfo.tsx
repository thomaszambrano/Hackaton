import Accordion from "../UI/Accordion";

export default function PqrsInfo() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white">
      <h2 className="text-3xl font-bold text-brand-dark-blue mb-4 font-montserrat">
        Atención PQRSD
      </h2>
      <p className="text-gray-700 mb-8 max-w-4xl text-[16px] leading-relaxed">
        La Alcaldía de Medellín te da la bienvenida al portal de PQRSD. Para
        nosotros es fundamental brindarte una atención adecuada. Antes de
        iniciar, ten en cuenta los siguientes conceptos:
      </p>
      <ul className="list-disc pl-5 mb-10 text-gray-700 max-w-4xl space-y-3">
        <li>
          <strong>PQRSD:</strong> son las peticiones, quejas, reclamos,
          sugerencias y denuncias por actos de corrupción dirigidas al Distrito
          Especial de Ciencia, Tecnología e Innovación de Medellín.
        </li>
        <li>
          <strong>Correspondencia:</strong> es el canal donde ingresan
          comunicaciones que contienen citaciones o invitaciones a servidores,
          que no incluyen requerimientos o información adicional.
        </li>
      </ul>
      <div className="max-w-4xl">
        <Accordion title="¿Quieres saber más? Te invitamos a consultar acá">
          <p className="mb-4">
            La diferencia entre una <strong>PQRSD</strong> y una{" "}
            <strong>correspondencia</strong> radica en su propósito y
            tratamiento.
          </p>
          <p className="font-bold mb-2">
            &gt;&gt; PQRSD | Petición, Queja, Reclamo, Sugerencia o Denuncia
          </p>
          <p className="mb-2">
            <strong>¿Qué es?</strong>
            <br />
            Es un mecanismo formal mediante el cual los ciudadanos ejercen su
            derecho a comunicarse con la Alcaldía para solicitar información,
            expresar inconformidades o hacer propuestas.
          </p>
          <p className="font-bold mt-4 mb-2">&gt;&gt; Correspondencia</p>
          <p>
            <strong>¿Qué es?</strong>
            <br />
            Son todas las comunicaciones de carácter privado que llegan a las
            entidades, como citaciones, invitaciones o información sin
            requerimientos de respuesta formal.
          </p>
        </Accordion>
        <Accordion title="Definiciones PQRSD">
          <ul className="list-disc pl-5 space-y-4">
            <li>
              <strong>Petición o derecho de petición:</strong> Es aquel que
              tiene toda persona para solicitar o reclamar ante la Alcaldía, de
              manera respetuosa, información o actuaciones de su competencia.
            </li>
            <li>
              <strong>Reclamos:</strong> Insatisfacción por la prestación de un
              servicio deficiente o irregular.
            </li>
            <li>
              <strong>Denuncias:</strong> Exponer una situación que puede ser
              ilícita o irregular, especialmente actos de corrupción.
            </li>
            <li>
              <strong>Quejas:</strong> Insatisfacción por la conducta o la
              acción de los servidores públicos.
            </li>
            <li>
              <strong>Sugerencias:</strong> Recomendación o propuesta de los
              ciudadanos para mejorar los servicios.
            </li>
          </ul>
        </Accordion>
      </div>
      <div className="mt-12 mb-6">
        <p className="text-gray-800 font-medium text-lg">
          A continuación, te compartimos algunas recomendaciones importantes:
        </p>
      </div>
    </div>
  );
}
