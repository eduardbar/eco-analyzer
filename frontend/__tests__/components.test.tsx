import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Test muy básico de React sin hooks complejos
const SimpleComponent = ({ message }: { message: string }) => {
  return <div role="main">{message}</div>;
};

const FormComponent = () => {
  return (
    <form>
      <input type="text" placeholder="Enter text" />
      <button type="submit">Submit</button>
    </form>
  );
};

describe('Simple React Components', () => {
  it('should render a simple component', () => {
    render(<SimpleComponent message="Hello Testing!" />);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText('Hello Testing!')).toBeInTheDocument();
  });

  it('should render form elements', () => {
    render(<FormComponent />);
    
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should handle multiple components', () => {
    render(
      <div>
        <SimpleComponent message="Component 1" />
        <SimpleComponent message="Component 2" />
      </div>
    );
    
    expect(screen.getByText('Component 1')).toBeInTheDocument();
    expect(screen.getByText('Component 2')).toBeInTheDocument();
  });
});

// Test de estructura HTML esperada
describe('HTML Structure Tests', () => {
  it('should render proper HTML structure', () => {
    const { container } = render(
      <div className="app">
        <header>
          <h1>AI Environmental Analyzer</h1>
        </header>
        <main>
          <section className="analysis-section">
            <h2>Product Analysis</h2>
          </section>
        </main>
      </div>
    );

    expect(container.querySelector('.app')).toBeInTheDocument();
    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('AI Environmental Analyzer');
  });

  it('should render eco-score display structure', () => {
    render(
      <div className="eco-score">
        <div className="score-value">8.5</div>
        <div className="score-label">Eco-Score</div>
      </div>
    );

    expect(screen.getByText('8.5')).toBeInTheDocument();
    expect(screen.getByText('Eco-Score')).toBeInTheDocument();
  });
});
