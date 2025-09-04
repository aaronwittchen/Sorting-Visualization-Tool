import { describe, it, expect, vi, beforeEach } from 'vitest';
import { radixSort } from '../sortingAlgorithms';

describe('radixSort', () => {
  const createArray = (arr) => arr.map((value) => ({ value }));

  it('sorts an array of numbers in ascending order', async () => {
    const array = createArray([170, 45, 75, 90, 2, 802, 24, 66]);
    const changeBar = vi.fn((index, updates) => {
      if (updates.value !== undefined) {
        array[index].value = updates.value;
      }
    });
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: false };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await radixSort(array, changeBar, getDelay, signal, pauseControllerRef);

    const sorted = array.map((item) => item.value);
    expect(sorted).toEqual([2, 24, 45, 66, 75, 90, 170, 802]);
  });

  it('handles single digit numbers', async () => {
    const array = createArray([9, 3, 7, 1, 5]);
    const changeBar = vi.fn((index, updates) => {
      if (updates.value !== undefined) {
        array[index].value = updates.value;
      }
    });
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: false };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await radixSort(array, changeBar, getDelay, signal, pauseControllerRef);

    const sorted = array.map((item) => item.value);
    expect(sorted).toEqual([1, 3, 5, 7, 9]);
  });

  it('handles empty array', async () => {
    const array = createArray([]);
    const changeBar = vi.fn();
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: false };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await radixSort(array, changeBar, getDelay, signal, pauseControllerRef);

    expect(array).toEqual([]);
  });

  it('respects abort signal', async () => {
    const array = createArray([170, 45, 75, 90, 2]);
    const changeBar = vi.fn();
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: true };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await expect(
      radixSort(array, changeBar, getDelay, signal, pauseControllerRef)
    ).rejects.toThrow('Aborted');
  });
});
