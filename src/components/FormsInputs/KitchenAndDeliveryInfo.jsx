import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useAuth } from '../../Context/AuthContext';
import { KitchenService } from '../../apis/clientV2/KitchenService';
import { toast } from 'react-toastify';

const KitchenAndDeliveryInfo = ({ kitchen, setKitchen, delivery, setDelivery, kitchenIdSelect, locationIdSelect }) => {
	const [loading, setLoading] = useState(null);
	const { token } = useAuth();
	const kitchenService = new KitchenService(token);

	useEffect(() => {
		if (!locationIdSelect) return;
		const calculateDistance = async () => {
			setDelivery(null);
			setKitchen(null);
			try {
				const response = await kitchenService.getSelectKitchen(locationIdSelect, kitchenIdSelect);
				const data = response.data.body;
				setDelivery(data.delivery || null);
				setKitchen(data.kitchen || null);
			} catch (error) {
				toast.error('Error obteniendo la información de la cocina.');
				setDelivery(null);
				setKitchen(null);
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		setLoading(true);
		calculateDistance();
	}, [locationIdSelect, kitchenIdSelect]);

	return (
		<>
			<div>
				{
					loading ? <Spinner animation="border" variant="primary" /> : null
				}
				{
					kitchen &&

					(
						<>
							<h3>cocina:</h3>
							<p>nombre :{kitchen.name}</p>
							<p>id :{kitchen.id}</p>
						</>
					)
				}
				{
					delivery &&
					(
						<>
							<h3>delivery:</h3>
							<p>precio :{delivery.price}</p>
							<p>distancia :{delivery.distance}</p>
						</>
					)
				}

			</div>
		</>
	);
};

export default KitchenAndDeliveryInfo;
