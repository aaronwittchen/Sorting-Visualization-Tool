import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock the Overlay component
jest.mock('../components/Overlay', () => {
  return function MockOverlay() {
    return <div data-testid="overlay">Overlay Component</div>;
  };
});

describe('App Component', () => {
  it('should render without crashing', () => {
    render(<App />);
    
    expect(screen.getByTestId('overlay')).toBeInTheDocument();
  });

  it('should render the main container', () => {
    render(<App />);
    
    const container = screen.getByRole('main');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('container', 'mx-auto', 'px-4');
  });

  it('should render the Overlay component', () => {
    render(<App />);
    
    expect(screen.getByText('Overlay Component')).toBeInTheDocument();
  });

  it('should have proper structure', () => {
    const { container } = render(<App />);
    
    // Should have a main container div
    const mainContainer = container.querySelector('.container');
    expect(mainContainer).toBeInTheDocument();
    
    // Should contain the overlay component
    expect(mainContainer).toContainElement(screen.getByTestId('overlay'));
  });
});
