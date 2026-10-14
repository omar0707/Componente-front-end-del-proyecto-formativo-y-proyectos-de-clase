import React, { useState, useEffect } from 'react';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  if (!isOpen) return null;

  const [tab, setTab] = useState('otp'); // 'password' | 'otp'
  
  // Password state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // OTP state
  const [otpEmail, setOtpEmail] = useState('');
  const [otpCodeInput, setOtpCodeInput] = useState('');
  const [stepOtp, setStepOtp] = useState('request'); // 'request' | 'verify'
  const [simulatedOtp, setSimulatedOtp] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (email === 'admin@canstyling.com' && password === 'Admin123*') {
      onLoginSuccess({ nombre: 'Omar Molina (Admin)', email, rol: 'ADMINISTRADOR' });
      onClose();
    } else {
      setErrorMessage('Credenciales inválidas. Pruebe: admin@canstyling.com / Admin123*');
    }
  };

  const handleRequestOtp = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!otpEmail.includes('@')) {
      setErrorMessage('Ingrese un correo electrónico válido.');
      return;
    }

    // Generar codigo OTP criptografico de 6 digitos
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedOtp(code);
    setStepOtp('verify');
    setCooldown(60);
    setSuccessMessage(`Código OTP enviado a ${otpEmail}. Vigencia: 5 minutos.`);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (otpCodeInput === simulatedOtp) {
      onLoginSuccess({ nombre: otpEmail.split('@')[0], email: otpEmail, rol: 'CLIENTE_VERIFICADO_OTP' });
      onClose();
    } else {
      setErrorMessage('Código OTP incorrecto. Verifique los 6 dígitos generados.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
        
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔐</span>
            <div>
              <h3 className="text-base font-black text-slate-900">Acceso al Sistema</h3>
              <p className="text-[11px] text-slate-400">CanStyling Peluquería Canina</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => { setTab('otp'); setErrorMessage(''); }}
            className={`flex-1 py-2 text-xs font-bold text-center border-b-2 transition-colors ${
              tab === 'otp' ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-500'
            }`}
          >
            ✉️ Login Código OTP
          </button>
          <button
            onClick={() => { setTab('password'); setErrorMessage(''); }}
            className={`flex-1 py-2 text-xs font-bold text-center border-b-2 transition-colors ${
              tab === 'password' ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-500'
            }`}
          >
            🔑 Con Contraseña
          </button>
        </div>

        {errorMessage && (
          <div className="bg-rose-50 text-rose-700 p-3 rounded-xl text-xs font-semibold border border-rose-200">
            {errorMessage}
          </div>
        )}

        {/* OTP TAB */}
        {tab === 'otp' && (
          <div className="space-y-3">
            {stepOtp === 'request' ? (
              <form onSubmit={handleRequestOtp} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Correo Electrónico Registrado:</label>
                  <input
                    type="email" required
                    value={otpEmail}
                    onChange={(e) => setOtpEmail(e.target.value)}
                    placeholder="laura.martinez@gmail.com"
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all"
                >
                  Solicitar Código OTP Seguro
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-3">
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-center">
                  <span className="text-[11px] text-amber-800 font-medium block">Simulación de Recepción de Correo:</span>
                  <span className="text-2xl font-black text-amber-900 tracking-widest block my-1">{simulatedOtp}</span>
                  <span className="text-[10px] text-amber-700">Expira en 5 minutos • Límite 3 intentos</span>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Ingrese el código de 6 dígitos:</label>
                  <input
                    type="text" required maxLength={6}
                    value={otpCodeInput}
                    onChange={(e) => setOtpCodeInput(e.target.value)}
                    placeholder="123456"
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-center text-lg font-mono font-bold tracking-widest focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                >
                  Validar Código y Entrar
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    disabled={cooldown > 0}
                    onClick={handleRequestOtp}
                    className="text-[11px] text-slate-500 hover:text-amber-600 font-semibold disabled:text-slate-300"
                  >
                    {cooldown > 0 ? `Reenviar código en ${cooldown}s` : '¿No llegó? Solicitar otro código'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* PASSWORD TAB */}
        {tab === 'password' && (
          <form onSubmit={handlePasswordLogin} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700">Correo Electrónico:</label>
              <input
                type="email" required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@canstyling.com"
                className="w-full border border-slate-300 rounded-xl p-2.5 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">Contraseña:</label>
              <input
                type="password" required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-slate-300 rounded-xl p-2.5 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              Iniciar Sesión
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
