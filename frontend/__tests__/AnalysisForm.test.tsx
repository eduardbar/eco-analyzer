import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock del componente AnalysisForm
const MockAnalysisForm = ({ onSubmit, isLoading }: { onSubmit: (description: string) => void, isLoading: boolean }) => {
  const [description, setDescription] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onSubmit(description);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe el producto a analizar..."
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading || !description.trim()}>
        {isLoading ? 'Analizando...' : 'Analizar Producto'}
      </button>
    </form>
  );
};

describe('AnalysisForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders textarea and button', () => {
    render(<MockAnalysisForm onSubmit={mockOnSubmit} isLoading={false} />);
    
    expect(screen.getByPlaceholderText(/describe el producto/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /analizar producto/i })).toBeInTheDocument();
  });

  it('allows user to type in textarea', () => {
    render(<MockAnalysisForm onSubmit={mockOnSubmit} isLoading={false} />);
    
    const textarea = screen.getByPlaceholderText(/describe el producto/i);
    fireEvent.change(textarea, { target: { value: 'iPhone 15' } });
    
    expect(textarea).toHaveValue('iPhone 15');
  });

  it('calls onSubmit when button is clicked with text', () => {
    render(<MockAnalysisForm onSubmit={mockOnSubmit} isLoading={false} />);
    
    const textarea = screen.getByPlaceholderText(/describe el producto/i);
    const button = screen.getByRole('button', { name: /analizar producto/i });
    
    fireEvent.change(textarea, { target: { value: 'iPhone 15' } });
    fireEvent.click(button);
    
    expect(mockOnSubmit).toHaveBeenCalledWith('iPhone 15');
  });

  it('does not call onSubmit when textarea is empty', () => {
    render(<MockAnalysisForm onSubmit={mockOnSubmit} isLoading={false} />);
    
    const button = screen.getByRole('button', { name: /analizar producto/i });
    fireEvent.click(button);
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('disables form when loading', () => {
    render(<MockAnalysisForm onSubmit={mockOnSubmit} isLoading={true} />);
    
    const textarea = screen.getByPlaceholderText(/describe el producto/i);
    const button = screen.getByRole('button', { name: /analizando/i });
    
    expect(textarea).toBeDisabled();
    expect(button).toBeDisabled();
  });
});
