import React, { useState } from "react";
import { User, Mail, SearchCheck } from "lucide-react";

type ActionId = "pqrsd" | "correspondencia" | "consulta";

interface PqrsdForm {
  tipo: string;
  nombre: string;
  email: string;
  telefono: string;
  asunto: string;
  descripcion: string;
  anonimo: boolean;
}

interface ConsultaForm {
  radicado: string;
}

interface ApiError {
  [key: string]: string[];
}

async function getCsrfToken(): Promise<string> {
  const res = await fetch("/api/v1/auth/csrf/");
  const data = await res.json();
  return data.csrfToken;
}

export default function ActionSelector() {
  const [activeAction, setActiveAction] = useState<ActionId | null>("pqrsd");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [radicado, setRadicado] = useState<string | null>(null);
  const [apiErrors, setApiErrors] = useState<ApiError>({});

  const [pqrsdForm, setPqrsdForm] = useState<PqrsdForm>({
    tipo: "peticion",
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    descripcion: "",
    anonimo: false,
  });

  const [consultaForm, setConsultaForm] = useState<ConsultaForm>({
    radicado: "",
  });
  const [consultaResult, setConsultaResult] = useState<Record<
    string,
    string
  > | null>(null);
  const [consultaError, setConsultaError] = useState("");

  const actions = [
    { id: "pqrsd" as ActionId, label: "Radicación\nPQRSD", icon: User },
    {
      id: "correspondencia" as ActionId,
      label: "Radicación\ncorrespondencia",
      icon: Mail,
    },
    {
      id: "consulta" as ActionId,
      label: "Consulta el estado\nde tu solicitud",
      icon: SearchCheck,
    },
  ];

  const tipoOptions = [
    { value: "peticion", label: "Petición" },
    { value: "queja", label: "Queja" },
    { value: "reclamo", label: "Reclamo" },
    { value: "sugerencia", label: "Sugerencia" },
    { value: "denuncia", label: "Denuncia" },
  ];

  const handlePqrsdChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setPqrsdForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (apiErrors[name])
      setApiErrors((prev) => {
        const n = { ...prev };
        delete n[name];
        return n;
      });
  };

  const handlePqrsdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiErrors({});
    try {
      const csrf = await getCsrfToken();
      const body: Record<string, string | boolean> = {
        tipo: pqrsdForm.tipo,
        canal_entrada: "web",
        anonimo: pqrsdForm.anonimo,
        asunto: pqrsdForm.asunto,
        descripcion: pqrsdForm.descripcion,
      };
      if (!pqrsdForm.anonimo) {
        body.nombre_ciudadano = pqrsdForm.nombre;
        body.email_ciudadano = pqrsdForm.email;
        body.telefono_ciudadano = pqrsdForm.telefono;
      }
      const res = await fetch("/api/v1/pqrsd/submit/", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRFToken": csrf },
        credentials: "include",
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        setRadicado(data.radicado);
        setPqrsdForm({
          tipo: "peticion",
          nombre: "",
          email: "",
          telefono: "",
          asunto: "",
          descripcion: "",
          anonimo: false,
        });
      } else {
        setApiErrors(data);
      }
    } catch {
      setApiErrors({
        non_field_errors: ["Error de conexión. Intenta de nuevo."],
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConsultaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setConsultaResult(null);
    setConsultaError("");
    setIsSubmitting(true);
    try {
      const res = await fetch(
        `/api/v1/pqrsd/status/${encodeURIComponent(consultaForm.radicado)}/`,
      );
      const data = await res.json();
      if (res.ok) {
        setConsultaResult(data);
      } else {
        setConsultaError(data.error || "No se encontró el radicado.");
      }
    } catch {
      setConsultaError("Error de conexión. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50/50 py-12 border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        {/* Action buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 justify-items-center mb-10">
          {actions.map((action) => {
            const Icon = action.icon;
            const isActive = activeAction === action.id;
            return (
              <button
                key={action.id}
                onClick={() => {
                  setActiveAction(
                    action.id === activeAction ? null : action.id,
                  );
                  setRadicado(null);
                  setConsultaResult(null);
                  setConsultaError("");
                }}
                className={`w-full sm:w-[260px] h-[220px] bg-white rounded-xl shadow-[0_5px_25px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center p-6 transition-all border-b-4
                  ${isActive ? "border-brand-orange scale-105 shadow-[0_10px_30px_rgba(0,0,0,0.12)]" : "border-transparent hover:border-brand-cyan hover:scale-105"}`}
              >
                <div className="text-brand-dark-blue mb-4">
                  <Icon size={72} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-brand-dark-blue text-center whitespace-pre-line font-montserrat">
                  {action.label}
                </h3>
              </button>
            );
          })}
        </div>

        {/* PQRSD form */}
        {(activeAction === "pqrsd" || activeAction === "correspondencia") && (
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-gray-100">
            <div className="text-center mb-8">
              <p className="text-gray-700 mb-4 text-[16px] max-w-3xl mx-auto">
                {activeAction === "pqrsd"
                  ? "En esta opción podrás radicar peticiones, quejas, reclamos, sugerencias o denuncias por actos de corrupción dirigidas al Distrito Especial de Ciencia, Tecnología e Innovación de Medellín."
                  : "En esta opción podrás radicar correspondencia dirigida a la Alcaldía de Medellín."}
              </p>
            </div>

            {radicado ? (
              <div className="bg-green-50 border border-green-400 text-green-800 px-6 py-8 rounded-xl text-center">
                <p className="text-2xl font-bold mb-2">
                  ¡Solicitud radicada con éxito!
                </p>
                <p className="mb-1">
                  Tu número de radicado es:{" "}
                  <span className="font-mono font-bold text-brand-dark-blue">
                    {radicado}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Guarda este número para consultar el estado de tu solicitud.
                </p>
                <button
                  onClick={() => setRadicado(null)}
                  className="mt-6 px-6 py-2 bg-brand-dark-blue text-white rounded-full font-semibold hover:bg-blue-900 transition-colors"
                >
                  Radicar otra solicitud
                </button>
              </div>
            ) : (
              <form
                onSubmit={handlePqrsdSubmit}
                className="max-w-2xl mx-auto space-y-5"
              >
                {apiErrors.non_field_errors && (
                  <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-md text-sm">
                    {apiErrors.non_field_errors.join(" ")}
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="anonimo"
                    id="anonimo"
                    checked={pqrsdForm.anonimo}
                    onChange={handlePqrsdChange}
                    className="w-4 h-4 accent-brand-orange"
                  />
                  <label
                    htmlFor="anonimo"
                    className="text-gray-700 font-semibold text-sm"
                  >
                    Radicar de forma anónima
                  </label>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1 text-sm">
                    Tipo de solicitud *
                  </label>
                  <select
                    name="tipo"
                    value={pqrsdForm.tipo}
                    onChange={handlePqrsdChange}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                  >
                    {tipoOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>

                {!pqrsdForm.anonimo && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1 text-sm">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={pqrsdForm.nombre}
                        onChange={handlePqrsdChange}
                        required={!pqrsdForm.anonimo}
                        className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-brand-cyan ${apiErrors.nombre_ciudadano ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Ej. Juan Pérez"
                      />
                      {apiErrors.nombre_ciudadano && (
                        <p className="text-red-500 text-xs mt-1">
                          {apiErrors.nombre_ciudadano[0]}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1 text-sm">
                        Correo electrónico *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={pqrsdForm.email}
                        onChange={handlePqrsdChange}
                        required={!pqrsdForm.anonimo}
                        className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-brand-cyan ${apiErrors.email_ciudadano ? "border-red-500" : "border-gray-300"}`}
                        placeholder="correo@ejemplo.com"
                      />
                      {apiErrors.email_ciudadano && (
                        <p className="text-red-500 text-xs mt-1">
                          {apiErrors.email_ciudadano[0]}
                        </p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-gray-700 font-semibold mb-1 text-sm">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        value={pqrsdForm.telefono}
                        onChange={handlePqrsdChange}
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                        placeholder="Ej. 3001234567"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 font-semibold mb-1 text-sm">
                    Asunto *
                  </label>
                  <input
                    type="text"
                    name="asunto"
                    value={pqrsdForm.asunto}
                    onChange={handlePqrsdChange}
                    required
                    className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-brand-cyan ${apiErrors.asunto ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Breve descripción de su solicitud"
                  />
                  {apiErrors.asunto && (
                    <p className="text-red-500 text-xs mt-1">
                      {apiErrors.asunto[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1 text-sm">
                    Descripción detallada *
                  </label>
                  <textarea
                    name="descripcion"
                    value={pqrsdForm.descripcion}
                    onChange={handlePqrsdChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-brand-cyan resize-none ${apiErrors.descripcion ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Escriba aquí los detalles de su solicitud..."
                  />
                  {apiErrors.descripcion && (
                    <p className="text-red-500 text-xs mt-1">
                      {apiErrors.descripcion[0]}
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      setPqrsdForm({
                        tipo: "peticion",
                        nombre: "",
                        email: "",
                        telefono: "",
                        asunto: "",
                        descripcion: "",
                        anonimo: false,
                      })
                    }
                    className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Limpiar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-2 bg-brand-dark-blue text-white rounded-full font-semibold hover:bg-blue-900 transition-colors shadow-md disabled:opacity-60"
                  >
                    {isSubmitting ? "Enviando..." : "Radicar solicitud"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Consulta form */}
        {activeAction === "consulta" && (
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-brand-dark-blue mb-6 font-montserrat text-center">
              Consultar estado de solicitud
            </h3>
            <form onSubmit={handleConsultaSubmit} className="flex gap-3">
              <input
                type="text"
                value={consultaForm.radicado}
                onChange={(e) => setConsultaForm({ radicado: e.target.value })}
                required
                className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-cyan font-mono"
                placeholder="Ej. MDE-2026-001234"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-brand-dark-blue text-white rounded-md font-semibold hover:bg-blue-900 transition-colors disabled:opacity-60"
              >
                {isSubmitting ? "..." : "Consultar"}
              </button>
            </form>

            {consultaError && (
              <div className="mt-4 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-md text-sm">
                {consultaError}
              </div>
            )}

            {consultaResult && (
              <div className="mt-6 bg-gray-50 rounded-xl p-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Radicado</span>
                  <span className="font-mono font-bold">
                    {consultaResult.radicado}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tipo</span>
                  <span className="font-semibold">{consultaResult.tipo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Estado</span>
                  <span
                    className={`font-semibold px-2 py-0.5 rounded ${consultaResult.estado === "vencida" ? "bg-red-100 text-red-700" : consultaResult.estado === "respondida" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
                  >
                    {consultaResult.estado}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Asunto</span>
                  <span className="text-right max-w-xs">
                    {consultaResult.asunto}
                  </span>
                </div>
                {consultaResult.fecha_limite && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Fecha límite</span>
                    <span>{consultaResult.fecha_limite}</span>
                  </div>
                )}
                {consultaResult.dependencia && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Dependencia</span>
                    <span>{consultaResult.dependencia}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
