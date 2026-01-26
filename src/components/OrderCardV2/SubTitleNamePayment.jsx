import PropTypes from 'prop-types';
import { PAYMENT_METHODS } from '../../Utils/const/paymentMethods';

const SubTitleNamePayment = ({ paymentMethod }) => {
  const method = Object.values(PAYMENT_METHODS).find(
    (method) => method.value === paymentMethod
  );
  const name = method?.name || "Método de pago desconocido";
  const color = method?.color || "#000"; // Si no se especifica un color, se usará negro

  return (
    <span
      className="fw-bold fs-5   rounded px-2 py-1"
      style={{ color }}
    >
      {name}
    </span>
  );
};

SubTitleNamePayment.propTypes = {
  paymentMethod: PropTypes.string.isRequired,
};

export default SubTitleNamePayment;
