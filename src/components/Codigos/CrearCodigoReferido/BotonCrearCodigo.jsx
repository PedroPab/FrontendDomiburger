import { useState, useRef } from 'react';
import { Button, Tooltip, Overlay } from 'react-bootstrap';

const BotonCrearCodigo = ({ valid, message, text }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const target = useRef(null);

  return (
    <div className="d-grid gap-2 mt-3">
      <div ref={target} className="d-grid gap-2 mt-3" onMouseEnter={() => !valid && setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
        <Button
          type="submit"
          disabled={!valid}
          variant="primary"
        >
          {text}        </Button>
        <Overlay target={target.current} show={showTooltip} placement="top">
          {(props) => (
            <Tooltip id="overlay-example" {...props}>
              {message}
            </Tooltip>
          )}
        </Overlay>
      </div>
    </div>
  );
};

export default BotonCrearCodigo;
