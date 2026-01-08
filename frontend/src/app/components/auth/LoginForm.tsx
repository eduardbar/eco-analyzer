/**
 * Formulario de inicio de sesión.
 */

'use client';

import { useState, FormEvent } from 'react';

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onSwitchToRegister?: () => void;
  isLoading: boolean;
}

export default function LoginForm({ onLogin, isLoading }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const isValid = email.trim().length > 0 && password.trim().length > 0;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setError(null);
    try {
      await onLogin(email.trim(), password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col h-full justify-center space-y-6 animate-in fade-in duration-500"
    >
      <div className="space-y-5">
        <InputField
          label="Email Corporativo"
          type="email"
          placeholder="nombre@empresa.com"
          value={email}
          onChange={setEmail}
          disabled={isLoading}
          required
        />

        <InputField
          label="Contraseña de Acceso"
          type="password"
          placeholder="••••••••••••"
          value={password}
          onChange={setPassword}
          disabled={isLoading}
          required
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}

      <div className="pt-4">
        <button
          type="submit" 
          disabled={isLoading || !isValid} 
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/20"
        >
          {isLoading ? 'Autenticando...' : 'Acceder al Dashboard'}
        </button>
      </div>
      
      <p className="text-center text-xs text-white/30 mt-4">
        Acceso seguro encriptado de extremo a extremo
      </p>
    </form>
  );
}

// ============================================================================
// SUBCOMPONENTES
// ============================================================================

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
}

function InputField({ 
  label, 
  type, 
  placeholder, 
  value, 
  onChange, 
  disabled, 
  required 
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white/60 ml-1">
        {label}
      </label>
      <input
        type={type}
        className="input-rounded bg-white/5 border-white/10 focus:bg-white/10"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
      />
    </div>
  );
}
