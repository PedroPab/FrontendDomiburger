import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import NameInput from '../../components/FormsInputs/NameInput';
import PhoneInputComponent from '../../components/FormsInputs/PhoneInput';
import CommentInput from '../../components/FormsInputs/CommentInput';
import DashboardProducts from '../../components/Products/Dashboard/Dashboard';
import RegisterSaleButton from '../../components/RegisterSaleButton';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useSendOrderClientAnonymous } from '../../hooks/api/order/useSendOrderClientAnonymous';
import { ContainerCreateLocationAnonymous } from './ContainerCreateLocationAnonymous';
import { usePaymentMethodCom } from '../Recepcion/FormAdminV2/usePaymentMethodCom';
import { ORIGINS } from '../../Utils/const/order/origins';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { KitchenAndDeliveryInfoClient } from './KitchenAndDeliveryInfoClient';


const FormContainer = () => {
	const navigate = useNavigate();
	//estados del los datos del formulario
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [comment, setComment] = useState('');
	const { Component: PaymentMethodInput, paymentMethod } = usePaymentMethodCom();
	const [listaProductosOrder, setListaProductosOrder] = useState([]);
	// const [storedOrder, setStoredOrder] = useLocalStorage('order', {});

	const [delivery, setDelivery] = useState(null);
	const [location, setLocation] = useState(null);
	const [kitchen, setKitchen] = useState(null);

	const { isLoading, error, response, sendOrder } = useSendOrderClientAnonymous()

	const sendOrderHandler = async () => {
		//miramos  que este los datos nesesarios para enviar la orden
		if (!name) {
			toast.error("Por favor, ingrese su nombre.");
			return;
		}
		if (!phone) {
			toast.error("Por favor, ingrese su número de teléfono.");
			return;
		}
		if (!location) {
			toast.error("Por favor, cree una dirección.");
			return;
		}

		if (!listaProductosOrder || listaProductosOrder.length === 0) {
			toast.error("Agregue al menos un producto a la orden.");
			return;
		}

		if (!kitchen) {
			toast.error("Por favor, seleccione una cocina.");
			return;
		}
		if (!delivery) {
			toast.error("Por favor, seleccione un domiciliario.");
			return;
		}
		// Se arma el objeto con la información necesaria para el pedido

		const orderItems = listaProductosOrder.map(product => {
			const r = { id: product.id }
			if (product?.modifique && product?.modifique.length > 0) r.complements = product?.modifique.map(complement => ({ id: complement.id }))
			return r;
		})
		console.log('orderItems', orderItems)
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

	useEffect(() => {
		if (error) {
			toast.error(error);
		}
	}
		, [error]);

	const [orderCreateLocal, setOrderCreateLocal] = useLocalStorage('orderCreate', null); // Modo oscuro por defecto


	//exito en el pedido
	useEffect(() => {
		if (response?.data?.statusCode === 201) {
			toast.success('Pedido creado con éxito.');
			// Opcional: Resetear estados o limpiar formulario aquí
			//ponemos los estados en su estado original
			setName('');
			setPhone('');
			setComment('');
			setLocation(null);
			setDelivery(null);
			setKitchen(null);
			setListaProductosOrder([]);
			//los mandamos a la pagina de gracias
			//guradamos la orden en el local storage
			setOrderCreateLocal(response.data.body);
			console.log("🚀 ~ useEffect ~ response.data.body:", response.data.body)
			navigate('/gracias');


		}
	}, [response]);


	return (
		<Container>
			{/* <h2 className="text-center my-4 display-4 text-primary">Realiza tu pedido</h2> */}

			<DashboardProducts
				listaProductosOrder={listaProductosOrder}
				setListaProductosOrder={setListaProductosOrder}
				delivery={delivery}
			/>

			<br />

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

			<br />

			{/* mostrar datos de la cocina de donde se va ha mandar */}
			<KitchenAndDeliveryInfoClient
				kitchen={kitchen}
				setKitchen={setKitchen}
				delivery={delivery}
				setDelivery={setDelivery}
				locationIdSelect={location?.id}
			/>

			<hr />

			<CommentInput
				comment={comment}
				setComment={setComment}
			/>

			<PaymentMethodInput />


			<RegisterSaleButton
				onClick={() => sendOrderHandler()}
				disabled={isLoading}
			/>

			<LoadingSpinner isLoading={isLoading} />

			<hr />

		</Container >
	);
}

export default FormContainer;
