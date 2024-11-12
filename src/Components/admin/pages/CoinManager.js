import React, { useEffect, useState, useCallback } from 'react';

const CoinManager = ({ username }) => {
  const [coins, setCoins] = useState(0);
  const [tokens, setTokens] = useState(0);
  const [coupons, setCoupons] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastActive, setLastActive] = useState(null);

  // Function to handle user activity and update progress
  const handleActivity = useCallback(() => {
    const now = new Date();
    const lastActiveDate = lastActive ? new Date(lastActive) : null;

    if (!lastActive || now - lastActiveDate >= 86400000) {
      setStreak(1); // Reset streak if last active was more than 24 hours ago
    } else {
      setStreak((prev) => prev + 1);
    }

    setLastActive(now.toISOString());
    setCoins((prev) => prev + 1);

    // Convert 7 coins into 1 token and reset streak
    if (streak >= 7) {
      setCoins((prev) => prev - 7);
      setTokens((prev) => prev + 1);
      setStreak(0);
    }

    // Convert 4 tokens into 1 coupon
    if (tokens >= 4) {
      setTokens((prev) => prev - 4);
      setCoupons((prev) => prev + 1);
    }
  }, [lastActive, streak, tokens]); // Add necessary dependencies here

  useEffect(() => {
    if (lastActive) {
      handleActivity();
    }
  }, [lastActive, handleActivity]);

  return (
    <div>
      <h2>{username}'s Progress</h2>
      <p>Coins: {coins}</p>
      <p>Tokens: {tokens}</p>
      <p>Coupons: {coupons}</p>
      <p>Current Streak: {streak} days</p>
    </div>
  );
};

export default CoinManager;
