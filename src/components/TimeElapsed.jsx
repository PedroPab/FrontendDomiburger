import { useState, useEffect } from 'react';

const calculateTimeDifference = (startDate) => {
  const now = new Date();
  const diff = now - startDate;

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
  const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return (
    <span>
      <span>{years} <strong>años</strong>, </span>
      <span>{months} <strong>meses</strong>, </span>
      <span>{days} <strong>días</strong>, </span>
      <span>{hours} <strong>horas</strong>, </span>
      <span>{minutes} <strong>minutos</strong>, </span>
      <span>{seconds} <strong>segundos</strong></span>
    </span>
  );
};

const TimeElapsed = ({ startDate }) => {
  const [timeWorked, setTimeWorked] = useState(calculateTimeDifference(startDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeWorked(calculateTimeDifference(startDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate]);

  return <span>{timeWorked}</span>;
};

export default TimeElapsed;
