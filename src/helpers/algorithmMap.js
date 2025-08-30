// algorithmMap.js
// Maps algorithm string keys to their corresponding sorting function implementations.

import {
    bubbleSort,
    selectionSort,
    insertionSort,
    mergeSort,
    quickSort,
    radixSort,
    bucketSort
} from "./sortingAlgorithms";

// algorithmMap: Used to select the correct sorting function by name
export const algorithmMap = {
    "bubble_sort": bubbleSort,
    "selection_sort": selectionSort,
    "insertion_sort": insertionSort,
    "merge_sort": mergeSort,
    "quick_sort": quickSort,
    "radix_sort": radixSort,
    "bucket_sort": bucketSort
};
