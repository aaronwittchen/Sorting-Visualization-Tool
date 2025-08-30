import { algorithmMap } from '../algorithmMap';

// Mock the sorting algorithms
jest.mock('../sortingAlgorithms', () => ({
  bubbleSort: jest.fn(),
  selectionSort: jest.fn(),
  insertionSort: jest.fn(),
  mergeSort: jest.fn(),
  quickSort: jest.fn(),
  radixSort: jest.fn(),
  bucketSort: jest.fn()
}));

describe('Algorithm Map', () => {
  it('should contain all required algorithms', () => {
    const expectedAlgorithms = [
      'bubble_sort',
      'selection_sort',
      'insertion_sort',
      'merge_sort',
      'quick_sort',
      'radix_sort',
      'bucket_sort'
    ];

    expectedAlgorithms.forEach(algorithm => {
      expect(algorithmMap).toHaveProperty(algorithm);
    });
  });

  it('should have function values for all algorithms', () => {
    Object.values(algorithmMap).forEach(algorithm => {
      expect(typeof algorithm).toBe('function');
    });
  });

  it('should have correct algorithm names as keys', () => {
    expect(algorithmMap.bubble_sort).toBeDefined();
    expect(algorithmMap.selection_sort).toBeDefined();
    expect(algorithmMap.insertion_sort).toBeDefined();
    expect(algorithmMap.merge_sort).toBeDefined();
    expect(algorithmMap.quick_sort).toBeDefined();
    expect(algorithmMap.radix_sort).toBeDefined();
    expect(algorithmMap.bucket_sort).toBeDefined();
  });

  it('should have exactly 7 algorithms', () => {
    const algorithmCount = Object.keys(algorithmMap).length;
    expect(algorithmCount).toBe(7);
  });

  it('should not have duplicate algorithm names', () => {
    const algorithmNames = Object.keys(algorithmMap);
    const uniqueNames = new Set(algorithmNames);
    expect(uniqueNames.size).toBe(algorithmNames.length);
  });

  it('should have consistent naming convention', () => {
    Object.keys(algorithmMap).forEach(algorithmName => {
      expect(algorithmName).toMatch(/^[a-z_]+$/);
      expect(algorithmName).toContain('_');
    });
  });
});
