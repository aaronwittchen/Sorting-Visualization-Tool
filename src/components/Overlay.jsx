// Overlay.jsx
// Main UI component for the sorting visualization tool. Renders algorithm selection, chart, controls, and help modal.

import React, { useState, useContext, useEffect } from "react";
import { SortingContext } from "../contexts/Context";
import Modal from "./Modal/Modal";
import { speedMap } from "../helpers/speedConfig";

// Overlay component: main interface for user interaction
function Overlay() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Get state and control functions from context
  const { sortingState, generateSortingArray, startVisualizing, pauseResumeSorting, changeSortingSpeed, changeAlgorithm } = useContext(SortingContext);

  // Generate a new array on mount
  useEffect(() => {
    generateSortingArray();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="mt-4 mb-4 flex flex-col items-center">
      {/* Title */}
      <h1 className="text-6xl font-andada font-bold mb-6">Sorting Visualization Tool</h1>
      
      {/* Algorithm selection buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {[
          "bubble_sort", "selection_sort", "insertion_sort", "merge_sort", "quick_sort", "radix_sort", "bucket_sort"
        ].map((algorithm) => (
          <button
            key={algorithm}
            onClick={() => changeAlgorithm(algorithm)}
            className={`bg-carbon text-white px-5 py-3 rounded-md ${
              sortingState.algorithm === algorithm ? "bg-purple-light" : "hover:bg-carbon-light"
            } transition-all`}
          >
            {algorithm.replace("_", " ").toUpperCase()}
          </button>
        ))}
        {/* Help modal button */}
        <button onClick={openModal} className="bg-carbon text-white px-5 py-3 rounded-md">
          ?
        </button>
      </div>

      {/* Chart visualization */}
      <div className="max-w-3xl w-full">
        <div className="mb-4 chart-container">
          <div className="base"></div>
          {sortingState.array.map((bar, i) => (
            <div key={i} className="bar-container">
              <div 
                className={`select-none bar bar-${bar.state}`} 
                style={{ height: `${Math.floor((bar.value / 1000) * 100)}%` }}
              >
                <p 
                  className={`${bar.state === "idle" ? "text-[#B1D2CF]" : "text-[#D8B7BE]"}`}
                  style={{ paddingLeft: '0px'}}
                >
                  {bar.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Controls: Start/Pause/Resume, Reset, Speed */}
        <div className="flex items-center gap-4 max-w-3xl mb-8">
          {!sortingState.sorting ? (
            <button 
              onClick={startVisualizing} 
              className="px-4 py-2 push-btn text-white-light"
            >
              Start
            </button>
          ) : (
            <button 
              onClick={pauseResumeSorting} 
              className="px-4 py-2 push-btn text-white-light"
            >
              {sortingState.paused ? "Resume" : "Pause"}
            </button>
          )}
          <button 
            onClick={generateSortingArray} 
            className="bg-carbon text-white px-5 py-3 rounded-md"
          >
            Reset
          </button>
          <select
            value={Object.keys(speedMap).find(key => speedMap[key] === sortingState.delay) || "medium"}
            onChange={changeSortingSpeed}
            className="ml-auto bg-carbon px-2 py-2 rounded-md cursor-pointer outline-none focus:ring ring-purple-light"
          >
            <option value="slow">Slow</option>
            <option value="medium">Medium</option>
            <option value="fast">Fast</option>
          </select>
        </div>
      </div>

      {/* Help modal with algorithm info */}
      <Modal isOpen={isModalOpen} onClose={closeModal} sortingState={sortingState} />
    </div>
  );
}

export default Overlay;
