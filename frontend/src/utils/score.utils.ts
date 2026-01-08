/**
 * Utilidades para manejo de scores y colores.
 * Centraliza la lógica de UI relacionada con puntuaciones.
 */

import type { ScoreLevel } from '@/types';

// ============================================================================
// CONSTANTES
// ============================================================================

const SCORE_THRESHOLDS = {
  high: 7.5,
  medium: 5,
} as const;

// ============================================================================
// FUNCIONES DE NIVEL DE SCORE
// ============================================================================

/**
 * Determina el nivel de un score (alto, medio, bajo).
 */
export function getScoreLevel(score: number): ScoreLevel {
  if (score >= SCORE_THRESHOLDS.high) return 'high';
  if (score >= SCORE_THRESHOLDS.medium) return 'medium';
  return 'low';
}

// ============================================================================
// CLASES DE TAILWIND POR NIVEL
// ============================================================================

const TEXT_COLORS: Record<ScoreLevel, string> = {
  high: 'text-green-500',
  medium: 'text-yellow-500',
  low: 'text-red-500',
};

const BG_COLORS: Record<ScoreLevel, string> = {
  high: 'bg-green-500/10 border-green-500/30',
  medium: 'bg-yellow-500/10 border-yellow-500/30',
  low: 'bg-red-500/10 border-red-500/30',
};

const BADGE_COLORS: Record<ScoreLevel, string> = {
  high: 'bg-green-500/20 text-green-400',
  medium: 'bg-yellow-500/20 text-yellow-400',
  low: 'bg-red-500/20 text-red-400',
};

// ============================================================================
// FUNCIONES DE COLORES
// ============================================================================

/**
 * Obtiene la clase de color de texto para un score.
 */
export function getScoreTextColor(score: number): string {
  return TEXT_COLORS[getScoreLevel(score)];
}

/**
 * Obtiene la clase de color de fondo para un score.
 */
export function getScoreBgColor(score: number): string {
  return BG_COLORS[getScoreLevel(score)];
}

/**
 * Obtiene las clases de badge para un score.
 */
export function getScoreBadgeColor(score: number): string {
  return BADGE_COLORS[getScoreLevel(score)];
}

// ============================================================================
// ETIQUETAS
// ============================================================================

const SCORE_LABELS: Record<ScoreLevel, string> = {
  high: 'Excelente',
  medium: 'Moderado',
  low: 'Bajo',
};

/**
 * Obtiene la etiqueta descriptiva para un score.
 */
export function getScoreLabel(score: number): string {
  return SCORE_LABELS[getScoreLevel(score)];
}

// ============================================================================
// TENDENCIAS
// ============================================================================

/**
 * Determina si una métrica indica impacto alto o bajo.
 */
export function getMetricTrend(
  value: number,
  threshold: number
): 'high' | 'low' {
  return value > threshold ? 'high' : 'low';
}

/**
 * Umbrales para métricas específicas.
 */
export const METRIC_THRESHOLDS = {
  carbonFootprint: 10, // kg CO2
  waterUsage: 500, // litros
} as const;
