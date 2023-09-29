import React, { useState, useEffect } from "react";
import axios from "axios";
import Timer from "./components/Timer";
import Question from "./components/Question"; // Import Question component
import OverviewPanel from "./components/OverviewPanel"; // Import OverviewPanel component
import Report from "./components/Report"; // Import Report component

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
  console.log(questions);
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

  return (
    <div className='bg-gray-100 min-h-screen py-4'>
      <div className='max-w-2xl mx-auto bg-white p-4 rounded-md shadow-md'>
        <h1 className='text-2xl font-semibold mb-4'>
          Quiz App - Question {currentIndex + 1}
        </h1>
        <Timer
          timeRemaining={quizSubmitted ? 0 : 30 * 60} // 30 minutes in seconds
          onTimerExpired={handleTimerExpired}
        />
        {!quizSubmitted ? (
          <div>
            {/* <Question
              question={currentQuestion}
              onSelectAnswer={handleSelectAnswer}
            /> */}
            <div className='flex justify-between mt-4'>
              <button
                onClick={handleNextQuestion}
                className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'
              >
                Next
              </button>
              {currentIndex === questions.length - 1 && (
                <button
                  onClick={handleSubmitQuiz}
                  className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md'
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        ) : (
          <Report
            userAnswers={userAnswers}
            correctAnswers={questions.map(
              (question) => question.correct_answer
            )}
          />
        )}
      </div>
      <OverviewPanel
        questions={questions}
        visitedQuestions={visitedQuestions}
        attemptedQuestions={attemptedQuestions}
      />
    </div>
  );
}

export default App;
