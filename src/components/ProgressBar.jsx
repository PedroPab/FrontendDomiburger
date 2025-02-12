const ProgressBar = ({ step, stepList }) => {
  const steps = stepList || ['Productos', 'Envío', 'Pago'];
  const progress = (step / steps.length) * 100;
  return (
    <div className="progress my-4">
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${progress}%` }}
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  );
};

export { ProgressBar }