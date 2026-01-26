// components/PaymentInfoOrder.jsx
import { Accordion, Row, Col, ListGroup, Badge } from "react-bootstrap";
import { useState } from "react";
import { usePreferences } from "../../../Context/PreferencesContext";
import { checkUserRolesValidity } from "../../../Utils/checkUserRolesValidity";
import { ROLES } from "../../../Utils/const/roles";
import { PAYMENT_METHODS } from "../../../Utils/const/paymentMethods";
import { ConfirmActionButton } from "../../common/ConfirmActionButton";
import PaymentBreakdown from "./PaymentBreakdown";
import PaymentCashDetails from "./PaymentCashDetails";
import { usePaymentActions } from "./usePaymentActions";
import { useCashPaymentCalculation } from "./useCashPaymentCalculation";
import formatearNumeroConPuntos from "../../../Utils/formatearNumeroConPuntos";
import SubTitleNamePayment from "../SubTitleNamePayment";

const PaymentInfoOrder = ({ data }) => {
  const { totalPrice, delivery, paymentMethod, payment } = data;
  const { roleSelect } = usePreferences();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  // Usamos los custom hooks
  const { updatePayment, updateChangePayment, loading } = usePaymentActions();
  const { billAmount, changeAmount } = useCashPaymentCalculation(totalPrice);

  // Funciones manejadoras
  const approvePayment = () => {
    updatePayment(data.id);
  };

  const handleChangePaymentMethod = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const updatePaymentMethod = () => {
    updateChangePayment(data.id, paymentMethod, selectedPaymentMethod);
  };

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <div className="w-100 d-flex justify-content-between align-items-center">
            <SubTitleNamePayment paymentMethod={paymentMethod} />
            <Badge
              bg={
                payment.status === "approved"
                  ? "success text-decoration-line-through"
                  : "danger"
              }
              className="fs-6"
            >
              {formatearNumeroConPuntos(totalPrice)}
            </Badge>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <ListGroup variant="flush">
            <ListGroup.Item className="border-0 py-2">
              <PaymentBreakdown totalPrice={totalPrice} delivery={delivery} />

              {paymentMethod.toLowerCase() === "cash" && (
                <PaymentCashDetails
                  billAmount={billAmount}
                  changeAmount={changeAmount}
                />
              )}

              <hr className="my-2" />
              <Row className="mb-2 align-items-center">
                <Col xs={12} sm={8} className="text-secondary text-sm-start text-center mb-2 mb-sm-0">
                  Estado del pago:
                </Col>
                <Col xs={12} sm={4} className="text-sm-end text-center fw-semibold">
                  {payment.status === "approved" ? (
                    <Badge bg="success">Aprobado</Badge>
                  ) : (
                    <Badge bg="danger">Esperando</Badge>
                  )}
                </Col>
              </Row>

              {checkUserRolesValidity(
                [roleSelect],
                [ROLES.ADMIN.value, ROLES.RECEPTION.value]
              ) && (
                <>
                  {payment.status !== "approved" && (
                    <ConfirmActionButton
                      buttonLabel="Aprobar pago"
                      isLoading={loading}
                      onConfirm={approvePayment}
                      variant="warning"
                      confirmVariant="success"
                      cancelVariant="danger"
                    />
                  )}

                  <hr />

                  {payment.status !== "approved" && (
                    <>
                      <select
                        className="form-select mt-2 mb-3"
                        value={selectedPaymentMethod || ""}
                        onChange={handleChangePaymentMethod}
                        disabled={loading}
                      >
                        <option value={null}>
                          Seleccionar un método de pago
                        </option>
                        {Object.values(PAYMENT_METHODS).map((method) => {
                          if (!method.active) return null;
                          return (
                            <option key={method.value} value={method.value}>
                              {method.name}
                            </option>
                          );
                        })}
                      </select>

                      <ConfirmActionButton
                        buttonLabel="Cambiar método de pago"
                        isLoading={loading}
                        onConfirm={updatePaymentMethod}
                        variant="warning"
                        confirmVariant="success"
                        cancelVariant="danger"
                      />
                    </>
                  )}
                </>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export { PaymentInfoOrder };
