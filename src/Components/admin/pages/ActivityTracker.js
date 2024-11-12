import React, { useEffect, useState } from 'react';

const ActivityTracker = ({ onActive }) => {
  const [timeSpent, setTimeSpent] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timeSpent < 10) {
          alert("You left before reaching 10 minutes. Keep going to earn your coin!");
        }
        clearInterval(intervalId);
      } else {
        startTimer();
      }
    };

    const startTimer = () => {
      const id = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 60000); // 1-minute interval
      setIntervalId(id);
    };

    if (timeSpent < 10) {
      startTimer();
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [timeSpent, intervalId]);

  useEffect(() => {
    if (timeSpent >= 10) {
      clearInterval(intervalId);
      onActive();
    }
  }, [timeSpent, onActive, intervalId]);

  return (
    <div>
      <h2>Time Spent: {timeSpent} minutes</h2>
      {timeSpent >= 10 ? <p>You've earned 1 coin for today!</p> : <p>Keep going to earn your coin!</p>}
    </div>
  );
};

export default ActivityTracker;
