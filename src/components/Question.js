import React from "react";

function Question({ question, onSelectAnswer }) {
  return (
    <div>
      <p
        className='text-lg font-semibold mb-2'
        dangerouslySetInnerHTML={{ __html: question.question }}
      />
      {question.type === "multiple" ? (
        <ul>
          {question.incorrect_answers.map((incorrectChoice, index) => (
            <li
              key={index}
              onClick={() => onSelectAnswer(incorrectChoice)}
              className='cursor-pointer hover:bg-gray-200 rounded-md p-2 mb-1'
            >
              {incorrectChoice}
            </li>
          ))}
          <li
            onClick={() => onSelectAnswer(question.correct_answer)}
            className='cursor-pointer hover:bg-gray-200 rounded-md p-2 mb-1'
          >
            {question.correct_answer}
          </li>
        </ul>
      ) : (
        <div>
          <label>
            <input
              type='radio'
              name='trueFalse'
              value='True'
              onClick={() => onSelectAnswer("True")}
            />
            True
          </label>
          <label>
            <input
              type='radio'
              name='trueFalse'
              value='False'
              onClick={() => onSelectAnswer("False")}
            />
            False
          </label>
        </div>
      )}
    </div>
  );
}

export default Question;
