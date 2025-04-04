import { useEffect, useState } from 'react';
import { useMiContexto } from '../../../Context';
import { useRecepcion } from '../../../Context/RecepcionContex';
import { Col, Container, Row } from 'react-bootstrap';
import Mapa from '../../../components/MapsGoogle';
import SelectListDomiciliarios from '../../../components/SelectListDomiciliarios';
import StickyCard from '../../../components/StickyCard';
import Sidebar from '../../../components/Sidebar';
import ListOrder from './ListOrder';
import LayoutRecepcion from '../../../Layout/Recepcion';
import { OrderCardV2 } from '../../../components/OrderCardV2';
import { useWorker } from '../../../Context/WorkerContext';

const MapRecepcionContent = () => {
	const { idOrderSelect } = useWorker()
	// Uso de los contextos dentro del componente contenido, ya que aquí se encuentran envueltos por el Provider.
	const { items, zoomMaps, setZoomMaps, idItemSelect } = useMiContexto();
	const { openSidebarFilterDelivery } = useRecepcion();

	const [centerMaps, setCenterMaps] = useState({
		lat: 6.29,
		lng: -75.576,
	});

	const containerStyle = {
		width: '100%', // El mapa ocupará el 100% del ancho del contenedor padre
		height: '90vh', // El mapa ocupará el 90% de la altura de la ventana
	};

	useEffect(() => {
		if (idItemSelect) {
			console.log('idItemSelect', idItemSelect)
		}
	}
		, [idItemSelect]);

	return (
		<>
			<Container fluid>
				<Row>
					{/* Si showSidebar es true, se renderiza el Sidebar; de lo contrario, el contenido ocupará todo el ancho */}
					{openSidebarFilterDelivery && <Sidebar />}
					<Col xs={openSidebarFilterDelivery ? 9 : 12} md={openSidebarFilterDelivery ? 10 : 12}>
						<Mapa
							zoom={zoomMaps}
							setZoomMaps={setZoomMaps}
							center={centerMaps}
							setCenter={setCenterMaps}
							containerStyle={containerStyle}
						>
							<ListOrder items={items || []} />
						</Mapa>
					</Col>
				</Row>
			</Container>



			{idOrderSelect && (
				<StickyCard show={true}>
					{/* Aquí puedes agregar contenido adicional al StickyCard si lo requieres */}
					<OrderCardV2 data={items.find((pedido) => pedido.id === idOrderSelect)} />
				</StickyCard>
			)}

			<SelectListDomiciliarios />
		</>
	);
};

const MapRecepcion = () => {
	return (
		<LayoutRecepcion>
			{/* Se envuelve el contenido con el Provider correspondiente para que los hooks useContext funcionen correctamente */}
			<MapRecepcionContent />
		</LayoutRecepcion>
	);
};

export default MapRecepcion;
