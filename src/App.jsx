import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Dashboard from './components/Dashboard.jsx';
import CitasDataTable from './components/CitasDataTable.jsx';
import ClientesDataTable from './components/ClientesDataTable.jsx';
import PeluqueroMobileApp from './components/PeluqueroMobileApp.jsx';
import AlbumDigitalCliente from './components/AlbumDigitalCliente.jsx';
import AgendarCitaModal from './components/AgendarCitaModal.jsx';
import LoginModal from './components/LoginModal.jsx';

import { INITIAL_CITAS, INITIAL_CLIENTS, INITIAL_SERVICES } from './data/mockData.js';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [citas, setCitas] = useState(INITIAL_CITAS);
  const [clientes, setClientes] = useState(INITIAL_CLIENTS);
  const [servicios] = useState(INITIAL_SERVICES);
  
  // Modals & Navigation state
  const [isAgendarOpen, setIsAgendarOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedAlbumToken, setSelectedAlbumToken] = useState('e4b2d18a-78f9-4c12-98ab-34cd56ef7890');
  const [currentUser, setCurrentUser] = useState({
    nombre: 'Omar Molina (Admin)',
    email: 'admin@canstyling.com',
    rol: 'ADMINISTRADOR'
  });

  // Handlers
  const handleCrearCita = (nuevaCita) => {
    setCitas([nuevaCita, ...citas]);
  };

  const handleCompletarCita = (idCita, observaciones = '') => {
    setCitas(citas.map(c => {
      if (c.idCita === idCita) {
        return {
          ...c,
          estado: 'COMPLETADA',
          observacionesEntrega: observaciones || 'Servicio finalizado con éxito.'
        };
      }
      return c;
    }));
  };

  const handleUpdateCitaFoto = (idCita, tipo, dataUrl) => {
    setCitas(citas.map(c => {
      if (c.idCita === idCita) {
        return {
          ...c,
          fotos: {
            ...c.fotos,
            [tipo]: dataUrl
          }
        };
      }
      return c;
    }));
  };

  const handleAddCliente = (nuevoCliente) => {
    const id = Date.now() % 10000;
    const cl = {
      ...nuevoCliente,
      idCliente: id,
      telefonos: [
        { id: id * 10 + 1, numero: nuevoCliente.telefono, tipo: 'WHATSAPP', esPrincipal: true, verificado: true }
      ],
      mascotas: []
    };
    setClientes([cl, ...clientes]);
  };

  const handleAddMascota = (idCliente, nuevaMascota) => {
    const idMascota = Date.now() % 10000;
    setClientes(clientes.map(cl => {
      if (cl.idCliente === idCliente) {
        return {
          ...cl,
          mascotas: [...(cl.mascotas || []), { ...nuevaMascota, idMascota }]
        };
      }
      return cl;
    }));
  };

  const handleVerAlbum = (token) => {
    setSelectedAlbumToken(token);
    setActiveView('album');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-amber-500 selection:text-white">
      {/* Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        user={currentUser}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={() => setCurrentUser(null)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {activeView === 'dashboard' && (
          <Dashboard
            citas={citas}
            clientes={clientes}
            setActiveView={setActiveView}
            onOpenAgendar={() => setIsAgendarOpen(true)}
          />
        )}

        {activeView === 'citas' && (
          <CitasDataTable
            citas={citas}
            onOpenAgendar={() => setIsAgendarOpen(true)}
            onCompletarCita={handleCompletarCita}
            onVerAlbum={handleVerAlbum}
          />
        )}

        {activeView === 'clientes' && (
          <ClientesDataTable
            clientes={clientes}
            onAddCliente={handleAddCliente}
            onAddMascota={handleAddMascota}
          />
        )}

        {activeView === 'peluquero' && (
          <PeluqueroMobileApp
            citas={citas}
            onUpdateCitaFoto={handleUpdateCitaFoto}
            onFinalizarServicio={handleCompletarCita}
            onVerAlbum={handleVerAlbum}
          />
        )}

        {activeView === 'album' && (
          <AlbumDigitalCliente
            citas={citas}
            initialToken={selectedAlbumToken}
            onBackToDashboard={() => setActiveView('dashboard')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <p className="font-semibold text-slate-700">CanStyling &copy; 2026 - Peluquería Canina</p>
        <p className="mt-1">
          SENA ADSO Ficha 3186645 | Evidencia: GA7-220501096-AA4-EV03 | Aprendiz: Omar Ulpiano Molina Malaver
        </p>
      </footer>

      {/* Modals */}
      <AgendarCitaModal
        isOpen={isAgendarOpen}
        onClose={() => setIsAgendarOpen(false)}
        clientes={clientes}
        servicios={servicios}
        onCrearCita={handleCrearCita}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(u) => setCurrentUser(u)}
      />
    </div>
  );
}
