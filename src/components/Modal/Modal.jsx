import React, { useEffect, useRef, useState } from 'react';
import enAlgorithm from '../../data/aboutAlgorithm.en.json';
import deAlgorithm from '../../data/aboutAlgorithm.de.json';

export default function Modal({ isOpen, onClose, sortingState }) {
  const modalRef = useRef(null);

  // Language state
  const [language, setLanguage] = useState('en');

  // Choose the correct JSON
  const aboutAlgorithm = language === 'en' ? enAlgorithm : deAlgorithm;
  const algorithmInfo = aboutAlgorithm[sortingState.algorithm] || {};

  // Handle Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Manage body scroll and focus
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Toggle language
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'de' : 'en'));
  };

  return (
    <>
      {isOpen && (
        <div
          className='fixed inset-0 w-screen h-screen z-[1000] flex items-center justify-center'
          role='dialog'
          aria-modal='true'
          ref={modalRef}
          tabIndex='-1'
        >
          {/* Backdrop */}
          <div
            onClick={onClose}
            className='fixed inset-0 w-screen h-screen bg-black/60 z-[1000] cursor-default'
            role='button'
            tabIndex='0'
            aria-label='Close modal'
            onKeyDown={(e) => e.key === 'Enter' && onClose()}
          />

          {/* Modal */}
          <div
            className='
              relative
              leading-relaxed bg-base-100 text-base-content
              px-4 py-3 sm:px-6 sm:py-4 md:px-10 md:py-5
              rounded-lg
              w-[95%] sm:w-[90%] md:min-w-[400px] md:max-w-[1000px]
              max-h-[90vh] overflow-y-auto
              z-[1001] border border-base-300 shadow-2xl
            '
          >
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className='absolute top-2.5 right-11 px-3 py-1 rounded bg-base-200 hover:bg-base-300 transition-colors'
            >
              {language === 'en' ? 'Deutsch' : 'English'}
            </button>

            <div className='w-full h-0.5 mb-4' />
            <div>
              <h1 className='font-bold text-2xl md:text-4xl text-base-content'>
                {algorithmInfo.name}
              </h1>
              <p className='whitespace-pre-line text-base-content/80'>
                {algorithmInfo.description}
              </p>
              <div className='w-full h-0.5' />

              {/* Pseudocode Section */}
              {algorithmInfo.pseudocode && (
                <div className='m-6'>
                  <h2 className='text-xl font-semibold mb-3 text-base-content'>
                    {language === 'en' ? 'Pseudocode' : 'Pseudocode'}
                  </h2>
                  <pre className='bg-base-200 p-4 rounded-md overflow-x-auto'>
                    <code className='text-sm text-base-content/90'>
                      {algorithmInfo.pseudocode}
                    </code>
                  </pre>
                </div>
              )}

              {/* Table wrapper */}
              <div className='overflow-x-auto max-w-full mb-2'>
                <table className='w-full text-left min-w-[600px]'>
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
                        colSpan={1}
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

            {/* Close button */}
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
