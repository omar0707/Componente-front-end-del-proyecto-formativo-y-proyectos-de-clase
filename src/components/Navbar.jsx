import React from 'react';

export default function Navbar({ activeView, setActiveView, user, onOpenLogin, onLogout }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div 
          onClick={() => setActiveView('dashboard')}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <span className="text-2xl transition-transform group-hover:scale-110">🐕</span>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">
            Can<span className="text-amber-500">Styling</span>
          </span>
          <span className="hidden sm:inline-block ml-2 text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
            Front-End React
          </span>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeView === 'dashboard' 
                ? 'bg-amber-500 text-white shadow-sm' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            📊 Panel
          </button>

          <button
            onClick={() => setActiveView('citas')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeView === 'citas' 
                ? 'bg-amber-500 text-white shadow-sm' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            📅 Turnos (DataTable)
          </button>

          <button
            onClick={() => setActiveView('clientes')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeView === 'clientes' 
                ? 'bg-amber-500 text-white shadow-sm' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            👥 Clientes
          </button>

          <button
            onClick={() => setActiveView('peluquero')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1 ${
              activeView === 'peluquero' 
                ? 'bg-sky-600 text-white shadow-sm' 
                : 'text-sky-700 bg-sky-50 hover:bg-sky-100'
            }`}
          >
            📱 <span className="hidden sm:inline">WebApp</span> Peluquero
          </button>

          <button
            onClick={() => setActiveView('album')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeView === 'album' 
                ? 'bg-amber-500 text-white shadow-sm' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            🖼️ Álbum Cliente
          </button>
        </nav>

        {/* User / Auth status */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden md:block text-right">
                <div className="text-xs font-bold text-slate-800">{user.nombre}</div>
                <div className="text-[10px] text-amber-600 font-semibold">{user.rol}</div>
              </div>
              <button
                onClick={onLogout}
                className="text-xs font-semibold px-2.5 py-1.5 rounded-md bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                title="Cerrar Sesión"
              >
                Salir 🚪
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-sm transition-all"
            >
              🔐 Acceso (OTP / Clave)
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
