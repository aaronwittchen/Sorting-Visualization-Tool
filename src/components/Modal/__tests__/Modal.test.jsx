import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import Modal from '../Modal';

// Mock data
const mockAboutAlgorithm = {
  bubble_sort: {
    name: 'Bubble Sort',
    description:
      'Bubble Sort is a straightforward sorting algorithm known for its simplicity.',
    time_complexity: {
      best: ['O(n)', 'amber-500'],
      average: ['O(n²)', 'rose-500'],
      worst: ['O(n²)', 'rose-500'],
    },
    space_complexity: ['O(1)', 'teal-800'],
  },
  quick_sort: {
    name: 'Quick Sort',
    description: 'Quick desc',
    time_complexity: {
      best: ['O(n log n)', 'amber-500'],
      average: ['O(n log n)', 'amber-500'],
      worst: ['O(n²)', 'rose-500'],
    },
    space_complexity: ['O(log n)', 'teal-800'],
  },
};
vi.mock('../../data/aboutAlgorithm', () => ({
  default: mockAboutAlgorithm,
}));
vi.mock('../Modal.css', () => ({}));

const defaultProps = {
  isOpen: false,
  onClose: vi.fn(),
  sortingState: { algorithm: 'bubble_sort' },
};

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  document.body.className = '';
});

describe('Modal Component', () => {
  it('renders only when open and toggles body class', () => {
    const { rerender } = render(<Modal {...defaultProps} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body).not.toHaveClass('active-modal');

    rerender(<Modal {...defaultProps} isOpen={true} />);
    expect(
      screen.getByRole('heading', { name: /bubble sort/i })
    ).toBeInTheDocument();
    expect(document.body).toHaveClass('active-modal');
  });

  it('closes with button, overlay, or Escape', () => {
    const mockOnClose = vi.fn();
    const { rerender } = render(
      <Modal {...defaultProps} isOpen={true} onClose={mockOnClose} />
    );

    // Test close button click
    const closeButtons = screen.getAllByRole('button', {
      name: /close modal/i,
    });
    const closeButton = closeButtons.find(
      (btn) => btn.className === 'close-modal'
    );
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);

    // Reset and test overlay click
    mockOnClose.mockClear();
    const overlay = closeButtons.find((btn) =>
      btn.className.includes('overlay')
    );
    fireEvent.click(overlay);
    expect(mockOnClose).toHaveBeenCalledTimes(1);

    // Test Escape key when modal is open
    mockOnClose.mockClear();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);

    // Test Escape key when modal is closed
    mockOnClose.mockClear();
    rerender(<Modal {...defaultProps} isOpen={false} onClose={mockOnClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('renders algorithm info and table headers', () => {
    const { container } = render(<Modal {...defaultProps} isOpen={true} />);

    // Check for the main heading (h1)
    const mainHeading = screen.getByRole('heading', { name: /bubble sort/i });
    expect(mainHeading).toBeInTheDocument();

    // Check for part of the description text
    expect(
      screen.getByText(/Bubble Sort is a straightforward sorting algorithm/)
    ).toBeInTheDocument();
    expect(screen.getByText('Algorithm')).toBeInTheDocument();
    expect(screen.getByText('Time Complexity')).toBeInTheDocument();
    expect(screen.getByText('Space Complexity')).toBeInTheDocument();
    expect(screen.getByText('Best')).toBeInTheDocument();
    expect(screen.getByText('Average')).toBeInTheDocument();

    const worstHeaders = screen.getAllByText('Worst');
    expect(worstHeaders.length).toBeGreaterThan(0);
  });

  it('has accessibility attributes', () => {
    render(<Modal {...defaultProps} isOpen={true} />);

    // Check modal attributes
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('tabindex', '-1');

    // Check close button in the modal content
    const closeButtons = screen.getAllByRole('button', {
      name: /close modal/i,
    });
    const closeButton = closeButtons.find(
      (btn) => btn.className === 'close-modal'
    );
    expect(closeButton).toBeInTheDocument();

    // Check overlay button
    const overlay = closeButtons.find((btn) =>
      btn.className.includes('overlay')
    );
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveAttribute('tabindex', '0');
  });

  it('updates content when algorithm changes', () => {
    const { rerender } = render(<Modal {...defaultProps} isOpen={true} />);

    // Check for the main heading (h1)
    let headings = screen.getAllByRole('heading');
    let mainHeading = headings.find((h) => h.textContent === 'Bubble Sort');
    expect(mainHeading).toBeInTheDocument();

    rerender(
      <Modal
        {...defaultProps}
        isOpen={true}
        sortingState={{ algorithm: 'quick_sort' }}
      />
    );

    // Check for the updated heading (h1)
    headings = screen.getAllByRole('heading');
    mainHeading = headings.find((h) => h.textContent === 'Quick Sort');
    expect(mainHeading).toBeInTheDocument();

    // Verify the table still contains the original text
    expect(screen.getByText('Bubble Sort')).toBeInTheDocument(); // In the table
  });
});
