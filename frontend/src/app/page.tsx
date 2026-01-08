/**
 * Página principal de EcoAnalyzer.
 * Maneja autenticación y análisis de productos.
 */

'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAnalysis } from '@/hooks/useAnalysis';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import AnalysisForm from './components/analysis/AnalysisForm';
import ResultDisplay from './components/analysis/ResultDisplay';
import Logo from './components/ui/Logo';

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function Home() {
  const { user, isLoading: authLoading, isAuthenticated, login, register, logout } = useAuth();
  const { result, isLoading: analysisLoading, error, analyzeProduct, clearResult, clearError } = useAnalysis();
  
  const [showLogin, setShowLogin] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Evitar problemas de hidratación SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  // Limpiar errores al cambiar de vista
  useEffect(() => {
    clearError();
  }, [showLogin, clearError]);

  const handleLogin = async (email: string, password: string) => {
    await login({ email, password });
  };

  const handleRegister = async (email: string, password: string, name: string) => {
    await register({ email, password, name });
    setShowLogin(true);
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen selection:bg-[var(--primary)] selection:text-white">
      <Navbar user={user} onLogout={logout} showLogin={showLogin} />

      <main className="flex-grow container mx-auto px-4 pt-32 pb-20">
        {!isAuthenticated ? (
          <UnauthenticatedView
            showLogin={showLogin}
            setShowLogin={setShowLogin}
            onLogin={handleLogin}
            onRegister={handleRegister}
            isLoading={authLoading}
          />
        ) : (
          <AuthenticatedView
            result={result}
            isLoading={analysisLoading}
            onAnalyze={analyzeProduct}
            onReset={clearResult}
          />
        )}

        {error && <ErrorToast message={error} onDismiss={clearError} />}
      </main>
    </div>
  );
}

// ============================================================================
// SUBCOMPONENTES
// ============================================================================

interface NavbarProps {
  user: { name: string | null; email: string } | null;
  onLogout: () => void;
  showLogin: boolean;
}

function Navbar({ user, onLogout, showLogin }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="glass-panel max-w-7xl mx-auto px-6 h-16 flex justify-between items-center !rounded-full !bg-black/40">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="font-bold text-lg tracking-wide">EcoAnalyzer</span>
        </div>
        
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <span className="text-sm text-white/70 hidden md:block px-4 py-1 rounded-full bg-white/5 border border-white/5">
                {user.name || user.email}
              </span>
              <button 
                onClick={onLogout}
                className="text-sm font-medium hover:text-[var(--primary)] transition-colors"
              >
                Salir
              </button>
            </>
          ) : (
            <span className="text-sm font-medium text-white/70">
              {showLogin ? 'Bienvenido' : 'Únete'}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

interface UnauthenticatedViewProps {
  showLogin: boolean;
  setShowLogin: (show: boolean) => void;
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (email: string, password: string, name: string) => Promise<void>;
  isLoading: boolean;
}

function UnauthenticatedView({ 
  showLogin, 
  setShowLogin, 
  onLogin, 
  onRegister, 
  isLoading 
}: UnauthenticatedViewProps) {
  return (
    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <HeroSection />
      
      <div className="glass-panel p-8 md:p-12 animate-in slide-in-from-right duration-700 hover:shadow-orange-500/5 transition-all">
        <AuthTabs showLogin={showLogin} setShowLogin={setShowLogin} />
        
        <div className="min-h-[400px]">
          {showLogin ? (
            <LoginForm
              onLogin={onLogin}
              onSwitchToRegister={() => setShowLogin(false)}
              isLoading={isLoading}
            />
          ) : (
            <RegisterForm
              onRegister={onRegister}
              onSwitchToLogin={() => setShowLogin(true)}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <div className="space-y-8 animate-in slide-in-from-left duration-700">
      <div className="inline-block px-4 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-2">
        ✨ Nueva Versión 2.0
      </div>
      <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
        El futuro es <br/>
        <span className="bg-gradient-to-r from-[var(--primary)] to-orange-300 bg-clip-text text-transparent">
          Sostenible
        </span>
      </h1>
      <p className="text-lg text-[var(--text-muted)] leading-relaxed max-w-lg">
        EcoAnalyzer utiliza inteligencia artificial avanzada para desglosar el impacto 
        ambiental de cualquier producto en segundos.
      </p>
      
      <div className="grid grid-cols-2 gap-6 pt-4">
        <FeatureCard icon="🌍" title="Impacto Global" description="Mide la huella real de CO2" />
        <FeatureCard icon="💧" title="Recursos" description="Análisis de consumo hídrico" />
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="glass-panel !bg-white/5 p-5 !rounded-2xl hover:bg-white/10 transition-colors">
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="font-bold mb-1">{title}</h3>
      <p className="text-sm text-[var(--text-muted)]">{description}</p>
    </div>
  );
}

interface AuthTabsProps {
  showLogin: boolean;
  setShowLogin: (show: boolean) => void;
}

function AuthTabs({ showLogin, setShowLogin }: AuthTabsProps) {
  return (
    <div className="flex mb-8 bg-black/20 p-1 rounded-full">
      <button
        onClick={() => setShowLogin(true)}
        className={`flex-1 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
          showLogin 
            ? 'bg-[var(--primary)] text-white shadow-lg' 
            : 'text-white/50 hover:text-white'
        }`}
      >
        Iniciar Sesión
      </button>
      <button
        onClick={() => setShowLogin(false)}
        className={`flex-1 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
          !showLogin 
            ? 'bg-[var(--primary)] text-white shadow-lg' 
            : 'text-white/50 hover:text-white'
        }`}
      >
        Registrarse
      </button>
    </div>
  );
}

interface AuthenticatedViewProps {
  result: import('@/types').AnalysisResult | null;
  isLoading: boolean;
  onAnalyze: (description: string) => Promise<void>;
  onReset: () => void;
}

function AuthenticatedView({ result, isLoading, onAnalyze, onReset }: AuthenticatedViewProps) {
  return (
    <div className="max-w-5xl mx-auto">
      {!result ? (
        <div className="animate-in zoom-in-95 duration-500 text-center space-y-8">
          <div>
            <h2 className="text-4xl font-bold mb-4">¿Qué analizaremos hoy?</h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Describe detalladamente el producto. Nuestra IA evaluará materiales, 
              procesos de fabricación y ciclo de vida.
            </p>
          </div>
          <div className="glass-panel p-8 md:p-12 max-w-3xl mx-auto !bg-black/40">
            <AnalysisForm onSubmit={onAnalyze} isLoading={isLoading} />
          </div>
        </div>
      ) : (
        <ResultDisplay result={result} onReset={onReset} />
      )}
    </div>
  );
}

interface ErrorToastProps {
  message: string;
  onDismiss: () => void;
}

function ErrorToast({ message, onDismiss }: ErrorToastProps) {
  return (
    <div 
      className="fixed bottom-6 right-6 max-w-sm glass-panel !bg-red-500/10 !border-red-500/30 text-white p-6 shadow-xl animate-in slide-in-from-right flex items-center gap-4"
      role="alert"
    >
      <div className="w-2 h-2 rounded-full bg-red-500" />
      <p className="text-sm font-medium flex-1">{message}</p>
      <button 
        onClick={onDismiss}
        className="text-white/50 hover:text-white transition-colors"
        aria-label="Cerrar"
      >
        ✕
      </button>
    </div>
  );
}
