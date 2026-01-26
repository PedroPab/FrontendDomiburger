import { useCallback } from 'react';
import confetti from 'canvas-confetti';

export const useConfetti = () => {
  const fireConfetti = useCallback((options = {}) => {
    confetti({
      particleCount: 200,
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      origin: { x: 0.5, y: 0.5 },
      ...options,
    });
  }, []);

  return fireConfetti;
};
