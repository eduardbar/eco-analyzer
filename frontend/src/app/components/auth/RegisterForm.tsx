/**
 * Formulario de registro de usuario.
 */

'use client';

import { useState, FormEvent } from 'react';

interface RegisterFormProps {
  onRegister: (email: string, password: string, name: string) => Promise<void>;
  onSwitchToLogin?: () => void;
  isLoading: boolean;
}

export default function RegisterForm({ onRegister, isLoading }: RegisterFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const passwordsMatch = password === confirmPassword;
  const isValid = 
    name.trim().length > 0 && 
    email.trim().length > 0 && 
    password.length >= 6 && 
    passwordsMatch;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!passwordsMatch) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setError(null);
    try {
      await onRegister(email.trim(), password, name.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrar');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col h-full justify-center space-y-5 animate-in fade-in duration-500"
    >
      <InputField
        label="Nombre Completo"
        type="text"
        placeholder="Ej: Ana García"
        value={name}
        onChange={setName}
        disabled={isLoading}
        required
      />

      <InputField
        label="Email Profesional"
        type="email"
        placeholder="nombre@empresa.com"
        value={email}
        onChange={setEmail}
        disabled={isLoading}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
          disabled={isLoading}
          required
        />

        <InputField
          label="Confirmar"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={setConfirmPassword}
          disabled={isLoading}
          required
          error={confirmPassword.length > 0 && !passwordsMatch}
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
          {isLoading ? 'Creando cuenta...' : 'Comenzar Ahora'}
        </button>
      </div>
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
  error?: boolean;
}

function InputField({ 
  label, 
  type, 
  placeholder, 
  value, 
  onChange, 
  disabled, 
  required,
  error 
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white/60 ml-1">
        {label}
      </label>
      <input
        type={type}
        className={`input-rounded ${error ? 'border-red-500/50' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
      />
    </div>
  );
}
