import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Overlay from '../Overlay';
import Context from '../../contexts/Context';

// Mock the Modal component
jest.mock('../Modal/Modal', () => {
  return function MockModal({ isOpen, onClose }) {
    if (!isOpen) return null;
    return (
      <div data-testid="modal">
        <button onClick={onClose} data-testid="close-modal">Close</button>
      </div>
    );
  };
});

// Mock the algorithm map
jest.mock('../../helpers/algorithmMap', () => ({
  algorithmMap: {
    bubble_sort: jest.fn(),
    selection_sort: jest.fn(),
    insertion_sort: jest.fn(),
    merge_sort: jest.fn(),
    quick_sort: jest.fn(),
    radix_sort: jest.fn(),
    bucket_sort: jest.fn()
  }
}));

const renderWithContext = (component) => {
  return render(
    <Context>
      {component}
    </Context>
  );
};

describe('Overlay Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should render the main title', () => {
    renderWithContext(<Overlay />);
    
    expect(screen.getByText('Sorting Visualization Tool')).toBeInTheDocument();
  });

  it('should render all algorithm buttons', () => {
    renderWithContext(<Overlay />);
    
    expect(screen.getByText('BUBBLE SORT')).toBeInTheDocument();
    expect(screen.getByText('SELECTION SORT')).toBeInTheDocument();
    expect(screen.getByText('INSERTION SORT')).toBeInTheDocument();
    expect(screen.getByText('MERGE SORT')).toBeInTheDocument();
    expect(screen.getByText('QUICK SORT')).toBeInTheDocument();
    expect(screen.getByText('RADIX SORT')).toBeInTheDocument();
    expect(screen.getByText('BUCKET SORT')).toBeInTheDocument();
  });

  it('should render the help button', () => {
    renderWithContext(<Overlay />);
    
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('should render control buttons', () => {
    renderWithContext(<Overlay />);
    
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  it('should render speed selector', () => {
    renderWithContext(<Overlay />);
    
    const speedSelect = screen.getByRole('combobox');
    expect(speedSelect).toBeInTheDocument();
    expect(screen.getByText('Slow')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Fast')).toBeInTheDocument();
  });

  it('should open modal when help button is clicked', async () => {
    const user = userEvent.setup();
    renderWithContext(<Overlay />);
    
    const helpButton = screen.getByText('?');
    await user.click(helpButton);
    
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('should close modal when close button is clicked', async () => {
    const user = userEvent.setup();
    renderWithContext(<Overlay />);
    
    // Open modal
    const helpButton = screen.getByText('?');
    await user.click(helpButton);
    
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    
    // Close modal
    const closeButton = screen.getByTestId('close-modal');
    await user.click(closeButton);
    
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('should change algorithm when algorithm button is clicked', async () => {
    const user = userEvent.setup();
    renderWithContext(<Overlay />);
    
    const selectionSortButton = screen.getByText('SELECTION SORT');
    await user.click(selectionSortButton);
    
    // The button should have the selected styling (bg-purple-light class)
    expect(selectionSortButton).toHaveClass('bg-purple-light');
  });

  it('should change speed when speed selector is changed', async () => {
    const user = userEvent.setup();
    renderWithContext(<Overlay />);
    
    const speedSelect = screen.getByRole('combobox');
    await user.selectOptions(speedSelect, 'fast');
    
    expect(speedSelect).toHaveValue('fast');
  });

  it('should generate new array when reset button is clicked', async () => {
    const user = userEvent.setup();
    renderWithContext(<Overlay />);
    
    const resetButton = screen.getByText('Reset');
    await user.click(resetButton);
    
    // Should generate 50 bars
    await waitFor(() => {
      const bars = screen.getAllByText(/\d+/);
      expect(bars.length).toBeGreaterThan(0);
    });
  });

  it('should show pause button when sorting starts', async () => {
    const user = userEvent.setup();
    renderWithContext(<Overlay />);
    
    // Generate array first
    const resetButton = screen.getByText('Reset');
    await user.click(resetButton);
    
    await waitFor(() => {
      expect(screen.getByText('Start')).toBeInTheDocument();
    });
    
    // Start sorting
    const startButton = screen.getByText('Start');
    await user.click(startButton);
    
    // Should show pause button
    expect(screen.getByText('Pause')).toBeInTheDocument();
  });

  it('should show resume button when paused', async () => {
    const user = userEvent.setup();
    renderWithContext(<Overlay />);
    
    // Generate array first
    const resetButton = screen.getByText('Reset');
    await user.click(resetButton);
    
    await waitFor(() => {
      expect(screen.getByText('Start')).toBeInTheDocument();
    });
    
    // Start sorting
    const startButton = screen.getByText('Start');
    await user.click(startButton);
    
    // Pause sorting
    const pauseButton = screen.getByText('Pause');
    await user.click(pauseButton);
    
    // Should show resume button
    expect(screen.getByText('Resume')).toBeInTheDocument();
  });

  it('should render sorting bars', async () => {
    renderWithContext(<Overlay />);
    
    // Generate array
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);
    
    await waitFor(() => {
      // Should render bars with values
      const bars = screen.getAllByText(/\d+/);
      expect(bars.length).toBeGreaterThan(0);
    });
  });

  it('should highlight selected algorithm button', () => {
    renderWithContext(<Overlay />);
    
    // Bubble sort should be selected by default
    const bubbleSortButton = screen.getByText('BUBBLE SORT');
    expect(bubbleSortButton).toHaveClass('bg-purple-light');
    
    // Other buttons should not be selected
    const selectionSortButton = screen.getByText('SELECTION SORT');
    expect(selectionSortButton).toHaveClass('bg-carbon');
  });

  it('should handle algorithm selection correctly', async () => {
    const user = userEvent.setup();
    renderWithContext(<Overlay />);
    
    // Click selection sort
    const selectionSortButton = screen.getByText('SELECTION SORT');
    await user.click(selectionSortButton);
    
    // Selection sort should now be highlighted
    expect(selectionSortButton).toHaveClass('bg-purple-light');
    
    // Bubble sort should no longer be highlighted
    const bubbleSortButton = screen.getByText('BUBBLE SORT');
    expect(bubbleSortButton).toHaveClass('bg-carbon');
  });
});
