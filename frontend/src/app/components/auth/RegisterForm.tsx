import React, { useState } from 'react';

interface RegisterFormProps {
  onRegister: (email: string, password: string, name: string) => Promise<void>;
  onSwitchToLogin: () => void;
  isLoading: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister, onSwitchToLogin, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim() || !name.trim() || !confirmPassword.trim()) return;
    
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    await onRegister(email, password, name);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <input
            type="text"
            className="w-full p-4 bg-white/5 text-white rounded-2xl border border-white/10 focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:outline-none transition-all duration-300 placeholder-gray-400 backdrop-blur-sm"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div>
          <input
            type="email"
            className="w-full p-4 bg-white/5 text-white rounded-2xl border border-white/10 focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:outline-none transition-all duration-300 placeholder-gray-400 backdrop-blur-sm"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div>
          <input
            type="password"
            className="w-full p-4 bg-white/5 text-white rounded-2xl border border-white/10 focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:outline-none transition-all duration-300 placeholder-gray-400 backdrop-blur-sm"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div>
          <input
            type="password"
            className="w-full p-4 bg-white/5 text-white rounded-2xl border border-white/10 focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:outline-none transition-all duration-300 placeholder-gray-400 backdrop-blur-sm"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            required
          />
          {password && confirmPassword && password !== confirmPassword && (
            <p className="text-red-400 text-xs mt-2">Las contraseñas no coinciden</p>
          )}
        </div>
      </div>

      <button
        type="submit" 
        disabled={isLoading || !email.trim() || !password.trim() || !name.trim() || !confirmPassword.trim() || password !== confirmPassword} 
        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-4 px-6 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Registrando...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <span>Crear Cuenta</span>
          </div>
        )}
      </button>

      <div className="text-center">
        <span className="text-gray-400 text-sm">¿Ya tienes cuenta? </span>
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-purple-400 hover:text-purple-300 transition-colors duration-300 text-sm font-medium"
          disabled={isLoading}
        >
          Inicia sesión aquí
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
