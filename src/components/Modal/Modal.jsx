import React, { useEffect, useRef } from 'react';
import aboutAlgorithm from '../../data/aboutAlgorithm';

export default function Modal({ isOpen, onClose, sortingState }) {
  const modalRef = useRef(null);

  // Handle Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Manage body class and focus when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      // Apply overflow-hidden to body when modal is active
      document.body.style.overflow = 'hidden';
      // Focus the modal when it opens
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const algorithmInfo = aboutAlgorithm[sortingState.algorithm] || {};

  return (
    <>
      {isOpen && (
        <div
          className='fixed inset-0 w-screen h-screen z-[1000]'
          role='dialog'
          aria-modal='true'
          ref={modalRef}
          tabIndex='-1'
        >
          <div
            onClick={onClose}
            className='fixed inset-0 w-screen h-screen bg-black/60 z-[1000] cursor-default'
            role='button'
            tabIndex='0'
            aria-label='Close modal'
            onKeyDown={(e) => e.key === 'Enter' && onClose()}
          ></div>
          <div className='absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 leading-relaxed bg-base-100 text-base-content px-10 py-5 rounded-lg max-w-[1000px] min-w-[400px] z-[1001] border border-base-300 shadow-2xl'>
            <div className='w-full h-0.5 mb-4' />
            <div>
              <h1 className='font-bold text-2xl md:text-4xl text-base-content'>
                {algorithmInfo.name}
              </h1>
              <p className='whitespace-pre-line mb-4 text-base-content/80'>
                {algorithmInfo.description}
              </p>
              <div className='w-full h-0.5' />

              <div className='overflow-auto'>
                <table className='w-full text-left'>
                  <thead>
                    <tr className='border-b border-base-100'>
                      <th
                        className='px-4 border-r border-base-100 text-base-content'
                        rowSpan={2}
                      >
                        Algorithm
                      </th>
                      <th
                        className='px-4 border-r border-base-100 text-base-content'
                        colSpan={3}
                      >
                        Time Complexity
                      </th>
                      <th
                        className='px-4 border-r border-base-100 text-base-content'
                        colSpan={3}
                      >
                        Space Complexity
                      </th>
                    </tr>
                    <tr className='border-b border-base-100'>
                      <th className='px-4 pb-2 text-base-content'>Best</th>
                      <th className='px-4 pb-2 text-base-content'>Average</th>
                      <th className='px-4 pb-2 border-r border-base-100 text-base-content'>
                        Worst
                      </th>
                      <th className='px-4 pb-2 text-base-content'>Worst</th>
                    </tr>
                  </thead>

                  <tbody>
                    {Object.keys(aboutAlgorithm).map((key, i) => (
                      <tr
                        key={i}
                        className='hover:bg-base-200 whitespace-nowrap'
                      >
                        <td
                          className={`px-4 py-1 ${
                            i === 0 ? 'pt-2' : ''
                          } border-r border-base-100 text-base-content`}
                        >
                          {aboutAlgorithm[key].name}
                        </td>
                        <td className={`px-4 py-1 ${i === 0 ? 'pt-2' : ''}`}>
                          <span
                            className={`px-1.5 py-0.5 rounded-md bg-${aboutAlgorithm[key].time_complexity.best[1]} text-white`}
                          >
                            {aboutAlgorithm[key].time_complexity.best[0]}
                          </span>
                        </td>
                        <td className={`px-4 py-1 ${i === 0 ? 'pt-2' : ''}`}>
                          <span
                            className={`px-1.5 py-0.5 rounded-md bg-${aboutAlgorithm[key].time_complexity.average[1]} text-white`}
                          >
                            {aboutAlgorithm[key].time_complexity.average[0]}
                          </span>
                        </td>
                        <td
                          className={`px-4 py-1 ${
                            i === 0 ? 'pt-2' : ''
                          } border-r border-base-100`}
                        >
                          <span
                            className={`px-1.5 py-0.5 rounded-md bg-${aboutAlgorithm[key].time_complexity.worst[1]} text-white`}
                          >
                            {aboutAlgorithm[key].time_complexity.worst[0]}
                          </span>
                        </td>
                        <td className={`px-4 py-1 ${i === 0 ? 'pt-2' : ''}`}>
                          <span
                            className={`px-1.5 py-0.5 rounded-md bg-${aboutAlgorithm[key].space_complexity[1]} text-white`}
                          >
                            {aboutAlgorithm[key].space_complexity[0]}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <button
              onClick={onClose}
              className='absolute top-2.5 right-2.5 px-2 py-1 cursor-pointer hover:bg-base-200 rounded transition-colors text-base-content'
              aria-label='Close modal'
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
