import React, { useState, useContext, useEffect } from "react";
import { SortingContext } from "../contexts/Context";
import Modal from "./Modal/Modal";

function Overlay() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { sortingState, generateSortingArray, startVisualizing, changeSortingSpeed, changeAlgorithm } = useContext(SortingContext);

  useEffect(() => {
    generateSortingArray();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="mt-4 mb-4 flex flex-col items-center">
      <h1 className="text-6xl font-andada font-bold mb-6">Sorting Visualization Tool</h1>
      
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {["bubble_sort", "selection_sort", "insertion_sort", "merge_sort", "quick_sort", "radix_sort", "bucket_sort"].map((algorithm) => (
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

        <button onClick={openModal} className="bg-carbon text-white px-5 py-3 rounded-md">
          ?
        </button>
      </div>

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
            style={{ paddingLeft: '0px'}} // marginBottom: '10px' 
          >
            {bar.value}
          </p>
        </div>
      </div>
    ))}
  </div>

        <div className="flex items-center gap-4 max-w-3xl mb-8">
          <button disabled={sortingState.sorting} onClick={startVisualizing} className="px-4 py-2 push-btn text-white-light disabled:brightness-75">
            Start
          </button>
          <button onClick={() => generateSortingArray()} className="bg-carbon text-white px-5 py-3 rounded-md">
            Reset
          </button>
          <select
            defaultValue="medium"
            disabled={sortingState.sorting}
            onChange={changeSortingSpeed}
            className="ml-auto bg-carbon px-2 py-2 rounded-md cursor-pointer outline-none focus:ring ring-purple-light disabled:brightness-75 disabled:cursor-default"
          >
            <option value="slow">Slow</option>
            <option value="medium">Medium</option>
            <option value="fast">Fast</option>
          </select>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} sortingState={sortingState} />
    </div>
  );
}

export default Overlay;
