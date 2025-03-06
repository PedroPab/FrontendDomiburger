import { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import NameInput from '../../../components/FormsInputs/NameInput';
// import RegisterSaleButton from '../../../components/RegisterSaleButton';
import PaymentMethodInput from '../../../components/FormsInputs/PaymentMethodInput';
import SelectDomiciliario from '../../../components/FormsInputs/SelectDomiciliario';
import LoadingSpinner from '../../../components/LoadingSpinner';
// import DashboardProducts from '../../../components/Products/Dashboard/Dashboard';
// import { useAuth } from '../../../Context/AuthContext';
import { ClientSearchModule } from '../../../components/Client/ClientSearchModule';
import { LocationsService } from '../../../apis/clientV2/LocationsService';
import { useAuth } from '../../../Context/AuthContext';
import { LocationCardReduce } from '../../../components/Locations/LocationCardReduce';
import { ViewListLocations } from './ViewListLocations';



// eslint-disable-next-line no-unused-vars
const FormContainerAdmin = () => {

	// todos los dato que se envían al servidor
	const [dataClient, setDataClient] = useState(null);
	// const [dataAdrees, setDataAdrees] = useState({});//para guardar la direccion del cliente
	const [selectDomiciliario, setSelectDomiciliario] = useState('');

	const [paymentMethod, setPaymentMethod] = useState('Efectivo'); // El valor inicial debe coincidir con una de las opciones

	const [isLoading, setLoading] = useState(false);

	const [locationIdSelect, setLocationIdSelect] = useState(null);




	return (
		<Container>

			{/* Aquí va el contenido del formulario */}
			<LoadingSpinner isLoading={isLoading} />

			{/* buscar cliente */}
			<ClientSearchModule
				setDataClient={setDataClient}
				dataClient={dataClient}
			/>


			<ViewListLocations
				locationIdSelect={locationIdSelect}
				setLocationIdSelect={setLocationIdSelect}
				clientId={dataClient?.id}
				userId={null}
			/>

			{/* visualizar los locations asociados al cliente o crear */}


			{/* selectKitchen */}

			<SelectDomiciliario
				selectDomiciliario={selectDomiciliario}
				setSelectDomiciliario={setSelectDomiciliario}
			/>

			<PaymentMethodInput
				paymentMethod={paymentMethod}
				setPaymentMethod={setPaymentMethod}
			/>

			{/* <DashboardProducts
				listaProductosOrder={listaProductosOrder}
				setListaProductosOrder={setListaProductosOrder}
				dataDomicilio={dataDomicilio}
				setDataDomicilio={setDataDomicilio}
				precioDeliveryManual={precioDeliveryManual}
				setPrecioDeliveryManual={setPrecioDeliveryManual}
				isAdmin={true}
			/> */}
			{/* <RegisterSaleButton
				onClick={() => sendOrder()}
			/> */}

			{/* un espacio de separación */}
			<hr />

		</Container>
	)
}

export default FormContainerAdmin;
