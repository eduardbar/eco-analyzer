/**
 * Componente MaterialsList.
 * Tabla de materiales con sus scores de sostenibilidad.
 */

'use client';

import type { Material } from '@/types';
import { getScoreBadgeColor } from '@/utils/score.utils';

interface MaterialsListProps {
  materials: Material[];
}

export default function MaterialsList({ materials }: MaterialsListProps) {
  if (!materials.length) {
    return (
      <p className="text-center text-white/50 py-8">
        No hay materiales para mostrar
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/5">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-white/5 border-b border-white/10">
            <th className="py-5 px-6 text-xs font-bold text-white/50 uppercase tracking-wider">
              Material
            </th>
            <th className="py-5 px-6 text-xs font-bold text-white/50 uppercase tracking-wider text-center">
              Impacto
            </th>
            <th className="py-5 px-6 text-xs font-bold text-white/50 uppercase tracking-wider hidden md:table-cell">
              Análisis Técnico
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {materials.map((material, index) => (
            <MaterialRow key={material.id ?? index} material={material} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================================
// SUBCOMPONENTES
// ============================================================================

interface MaterialRowProps {
  material: Material;
}

function MaterialRow({ material }: MaterialRowProps) {
  const badgeColorClass = getScoreBadgeColor(material.sustainabilityScore);

  return (
    <tr className="group hover:bg-white/5 transition-colors">
      <td className="py-5 px-6">
        <span className="font-bold text-lg text-white group-hover:text-[var(--primary)] transition-colors block mb-1">
          {material.materialName}
        </span>
        {/* Notas visibles solo en móvil */}
        <span className="text-sm text-white/40 md:hidden block mt-2">
          {material.notes}
        </span>
      </td>
      <td className="py-5 px-6 text-center align-middle">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${badgeColorClass}`}>
          <span className="font-bold text-lg">
            {material.sustainabilityScore.toFixed(1)}
          </span>
          <span className="text-xs opacity-70">/10</span>
        </div>
      </td>
      <td className="py-5 px-6 text-sm text-white/70 max-w-md hidden md:table-cell leading-relaxed">
        {material.notes}
      </td>
    </tr>
  );
}
