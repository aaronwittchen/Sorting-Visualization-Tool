import { describe, it, expect, vi, beforeEach } from 'vitest';
import { selectionSort } from '../sortingAlgorithms';

describe('selectionSort', () => {
  const createArray = (arr) => arr.map((value) => ({ value }));

  it('sorts an array of numbers in ascending order', async () => {
    const array = createArray([64, 25, 12, 22, 11]);
    const changeBar = vi.fn((index, updates) => {
      if (updates.value !== undefined) {
        array[index].value = updates.value;
      }
    });
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: false };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await selectionSort(array, changeBar, getDelay, signal, pauseControllerRef);

    const sorted = array.map((item) => item.value);
    expect(sorted).toEqual([11, 12, 22, 25, 64]);
  });

  it('handles empty array', async () => {
    const array = createArray([]);
    const changeBar = vi.fn();
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: false };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await selectionSort(array, changeBar, getDelay, signal, pauseControllerRef);

    expect(array).toEqual([]);
  });

  it('handles single element array', async () => {
    const array = createArray([42]);
    const changeBar = vi.fn();
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: false };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await selectionSort(array, changeBar, getDelay, signal, pauseControllerRef);

    const sorted = array.map((item) => item.value);
    expect(sorted).toEqual([42]);
  });

  it('respects abort signal', async () => {
    const array = createArray([5, 4, 3, 2, 1]);
    const changeBar = vi.fn();
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: true };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await expect(
      selectionSort(array, changeBar, getDelay, signal, pauseControllerRef)
    ).rejects.toThrow('Aborted');
  });
});
