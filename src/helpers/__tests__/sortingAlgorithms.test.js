import {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  radixSort,
  bucketSort
} from '../sortingAlgorithms';

// Mock the changeBar function
const mockChangeBar = jest.fn();
const mockGetDelay = jest.fn(() => 0);
const mockSignal = { aborted: false };
const mockPauseControllerRef = { current: { signal: { aborted: false } } };

// Helper function to create test array
const createTestArray = (values) => {
  return values.map(value => ({ value, state: 'idle' }));
};

// Helper function to extract values from array
const extractValues = (array) => {
  return array.map(item => item.value);
};

describe('Sorting Algorithms', () => {
  beforeEach(() => {
    mockChangeBar.mockClear();
    mockGetDelay.mockClear();
  });

  describe('bubbleSort', () => {
    it('should sort an array in ascending order', async () => {
      const testArray = createTestArray([3, 1, 4, 1, 5, 9, 2, 6]);
      const expected = [1, 1, 2, 3, 4, 5, 6, 9];
      
      await bubbleSort(testArray, mockChangeBar, mockGetDelay, mockSignal, mockPauseControllerRef);
      
      expect(extractValues(testArray)).toEqual(expected);
    });

    it('should handle already sorted array', async () => {
      const testArray = createTestArray([1, 2, 3, 4, 5]);
      const expected = [1, 2, 3, 4, 5];
      
      await bubbleSort(testArray, mockChangeBar, mockGetDelay, mockSignal, mockPauseControllerRef);
      
      expect(extractValues(testArray)).toEqual(expected);
    });

    it('should handle reverse sorted array', async () => {
      const testArray = createTestArray([5, 4, 3, 2, 1]);
      const expected = [1, 2, 3, 4, 5];
      
      await bubbleSort(testArray, mockChangeBar, mockGetDelay, mockSignal, mockPauseControllerRef);
      
      expect(extractValues(testArray)).toEqual(expected);
    });

    it('should handle array with duplicates', async () => {
      const testArray = createTestArray([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]);
      const expected = [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9];
      
      await bubbleSort(testArray, mockChangeBar, mockGetDelay, mockSignal, mockPauseControllerRef);
      
      expect(extractValues(testArray)).toEqual(expected);
    });
  });

  describe('selectionSort', () => {
    it('should sort an array in ascending order', async () => {
      const testArray = createTestArray([64, 34, 25, 12, 22, 11, 90]);
      const expected = [11, 12, 22, 25, 34, 64, 90];
      
      await selectionSort(testArray, mockChangeBar, mockGetDelay, mockSignal, mockPauseControllerRef);
      
      expect(extractValues(testArray)).toEqual(expected);
    });

    it('should handle single element array', async () => {
      const testArray = createTestArray([42]);
      const expected = [42];
      
      await selectionSort(testArray, mockChangeBar, mockGetDelay, mockSignal, mockPauseControllerRef);
      
      expect(extractValues(testArray)).toEqual(expected);
    });

    it('should handle array with negative numbers', async () => {
      const testArray = createTestArray([-5, 10, -3, 0, 7, -1]);
      const expected = [-5, -3, -1, 0, 7, 10];
      
      await selectionSort(testArray, mockChangeBar, mockGetDelay, mockSignal, mockPauseControllerRef);
      
      expect(extractValues(testArray)).toEqual(expected);
    });
  });

  describe('insertionSort', () => {
    it('should sort an array in ascending order', async () => {
      const testArray = createTestArray([12, 11, 13, 5, 6]);
      const expected = [5, 6, 11, 12, 13];
      
      await insertionSort(testArray, mockChangeBar, mockGetDelay, mockSignal, mockPauseControllerRef);
      
      expect(extractValues(testArray)).toEqual(expected);
    });

    it('should handle empty array', async () => {
      const testArray = createTestArray([]);
      const expected = [];
      
      await insertionSort(testArray, mockChangeBar, mockGetDelay, mockSignal, mockPauseControllerRef);
      
      expect(extractValues(testArray)).toEqual(expected);
    });

    it('should handle array with all same values', async () => {
      const testArray = createTestArray([5, 5, 5, 5, 5]);
      const expected = [5, 5, 5, 5, 5];
      
      await insertionSort(testArray, mockChangeBar, mockGetDelay, mockSignal, mockPauseControllerRef);
      
      expect(extractValues(testArray)).toEqual(expected);
    });
  });

  describe('mergeSort', () => {
    it('should sort an array in ascending order', async () => {
      const testArray = createTestArray([38, 27, 43, 3, 9, 82, 10]);
      const expected = [3, 9, 10, 27, 38, 43, 82];
      
      await mergeSort(testArray, mockChangeBar, mockGetDelay, mockSignal, mockPauseControllerRef);
      
      expect(extractValues(testArray)).toEqual(expected);
    });

    it('should handle odd length array', async () => {
      const testArray = createTestArray([5, 2, 8, 1, 9]);
      const expected = [1, 2, 5, 8, 9];
      
      await mergeSort(testArray, mockChangeBar, mockGetDelay, mockSignal, mockPauseControllerRef);
      
      expect(extractValues(testArray)).toEqual(expected);
    });

    it('should handle array with large numbers', async () => {
      const testArray = createTestArray([1000, 500, 2000, 750, 1500]);
      const expected = [500, 750, 1000, 1500, 2000];
      
      await mergeSort(testArray, mockChangeBar, mockGetDelay, mockSignal, mockPauseControllerRef);
      
      expect(extractValues(testArray)).toEqual(expected);
    });
  });

  describe('quickSort', () => {
    it('should sort an array in ascending order', async () => {
      const testArray = createTestArray([10, 7, 8, 9, 1, 5]);
      const expected = [1, 5, 7, 8, 9, 10];
      
      await quickSort(testArray, mockChangeBar, mockGetDelay, mockSignal, mockPauseControllerRef);
      
      expect(extractValues(testArray)).toEqual(expected);
    });

    it('should handle array with pivot at end', async () => {
      const testArray = createTestArray([3, 1, 4, 1, 5, 9, 2, 6]);
      const expected = [1, 1, 2, 3, 4, 5, 6, 9];
      
      await quickSort(testArray, mockChangeBar, mockGetDelay, mockSignal, mockPauseControllerRef);
      
      expect(extractValues(testArray)).toEqual(expected);
    });

    it('should handle array with all elements equal', async () => {
      const testArray = createTestArray([7, 7, 7, 7, 7]);
      const expected = [7, 7, 7, 7, 7];
      
      await quickSort(testArray, mockChangeBar, mockGetDelay, mockSignal, mockPauseControllerRef);
      
      expect(extractValues(testArray)).toEqual(expected);
    });
  });

  describe('radixSort', () => {
    it('should sort an array in ascending order', async () => {
      const testArray = createTestArray([170, 45, 75, 90, 802, 24, 2, 66]);
      const expected = [2, 24, 45, 66, 75, 90, 170, 802];
      
      await radixSort(testArray, mockChangeBar, mockGetDelay, mockSignal, mockPauseControllerRef);
      
      expect(extractValues(testArray)).toEqual(expected);
    });

    it('should handle single digit numbers', async () => {
      const testArray = createTestArray([5, 2, 8, 1, 9, 3, 7, 4, 6]);
      const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      
      await radixSort(testArray, mockChangeBar, mockGetDelay, mockSignal, mockPauseControllerRef);
      
      expect(extractValues(testArray)).toEqual(expected);
    });

    it('should handle numbers with different digit counts', async () => {
      const testArray = createTestArray([1000, 5, 100, 50, 1, 500]);
      const expected = [1, 5, 50, 100, 500, 1000];
      
      await radixSort(testArray, mockChangeBar, mockGetDelay, mockSignal, mockPauseControllerRef);
      
      expect(extractValues(testArray)).toEqual(expected);
    });
  });

  describe('bucketSort', () => {
    it('should sort an array in ascending order', async () => {
      const testArray = createTestArray([0.897, 0.565, 0.656, 0.1234, 0.665, 0.3434]);
      const expected = [0.1234, 0.3434, 0.565, 0.656, 0.665, 0.897];
      
      await bucketSort(testArray, mockChangeBar, mockGetDelay, mockSignal, mockPauseControllerRef);
      
      expect(extractValues(testArray)).toEqual(expected);
    });

    it('should handle array with custom bucket size', async () => {
      const testArray = createTestArray([10, 5, 15, 20, 25, 30]);
      const expected = [5, 10, 15, 20, 25, 30];
      
      await bucketSort(testArray, mockChangeBar, mockGetDelay, mockSignal, mockPauseControllerRef, 10);
      
      expect(extractValues(testArray)).toEqual(expected);
    });

    it('should handle empty array', async () => {
      const testArray = createTestArray([]);
      const expected = [];
      
      await bucketSort(testArray, mockChangeBar, mockGetDelay, mockSignal, mockPauseControllerRef);
      
      expect(extractValues(testArray)).toEqual(expected);
    });
  });

  describe('Error Handling', () => {
    it('should throw AbortError when signal is aborted', async () => {
      const abortedSignal = { aborted: true };
      const testArray = createTestArray([3, 1, 4, 1, 5]);
      
      await expect(
        bubbleSort(testArray, mockChangeBar, mockGetDelay, abortedSignal, mockPauseControllerRef)
      ).rejects.toThrow('Aborted');
    });
  });
});
