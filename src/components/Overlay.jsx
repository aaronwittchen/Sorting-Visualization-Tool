// Overlay.jsx
// Main UI component for the sorting visualization tool. Renders algorithm selection, chart, controls, and help modal.

import React, { useState, useContext, useEffect } from 'react';
import { SortingContext } from '../contexts/Context';
import Modal from './Modal/Modal';
import { speedMap } from '../helpers/speedConfig';
import ThemeSelector from './ThemeSelector';

// Overlay component: main interface for user interaction
function Overlay() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Get state and control functions from context
  const {
    sortingState,
    generateSortingArray,
    startVisualizing,
    pauseResumeSorting,
    changeSortingSpeed,
    changeAlgorithm,
  } = useContext(SortingContext);

  // Generate a new array on mount
  useEffect(() => {
    generateSortingArray();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='mt-4 mb-4 flex flex-col items-center'>
      {/* Title */}
      <h1 className='text-6xl font-andada font-bold mb-6 text-base-content'>
        Sorting Visualization Tool
      </h1>

      {/* Algorithm selection buttons */}
      <div className='flex flex-wrap justify-center gap-3 mb-6'>
        {[
          'bubble_sort',
          'selection_sort',
          'insertion_sort',
          'merge_sort',
          'quick_sort',
          'radix_sort',
          'bucket_sort',
        ].map((algorithm) => (
          <button
            key={algorithm}
            onClick={() => changeAlgorithm(algorithm)}
            className={`px-5 py-3 rounded-md text-base-content transition-all ${
              sortingState.algorithm === algorithm
                ? 'bg-primary'
                : 'bg-secondary hover:bg-secondary-focus'
            }`}
          >
            {algorithm.replace('_', ' ').toUpperCase()}
          </button>
        ))}
        {/* Help modal button */}
        <button
          onClick={openModal}
          className='bg-primary text-base-content px-5 py-3 rounded-md hover:bg-secondary-focus transition-all'
        >
          ?
        </button>
        <ThemeSelector />
      </div>

      {/* Chart visualization */}
      <div className='w-full overflow-x-auto px-4'>
        <div className='mb-4 flex relative min-w-max h-[900px] bg-secondary mx-auto max-md:h-[300px]'>
          <div className='base'></div>
          {sortingState.array.map((bar, i) => (
            <div
              key={i}
              className='w-[15px] mx-2 flex justify-center items-end relative max-md:mx-1.5 max-[450px]:mx-0.5'
            >
              <div
                className={`select-none relative bottom-0 w-[30px] h-3/4 flex justify-center items-center text-white font-bold z-10 max-md:w-[25px] max-[450px]:w-[20px] ${
                  bar.state === 'selected' ? 'bg-accent' : 'bg-primary'
                }`}
                style={{ height: `${Math.floor((bar.value / 1000) * 100)}%` }}
              >
                <p
                  className={`${
                    bar.state === 'idle' ? 'text-[#B1D2CF]' : 'text-[#D8B7BE]'
                  }`}
                  style={{ paddingLeft: '0px' }}
                >
                  {bar.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Controls: Start/Pause/Resume, Reset, Speed */}
        <div className='flex items-center gap-4 max-w-3xl mb-8'>
          {!sortingState.sorting ? (
            <button
              onClick={startVisualizing}
              className='relative inline-block no-underline rounded-md border border-primary bg-primary text-center transition-all duration-100 hover:bg-secondary hover:border-secondary active:shadow-[0px_2px_0px_#b0a8b9] active:relative active:top-1 px-4 py-2.5 text-base-content'
            >
              Start
            </button>
          ) : (
            <button
              onClick={pauseResumeSorting}
              className='relative inline-block no-underline rounded-md border border-primary bg-primary text-center transition-all duration-100 hover:bg-secondary hover:border-secondary active:shadow-[0px_2px_0px_#b0a8b9] active:relative active:top-1 px-4 py-2.5 text-base-content'
            >
              {sortingState.paused ? 'Resume' : 'Pause'}
            </button>
          )}
          <button
            onClick={generateSortingArray}
            className='bg-secondary text-base-content px-5 py-3 rounded-md hover:bg-secondary-focus transition-all'
          >
            Reset
          </button>
          <select
            value={
              Object.keys(speedMap).find(
                (key) => speedMap[key] === sortingState.delay
              ) || 'medium'
            }
            onChange={changeSortingSpeed}
            className='ml-auto text-base-content px-2 py-3.5 rounded-md cursor-pointer outline-none focus:ring ring-primary bg-primary'
          >
            <option value='slow'>Slow</option>
            <option value='medium'>Medium</option>
            <option value='fast'>Fast</option>
          </select>
        </div>
      </div>

      {/* Help modal with algorithm info */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        sortingState={sortingState}
      />
    </div>
  );
}

export default Overlay;
