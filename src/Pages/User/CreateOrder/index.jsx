import { Container } from "react-bootstrap"
import { UserLayout } from "../../../Layout/UserLayout"
import { ProgressBar } from "../../../components/ProgressBar"
import { ProductSelectionStep } from "./ProductSelectionStep"
import { useState } from "react"
import { LocationSelectionStep } from "./LocationSelectionStep"

const CreateOrder = () => {
  const stepList = ['Escoger Productos', 'Ubicación', 'Método de Pago y comentarios', 'Resumen y Confirmar']
  const [step, setStep] = useState(2);
  const [productOrderList, setProductOrderList] = useState([]);
  const [chosenLocation, setChosenLocation] = useState(null);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <UserLayout>
      <Container>
        <h1>Pedir Ya</h1>
        <ProgressBar step={step} stepList={stepList} />

        {/* Escoger Productos */}
        {step === 1 && <ProductSelectionStep onNext={nextStep} productOrderList={productOrderList} setProductOrderList={setProductOrderList} />}

        {/* Escoger Ubicación */}
        {step === 2 && <LocationSelectionStep onNext={nextStep} onPrev={prevStep} chosenLocation={chosenLocation} setChosenLocation={setChosenLocation} />}


      </Container>
    </UserLayout>
  )
}

export { CreateOrder }