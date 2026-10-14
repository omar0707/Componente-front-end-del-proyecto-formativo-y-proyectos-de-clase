import React, { useState } from 'react';

export default function ClientesDataTable({ clientes, onAddCliente, onAddMascota }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModalCliente, setShowModalCliente] = useState(false);
  const [showModalMascota, setShowModalMascota] = useState(false);
  const [selectedClienteId, setSelectedClienteId] = useState(null);

  // Form nuevo cliente
  const [nuevoCliente, setNuevoCliente] = useState({
    nombres: '',
    apellidos: '',
    tipoDocumento: 'CC',
    numeroDocumento: '',
    correo: '',
    telefono: '',
    direccion: '',
    ciudad: 'Montería'
  });

  // Form nueva mascota
  const [nuevaMascota, setNuevaMascota] = useState({
    nombre: '',
    raza: 'Poodle (Caniche)',
    edad: 2,
    peso: 6.0,
    color: 'Blanco',
    alergias: ''
  });

  const filteredClientes = clientes.filter(c => {
    const term = searchTerm.toLowerCase();
    return (
      c.nombres.toLowerCase().includes(term) ||
      c.apellidos.toLowerCase().includes(term) ||
      c.numeroDocumento.includes(term) ||
      c.correo.toLowerCase().includes(term) ||
      c.telefonos.some(t => t.numero.includes(term))
    );
  });

  const handleCrearCliente = (e) => {
    e.preventDefault();
    if (!nuevoCliente.nombres || !nuevoCliente.numeroDocumento) return;
    onAddCliente(nuevoCliente);
    setShowModalCliente(false);
    setNuevoCliente({
      nombres: '',
      apellidos: '',
      tipoDocumento: 'CC',
      numeroDocumento: '',
      correo: '',
      telefono: '',
      direccion: '',
      ciudad: 'Montería'
    });
  };

  const handleCrearMascota = (e) => {
    e.preventDefault();
    if (!nuevaMascota.nombre || !selectedClienteId) return;
    onAddMascota(selectedClienteId, nuevaMascota);
    setShowModalMascota(false);
    setNuevaMascota({
      nombre: '',
      raza: 'Poodle (Caniche)',
      edad: 2,
      peso: 6.0,
      color: 'Blanco',
      alergias: ''
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <span>👥</span> Directorio de Clientes y Mascotas
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Soporte relacional para múltiples líneas de contacto (WhatsApp / Móvil / Fijo) y fichas caninas.
          </p>
        </div>
        <button
          onClick={() => setShowModalCliente(true)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl shadow-sm transition-all flex items-center gap-1.5"
        >
          <span>➕</span> Nuevo Propietario
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
        <input
          type="text"
          placeholder="Buscar por nombre, documento, correo o teléfono..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold text-xs uppercase tracking-wider">
              <th className="p-3">ID</th>
              <th className="p-3">Documento</th>
              <th className="p-3">Propietario</th>
              <th className="p-3">Correo</th>
              <th className="p-3">Teléfonos / WhatsApp</th>
              <th className="p-3">Mascotas Vinculadas</th>
              <th className="p-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredClientes.map(cl => (
              <tr key={cl.idCliente} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3 font-bold text-slate-800">#{cl.idCliente}</td>
                <td className="p-3 text-slate-600 font-mono text-xs">{cl.tipoDocumento} {cl.numeroDocumento}</td>
                <td className="p-3 font-bold text-slate-900">{cl.nombres} {cl.apellidos}</td>
                <td className="p-3 text-slate-600 text-xs">{cl.correo}</td>
                <td className="p-3">
                  <div className="flex flex-col gap-1">
                    {cl.telefonos.map(t => (
                      <span key={t.id} className="text-xs font-semibold inline-flex items-center gap-1">
                        <span className="text-emerald-600 font-bold">📱 {t.numero}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-500">{t.tipo}</span>
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {cl.mascotas?.map(m => (
                      <span key={m.idMascota} className="px-2 py-0.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
                        🐾 {m.nombre} ({m.raza})
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => {
                      setSelectedClienteId(cl.idCliente);
                      setShowModalMascota(true);
                    }}
                    className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-xs font-bold transition-all"
                  >
                    ➕ Mascota
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Nuevo Cliente */}
      {showModalCliente && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">➕ Registrar Propietario</h3>
              <button onClick={() => setShowModalCliente(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleCrearCliente} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Nombres:</label>
                  <input
                    type="text" required
                    value={nuevoCliente.nombres}
                    onChange={(e) => setNuevoCliente({...nuevoCliente, nombres: e.target.value})}
                    className="w-full border border-slate-300 rounded-xl p-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Apellidos:</label>
                  <input
                    type="text" required
                    value={nuevoCliente.apellidos}
                    onChange={(e) => setNuevoCliente({...nuevoCliente, apellidos: e.target.value})}
                    className="w-full border border-slate-300 rounded-xl p-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Documento:</label>
                  <input
                    type="text" required
                    value={nuevoCliente.numeroDocumento}
                    onChange={(e) => setNuevoCliente({...nuevoCliente, numeroDocumento: e.target.value})}
                    className="w-full border border-slate-300 rounded-xl p-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Teléfono (WhatsApp):</label>
                  <input
                    type="tel" required
                    value={nuevoCliente.telefono}
                    onChange={(e) => setNuevoCliente({...nuevoCliente, telefono: e.target.value})}
                    className="w-full border border-slate-300 rounded-xl p-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Correo Electrónico:</label>
                <input
                  type="email" required
                  value={nuevoCliente.correo}
                  onChange={(e) => setNuevoCliente({...nuevoCliente, correo: e.target.value})}
                  className="w-full border border-slate-300 rounded-xl p-2 text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setShowModalCliente(false)} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold shadow-sm">Guardar Cliente</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Nueva Mascota */}
      {showModalMascota && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">🐾 Registrar Mascota</h3>
              <button onClick={() => setShowModalMascota(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleCrearMascota} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">Nombre de la Mascota:</label>
                <input
                  type="text" required
                  value={nuevaMascota.nombre}
                  onChange={(e) => setNuevaMascota({...nuevaMascota, nombre: e.target.value})}
                  className="w-full border border-slate-300 rounded-xl p-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Raza:</label>
                  <select
                    value={nuevaMascota.raza}
                    onChange={(e) => setNuevaMascota({...nuevaMascota, raza: e.target.value})}
                    className="w-full border border-slate-300 rounded-xl p-2 text-sm"
                  >
                    <option value="Poodle (Caniche)">Poodle (Caniche)</option>
                    <option value="Golden Retriever">Golden Retriever</option>
                    <option value="Schnauzer Miniatura">Schnauzer Miniatura</option>
                    <option value="Bulldog Francés">Bulldog Francés</option>
                    <option value="Shih Tzu">Shih Tzu</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Peso (kg):</label>
                  <input
                    type="number" step="0.1" required
                    value={nuevaMascota.peso}
                    onChange={(e) => setNuevaMascota({...nuevaMascota, peso: parseFloat(e.target.value)})}
                    className="w-full border border-slate-300 rounded-xl p-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Alergias o Cuidados Especiales:</label>
                <input
                  type="text"
                  value={nuevaMascota.alergias}
                  onChange={(e) => setNuevaMascota({...nuevaMascota, alergias: e.target.value})}
                  placeholder="Ej. Piel sensible, no usar perfume"
                  className="w-full border border-slate-300 rounded-xl p-2 text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setShowModalMascota(false)} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold shadow-sm">Guardar Mascota</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
