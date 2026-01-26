import { Alert, Container, Spinner } from "react-bootstrap";

import { useEffect } from "react";
import { OrdersRowsContainer } from "../../components/Order/OrdersRowsContainer.jsx";
import { useOrderFindHistoryByCourier } from "../../hooks/api/order/useOrderFindHistoryByCourier.jsx";
import { useAuth } from "../../Context/AuthContext.jsx";
import { CourierLayout } from "../../Layout/CourierLayout.jsx";
import { Progress } from "antd";
import { useCalculateDataDelivery } from "./useCalculateDataDelivery.jsx";

const CourierHistory = () => {

  // Pedir las órdenes del día con fechas formateadas en UTCz
  const { error, data: ordenes, loading, fetchOrders } = useOrderFindHistoryByCourier();
  const { userData } = useAuth()

  const { priceDeliveryTotal, distanceTotal, countDelivery } = useCalculateDataDelivery(ordenes);


  const fetchData = async () => {
    console.group('fetchData date');
    // const { start, end } = getRangoDiaInternacional(dayDate);
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const startDate = start.toGMTString();
    const endDate = end.toGMTString();
    console.log('startDate', startDate);
    console.log('endDate', endDate);
    console.groupEnd()


    await fetchOrders({ startDate, endDate, id: userData.id });
  };

  useEffect(() => {
    // Evitar múltiples llamadas a fetchData si userData no está disponible aún
    if (!userData?.id) return;

    // Llamar a fetchData solo si userData.id cambia
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?.id]);


  return (
    <CourierLayout>
      <Container fluid>
        <h1 className="text-center my-3">Historial</h1>
        <p>Esto son tus pedidos</p>

        {/* form filter order */}

        {/* Mostrar si hay un error */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Mostrar si está cargando */}
        {loading && <div className="text-center"><Spinner animation="border" /></div>}

        <div >
          <Progress size={250} type="dashboard" percent={(priceDeliveryTotal * 100 / 80000)} format={() => (<><div className='m-2'>{priceDeliveryTotal}</div>
            <small >{countDelivery} </small><span style={{ fontSize: '0.8rem' }}> {parseInt(distanceTotal / 1000)}km</span></>)} />
        </div>
        {/* Mostrar filas de las órdenes */}
        <OrdersRowsContainer listOrders={ordenes} />


      </Container>
    </CourierLayout >
  );
};

export { CourierHistory };
