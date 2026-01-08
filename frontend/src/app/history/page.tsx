/**
 * Página de historial de análisis.
 * Muestra todos los análisis previos del usuario.
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useAuth, isAuthenticated as checkAuth } from '@/hooks/useAuth';
import { useAnalysis } from '@/hooks/useAnalysis';
import type { AnalysisResult } from '@/types';
import { getScoreTextColor } from '@/utils/score.utils';
import GlassCard from '../components/ui/GlassCard';
import ErrorDisplay from '../components/analysis/ErrorDisplay';
import LoadingSpinner from '../components/ui/LoadingSpinner';

// ============================================================================
// UTILIDADES
// ============================================================================

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function HistoryPage() {
  const { isAuthenticated } = useAuth();
  const { getHistory, isLoading, error } = useAnalysis();
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [mounted, setMounted] = useState(false);

  const loadHistory = useCallback(async () => {
    try {
      const data = await getHistory();
      setHistory(data);
    } catch {
      // Error manejado por el hook
    }
  }, [getHistory]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && checkAuth()) {
      loadHistory();
    }
  }, [mounted, loadHistory]);

  // Evitar problemas de hidratación
  if (!mounted) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <GlassCard className="p-8 text-center max-w-md">
          <h2 className="text-xl font-bold mb-4">Acceso Restringido</h2>
          <p className="text-white/70 mb-6">
            Debes iniciar sesión para ver tu historial de análisis.
          </p>
          <Link href="/" className="btn-primary inline-block">
            Iniciar Sesión
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto p-4 pt-24">
        {isLoading && <LoadingState />}
        
        {error && <ErrorDisplay message={error} onRetry={loadHistory} />}
        
        {!isLoading && !error && history.length === 0 && <EmptyState />}
        
        {!isLoading && !error && history.length > 0 && (
          <HistoryList history={history} />
        )}
      </main>
    </div>
  );
}

// ============================================================================
// SUBCOMPONENTES
// ============================================================================

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="glass-panel max-w-7xl mx-auto px-6 h-16 flex justify-between items-center !rounded-full !bg-black/40">
        <h1 className="text-xl font-bold">Historial de Análisis</h1>
        <Link
          href="/"
          className="btn-primary text-sm !px-4 !py-2"
        >
          Nuevo Análisis
        </Link>
      </div>
    </header>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col justify-center items-center py-12 gap-4">
      <LoadingSpinner size="lg" />
      <p className="text-white/50">Cargando historial...</p>
    </div>
  );
}

function EmptyState() {
  return (
    <GlassCard className="p-8 text-center max-w-md mx-auto">
      <div className="text-4xl mb-4">📊</div>
      <h2 className="text-xl font-bold mb-4">No hay análisis aún</h2>
      <p className="text-white/70 mb-6">
        Realiza tu primer análisis para comenzar a construir tu historial.
      </p>
      <Link href="/" className="btn-primary inline-block">
        Crear Análisis
      </Link>
    </GlassCard>
  );
}

interface HistoryListProps {
  history: AnalysisResult[];
}

function HistoryList({ history }: HistoryListProps) {
  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <p className="text-white/50 text-sm mb-6">
        {history.length} análisis encontrado{history.length !== 1 ? 's' : ''}
      </p>
      {history.map((analysis) => (
        <AnalysisCard key={analysis.id} analysis={analysis} />
      ))}
    </div>
  );
}

interface AnalysisCardProps {
  analysis: AnalysisResult;
}

function AnalysisCard({ analysis }: AnalysisCardProps) {
  const scoreColor = getScoreTextColor(analysis.ecoScore);

  return (
    <GlassCard className="p-6 hover:bg-white/5 transition-colors">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">
            {analysis.productTitle}
          </h3>
          <p className="text-white/50 text-sm">
            {formatDate(analysis.createdAt)}
          </p>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-bold ${scoreColor}`}>
            {analysis.ecoScore.toFixed(1)}
          </div>
          <div className="text-white/50 text-xs uppercase tracking-wider">
            Eco-Score
          </div>
        </div>
      </div>

      {/* Summary */}
      <p className="text-white/70 mb-4 line-clamp-2">{analysis.summary}</p>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <MetricBadge label="Huella de Carbono" value={`${analysis.carbonFootprint.toFixed(1)} kg CO₂`} />
        <MetricBadge label="Uso de Agua" value={`${analysis.waterUsage.toFixed(0)} L`} />
      </div>

      {/* Materials */}
      {analysis.materials.length > 0 && (
        <MaterialsPreview materials={analysis.materials} />
      )}
    </GlassCard>
  );
}

interface MetricBadgeProps {
  label: string;
  value: string;
}

function MetricBadge({ label, value }: MetricBadgeProps) {
  return (
    <div className="bg-white/5 rounded-lg p-3 border border-white/5">
      <div className="text-white/50 text-xs uppercase tracking-wider mb-1">{label}</div>
      <div className="text-white font-semibold">{value}</div>
    </div>
  );
}

interface MaterialsPreviewProps {
  materials: AnalysisResult['materials'];
}

function MaterialsPreview({ materials }: MaterialsPreviewProps) {
  const displayMaterials = materials.slice(0, 4);
  const remaining = materials.length - 4;

  return (
    <div className="border-t border-white/10 pt-4 mt-4">
      <h4 className="text-xs uppercase tracking-wider text-white/50 mb-2">
        Materiales
      </h4>
      <div className="flex flex-wrap gap-2">
        {displayMaterials.map((material, index) => (
          <span
            key={index}
            className={`text-xs px-2 py-1 rounded-full ${getScoreTextColor(material.sustainabilityScore)} bg-white/5`}
          >
            {material.materialName} ({material.sustainabilityScore.toFixed(1)})
          </span>
        ))}
        {remaining > 0 && (
          <span className="text-xs px-2 py-1 rounded-full text-white/50 bg-white/5">
            +{remaining} más
          </span>
        )}
      </div>
    </div>
  );
}
