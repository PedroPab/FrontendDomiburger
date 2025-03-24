import { useEffect, useMemo, useState, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';

import LoadingSpinner from '../../../components/LoadingSpinner';
import { ClientSearchModule } from '../../../components/Client/ClientSearchModule';
import { ViewListLocations } from './ViewListLocations';
import CommentInput from '../../../components/FormsInputs/CommentInput';
import { PaymentMethodInput } from '../../User/CreateOrder/PaymentMethodAndComments';
import SelectDomiciliario from '../../../components/FormsInputs/SelectDomiciliario';
import { SelectKitchen } from '../../../components/FormsInputs/SelectKitchen';
import DashboardProducts from '../../../components/Products/Dashboard/Dashboard';
import RegisterSaleButton from '../../../components/RegisterSaleButton';
import { KitchenAndDeliveryInfo } from '../../../components/FormsInputs/KitchenAndDeliveryInfo';

import { OrderService } from '../../../apis/clientV2/OrderService';
import { useAuth } from '../../../Context/AuthContext';
import { PAYMENT_METHODS } from '../../../Utils/const/paymentMethods';

const FormContainerAdmin = () => {
	const { token } = useAuth();

	// Estados
	const [dataClient, setDataClient] = useState(null);
	const [selectDomiciliario, setSelectDomiciliario] = useState('');
	const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.CASH.value);
	const [isLoading, setIsLoading] = useState(false);
	const [locationIdSelect, setLocationIdSelect] = useState(null);
	const [comment, setComment] = useState('');
	const [kitchenIdSelect, setKitchenIdSelect] = useState('');
	const [dataDomicilio, setDataDomicilio] = useState({});
	const [precioDeliveryManual, setPrecioDeliveryManual] = useState(null);
	const [productOrderList, setProductOrderList] = useState([]);
	const [delivery, setDelivery] = useState(null);
	const [kitchen, setKitchen] = useState(null);

	const ordersService = useMemo(() => new OrderService(token), [token]);

	// Función para enviar la orden
	const sendOrder = async () => {
		if (!dataClient) {
			toast.error("Por favor, seleccione un cliente.");
			return;
		}
		if (!locationIdSelect) {
			toast.error("Por favor, seleccione una dirección.");
			return;
		}
		if (productOrderList.length === 0) {
			toast.error("Agregue al menos un producto a la orden.");
			return;
		}

		// Se arma el objeto con la información necesaria para el pedido
		const orderData = {
			clientId: dataClient.id,
			locationId: locationIdSelect,
			comment,
			paymentMethod,
			orderItems: productOrderList.map(product => ({ id: product.id })),
			delivery,
		};

		// Si se ha seleccionado un domiciliario y cocina, se agrega la información
		if (kitchenIdSelect) {
			orderData.assignedKitchenId = kitchenIdSelect;
		}

		setIsLoading(true);
		try {
			const response = await ordersService.createPublicAdmin(orderData);
			console.log("Pedido enviado:", response);
			toast.success("Pedido creado con éxito.");
			// Opcional: Resetear estados o limpiar formulario aquí
			//ponemos los estados en su estado original
			setDataClient(null);

			setSelectDomiciliario('');
			setPaymentMethod(PAYMENT_METHODS.CASH.value);
			setLocationIdSelect(null);
			setComment('');
			setKitchenIdSelect('');
			setDataDomicilio({});
			setPrecioDeliveryManual(null);
			setProductOrderList([]);
			setDelivery(null);
			setKitchen(null);


		} catch (error) {
			console.error("Error al crear el pedido:", error);
			toast.error("Error al crear el pedido");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Container>
			<LoadingSpinner isLoading={isLoading} />

			<ClientSearchModule setDataClient={setDataClient} dataClient={dataClient} />

			<ViewListLocations
				locationIdSelect={locationIdSelect}
				setLocationIdSelect={setLocationIdSelect}
				clientId={dataClient?.id}
				dataClient={dataClient}
				userId={null}
			/>

			<CommentInput comment={comment} setComment={setComment} />

			<PaymentMethodInput paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />

			<SelectDomiciliario
				selectDomiciliario={selectDomiciliario}
				setSelectDomiciliario={setSelectDomiciliario}
			/>

			<SelectKitchen kitchenIdSelect={kitchenIdSelect} setKitchenIdSelect={setKitchenIdSelect} />
			<KitchenAndDeliveryInfo
				kitchen={kitchen}
				setKitchen={setKitchen}
				delivery={delivery}
				setDelivery={setDelivery}
				locationIdSelect={locationIdSelect}
				kitchenIdSelect={kitchenIdSelect}
			/>
			<DashboardProducts
				listaProductosOrder={productOrderList}
				setListaProductosOrder={setProductOrderList}
				dataDomicilio={dataDomicilio}
				setDataDomicilio={setDataDomicilio}
				precioDeliveryManual={precioDeliveryManual}
				setPrecioDeliveryManual={setPrecioDeliveryManual}
			/>

			<RegisterSaleButton onClick={sendOrder} />

			<hr />
		</Container>
	);
};

export default FormContainerAdmin;
