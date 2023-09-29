import React from "react";

function OverviewPanel({ questions, visitedQuestions, attemptedQuestions }) {
  return (
    <div className='bg-gray-200 p-4 rounded-md shadow-md'>
      <h2 className='text-lg font-semibold mb-2'>Overview</h2>
      <ul>
        {questions.map((question, index) => (
          <li
            key={index}
            className={`mb-2 ${
              visitedQuestions.includes(index)
                ? "text-blue-500"
                : "text-gray-400"
            } ${
              attemptedQuestions.includes(index)
                ? "font-semibold"
                : "font-normal"
            }`}
          >
            Question {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OverviewPanel;
