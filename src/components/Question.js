import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaCircle } from "react-icons/fa";

function Question({
  question,
  onSelectAnswer,
  onNextQuestion,
  onPreviousQuestion,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    // Reset selected answer when the question changes
    setSelectedAnswer("");
  }, [question]);

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
    onSelectAnswer(answer);
  };

  return (
    <div className='w-full'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p
          className='text-lg font-semibold mb-4'
          dangerouslySetInnerHTML={{ __html: question.question }}
        />
      </motion.div>

      {question.type === "multiple" ? (
        <AnimatePresence>
          {question.incorrect_answers.map((incorrectChoice, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className={`cursor-pointer hover:bg-gray-200 flex w-full items-center rounded-md p-2 mb-2 ${
                selectedAnswer === incorrectChoice
                  ? "bg-red-100"
                  : "bg-gray-100"
              }`}
              onClick={() => handleSelectAnswer(incorrectChoice)}
            >
              {selectedAnswer === incorrectChoice ? (
                <FaTimesCircle className='text-red-500 mr-2' />
              ) : (
                <FaCircle className='text-gray-500 mr-2' />
              )}
              {incorrectChoice}
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className={`cursor-pointer hover:bg-gray-200 flex w-full items-center rounded-md p-2 mb-2 ${
              selectedAnswer === question.correct_answer
                ? "bg-green-100"
                : "bg-gray-100"
            }`}
            onClick={() => handleSelectAnswer(question.correct_answer)}
          >
            {selectedAnswer === question.correct_answer ? (
              <FaCheckCircle className='text-green-500 mr-2' />
            ) : (
              <FaCircle className='text-gray-500 mr-2' />
            )}
            {question.correct_answer}
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className='mt-4'>
          <label className='flex items-center cursor-pointer'>
            <input
              type='radio'
              name='trueFalse'
              value='True'
              checked={selectedAnswer === "True"}
              onChange={() => handleSelectAnswer("True")}
              className='mr-2 cursor-pointer'
            />
            True
          </label>
          <label className='flex items-center cursor-pointer'>
            <input
              type='radio'
              name='trueFalse'
              value='False'
              checked={selectedAnswer === "False"}
              onChange={() => handleSelectAnswer("False")}
              className='mr-2 cursor-pointer'
            />
            False
          </label>
        </div>
      )}

      <div className='flex justify-between mt-6'>
        <motion.button
          onClick={onPreviousQuestion}
          className='bg-gray-300 hover:bg-gray-400 text-gray-600 px-4 py-2 rounded-md'
          whileTap={{ scale: 0.95 }}
        >
          Previous
        </motion.button>
        <motion.button
          onClick={onNextQuestion}
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'
          whileTap={{ scale: 0.95 }}
        >
          Next
        </motion.button>
      </div>
    </div>
  );
}

export default Question;
