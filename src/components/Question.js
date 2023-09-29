import React from "react";

function Question({ question, choices, onSelectAnswer, type }) {
  return (
    <div>
      <p
        className='text-lg font-semibold mb-2'
        dangerouslySetInnerHTML={{ __html: question }}
      />
      {type === "multiple" ? (
        <ul>
          {choices.map((choice, index) => (
            <li
              key={index}
              onClick={() => onSelectAnswer(choice)}
              className='cursor-pointer hover:bg-gray-200 rounded-md p-2 mb-1'
            >
              {choice}
            </li>
          ))}
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
