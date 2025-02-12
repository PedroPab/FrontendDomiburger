import { Container } from "react-bootstrap"
import { UserLayout } from "../../../Layout/UserLayout"

const CreateOrder = () => {
  return (
    <UserLayout>
      <Container>
        <h1>Pedir Ya</h1>
        <ProgressBar step={step} />
      </Container>
    </UserLayout>
  )
}

export { CreateOrder }