const NavigationButtons = ({ onNext, onPrev, disabled }) => {
  if (!onNext && !onPrev) return null; // No renderiza nada si ambos son undefined

  return (
    <div className="position-fixed bottom-0 start-0 w-100 p-3 text-center ">
      <div className="d-flex justify-content-around">
        {onPrev && (
          <button className="btn btn-secondary" onClick={onPrev}>
            Atrás
          </button>
        )}
        {onNext && (
          <button className="btn btn-primary" onClick={onNext} disabled={disabled}>
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
};

export { NavigationButtons };
