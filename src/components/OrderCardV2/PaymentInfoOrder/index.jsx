// components/PaymentInfoOrder.jsx
import { Accordion, Row, Col, ListGroup, Badge, Spinner } from "react-bootstrap";
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

  // Usamos los custom hooks
  const { updatePayment, updateChangePayment, loading } = usePaymentActions();
  const { billAmount, changeAmount } = useCashPaymentCalculation(totalPrice);

  // Funciones manejadoras
  const approvePayment = () => {
    updatePayment(data.id);
  };

  const handleChangePaymentMethod = (e) => {
    const newPaymentMethod = e.target.value;
    if (newPaymentMethod && newPaymentMethod !== paymentMethod) {
      updateChangePayment(data.id, paymentMethod, newPaymentMethod);
    }
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
                    <div className="position-relative">
                      <label className="form-label small text-muted mb-1">
                        Cambiar método de pago
                      </label>
                      <select
                        className="form-select"
                        value={paymentMethod}
                        onChange={handleChangePaymentMethod}
                        disabled={loading}
                      >
                        {Object.values(PAYMENT_METHODS).map((method) => {
                          if (!method.active) return null;
                          return (
                            <option key={method.value} value={method.value}>
                              {method.name}
                            </option>
                          );
                        })}
                      </select>
                      {loading && (
                        <div className="position-absolute top-50 end-0 translate-middle-y me-4">
                          <Spinner animation="border" size="sm" />
                        </div>
                      )}
                    </div>
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
