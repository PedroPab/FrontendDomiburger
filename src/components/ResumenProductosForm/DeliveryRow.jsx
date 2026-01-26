import { DurationSpan } from '../common/delivery/DurationSpan';
import { DistanceSpan } from '../common/delivery/DistanceSpan';

const DeliveryRow = ({ delivery }) => {

  return (
    <tr>
      <th>Domicilio</th>
      <th>
        <div className="d-flex align-items-center">
          {
            delivery && delivery?.distance && delivery?.duration && delivery?.price ?
              (
                <>
                  <DurationSpan duration={delivery.duration + (15 * 60)} />
                  <span className="mx-3"></span>
                  <DistanceSpan distance={delivery.distance} />
                </>
              ) :
              (
                <div className="text-danger" role="alert">
                  Sin domicilio !!!
                </div>
              )
          }

        </div>
      </th>
      <th>
        <span>${(delivery?.price || 0).toLocaleString()}</span>
      </th>
    </tr>
  );
};

export default DeliveryRow;
