import { useState } from 'react';
import { Container } from 'react-bootstrap';

import NameInput from '../../components/FormsInputs/NameInput';
import PhoneInputComponent from '../../components/FormsInputs/PhoneInput';
import CommentInput from '../../components/FormsInputs/CommentInput';
import DashboardProducts from '../../components/Products/Dashboard/Dashboard';
import RegisterSaleButton from '../../components/RegisterSaleButton';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useSendOrderClientAnonymous } from '../../hooks/api/order/useSendOrderClientAnonymous';
import { ContainerCreateLocationAnonymous } from './ContainerCreateLocationAnonymous';
import { KitchenAndDeliveryInfo } from '../../components/FormsInputs/KitchenAndDeliveryInfo';
import { usePaymentMethodCom } from '../Recepcion/FormAdminV2/usePaymentMethodCom';
import { ORIGINS } from '../../Utils/const/order/origins';


const FormContainer = () => {

	//estados del los datos del formulario
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [comment, setComment] = useState('');
	const { Component: PaymentMethodInput, paymentMethod, setPaymentValueDefault } = usePaymentMethodCom();
	const [listaProductosOrder, setListaProductosOrder] = useState([]);
	// const [storedOrder, setStoredOrder] = useLocalStorage('order', {});

	const [delivery, setDelivery] = useState(null);
	const [location, setLocation] = useState(null);
	const [kitchenIdSelect, setKitchenIdSelect] = useState(null);
	const [kitchen, setKitchen] = useState(null);

	const { isLoading, error, response, sendOrder } = useSendOrderClientAnonymous()

	const sendOrderHandler = async () => {
		const orderItems = listaProductosOrder.map(product => {
			const r = { id: product.id }
			if (product?.modifique && product?.modifique.length > 0) r.complements = product?.modifique.map(complement => ({ id: complement.id }))
			return r;
		})
		sendOrder({
			delivery,
			assignedKitchenId: kitchen?.id,
			comment,
			paymentMethod,
			orderItems,
			locationId: location?.id,
			phone,
			name,
			origin: ORIGINS.PUBLIC
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
				location={location}
				setLocation={setLocation}
			/>

			<KitchenAndDeliveryInfo
				kitchen={kitchen}
				setKitchen={setKitchen}
				delivery={delivery}
				setDelivery={setDelivery}
				locationIdSelect={location?.id}
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
