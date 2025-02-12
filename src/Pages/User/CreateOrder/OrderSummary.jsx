import { Container } from "react-bootstrap"
import { NavigationButtons } from "./NavigationButtons"

const OrderSummary = ({ onNext, onPrev }) => {
  return (
    <>
      <Container>


        <NavigationButtons onNext={onNext} onPrev={onPrev} disabled={false} />

      </Container>
    </>
  )
}

export { OrderSummary }