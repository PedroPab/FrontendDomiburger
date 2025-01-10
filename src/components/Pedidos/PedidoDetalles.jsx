import { Container, } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import orderService from "../../apis/client/OrderService";
import { useParams } from "react-router-dom";


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
        <div>
          <p>Id: {order.id}</p>
          <p>Fecha: {order.fecha}</p>
          <p>Estado: {order.estado}</p>
          <p>Productos: {order.productos}</p>
          <p>Cliente: {order.cliente}</p>
          <p>Total: {order.total}</p>
        </div>
      )}

    </Container>
  );
}

export { PedidoDetalles };