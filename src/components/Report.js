import React from "react";

function Report({ userAnswers, correctAnswers }) {
  return (
    <div>
      <h2 className='text-lg font-semibold mb-4'>Quiz Report</h2>
      <table className='table-auto'>
        <thead>
          <tr>
            <th className='px-4 py-2'>Question</th>
            <th className='px-4 py-2'>Your Answer</th>
            <th className='px-4 py-2'>Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          {userAnswers.map((userAnswer, index) => (
            <tr key={index}>
              <td className='border px-4 py-2'>Question {index + 1}</td>
              <td className='border px-4 py-2'>{userAnswer}</td>
              <td className='border px-4 py-2'>{correctAnswers[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Report;
