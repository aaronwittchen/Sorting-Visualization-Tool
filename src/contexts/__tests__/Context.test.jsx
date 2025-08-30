import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Context, { SortingContext } from '../Context';

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

// Test component to access context
const TestComponent = () => {
  const { sortingState, generateSortingArray, startVisualizing, pauseResumeSorting, changeSortingSpeed, changeAlgorithm } = React.useContext(SortingContext);
  
  return (
    <div>
      <div data-testid="algorithm">{sortingState.algorithm}</div>
      <div data-testid="delay">{sortingState.delay}</div>
      <div data-testid="sorting">{sortingState.sorting.toString()}</div>
      <div data-testid="paused">{sortingState.paused.toString()}</div>
      <div data-testid="array-length">{sortingState.array.length}</div>
      <button onClick={generateSortingArray} data-testid="generate-btn">Generate</button>
      <button onClick={startVisualizing} data-testid="start-btn">Start</button>
      <button onClick={pauseResumeSorting} data-testid="pause-btn">Pause</button>
      <select onChange={(e) => changeSortingSpeed(e)} data-testid="speed-select">
        <option value="slow">Slow</option>
        <option value="medium">Medium</option>
        <option value="fast">Fast</option>
      </select>
      <button onClick={() => changeAlgorithm('selection_sort')} data-testid="change-algo-btn">Change Algorithm</button>
    </div>
  );
};

describe('Context Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should render with default state', () => {
    render(
      <Context>
        <TestComponent />
      </Context>
    );

    expect(screen.getByTestId('algorithm')).toHaveTextContent('bubble_sort');
    expect(screen.getByTestId('delay')).toHaveTextContent('128'); // slow speed
    expect(screen.getByTestId('sorting')).toHaveTextContent('false');
    expect(screen.getByTestId('paused')).toHaveTextContent('false');
    expect(screen.getByTestId('array-length')).toHaveTextContent('0');
  });

  it('should generate sorting array', async () => {
    render(
      <Context>
        <TestComponent />
      </Context>
    );

    const generateBtn = screen.getByTestId('generate-btn');
    fireEvent.click(generateBtn);

    await waitFor(() => {
      expect(screen.getByTestId('array-length')).toHaveTextContent('50');
    });
  });

  it('should change algorithm', () => {
    render(
      <Context>
        <TestComponent />
      </Context>
    );

    const changeAlgoBtn = screen.getByTestId('change-algo-btn');
    fireEvent.click(changeAlgoBtn);

    expect(screen.getByTestId('algorithm')).toHaveTextContent('selection_sort');
  });

  it('should change sorting speed', async () => {
    const user = userEvent.setup();
    
    render(
      <Context>
        <TestComponent />
      </Context>
    );

    const speedSelect = screen.getByTestId('speed-select');
    await user.selectOptions(speedSelect, 'fast');

    expect(screen.getByTestId('delay')).toHaveTextContent('8'); // fast speed
  });

  it('should save state to localStorage when algorithm changes', () => {
    render(
      <Context>
        <TestComponent />
      </Context>
    );

    const changeAlgoBtn = screen.getByTestId('change-algo-btn');
    fireEvent.click(changeAlgoBtn);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'sortingVisualizerState',
      expect.stringContaining('selection_sort')
    );
  });

  it('should save state to localStorage when speed changes', async () => {
    const user = userEvent.setup();
    
    render(
      <Context>
        <TestComponent />
      </Context>
    );

    const speedSelect = screen.getByTestId('speed-select');
    await user.selectOptions(speedSelect, 'medium');

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'sortingVisualizerState',
      expect.stringContaining('32') // medium speed delay
    );
  });

  it('should load saved state from localStorage', () => {
    const savedState = {
      algorithm: 'selection_sort',
      delay: 32,
      speed: 'medium'
    };
    
    localStorage.getItem.mockReturnValue(JSON.stringify(savedState));

    render(
      <Context>
        <TestComponent />
      </Context>
    );

    expect(screen.getByTestId('algorithm')).toHaveTextContent('selection_sort');
    expect(screen.getByTestId('delay')).toHaveTextContent('32');
  });

  it('should handle localStorage errors gracefully', () => {
    localStorage.getItem.mockImplementation(() => {
      throw new Error('localStorage error');
    });

    render(
      <Context>
        <TestComponent />
      </Context>
    );

    // Should fall back to defaults
    expect(screen.getByTestId('algorithm')).toHaveTextContent('bubble_sort');
    expect(screen.getByTestId('delay')).toHaveTextContent('128');
  });

  it('should handle pause/resume functionality', async () => {
    render(
      <Context>
        <TestComponent />
      </Context>
    );

    // Generate array first
    const generateBtn = screen.getByTestId('generate-btn');
    fireEvent.click(generateBtn);

    await waitFor(() => {
      expect(screen.getByTestId('array-length')).toHaveTextContent('50');
    });

    // Start sorting
    const startBtn = screen.getByTestId('start-btn');
    fireEvent.click(startBtn);

    expect(screen.getByTestId('sorting')).toHaveTextContent('true');

    // Pause sorting
    const pauseBtn = screen.getByTestId('pause-btn');
    fireEvent.click(pauseBtn);

    expect(screen.getByTestId('paused')).toHaveTextContent('true');

    // Resume sorting
    fireEvent.click(pauseBtn);

    expect(screen.getByTestId('paused')).toHaveTextContent('false');
  });
});
