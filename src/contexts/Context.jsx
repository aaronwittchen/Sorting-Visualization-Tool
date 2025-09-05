// Context.jsx
// Provides global state and logic for the sorting visualization tool using React Context API.

import React, { createContext, useState, useRef, useEffect } from 'react';

import { getRandomNumber } from '../helpers/math';
import { speedMap } from '../helpers/speedConfig';
import { algorithmMap } from '../helpers/algorithmMap';

export const SortingContext = createContext();

// Helper function to determine array size based on screen width
const getArraySize = () => {
  if (typeof window === 'undefined') return 50; // Default for SSR

  const width = window.innerWidth;

  if (width < 480) return 25; // Mobile: 20 elements
  if (width < 768) return 20; // Small tablet: 30 elements
  if (width < 1024) return 20; // Tablet: 40 elements
  if (width < 1440) return 39; // Small desktop: 50 elements
  if (width < 1680) return 39; // Medium desktop
  if (width < 1920) return 48;
  return 48; // Large desktop: 75 elements
};

// Context provider component
// Manages sorting state, array, speed, algorithm, and control functions
function Context({ children }) {
  // Main state for sorting visualization
  const [sortingState, setSortingState] = useState({
    array: [],
    delay: speedMap['slow'],
    algorithm: 'bubble_sort',
    sorted: false,
    sorting: false,
    paused: false,
    arraySize: getArraySize(),
  });

  // Refs for aborting and pausing sorting
  const abortControllerRef = useRef(null);
  const pauseControllerRef = useRef(null);
  const currentDelayRef = useRef(speedMap['slow']);

  // Keep delay ref in sync with state
  useEffect(() => {
    currentDelayRef.current = sortingState.delay;
  }, [sortingState.delay]);

  // Handle window resize to update array size
  useEffect(() => {
    const handleResize = () => {
      const newSize = getArraySize();
      if (newSize !== sortingState.arraySize && !sortingState.sorting) {
        setSortingState((prev) => ({
          ...prev,
          arraySize: newSize,
        }));
        // Regenerate array with new size if not currently sorting
        generateSortingArrayWithSize(newSize);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sortingState.arraySize, sortingState.sorting]);

  // Initialize array on mount
  useEffect(() => {
    generateSortingArray();
  }, []);

  // Update a single bar in the array (used by sorting algorithms)
  const changeBar = (index, payload) => {
    setSortingState((prev) => ({
      ...prev,
      array: prev.array.map((item, i) =>
        i === index ? { ...item, ...payload } : item
      ),
    }));
  };

  // Generate array with specific size
  const generateSortingArrayWithSize = (size) => {
    // Cancel ongoing sorting operation if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    const generatedArray = Array.from({ length: size }, () => ({
      value: getRandomNumber(102, 980),
      state: 'idle',
    }));

    setSortingState((prev) => ({
      ...prev,
      array: generatedArray,
      sorted: false,
      sorting: false,
      paused: false,
      arraySize: size,
    }));
    // Reset pause controller
    pauseControllerRef.current = null;
  };

  // Generate a new random array for sorting
  // Cancels any ongoing sorting
  const generateSortingArray = () => {
    generateSortingArrayWithSize(sortingState.arraySize);
  };

  // Pause or resume the sorting process
  const pauseResumeSorting = () => {
    if (sortingState.sorting && !sortingState.paused) {
      // Pause sorting
      setSortingState((prev) => ({
        ...prev,
        paused: true,
      }));
      // Abort the pause controller to trigger pause
      if (pauseControllerRef.current) {
        pauseControllerRef.current.abort();
      }
    } else if (sortingState.sorting && sortingState.paused) {
      // Resume sorting
      setSortingState((prev) => ({
        ...prev,
        paused: false,
      }));
      // Create a new pause controller to resume
      pauseControllerRef.current = new AbortController();
    }
  };

  // Start the sorting visualization
  // Initializes abort and pause controllers, calls the selected algorithm
  const startVisualizing = async () => {
    if (sortingState.sorting) return;
    setSortingState((prev) => ({
      ...prev,
      sorting: true,
      paused: false,
      sorted: false,
    }));
    abortControllerRef.current = new AbortController();
    pauseControllerRef.current = new AbortController();
    try {
      await algorithmMap[sortingState.algorithm](
        sortingState.array,
        changeBar,
        () => currentDelayRef.current,
        abortControllerRef.current.signal,
        pauseControllerRef
      );
      setSortingState((prev) => ({
        ...prev,
        sorting: false,
        sorted: true,
        paused: false,
      }));
    } catch (e) {
      setSortingState((prev) => ({ ...prev, sorting: false, paused: false }));
    }
  };

  // Change the sorting speed
  const changeSortingSpeed = (e) => {
    const newDelay = speedMap[e.target.value] || 500;
    setSortingState((prev) => ({
      ...prev,
      delay: newDelay,
    }));
    currentDelayRef.current = newDelay;
  };

  // Change the sorting algorithm
  const changeAlgorithm = (algorithm) => {
    setSortingState((prev) => ({
      ...prev,
      algorithm,
    }));
  };

  // Provide state and control functions to children
  return (
    <SortingContext.Provider
      value={{
        sortingState,
        changeBar,
        generateSortingArray,
        startVisualizing,
        pauseResumeSorting,
        changeSortingSpeed,
        changeAlgorithm,
      }}
    >
      {children}
    </SortingContext.Provider>
  );
}

export default Context;
