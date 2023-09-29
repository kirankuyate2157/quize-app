import React, { useState, useEffect } from "react";
import axios from "axios";
import Timer from "./components/Timer";
import Question from "./components/Question";
import OverviewPanel from "./components/OverviewPanel";
import Report from "./components/Report";
import { FaCheckCircle, FaCircle, FaQuestionCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(15).fill(""));
  const [visitedQuestions, setVisitedQuestions] = useState([]);
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    // Fetch questions from the API and set them in the state
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=15"
        );
        setQuestions(response.data.results);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setVisitedQuestions([...visitedQuestions, currentIndex]);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSelectAnswer = (answer) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentIndex] = answer;
    setUserAnswers(updatedUserAnswers);
    setAttemptedQuestions([...attemptedQuestions, currentIndex]);
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
  };

  const handleTimerExpired = () => {
    if (!quizSubmitted) {
      handleSubmitQuiz();
    }
  };

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  return (
    <div className='bg-gray-100 min-h-screen w-full flex flex-col lg:flex-row py-4'>
      {/* Left-side panel for overview on larger screens */}
      <div className='lg:w-1/6 lg:overflow-y-auto pr-4 pb-4'>
        <OverviewPanel
          questions={questions}
          visitedQuestions={visitedQuestions}
          attemptedQuestions={attemptedQuestions}
        />
      </div>

      <div className='w-full lg:w-3/4'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className='mx-auto bg-white p-4 rounded-md shadow-md h-full overflow-y-auto'
        >
          <h1 className='text-2xl font-semibold mb-4'>
            Quiz App - Question {currentIndex + 1}
          </h1>
          <Timer
            timeRemaining={quizSubmitted ? 0 : 30 * 60}
            onTimerExpired={handleTimerExpired}
          />
          <Question
            question={currentQuestion}
            onSelectAnswer={handleSelectAnswer}
            onNextQuestion={handleNextQuestion}
            onPreviousQuestion={handlePreviousQuestion}
          />
          <div className='flex justify-between mt-4'>
            <motion.button
              onClick={handlePreviousQuestion}
              className='bg-gray-300 hover:bg-gray-400 text-gray-600 px-4 py-2 rounded-md'
              whileTap={{ scale: 0.95 }}
            >
              Previous
            </motion.button>
            {currentIndex === totalQuestions - 1 ? (
              <motion.button
                onClick={handleSubmitQuiz}
                className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md'
                whileTap={{ scale: 0.95 }}
              >
                Submit
              </motion.button>
            ) : (
              <motion.button
                onClick={handleNextQuestion}
                className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'
                whileTap={{ scale: 0.95 }}
              >
                Next
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
