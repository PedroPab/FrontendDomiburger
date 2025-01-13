import { Container, } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import orderService from "../../apis/client/OrderService";
import { useParams } from "react-router-dom";
import OrderCard from "../OrderCard";


const PedidoDetalles = ({ token }) => {
  //sacar el id del pedido de la url
  const { id } = useParams();
  console.log(`[ ~ PedidoDetalles ~ id]`, id)
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await orderService.getId(id, token);
        console.log(data);
        setOrder(data?.body);
      } catch (error) {
        setError('Error fetching orders');
        toast.error('Error al cargar los pedidos');
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);


  return (
    <Container >

      <h1>Detalles del pedido</h1>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {order && (
        <OrderCard dataPedido={order.data} />

      )}

    </Container>
  );
}

export { PedidoDetalles };