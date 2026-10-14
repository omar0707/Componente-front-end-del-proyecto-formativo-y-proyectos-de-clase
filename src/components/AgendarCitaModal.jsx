import React, { useState } from 'react';

export default function AgendarCitaModal({ isOpen, onClose, clientes, servicios, onCrearCita }) {
  if (!isOpen) return null;

  const [selectedClienteId, setSelectedClienteId] = useState(clientes[0]?.idCliente || '');
  const [selectedMascotaId, setSelectedMascotaId] = useState('');
  const [selectedServicioId, setSelectedServicioId] = useState(servicios[0]?.idServicio || 1);
  const [fechaHora, setFechaHora] = useState('2026-09-23T10:00');
  const [valorTotal, setValorTotal] = useState(servicios[0]?.precioBase || 35000);
  const [observaciones, setObservaciones] = useState('');

  const clienteActual = clientes.find(c => c.idCliente === Number(selectedClienteId));
  const mascotasDisponibles = clienteActual?.mascotas || [];

  const handleServicioChange = (e) => {
    const id = Number(e.target.value);
    setSelectedServicioId(id);
    const s = servicios.find(srv => srv.idServicio === id);
    if (s) setValorTotal(s.precioBase);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedClienteId || !selectedMascotaId) {
      alert("Por favor seleccione un cliente y una mascota.");
      return;
    }

    const mascota = mascotasDisponibles.find(m => m.idMascota === Number(selectedMascotaId));
    const servicio = servicios.find(s => s.idServicio === Number(selectedServicioId));

    // Generar Token UUID Anti-IDOR
    const tokenUUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

    const nuevaCita = {
      idCita: Date.now() % 10000,
      idCliente: clienteActual.idCliente,
      nombreCliente: `${clienteActual.nombres} ${clienteActual.apellidos}`,
      telefonoCliente: clienteActual.telefonos[0]?.numero || 'Sin teléfono',
      idMascota: mascota.idMascota,
      nombreMascota: mascota.nombre,
      razaMascota: mascota.raza,
      idServicio: servicio.idServicio,
      nombreServicio: servicio.nombreServicio,
      fechaHora: fechaHora.replace('T', ' '),
      estado: 'PENDIENTE',
      valorTotal: Number(valorTotal),
      tokenAcceso: tokenUUID,
      observacionesRecepcion: observaciones,
      observacionesEntrega: '',
      peluquero: 'Carlos Gómez',
      fotos: { antes: null, despues: null }
    };

    onCrearCita(nuevaCita);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
        
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <span>📅</span> Agendar Cita y Generar Token Anti-IDOR
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* 1. Cliente */}
          <div>
            <label className="text-xs font-bold text-slate-700">1. Propietario / Dueño:</label>
            <select
              value={selectedClienteId}
              onChange={(e) => {
                setSelectedClienteId(e.target.value);
                setSelectedMascotaId('');
              }}
              required
              className="w-full border border-slate-300 rounded-xl p-2.5 text-sm bg-white font-medium"
            >
              <option value="">-- Seleccionar Propietario --</option>
              {clientes.map(cl => (
                <option key={cl.idCliente} value={cl.idCliente}>
                  {cl.nombres} {cl.apellidos} (Doc: {cl.numeroDocumento})
                </option>
              ))}
            </select>
          </div>

          {/* 2. Mascota */}
          <div>
            <label className="text-xs font-bold text-slate-700">2. Mascota:</label>
            <select
              value={selectedMascotaId}
              onChange={(e) => setSelectedMascotaId(e.target.value)}
              required
              className="w-full border border-slate-300 rounded-xl p-2.5 text-sm bg-white font-medium"
            >
              <option value="">-- Seleccione una mascota --</option>
              {mascotasDisponibles.map(m => (
                <option key={m.idMascota} value={m.idMascota}>
                  🐾 {m.nombre} ({m.raza} - {m.peso} kg)
                </option>
              ))}
            </select>
          </div>

          {/* 3. Servicio */}
          <div>
            <label className="text-xs font-bold text-slate-700">3. Servicio de Peluquería:</label>
            <select
              value={selectedServicioId}
              onChange={handleServicioChange}
              required
              className="w-full border border-slate-300 rounded-xl p-2.5 text-sm bg-white font-medium"
            >
              {servicios.map(s => (
                <option key={s.idServicio} value={s.idServicio}>
                  {s.nombreServicio} - ${s.precioBase.toLocaleString('es-CO')} ({s.duracion} min)
                </option>
              ))}
            </select>
          </div>

          {/* Fecha y Precio */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700">Fecha y Hora:</label>
              <input
                type="datetime-local"
                value={fechaHora}
                onChange={(e) => setFechaHora(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-xl p-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">Valor a Cobrar ($):</label>
              <input
                type="number"
                value={valorTotal}
                onChange={(e) => setValorTotal(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-xl p-2 text-sm font-bold text-slate-900"
              />
            </div>
          </div>

          {/* Observaciones */}
          <div>
            <label className="text-xs font-bold text-slate-700">Instrucciones de Recepción:</label>
            <textarea
              rows="2"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              placeholder="Ej. Corte de raza bajito, limpiar lagrimales..."
              className="w-full border border-slate-300 rounded-xl p-2 text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold shadow-sm"
            >
              Confirmar Turno
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
