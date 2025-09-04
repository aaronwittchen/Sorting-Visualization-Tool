import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import App from '../App';

// Mock the components to avoid dependency issues in tests
vi.mock('../components/Overlay', () => ({
  default: function MockOverlay() {
    return <div data-testid='overlay'>Overlay Component</div>;
  },
}));

vi.mock('../contexts/Context', () => ({
  default: function MockContext({ children }) {
    return <div data-testid='context-provider'>{children}</div>;
  },
}));

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('overlay')).toBeInTheDocument();
  });

  it('has correct component structure', () => {
    render(<App />);
    // Check that Context wrapper is present
    expect(screen.getByTestId('context-provider')).toBeInTheDocument();
    // Check that Overlay component is rendered inside Context
    expect(screen.getByTestId('overlay')).toBeInTheDocument();
  });

  it('applies correct CSS classes to container', () => {
    const { container } = render(<App />);
    // Check for the main container div with Tailwind classes
    const containerDiv = container.querySelector('.container.mx-auto.px-4');
    expect(containerDiv).toBeInTheDocument();
  });

  it('renders Context provider wrapping the entire app', () => {
    render(<App />);
    const contextProvider = screen.getByTestId('context-provider');
    const overlay = screen.getByTestId('overlay');
    // Verify Context is the parent of the container
    expect(contextProvider).toContainElement(overlay.closest('.container'));
  });

  it('maintains proper component hierarchy', () => {
    const { container } = render(<App />);
    // Verify the structure: Context > div.container > Overlay
    const contextProvider = screen.getByTestId('context-provider');
    const containerDiv = container.querySelector('.container');
    const overlay = screen.getByTestId('overlay');

    expect(contextProvider).toContainElement(containerDiv);
    expect(containerDiv).toContainElement(overlay);
  });

  it('renders all expected elements', () => {
    render(<App />);
    // Check that all main components are present
    expect(screen.getByTestId('context-provider')).toBeInTheDocument();
    expect(screen.getByTestId('overlay')).toBeInTheDocument();

    // Verify we have exactly one of each component
    expect(screen.getAllByTestId('context-provider')).toHaveLength(1);
    expect(screen.getAllByTestId('overlay')).toHaveLength(1);
  });
});
