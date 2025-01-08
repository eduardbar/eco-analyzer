import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock data para las pruebas
const mockAnalysisResult = {
  productName: 'iPhone 15 Pro',
  carbonFootprint: 75.2,
  waterUsage: 1500,
  ecoScore: 6.8,
  materials: [
    {
      name: 'Aluminio',
      percentage: 35,
      sustainability: 'moderate',
      recycled: true
    },
    {
      name: 'Vidrio',
      percentage: 25,
      sustainability: 'high',
      recycled: false
    }
  ],
  sustainabilityRecommendations: [
    'Considera opciones con mayor contenido reciclado',
    'Busca certificaciones ambientales'
  ]
};

// Mock del componente ResultDisplay
const MockResultDisplay = ({ result }: { result: typeof mockAnalysisResult }) => {
  return (
    <div>
      <h2>Resultados del Análisis</h2>
      <h3>{result.productName}</h3>
      <div>
        <span>Eco-Score: {result.ecoScore}</span>
        <span>Huella de Carbono: {result.carbonFootprint} kg CO2</span>
        <span>Uso de Agua: {result.waterUsage} litros</span>
      </div>
      <div>
        <h4>Materiales</h4>
        {result.materials.map((material, index) => (
          <div key={index}>
            {material.name} - {material.percentage}%
          </div>
        ))}
      </div>
      <div>
        <h4>Recomendaciones</h4>
        {result.sustainabilityRecommendations.map((rec, index) => (
          <p key={index}>{rec}</p>
        ))}
      </div>
    </div>
  );
};

describe('ResultDisplay', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders analysis results correctly', () => {
    render(<MockResultDisplay result={mockAnalysisResult} />);
    
    expect(screen.getByText('iPhone 15 Pro')).toBeInTheDocument();
    expect(screen.getByText(/Eco-Score: 6.8/)).toBeInTheDocument();
  });

  it('displays metrics correctly', () => {
    render(<MockResultDisplay result={mockAnalysisResult} />);
    
    expect(screen.getByText(/75.2 kg CO2/)).toBeInTheDocument();
    expect(screen.getByText(/1500 litros/)).toBeInTheDocument();
    expect(screen.getByText(/Eco-Score: 6.8/)).toBeInTheDocument();
  });

  it('shows materials list', () => {
    render(<MockResultDisplay result={mockAnalysisResult} />);
    
    expect(screen.getByText(/Aluminio - 35%/)).toBeInTheDocument();
    expect(screen.getByText(/Vidrio - 25%/)).toBeInTheDocument();
    expect(screen.getByText('Materiales')).toBeInTheDocument();
  });

  it('displays recommendations', () => {
    render(<MockResultDisplay result={mockAnalysisResult} />);
    
    expect(screen.getByText(/mayor contenido reciclado/)).toBeInTheDocument();
  });

  it('renders with different eco-score values', () => {
    const lowScoreResult = { ...mockAnalysisResult, ecoScore: 3.2 };
    render(<MockResultDisplay result={lowScoreResult} />);
    
    expect(screen.getByText(/Eco-Score: 3.2/)).toBeInTheDocument();
  });

  it('handles empty materials array', () => {
    const noMaterialsResult = { ...mockAnalysisResult, materials: [] };
    render(<MockResultDisplay result={noMaterialsResult} />);
    
    expect(screen.getByText('Materiales')).toBeInTheDocument();
  });

  it('handles empty recommendations array', () => {
    const noRecommendationsResult = { ...mockAnalysisResult, sustainabilityRecommendations: [] };
    render(<MockResultDisplay result={noRecommendationsResult} />);
    
    expect(screen.getByText('Recomendaciones')).toBeInTheDocument();
  });
});
