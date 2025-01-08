"use client";
import React, { useState, useEffect } from 'react';
import AnalysisForm from './components/analysis/AnalysisForm';
import ResultDisplay from './components/analysis/ResultDisplay';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ErrorDisplay from './components/analysis/ErrorDisplay';
import Logo from './components/ui/Logo';
import { useAnalysis } from '@/hooks/useAnalysis';

export default function Home() {
  const { 
    result, 
    loading, 
    error, 
    authLoading,
    analyzeProduct, 
    setResult,
    login,
    register,
    isAuthenticated,
    logout
  } = useAnalysis();

  const [showLogin, setShowLogin] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Check if user is already authenticated on component mount
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        // You might want to validate the token here
        const userData = localStorage.getItem('userData');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      }
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const authResult = await login(email, password);
      setUser(authResult.user);
      if (typeof window !== 'undefined') {
        localStorage.setItem('userData', JSON.stringify(authResult.user));
      }
    } catch {
      // Error is handled by the useAnalysis hook
    }
  };

  const handleRegister = async (email: string, password: string, name: string) => {
    try {
      await register(email, password, name);
      // After successful registration, switch to login
      setShowLogin(true);
      alert('Registro exitoso. Por favor inicia sesión.');
    } catch {
      // Error is handled by the useAnalysis hook
    }
  };

  const handleAnalysis = (description: string) => {
    analyzeProduct(description);
  };

  const handleReset = () => {
    setResult(null);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userData');
    }
  };

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <main className="relative container mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-6">
              <Logo size="lg" className="mr-4" />
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                EcoAnalyzer AI
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl">
              Analiza el impacto ambiental de tus productos con inteligencia artificial avanzada
            </p>
            <p className="text-lg text-gray-400 max-w-2xl">
              Descubre cómo tus decisiones de consumo afectan al planeta y obtén recomendaciones personalizadas para un futuro más sostenible.
            </p>
          </div>

          {/* Glassmorphism Auth Container */}
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl max-w-md w-full">
            <div className="flex justify-center mb-6">
              <div className="flex bg-white/5 rounded-full p-1">
                <button
                  onClick={() => setShowLogin(true)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    showLogin 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => setShowLogin(false)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    !showLogin 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Registrarse
                </button>
              </div>
            </div>

            {showLogin ? (
              <LoginForm
                onLogin={handleLogin}
                onSwitchToRegister={() => setShowLogin(false)}
                isLoading={authLoading}
              />
            ) : (
              <RegisterForm
                onRegister={handleRegister}
                onSwitchToLogin={() => setShowLogin(true)}
                isLoading={authLoading}
              />
            )}
          </div>

          {error && (
            <div className="mt-6 w-full max-w-md">
              <ErrorDisplay message={error} />
            </div>
          )}

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl w-full">
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-green-400">Análisis Inteligente</h3>
              <p className="text-gray-400 text-sm">
                IA avanzada que evalúa el impacto ambiental de productos y servicios
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-blue-400">Puntuación Eco</h3>
              <p className="text-gray-400 text-sm">
                Sistema de puntuación claro y comprensible para decisiones informadas
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-purple-400">Recomendaciones</h3>
              <p className="text-gray-400 text-sm">
                Sugerencias personalizadas para reducir tu huella de carbono
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header with glassmorphism */}
      <header className="relative backdrop-blur-lg bg-white/5 border-b border-white/10 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Logo size="sm" className="mr-3" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              EcoAnalyzer AI
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <span className="text-gray-300 bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                Hola, {user.name}
              </span>
            )}
            <a
              href="/history"
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white rounded-full transition-all duration-300 shadow-lg backdrop-blur-sm"
            >
              Historial
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-full transition-all duration-300 shadow-lg backdrop-blur-sm"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="relative container mx-auto p-4 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-4xl">
          {result ? (
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
              <ResultDisplay result={result} onReset={handleReset} />
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                  Analiza tu Producto
                </h2>
                <p className="text-gray-300 text-lg">
                  Describe el producto que quieres analizar y obtén un análisis completo de su impacto ambiental
                </p>
              </div>
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
                <AnalysisForm onSubmit={handleAnalysis} isLoading={loading} />
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-6 w-full max-w-2xl">
            <div className="backdrop-blur-lg bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
              <ErrorDisplay 
                message={error} 
                onRetry={() => window.location.reload()}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
