// Context.jsx
// Provides global state and logic for the sorting visualization tool using React Context API.

import React, { createContext, useState, useRef } from "react";

import { getRandomNumber } from "../helpers/math";
import { speedMap } from "../helpers/speedConfig";
import { algorithmMap } from "../helpers/algorithmMap";

export const SortingContext = createContext();

// Helper function to get saved state from localStorage
// Returns the last used algorithm and speed, or defaults if not found
const getSavedState = () => {
    try {
        const saved = localStorage.getItem('sortingVisualizerState');
        if (saved) {
            const parsed = JSON.parse(saved);
            return {
                algorithm: parsed.algorithm || "bubble_sort",
                delay: parsed.delay || speedMap["slow"],
                speed: parsed.speed || "slow"
            };
        }
    } catch (error) {
        console.warn('Failed to load saved state:', error);
    }
    return {
        algorithm: "bubble_sort",
        delay: speedMap["slow"],
        speed: "slow"
    };
};

// Context provider component
// Manages sorting state, array, speed, algorithm, and control functions
function Context({ children }) {
    const savedState = getSavedState();
    
    // Main state for sorting visualization
    const [sortingState, setSortingState] = useState({
        array: [],
        delay: savedState.delay,
        algorithm: savedState.algorithm,
        sorted: false,
        sorting: false,
        paused: false
    });
    // Refs for aborting and pausing sorting
    const abortControllerRef = useRef(null);
    const pauseControllerRef = useRef(null);
    const currentDelayRef = useRef(speedMap["slow"]);
    
    // Keep delay ref in sync with state
    React.useEffect(() => {
        currentDelayRef.current = sortingState.delay;
    }, [sortingState.delay]);

    // Save state to localStorage whenever algorithm or delay changes
    const saveState = (newState) => {
        try {
            localStorage.setItem('sortingVisualizerState', JSON.stringify({
                algorithm: newState.algorithm,
                delay: newState.delay,
                speed: Object.keys(speedMap).find(key => speedMap[key] === newState.delay) || "slow"
            }));
        } catch (error) {
            console.warn('Failed to save state:', error);
        }
    };

    // Update a single bar in the array (used by sorting algorithms)
    const changeBar = (index, payload) => {
        setSortingState((prev) => ({
            ...prev,
            array: prev.array.map((item, i) => (i === index ? { ...item, ...payload } : item)),
        }));
    };

    // Generate a new random array for sorting
    // Cancels any ongoing sorting
    const generateSortingArray = () => {
        // Cancel ongoing sorting operation if any
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }

        const generatedArray = Array.from({ length: 50 }, () => ({
            value: getRandomNumber(102, 980),
            state: "idle",
        }));

        setSortingState((prev) => ({
            ...prev,
            array: generatedArray,
            sorted: false,
            sorting: false,
            paused: false
        }));
        // Reset pause controller
        pauseControllerRef.current = null;
    };

    // Pause or resume the sorting process
    const pauseResumeSorting = () => {
        if (sortingState.sorting && !sortingState.paused) {
            // Pause sorting
            setSortingState((prev) => ({
                ...prev,
                paused: true
            }));
            // Abort the pause controller to trigger pause
            if (pauseControllerRef.current) {
                pauseControllerRef.current.abort();
            }
        } else if (sortingState.sorting && sortingState.paused) {
            // Resume sorting
            setSortingState((prev) => ({
                ...prev,
                paused: false
            }));
            // Create a new pause controller to resume
            pauseControllerRef.current = new AbortController();
        }
    };

    // Start the sorting visualization
    // Initializes abort and pause controllers, calls the selected algorithm
    const startVisualizing = async () => {
        if (sortingState.sorting) return;
        setSortingState((prev) => ({ ...prev, sorting: true, paused: false, sorted: false }));
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
            setSortingState((prev) => ({ ...prev, sorting: false, sorted: true, paused: false }));
        } catch (e) {
            setSortingState((prev) => ({ ...prev, sorting: false, paused: false }));
        }
    };

    // Change the sorting speed
    const changeSortingSpeed = (e) => {
        const newDelay = speedMap[e.target.value] || 500;
        const newState = {
            ...sortingState,
            delay: newDelay
        };
        setSortingState(newState);
        currentDelayRef.current = newDelay;
        saveState(newState);
    };

    // Change the sorting algorithm
    const changeAlgorithm = (algorithm) => {
        const newState = {
            ...sortingState,
            algorithm
        };
        setSortingState(newState);
        saveState(newState);
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
                changeAlgorithm
            }}
        >
            {children}
        </SortingContext.Provider>
    );
}

export default Context;