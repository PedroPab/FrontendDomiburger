import { ProgressBar as BootstrapProgress, Container } from "react-bootstrap";

const ProgressBar = ({ step, stepList }) => {
  const steps = stepList;
  const progress = (step / steps.length) * 100;

  return (
    <Container className="text-center my-1">
      {/* Indicador del paso actual */}
      <p className="fw-bold text-secondary">
        🛍️ Progreso del Pedido: <span className="text-primary">{step}</span> / {steps.length}
      </p>

      {/* Barra de progreso de Bootstrap mejorada */}
      <BootstrapProgress
        now={progress}
        label={`${Math.round(progress)}%`}
        variant={progress < 50 ? "s" : progress < 80 ? "warning" : "success"}
        animated
        className="shadow-sm"
      />
    </Container>
  );
};

export { ProgressBar };
