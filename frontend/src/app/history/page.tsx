"use client";
import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useAnalysis } from '@/hooks/useAnalysis';
import GlassCard from '../components/ui/GlassCard';
import ErrorDisplay from '../components/analysis/ErrorDisplay';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface HistoryAnalysis {
  id: number;
  productTitle: string;
  ecoScore: number;
  summary: string;
  carbonFootprint: number;
  waterUsage: number;
  createdAt: string;
  materials: {
    materialName: string;
    sustainabilityScore: number;
    notes: string;
  }[];
}

export default function HistoryPage() {
  const { getAnalysisHistory, loading, error, isAuthenticated } = useAnalysis();
  const [history, setHistory] = useState<HistoryAnalysis[]>([]);

  const loadHistory = useCallback(async () => {
    try {
      const data = await getAnalysisHistory();
      setHistory(data);
    } catch {
      // Error is handled by the hook
    }
  }, [getAnalysisHistory]);

  useEffect(() => {
    // Temporalmente deshabilitado para evitar errores 404
    // if (isAuthenticated()) {
    //   loadHistory();
    // }
  }, [isAuthenticated, loadHistory]);

  const getEcoScoreColor = (score: number) => {
    if (score >= 7.5) return 'text-green-400';
    if (score >= 5) return 'text-yellow-400';
    return 'text-red-400';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen bg-gray-900 text-white bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
        <ErrorDisplay message="Debes iniciar sesión para ver tu historial" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white bg-gradient-to-br from-purple-900 to-blue-900">
      <header className="p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Historial de Análisis</h1>
          <Link
            href="/"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-300"
          >
            Nuevo Análisis
          </Link>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {loading && (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {error && (
          <ErrorDisplay message={error} onRetry={loadHistory} />
        )}

        {!loading && !error && history.length === 0 && (
          <GlassCard className="p-8 text-center">
            <h2 className="text-xl font-bold mb-4">No hay análisis aún</h2>
            <p className="text-white/80 mb-6">
              Realiza tu primer análisis para ver el historial aquí.
            </p>
            <Link
              href="/"
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-300 inline-block"
            >
              Crear Análisis
            </Link>
          </GlassCard>
        )}

        {!loading && !error && history.length > 0 && (
          <div className="space-y-4">
            {history.map((analysis) => (
              <GlassCard key={analysis.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {analysis.productTitle}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {formatDate(analysis.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getEcoScoreColor(analysis.ecoScore)}`}>
                      {analysis.ecoScore.toFixed(1)}
                    </div>
                    <div className="text-white/60 text-sm">Eco-Score</div>
                  </div>
                </div>

                <p className="text-white/80 mb-4">{analysis.summary}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-white/60 text-sm">Huella de Carbono</div>
                    <div className="text-white font-semibold">
                      {analysis.carbonFootprint} kg CO₂
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-white/60 text-sm">Uso de Agua</div>
                    <div className="text-white font-semibold">
                      {analysis.waterUsage} L
                    </div>
                  </div>
                </div>

                {analysis.materials && analysis.materials.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-white mb-2">Materiales:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {analysis.materials.map((material, index) => (
                        <div key={index} className="text-sm bg-white/5 rounded p-2">
                          <div className="flex justify-between">
                            <span className="text-white">{material.materialName}</span>
                            <span className={`font-semibold ${getEcoScoreColor(material.sustainabilityScore)}`}>
                              {material.sustainabilityScore.toFixed(1)}/10
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </GlassCard>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
