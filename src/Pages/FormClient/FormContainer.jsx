import { useState } from 'react';
import { Container } from 'react-bootstrap';

import NameInput from '../../components/FormsInputs/NameInput';
import PhoneInputComponent from '../../components/FormsInputs/PhoneInput';
import CommentInput from '../../components/FormsInputs/CommentInput';
import PaymentMethodInput from '../../components/FormsInputs/PaymentMethodInput';
import DashboardProducts from '../../components/Products/Dashboard/Dashboard';
import RegisterSaleButton from '../../components/RegisterSaleButton';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useSendOrderClientAnonymous } from '../../hooks/api/order/useSendOrderClientAnonymous';
import { ContainerCreateLocationAnonymous } from './ContainerCreateLocationAnonymous';
import { KitchenAndDeliveryInfo } from '../../components/FormsInputs/KitchenAndDeliveryInfo';
import { usePaymentMethodCom } from '../Recepcion/FormAdminV2/usePaymentMethodCom';


const FormContainer = () => {

	//estados del los datos del formulario
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [comment, setComment] = useState('');
	const { Component: PaymentMethodInput, paymentMethod, setPaymentValueDefault } = usePaymentMethodCom();
	const [listaProductosOrder, setListaProductosOrder] = useState([]);
	// const [storedOrder, setStoredOrder] = useLocalStorage('order', {});

	const [delivery, setDelivery] = useState(null);
	const [locationIdSelect, setLocationIdSelect] = useState(null);
	const [kitchenIdSelect, setKitchenIdSelect] = useState(null);
	const [kitchen, setKitchen] = useState(null);

	const { isLoading, error, response, sendOrder } = useSendOrderClientAnonymous()

	const sendOrderHandler = async () => {
		sendOrder({
			delivery,
			kitchenId: kitchenIdSelect,
			comment,
			paymentMethod,
			orderItems: listaProductosOrder,
			locationId: locationIdSelect,
			phone,
			name,
		});

	}

	return (
		<Container>
			<h2 className="text-center">Realiza tu pedido</h2>

			<NameInput
				name={name}
				setName={setName}
			/>

			<PhoneInputComponent
				telefono={phone}
				setTelefono={setPhone}
			/>

			{/* crear una location anónima */}

			<ContainerCreateLocationAnonymous
				locationIdSelect={locationIdSelect}
				setLocationIdSelect={setLocationIdSelect}
			/>

			<KitchenAndDeliveryInfo
				kitchen={kitchen}
				setKitchen={setKitchen}
				delivery={delivery}
				setDelivery={setDelivery}
				locationIdSelect={locationIdSelect}
				kitchenIdSelect={kitchenIdSelect}
			/>
			<hr />

			<CommentInput
				comment={comment}
				setComment={setComment}
			/>

			<PaymentMethodInput />

			<DashboardProducts
				listaProductosOrder={listaProductosOrder}
				setListaProductosOrder={setListaProductosOrder}
				delivery={delivery}
			/>

			<RegisterSaleButton
				onClick={() => sendOrderHandler()}
				disabled={isLoading}
			/>

			{error && (
				<div className="alert alert-danger" role="alert">
					{error.message}
				</div>
			)}

			{response && (
				<div className="alert alert-success" role="alert">
					Pedido realizado con éxito. ID: {response.id}
				</div>
			)}

			<LoadingSpinner isLoading={isLoading} />

			<hr />

		</Container >
	);
}

export default FormContainer;
