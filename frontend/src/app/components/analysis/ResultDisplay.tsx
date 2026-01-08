/**
 * Componente ResultDisplay.
 * Muestra los resultados completos del análisis de un producto.
 */

'use client';

import type { AnalysisResult } from '@/types';
import { METRIC_THRESHOLDS, getMetricTrend } from '@/utils/score.utils';
import EcoScoreGauge from './EcoScoreGauge';
import MetricCard from './MetricCard';
import MaterialsList from './MaterialsList';

// ============================================================================
// ICONOS
// ============================================================================

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
      />
    </svg>
  );
}

// ============================================================================
// TIPOS
// ============================================================================

interface ResultDisplayProps {
  result: AnalysisResult;
  onReset: () => void;
}

// ============================================================================
// COMPONENTE
// ============================================================================

export default function ResultDisplay({ result, onReset }: ResultDisplayProps) {
  const referenceId = generateReferenceId();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8 pb-12">
      {/* Header */}
      <ResultHeader 
        title={result.productTitle}
        summary={result.summary}
        referenceId={referenceId}
        onReset={onReset}
      />

      {/* Score y Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 glass-panel p-8 flex flex-col items-center justify-center !bg-black/20">
          <EcoScoreGauge score={result.ecoScore} />
        </div>

        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <MetricCard
            title="Huella de Carbono"
            value={`${result.carbonFootprint.toFixed(1)} kg`}
            subtitle="Emisiones CO2e estimadas"
            trend={getMetricTrend(result.carbonFootprint, METRIC_THRESHOLDS.carbonFootprint)}
            icon="☁️"
          />
          <MetricCard
            title="Uso de Agua"
            value={`${result.waterUsage.toFixed(0)} L`}
            subtitle="Consumo hídrico total"
            trend={getMetricTrend(result.waterUsage, METRIC_THRESHOLDS.waterUsage)}
            icon="💧"
          />
        </div>
      </div>

      {/* Materiales */}
      {result.materials.length > 0 && (
        <div className="glass-panel p-8 !bg-black/20">
          <SectionTitle>Desglose de Materiales</SectionTitle>
          <MaterialsList materials={result.materials} />
        </div>
      )}
    </div>
  );
}

// ============================================================================
// SUBCOMPONENTES
// ============================================================================

interface ResultHeaderProps {
  title: string;
  summary: string;
  referenceId: string;
  onReset: () => void;
}

function ResultHeader({ title, summary, referenceId, onReset }: ResultHeaderProps) {
  return (
    <div className="glass-panel p-8 md:p-10 !bg-black/40">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
        <div>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[var(--primary)] mb-3">
            REF: {referenceId}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h2>
        </div>
        <button
          onClick={onReset}
          className="btn-secondary text-sm !px-6 !py-3 flex items-center gap-2 group self-start"
        >
          <RefreshIcon className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-500" />
          Nuevo Análisis
        </button>
      </div>
      <p className="text-lg text-white/70 leading-relaxed max-w-4xl border-t border-white/10 pt-6">
        {summary}
      </p>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-1 h-8 bg-[var(--primary)] rounded-full" />
      <h3 className="text-2xl font-bold">{children}</h3>
    </div>
  );
}

// ============================================================================
// UTILIDADES
// ============================================================================

function generateReferenceId(): string {
  return Math.random().toString(36).substring(2, 11).toUpperCase();
}
