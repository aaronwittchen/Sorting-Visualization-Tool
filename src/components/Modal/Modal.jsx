/* Source: https://github.com/ecole-du-web/react-modal
    -modified to make it work for this project
*/

import React from "react";
import "./Modal.css";
import aboutAlgorithm from "../data/aboutAlgorithm";

export default function Modal({ isOpen, onClose, sortingState }) {
  if (isOpen) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  const algorithmInfo = aboutAlgorithm[sortingState.algorithm] || {};

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div onClick={onClose} className="overlay"></div>
          <div className="modal-content">
            <div className="w-full h-0.5 bg-carbon-light mb-4" />
            <div>
              <h1 className="font-bold text-2xl md:text-4xl">{algorithmInfo.name}</h1>
              <p className="whitespace-pre-line mb-6">{algorithmInfo.description}</p>
              <div className="w-full h-0.5 bg-carbon-light mb-6" />
              
              <div className="overflow-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className="px-4 border-r border-carbon-light" rowSpan={2}>
                        Algorithm
                      </th>
                      <th className="px-4 border-r border-carbon-light" colSpan={3}>
                        Time Complexity
                      </th>
                      <th className="px-4 border-r border-carbon-light" colSpan={3}>
                        Space Complexity</th>
                    </tr>
                    <tr className="border-b border-carbon-light">
                      <th className="px-4 pb-2">Best</th>
                      <th className="px-4 pb-2">Average</th>
                      <th className="px-4 pb-2 border-r border-carbon-light">Worst</th>
                      <th className="px-4 pb-2">Worst</th>
                    </tr>
                  </thead>

                  {/* https://stackoverflow.com/questions/39462458/react-js-creating-simple-table */}
                  <tbody>
                    {Object.keys(aboutAlgorithm).map((key, i) => (
                      <tr key={i} className="hover:bg-carbon-light whitespace-nowrap">
                        <td className={`px-4 py-1 ${i === 0 ? "pt-2" : ""} border-r border-carbon-light`}>
                          {aboutAlgorithm[key].name}
                        </td>
                        <td className={`px-4 py-1 ${i === 0 ? "pt-2" : ""}`}>
                          <span className={`px-1.5 py-0.5 rounded-md bg-${aboutAlgorithm[key].time_complexity.best[1]}`}>
                            {aboutAlgorithm[key].time_complexity.best[0]}
                          </span>
                        </td>
                        <td className={`px-4 py-1 ${i === 0 ? "pt-2" : ""}`}>
                          <span className={`px-1.5 py-0.5 rounded-md bg-${aboutAlgorithm[key].time_complexity.average[1]}`}>
                            {aboutAlgorithm[key].time_complexity.average[0]}
                          </span>
                        </td>
                        <td className={`px-4 py-1 ${i === 0 ? "pt-2" : ""} border-r border-carbon-light`}>
                          <span className={`px-1.5 py-0.5 rounded-md bg-${aboutAlgorithm[key].time_complexity.worst[1]}`}>
                            {aboutAlgorithm[key].time_complexity.worst[0]}
                          </span>
                        </td>
                        <td className={`px-4 py-1 ${i === 0 ? "pt-2" : ""}`}>
                          <span className={`px-1.5 py-0.5 rounded-md bg-${aboutAlgorithm[key].space_complexity[1]}`}>
                            {aboutAlgorithm[key].space_complexity[0]}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <button className="close-modal" onClick={onClose}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
