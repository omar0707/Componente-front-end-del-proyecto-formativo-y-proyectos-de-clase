import React, { useState } from 'react';

export default function CitasDataTable({ citas, onOpenAgendar, onCompletarCita, onVerAlbum }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('TODAS');
  const [copiedToken, setCopiedToken] = useState(null);

  const filteredCitas = citas.filter(c => {
    const matchesEstado = filterEstado === 'TODAS' || c.estado === filterEstado;
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      c.nombreMascota.toLowerCase().includes(term) ||
      c.nombreCliente.toLowerCase().includes(term) ||
      c.nombreServicio.toLowerCase().includes(term) ||
      c.tokenAcceso.toLowerCase().includes(term);
    return matchesEstado && matchesSearch;
  });

  const handleCopyToken = (token) => {
    navigator.clipboard?.writeText(token);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2500);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <span>📅</span> Agenda de Turnos y Citas (DataTable)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Filtrado reactivo, ordenamiento por columnas y distribución segura de Tokens Anti-IDOR.
          </p>
        </div>
        <button
          onClick={onOpenAgendar}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl shadow-sm transition-all flex items-center gap-1.5"
        >
          <span>➕</span> Agendar Turno
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
          <input
            type="text"
            placeholder="Buscar por mascota, dueño, servicio o token..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
          />
        </div>

        {/* Status filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {['TODAS', 'PENDIENTE', 'EN_PROCESO', 'COMPLETADA'].map(estado => (
            <button
              key={estado}
              onClick={() => setFilterEstado(estado)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterEstado === estado 
                  ? 'bg-slate-900 text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {estado === 'TODAS' ? 'Todas' : estado}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold text-xs uppercase tracking-wider">
              <th className="p-3"># Turno</th>
              <th className="p-3">Fecha / Hora</th>
              <th className="p-3">Mascota & Raza</th>
              <th className="p-3">Dueño & Teléfono</th>
              <th className="p-3">Servicio</th>
              <th className="p-3">Precio</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Token Anti-IDOR</th>
              <th className="p-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredCitas.length === 0 ? (
              <tr>
                <td colSpan="9" className="p-8 text-center text-slate-400 font-medium">
                  No se encontraron citas con los filtros seleccionados.
                </td>
              </tr>
            ) : (
              filteredCitas.map(c => (
                <tr key={c.idCita} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-bold text-slate-800">#{c.idCita}</td>
                  <td className="p-3 text-slate-600 whitespace-nowrap text-xs">{c.fechaHora}</td>
                  <td className="p-3">
                    <div className="font-bold text-slate-900">{c.nombreMascota}</div>
                    <div className="text-[11px] text-slate-400">{c.razaMascota}</div>
                  </td>
                  <td className="p-3">
                    <div className="font-semibold text-slate-800">{c.nombreCliente}</div>
                    <div className="text-[11px] text-emerald-600 font-bold">📱 {c.telefonoCliente}</div>
                  </td>
                  <td className="p-3 text-slate-700 font-medium">{c.nombreServicio}</td>
                  <td className="p-3 font-bold text-slate-900">${c.valorTotal.toLocaleString('es-CO')}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      c.estado === 'COMPLETADA' ? 'bg-emerald-100 text-emerald-800' :
                      c.estado === 'EN_PROCESO' ? 'bg-indigo-100 text-indigo-800' :
                      c.estado === 'PENDIENTE' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {c.estado}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1.5">
                      <code className="text-[11px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-mono" title={c.tokenAcceso}>
                        {c.tokenAcceso.substring(0, 8)}...
                      </code>
                      <button
                        onClick={() => handleCopyToken(c.tokenAcceso)}
                        className="p-1 text-slate-400 hover:text-amber-600 transition-colors text-xs"
                        title="Copiar token"
                      >
                        {copiedToken === c.tokenAcceso ? '✔' : '📋'}
                      </button>
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onVerAlbum(c.tokenAcceso)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-all"
                        title="Ver Álbum de Mascota"
                      >
                        🖼️ Álbum
                      </button>
                      {c.estado !== 'COMPLETADA' && (
                        <button
                          onClick={() => onCompletarCita(c.idCita)}
                          className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition-all"
                          title="Finalizar turno"
                        >
                          ✔ Finalizar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-slate-500 flex justify-between items-center pt-2">
        <span>Mostrando {filteredCitas.length} de {citas.length} turnos</span>
        <span>🛡️ Seguridad Anti-IDOR habilitada en cada registro</span>
      </div>
    </div>
  );
}
