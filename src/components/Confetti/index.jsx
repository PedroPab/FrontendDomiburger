import { useEffect, useRef } from 'react';
import './Confetti.css';

const Confetti = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const confettiCount = 100; // Cantidad de confeti
    const confetti = []; // Almacén de confetis
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFFF33', '#FF33FF'];

    const createConfetti = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 5 + 2, // Radio del confeti
      dx: Math.random() * 2 - 1, // Movimiento horizontal
      dy: Math.random() * 2 + 1, // Movimiento vertical
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360, // Rotación inicial
      rotationSpeed: Math.random() * 10 - 5, // Velocidad de rotación
    });

    const initConfetti = () => {
      for (let i = 0; i < confettiCount; i++) {
        confetti.push(createConfetti());
      }
    };

    const updateConfetti = () => {
      confetti.forEach((c) => {
        c.x += c.dx;
        c.y += c.dy;
        c.rotation += c.rotationSpeed;

        // Reseteo si salen de la pantalla
        if (c.y > canvas.height) c.y = -10;
        if (c.x > canvas.width) c.x = 0;
        if (c.x < 0) c.x = canvas.width;
      });
    };

    const drawConfetti = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confetti.forEach((c) => {
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rotation * Math.PI) / 180);
        ctx.fillStyle = c.color;
        ctx.beginPath();
        ctx.arc(0, 0, c.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
      });
    };

    const animate = () => {
      updateConfetti();
      drawConfetti();
      requestAnimationFrame(animate);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Inicializar tamaño del canvas
    initConfetti();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: 'block' }} />;
};

export default Confetti;
