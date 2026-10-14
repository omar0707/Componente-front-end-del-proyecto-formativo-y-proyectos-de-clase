import React, { useState } from 'react';

export default function PeluqueroMobileApp({ citas, onUpdateCitaFoto, onFinalizarServicio, onVerAlbum }) {
  const [selectedCitaId, setSelectedCitaId] = useState(citas[0]?.idCita || 1);
  const [observaciones, setObservaciones] = useState('');

  const citaActual = citas.find(c => c.idCita === Number(selectedCitaId)) || citas[0];

  const handlePhotoUpload = (e, tipo) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpdateCitaFoto(citaActual.idCita, tipo, event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="max-w-xl mx-auto text-center">
        <span className="text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 px-3 py-1 rounded-full">
          📱 Fase 3: Web App Móvil del Peluquero
        </span>
        <h2 className="text-2xl font-black text-slate-900 mt-2">
          Módulo Operativo de Estética Canina
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Diseñado para teléfonos y tablets. Permite captura de fotos con cámara HTML5 (Antes/Después) y cierre de turno.
        </p>
      </div>

      {/* Mobile Simulator Frame */}
      <div className="mobile-device-frame">
        {/* Device Notch & Top Bar */}
        <div className="bg-slate-900 text-white text-[11px] px-6 py-1.5 flex justify-between items-center select-none">
          <span>09:41</span>
          <div className="mobile-notch"></div>
          <span>📶 5G 100%</span>
        </div>

        {/* App Header */}
        <div className="bg-slate-900 text-white p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✂️</span>
            <div>
              <div className="text-xs font-bold text-amber-400">CanStyling Móvil</div>
              <div className="text-sm font-black">Panel de Estilista</div>
            </div>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
            Carlos Gómez
          </span>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 space-y-4 flex-1 overflow-y-auto bg-slate-50">
          
          {/* Turno Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              Seleccionar Turno en Atención:
            </label>
            <select
              value={selectedCitaId}
              onChange={(e) => setSelectedCitaId(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-sky-500"
            >
              {citas.map(c => (
                <option key={c.idCita} value={c.idCita}>
                  #{c.idCita} - {c.nombreMascota} ({c.nombreServicio}) [{c.estado}]
                </option>
              ))}
            </select>
          </div>

          {/* Ficha Rapida de la Mascota */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🐶</span>
                <div>
                  <h4 className="font-extrabold text-base text-slate-900">{citaActual.nombreMascota}</h4>
                  <p className="text-xs text-slate-500">{citaActual.razaMascota} • Dueño: {citaActual.nombreCliente}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                citaActual.estado === 'COMPLETADA' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {citaActual.estado}
              </span>
            </div>

            <div className="bg-amber-50 rounded-xl p-2.5 text-xs text-amber-900 border border-amber-200">
              <strong>Instrucciones:</strong> {citaActual.observacionesRecepcion || "Corte y baño regular según estándar de raza."}
            </div>
          </div>

          {/* Registro Fotografico (Camara HTML5 Antes y Despues) */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <span>📸</span> Registro de Fotos (Antes y Después)
            </h4>

            <div className="grid grid-cols-2 gap-3">
              {/* Foto ANTES */}
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-2 text-center flex flex-col items-center justify-center min-h-[140px] relative bg-slate-50">
                {citaActual.fotos?.antes ? (
                  <img src={citaActual.fotos.antes} alt="Antes" className="w-full h-28 object-cover rounded-lg" />
                ) : (
                  <div className="space-y-1">
                    <span className="text-2xl text-slate-400">📷</span>
                    <div className="text-[11px] font-bold text-slate-500">Foto "Antes"</div>
                  </div>
                )}
                <label className="mt-2 w-full">
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={(e) => handlePhotoUpload(e, 'antes')}
                    className="hidden"
                  />
                  <span className="block w-full py-1 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-[11px] font-bold cursor-pointer shadow-sm">
                    {citaActual.fotos?.antes ? '🔄 Cambiar' : '📸 Tomar Foto'}
                  </span>
                </label>
              </div>

              {/* Foto DESPUES */}
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-2 text-center flex flex-col items-center justify-center min-h-[140px] relative bg-slate-50">
                {citaActual.fotos?.despues ? (
                  <img src={citaActual.fotos.despues} alt="Después" className="w-full h-28 object-cover rounded-lg" />
                ) : (
                  <div className="space-y-1">
                    <span className="text-2xl text-amber-500">✨</span>
                    <div className="text-[11px] font-bold text-slate-500">Foto "Después"</div>
                  </div>
                )}
                <label className="mt-2 w-full">
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={(e) => handlePhotoUpload(e, 'despues')}
                    className="hidden"
                  />
                  <span className="block w-full py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-[11px] font-bold cursor-pointer shadow-sm">
                    {citaActual.fotos?.despues ? '🔄 Cambiar' : '📸 Tomar Foto'}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Observaciones y Finalizacion */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
            <label className="block text-xs font-bold text-slate-700">
              Observaciones de Entrega:
            </label>
            <textarea
              rows="2"
              value={observaciones || citaActual.observacionesEntrega || ''}
              onChange={(e) => setObservaciones(e.target.value)}
              placeholder="Ej. Se aplicó loción de coco, corte de uñas perfecto..."
              className="w-full border border-slate-300 rounded-xl p-2 text-xs focus:outline-none focus:border-sky-500"
            />

            <button
              onClick={() => onFinalizarServicio(citaActual.idCita, observaciones)}
              disabled={citaActual.estado === 'COMPLETADA'}
              className={`w-full py-3 rounded-xl font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                citaActual.estado === 'COMPLETADA'
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <span>✔</span> {citaActual.estado === 'COMPLETADA' ? 'Servicio Finalizado' : 'Finalizar y Notificar Cliente'}
            </button>

            {citaActual.estado === 'COMPLETADA' && (
              <button
                onClick={() => onVerAlbum(citaActual.tokenAcceso)}
                className="w-full py-2 rounded-xl font-bold text-xs bg-slate-900 text-white shadow-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5"
              >
                <span>🔗</span> Ver Álbum Generado (Token Anti-IDOR)
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
