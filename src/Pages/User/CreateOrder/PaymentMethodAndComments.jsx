import { Container } from "react-bootstrap"
import { NavigationButtons } from "./NavigationButtons"
import CommentInput from "../../../components/FormsInputs/CommentInput"
import { Form } from 'react-bootstrap';
import { PAYMENT_METHODS } from "../../../Utils/const/paymentMethods";


const PaymentMethodAndComments = ({ onNext, onPrev, objComment, objPaymentMethod }) => {
  const [comment, setComment] = objComment
  const [paymentMethod, setPaymentMethod] = objPaymentMethod

  return (
    <>
      <Container>

        <CommentInput
          comment={comment}
          setComment={setComment}
        />

        <PaymentMethodInput
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />

        <NavigationButtons onNext={onNext} onPrev={onPrev} disabled={false} />
      </Container>
    </>
  )
}


const PaymentMethodInput = ({ paymentMethod, setPaymentMethod }) => {
  const handleChange = (e) => {
    //solo debe permitir letras y espacios y números
    const rta = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '')
    setPaymentMethod(rta);
  };

  const paymentMethods = [...Object.values(PAYMENT_METHODS)].filter(method => method.active)

  return (
    <Form.Group controlId="formCodigo">
      <Form.Label>Método de pago</Form.Label>
      <Form.Control
        as="select"
        value={paymentMethod}
        onChange={handleChange}
      >
        {paymentMethods.map((method, index) => (

          <option key={index} value={method.value}>{method.name}</option>
        ))}
      </Form.Control>
      <Form.Text id="codigoHelpBlock" muted>
        {/* Si es transferencia, la cuenta te llegara por un mensaje. */}
      </Form.Text>
    </Form.Group>
  );
};

export { PaymentMethodAndComments, PaymentMethodInput }

