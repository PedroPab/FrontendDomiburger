import { useState } from "react";
import { PAYMENT_METHODS } from "../../../Utils/const/paymentMethods";
import { PaymentMethodInput } from "../../User/CreateOrder/PaymentMethodAndComments";

const usePaymentMethodCom = () => {
	const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.CASH.value);

	const component = () => {
		return (
			<PaymentMethodInput
				paymentMethod={paymentMethod}
				setPaymentMethod={setPaymentMethod}
			/>
		)
	}

	const setPaymentValueDefault = () => {
		setPaymentMethod(PAYMENT_METHODS.CASH.value);
	}

	return {
		Component: component,
		paymentMethod,
		setPaymentMethod,
		setPaymentValueDefault,
	}
}

export { usePaymentMethodCom }