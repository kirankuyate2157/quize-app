import React from "react";
import { FaCheckCircle, FaCircle, FaQuestionCircle } from "react-icons/fa";

function OverviewPanel({ questions, visitedQuestions, attemptedQuestions }) {
  return (
    <div className='lg:flex lg:flex-col lg:w-1/4 lg:pr-4 lg:max-h-full overflow-x-auto'>
      <div className='lg:hidden flex overflow-x-auto'>
        {questions.map((_, index) => (
          <div
            key={index}
            className='w-8 h-8 flex items-center justify-center mx-1 mb-2 rounded-full bg-gray-200 text-gray-500'
          >
            {attemptedQuestions.includes(index) ? (
              <FaCheckCircle size={18} className='text-green-500' />
            ) : visitedQuestions.includes(index) ? (
              <FaCircle size={18} className='text-yellow-500' />
            ) : (
              <FaQuestionCircle size={18} className='text-gray-500' />
            )}
            <span className='text-sm absolute top-0 left-0 ml-2 mt-2'>
              Q{index + 1}
            </span>
          </div>
        ))}
      </div>
      <div className='hidden lg:block'>
        {questions.map((_, index) => (
          <div
            key={index}
            className={`w-8 h-8 mb-2 flex items-center justify-center rounded-full ${
              attemptedQuestions.includes(index)
                ? "bg-green-500 text-white"
                : visitedQuestions.includes(index)
                ? "bg-yellow-400 text-black"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {attemptedQuestions.includes(index) ? (
              <FaCheckCircle size={18} className='text-white' />
            ) : visitedQuestions.includes(index) ? (
              <FaCircle size={18} className='text-black' />
            ) : (
              <FaQuestionCircle size={18} />
            )}
            <span className='text-sm absolute top-0 left-0 ml-2 mt-2'>
              Q{index + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OverviewPanel;
