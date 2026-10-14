import React from 'react';

export default function Dashboard({ citas, clientes, setActiveView, onOpenAgendar }) {
  const totalCitas = citas.length;
  const citasPendientes = citas.filter(c => c.estado === 'PENDIENTE' || c.estado === 'EN_PROCESO').length;
  const citasCompletadas = citas.filter(c => c.estado === 'COMPLETADA').length;
  const ingresosTotales = citas
    .filter(c => c.estado === 'COMPLETADA')
    .reduce((acc, c) => acc + c.valorTotal, 0);

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full mb-3 border border-amber-500/30">
            ✨ Panel de Control General
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Gestión de Estética Canina <span className="text-amber-400">CanStyling</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Control de turnos, fichas clínicas, toma de fotos Antes/Después y distribución segura de álbumes por Token Anti-IDOR.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={onOpenAgendar}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-sm transition-all flex items-center gap-2"
            >
              <span>➕</span> Agendar Nueva Cita
            </button>
            <button
              onClick={() => setActiveView('peluquero')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all flex items-center gap-2"
            >
              <span>📱</span> Abrir Modo Peluquero
            </button>
          </div>
        </div>
        <div className="absolute right-4 bottom-[-20px] text-8xl opacity-20 pointer-events-none select-none">
          🐕
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Turnos Activos Hoy</span>
            <span className="p-2 rounded-xl bg-amber-100 text-amber-700 text-lg">⏳</span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{citasPendientes}</div>
          <div className="text-xs text-slate-500 mt-1">Pendientes y en proceso</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Servicios Finalizados</span>
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-700 text-lg">✔</span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{citasCompletadas}</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">Con álbum digital generado</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Propietarios Registrados</span>
            <span className="p-2 rounded-xl bg-sky-100 text-sky-700 text-lg">👥</span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{clientes.length}</div>
          <div className="text-xs text-slate-500 mt-1">Con soporte multi-teléfono</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Facturación de Servicios</span>
            <span className="p-2 rounded-xl bg-indigo-100 text-indigo-700 text-lg">💰</span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            ${ingresosTotales.toLocaleString('es-CO')}
          </div>
          <div className="text-xs text-indigo-600 font-semibold mt-1">Ingresos de turnos completados</div>
        </div>
      </div>

      {/* Live Recent Appointments Preview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
            <span>📅</span> Últimos Turnos Registrados
          </h3>
          <button
            onClick={() => setActiveView('citas')}
            className="text-xs font-bold text-amber-600 hover:text-amber-700"
          >
            Ver todos en DataTable &rarr;
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {citas.map(c => (
            <div key={c.idCita} className="py-3 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-black text-sm">
                  {c.nombreMascota.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">
                    {c.nombreMascota} <span className="text-xs font-normal text-slate-500">({c.razaMascota})</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Dueño: {c.nombreCliente} • {c.nombreServicio}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  c.estado === 'COMPLETADA' ? 'bg-emerald-100 text-emerald-800' :
                  c.estado === 'EN_PROCESO' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {c.estado}
                </span>
                <span className="text-sm font-bold text-slate-800">
                  ${c.valorTotal.toLocaleString('es-CO')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
