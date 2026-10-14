import React, { useState } from 'react';

export default function AlbumDigitalCliente({ citas, initialToken, onBackToDashboard }) {
  const [tokenInput, setTokenInput] = useState(initialToken || 'e4b2d18a-78f9-4c12-98ab-34cd56ef7890');
  const [activeToken, setActiveToken] = useState(initialToken || 'e4b2d18a-78f9-4c12-98ab-34cd56ef7890');

  const citaEncontrada = citas.find(c => c.tokenAcceso === activeToken);

  const handleBuscarToken = (e) => {
    e.preventDefault();
    setActiveToken(tokenInput.trim());
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Token Search Bar (Simulador de Enlace URL de WhatsApp) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <form onSubmit={handleBuscarToken} className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-700 hidden sm:inline">URL con Token:</span>
          <div className="relative flex-1">
            <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">canstyling.com/album?token=</span>
            <input
              type="text"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="e4b2d18a-78f9-4c12-98ab-34cd56ef7890"
              className="w-full pl-52 pr-4 py-2 text-xs font-mono border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            Consultar
          </button>
        </form>
      </div>

      {/* Main Album Content */}
      {!citaEncontrada ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md text-center space-y-4">
          <span className="text-5xl">🔒</span>
          <h3 className="text-xl font-black text-rose-600">Acceso No Autorizado / Token Inválido</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            El enlace ingresado no corresponde a ninguna cita activa o está expirado. Por diseño de seguridad <strong>Anti-IDOR</strong>, no es posible acceder modificando identificadores correlativos (1, 2, 3...).
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setActiveToken('e4b2d18a-78f9-4c12-98ab-34cd56ef7890');
                setTokenInput('e4b2d18a-78f9-4c12-98ab-34cd56ef7890');
              }}
              className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-slate-800"
            >
              Cargar Token de Prueba Válido
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-lg space-y-0">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white p-6 sm:p-8 text-center relative">
            <span className="inline-block text-4xl mb-2">🐶✨</span>
            <h1 className="text-2xl sm:text-3xl font-black">
              ¡Ficha de Transformación de {citaEncontrada.nombreMascota}!
            </h1>
            <p className="text-amber-100 text-sm mt-1">
              Servicio de {citaEncontrada.nombreServicio} realizado en <strong>CanStyling</strong>
            </p>
            <div className="mt-3 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
              <span>📅 Fecha: {citaEncontrada.fechaHora}</span>
              <span>•</span>
              <span className="font-bold text-white uppercase">Estado: {citaEncontrada.estado}</span>
            </div>
          </div>

          {/* Details Bar */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block font-bold">Propietario</span>
              <span className="font-extrabold text-slate-800">{citaEncontrada.nombreCliente}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-bold">Mascota & Raza</span>
              <span className="font-extrabold text-slate-800">{citaEncontrada.nombreMascota} ({citaEncontrada.razaMascota})</span>
            </div>
            <div>
              <span className="text-slate-400 block font-bold">Estilista Canino</span>
              <span className="font-extrabold text-slate-800">{citaEncontrada.peluquero || "Carlos Gómez"}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-bold">Seguridad</span>
              <span className="font-extrabold text-emerald-600 flex items-center gap-1">🛡️ Token Verificado</span>
            </div>
          </div>

          {/* Comparative Photos (Antes y Despues) */}
          <div className="p-6 sm:p-8 space-y-6">
            <h3 className="text-center font-extrabold text-slate-900 text-lg flex items-center justify-center gap-2">
              <span>📸</span> Comparativa del Servicio: Antes & Después
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* ANTES */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-2">
                <div className="font-extrabold text-xs uppercase tracking-wider text-slate-600 bg-slate-200/70 py-1 px-3 rounded-full inline-block">
                  ✂️ 1. ANTES (Al llegar)
                </div>
                <div className="h-64 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                  {citaEncontrada.fotos?.antes ? (
                    <img
                      src={citaEncontrada.fotos.antes}
                      alt="Antes del servicio"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-slate-400 text-xs font-semibold">Foto "Antes" no disponible</span>
                  )}
                </div>
                <p className="text-xs text-slate-500">Manto previo al proceso de baño y desenredo</p>
              </div>

              {/* DESPUES */}
              <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200 text-center space-y-2">
                <div className="font-extrabold text-xs uppercase tracking-wider text-amber-900 bg-amber-200/80 py-1 px-3 rounded-full inline-block">
                  ✨ 2. DESPUÉS (¡Listo para brillar!)
                </div>
                <div className="h-64 rounded-xl overflow-hidden bg-amber-100/50 flex items-center justify-center">
                  {citaEncontrada.fotos?.despues ? (
                    <img
                      src={citaEncontrada.fotos.despues}
                      alt="Después del servicio"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-amber-700 text-xs font-semibold">Foto "Después" en preparación</span>
                  )}
                </div>
                <p className="text-xs text-amber-800 font-semibold">Corte estilizado, hidratación y acabado profesional</p>
              </div>
            </div>

            {/* Observations */}
            {citaEncontrada.observacionesEntrega && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-900 text-xs space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                  <span>💬</span> Nota del Estilista:
                </div>
                <p>{citaEncontrada.observacionesEntrega}</p>
              </div>
            )}

            <div className="text-center pt-2">
              <button
                onClick={onBackToDashboard}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all"
              >
                &larr; Volver al Panel de CanStyling
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
