import { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';

const ConfirmActionButton = ({
  buttonLabel = "Change Status",  // Default text for the main button
  isLoading = false,              // Loading state flag
  onConfirm,                      // Function to execute when confirming the action
  confirmText = "Aceptar",         // Text for the confirm button
  cancelText = "Cancelar",          // Text for the cancel button
  variant = "primary",            // Variant for the main button
  confirmVariant = "success",     // Variant for the confirm button
  cancelVariant = "danger"        // Variant for the cancel button
}) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    setIsConfirming(false);
  };

  return (
    <div className="d-flex gap-2">
      {isConfirming ? (
        <>
          <Button
            variant={confirmVariant}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? <Spinner animation="border" size="sm" /> : confirmText}
          </Button>
          <Button
            variant={cancelVariant}
            onClick={() => setIsConfirming(false)}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
        </>
      ) : (
        <Button
          variant={variant}
          onClick={() => setIsConfirming(true)}
          disabled={isLoading}
        >
          {isLoading ? <Spinner animation="border" size="sm" /> : buttonLabel}
        </Button>
      )}
    </div>
  );
};

export { ConfirmActionButton };
