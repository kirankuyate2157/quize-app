import React, { useState, useEffect } from "react";

function Timer({ onTimerExpired }) {
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        clearInterval(timer);
        onTimerExpired();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeRemaining, onTimerExpired]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className='text-right text-gray-600'>
      Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}

export default Timer;
