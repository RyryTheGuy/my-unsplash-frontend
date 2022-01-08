import React from "react";
import './index.css';

const SuccessfulDelete = () => (
  <div className="flex flex-col justify-center items-center">
    <h2 className="text-2xl mb-5">Image successfully deleted!</h2>
    {/* Custom Checkmark made from CSS */}
    <svg id="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
      <circle id="checkmark_circle" cx={26} cy={26} r={25} fill="none" />
      <path id="checkmark_check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
    </svg>
  </div>
);

export { SuccessfulDelete };