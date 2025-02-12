import { Container } from "react-bootstrap";
import { UserLayout } from "../../../Layout/UserLayout";
import { ProgressBar } from "../../../components/ProgressBar";
import { ProductSelectionStep } from "./ProductSelectionStep";
import { useState } from "react";
import { LocationSelectionStep } from "./LocationSelectionStep";
import { PaymentMethodAndComments } from "./PaymentMethodAndComments";
import { OrderSummary } from "./OrderSummary";
import "./CreateOrder.css";


const CreateOrder = () => {
  const stepList = ['Escoger Productos', 'Ubicación', 'Método de Pago y Comentarios', 'Resumen y Confirmar'];
  const [step, setStep] = useState(1);
  const [productOrderList, setProductOrderList] = useState([]);
  const [chosenLocation, setChosenLocation] = useState(null);

  // Comentario y método de pago
  const [objComment, setObjComment] = useState('');
  const [paymentMethod, setPaymentMethod] = useState("Efectivo");

  const nextStep = () => {
    if (step < stepList.length) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <UserLayout>
      <Container className="text-center my-4">
        {step === 1 &&
          <h1 className="fw-bold display-4">
            ¡Haz Tu Pedido Ahora!
          </h1>
        }

        <ProgressBar step={step} stepList={stepList} />

        {/* Escoger Productos */}
        {step === 1 && (
          <ProductSelectionStep
            onNext={nextStep}
            productOrderList={productOrderList}
            setProductOrderList={setProductOrderList}
          />
        )}

        {/* Escoger Ubicación */}
        {step === 2 && (
          <LocationSelectionStep
            onNext={nextStep}
            onPrev={prevStep}
            chosenLocation={chosenLocation}
            setChosenLocation={setChosenLocation}
          />
        )}

        {/* Método de Pago y Comentario */}
        {step === 3 && (
          <PaymentMethodAndComments
            onNext={nextStep}
            onPrev={prevStep}
            objComment={[objComment, setObjComment]}
            objPaymentMethod={[paymentMethod, setPaymentMethod]}
          />
        )}

        {/* Resumen del Pedido */}
        {step === 4 && (
          <OrderSummary
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
      </Container>
    </UserLayout>
  );
};

export { CreateOrder };
