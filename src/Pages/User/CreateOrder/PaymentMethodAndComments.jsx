import { Container } from "react-bootstrap"
import { NavigationButtons } from "./NavigationButtons"
import CommentInput from "../../../components/FormsInputs/CommentInput"
import PaymentMethodInput from "../../../components/FormsInputs/PaymentMethodInput"

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

export { PaymentMethodAndComments }