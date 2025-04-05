import React from 'react';
import { DurationSpan } from '../common/delivery/DurationSpan';
import { DistanceSpan } from '../common/delivery/DistanceSpan';

const DeliveryRow = ({ delivery }) => {
	if (!(delivery && delivery.distance && delivery.duration && delivery.price)) {
		return null;
	}

	return (
		<tr>
			<th>Domicilio</th>
			<th>
				<div className="d-flex align-items-center">
					<DurationSpan duration={delivery.duration + (15 * 60)} />
					<span className="mx-3"></span>
					<DistanceSpan distance={delivery.distance} />
				</div>
			</th>
			<th>
				<span>${delivery.price.toLocaleString()}</span>
			</th>
		</tr>
	);
};

export default DeliveryRow;
