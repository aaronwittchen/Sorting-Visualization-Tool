import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '../Modal';

const mockSortingState = {
  algorithm: 'bubble_sort',
  array: [
    { value: 100, state: 'idle' },
    { value: 200, state: 'selected' },
    { value: 150, state: 'idle' }
  ],
  delay: 128,
  sorted: false,
  sorting: false,
  paused: false
};

describe('Modal Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render when isOpen is false', () => {
    render(
      <Modal 
        isOpen={false} 
        onClose={mockOnClose} 
        sortingState={mockSortingState} 
      />
    );

    expect(screen.queryByText('About Sorting Algorithms')).not.toBeInTheDocument();
  });

  it('should render when isOpen is true', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={mockOnClose} 
        sortingState={mockSortingState} 
      />
    );

    expect(screen.getByText('About Sorting Algorithms')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <Modal 
        isOpen={true} 
        onClose={mockOnClose} 
        sortingState={mockSortingState} 
      />
    );

    const closeButton = screen.getByText('×');
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when clicking outside the modal', async () => {
    const user = userEvent.setup();
    
    render(
      <Modal 
        isOpen={true} 
        onClose={mockOnClose} 
        sortingState={mockSortingState} 
      />
    );

    const overlay = screen.getByTestId('modal-overlay');
    await user.click(overlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should not call onClose when clicking inside the modal content', async () => {
    const user = userEvent.setup();
    
    render(
      <Modal 
        isOpen={true} 
        onClose={mockOnClose} 
        sortingState={mockSortingState} 
      />
    );

    const modalContent = screen.getByTestId('modal-content');
    await user.click(modalContent);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should display algorithm information', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={mockOnClose} 
        sortingState={mockSortingState} 
      />
    );

    // Check for algorithm information sections
    expect(screen.getByText('Bubble Sort')).toBeInTheDocument();
    expect(screen.getByText('Selection Sort')).toBeInTheDocument();
    expect(screen.getByText('Insertion Sort')).toBeInTheDocument();
    expect(screen.getByText('Merge Sort')).toBeInTheDocument();
    expect(screen.getByText('Quick Sort')).toBeInTheDocument();
    expect(screen.getByText('Radix Sort')).toBeInTheDocument();
    expect(screen.getByText('Bucket Sort')).toBeInTheDocument();
  });

  it('should display time complexity information', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={mockOnClose} 
        sortingState={mockSortingState} 
      />
    );

    // Check for time complexity information
    expect(screen.getByText(/Time Complexity/)).toBeInTheDocument();
    expect(screen.getByText(/Space Complexity/)).toBeInTheDocument();
  });

  it('should handle keyboard events', async () => {
    const user = userEvent.setup();
    
    render(
      <Modal 
        isOpen={true} 
        onClose={mockOnClose} 
        sortingState={mockSortingState} 
      />
    );

    // Press Escape key
    await user.keyboard('{Escape}');

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should render with different sorting states', () => {
    const sortingState = {
      ...mockSortingState,
      algorithm: 'selection_sort',
      sorting: true,
      paused: true
    };

    render(
      <Modal 
        isOpen={true} 
        onClose={mockOnClose} 
        sortingState={sortingState} 
      />
    );

    expect(screen.getByText('About Sorting Algorithms')).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={mockOnClose} 
        sortingState={mockSortingState} 
      />
    );

    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute('aria-modal', 'true');
  });
});
