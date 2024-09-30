import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useCliente } from './hooks/useCliente';
import { useProductos } from './hooks/useProductos';
import { useCalcularDomicilio } from './hooks/useCalcularDomicilio';
import BuscadorCliente from '../../components/Codigos/CrearCodigoReferido/BuscadorCliente';
import NameInput from '../../components/FormsInputs/NameInput';
import CommentInput from '../../components/FormsInputs/CommentInput';
import PaymentMethodInput from '../../components/FormsInputs/PaymentMethodInput';
import InputCodigo from '../../components/FormsInputs/InputCodigo';
import SelectDomiciliario from '../../components/FormsInputs/SelectDomiciliario';
import ProductsSection from '../../components/ProductsSection';
import ResumenProductosForm from '../../components/ResumenProductosForm';
import RegisterSaleButton from '../../components/RegisterSaleButton';
import LoadingSpinner from '../../components/LoadingSpinner';
import MapComponent from '../../components/MapComponent/MapComponent';
import { toast } from 'react-toastify';
import postOrder from '../../Utils/api/postOrder';
import { useLoadScript } from '@react-google-maps/api';

const ENV = import.meta.env;

const FormContainerAdmin = ({ token, userId }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: ENV.VITE_KEYMAPS,
    libraries: ['places'],
  });

  const [coordinates, setCoordinates] = useState({ lat: 6.3017314, lng: -75.5743796 });
  const [data, setData] = useState({});
  const [dataCliente, setDataCliente] = useState(null);
  const [inputDataDireccion, setInputDataDireccion] = useState({ address_complete: "", piso: "", valid: false });
  const [comment, setComment] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Efectivo');
  const [selectDomiciliario, setSelectDomiciliario] = useState('');
  const [dataDomicilio, setDataDomicilio] = useState({});
  const [listaProductosOrder, setListaProductosOrder] = useState([]); // Definimos correctamente el estado
  const [isLoading, setLoading] = useState(false);

  const { telefono, setTelefono, name, setName, dataAdrees } = useCliente(dataCliente, setData);
  const { incrementCount, decrementCount } = useProductos(data, setData);

  useCalcularDomicilio(coordinates, inputDataDireccion, setDataDomicilio);

  // Definir la función agregarCodigo
  const agregarCodigo = (dataCode) => {
    console.log(dataCode, '<=dataCode');
    const newListaProductosOrder = [...listaProductosOrder];

    if (dataCode.type === 'Referido') {
      toast.success('Es un código de referido');
      console.log("🚀 ~ agregarCodigo ~ dataCode.phone:", dataCode.phone, telefono);

      if (dataCode.phone === telefono) {
        toast.info('Es un premio');
        // Aquí puedes agregar la lógica para manejar el premio
      } else {
        toast.info('Es un referido');
        const isProducto = newListaProductosOrder.findIndex(e => e.type === 'product');
        if (isProducto >= 0) {
          const adicion = dataCode.products[0];
          newListaProductosOrder[isProducto].modifique.push(adicion);
          setListaProductosOrder(newListaProductosOrder);
        } else {
          toast.error('No se encontró ningún producto para agregar el código');
        }
      }
    }
  };

  const sendOrder = async () => {
    let order = { ...data, fee: paymentMethod, note: comment };

    order.order = order?.order?.map(e => ({
      id: e.id,
      price: e.price,
      modifique: e?.modifique?.map(m => ({ id: m.id, code: m?.code })),
      note: e.note,
      code: e.code,
    }));

    if (selectDomiciliario) {
      order.domiciliario_asignado = { id: selectDomiciliario };
    }

    try {
      setLoading(true);
      const response = await postOrder(order, token, true);
      if (response.statusCode !== 200) throw response?.message;

      toast.success('Pedido Creado');
      resetForm();
    } catch (error) {
      toast.error('Error al crear el pedido');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setListaProductosOrder([]); // Reiniciamos la lista de productos
    setTelefono('');
    setName('');
    setComment('');
    setPaymentMethod('Efectivo');
    setSelectDomiciliario('');
    setInputDataDireccion({ address_complete: "", piso: "", valid: false });
  };

  return (
    <Container>
      <LoadingSpinner isLoading={isLoading} />
      <BuscadorCliente telefono={telefono} setTelefono={setTelefono} dataCliente={dataCliente} setDataCliente={setDataCliente} token={token} />
      <NameInput name={name} setName={setName} />
      {isLoaded && <MapComponent coordinates={coordinates} setCoordinates={setCoordinates} stateDireccion={[inputDataDireccion, setInputDataDireccion]} />}
      <CommentInput comment={comment} setComment={setComment} />
      <PaymentMethodInput paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
      <InputCodigo agregarCodigo={agregarCodigo} />
      <SelectDomiciliario selectDomiciliario={selectDomiciliario} setSelectDomiciliario={setSelectDomiciliario} />
      <ProductsSection listaProductosOrder={listaProductosOrder} incrementCount={incrementCount} decrementCount={decrementCount} />
      <ResumenProductosForm listaProducto={listaProductosOrder} setListaProducto={setListaProductosOrder} dataDomicilio={dataDomicilio} />
      <RegisterSaleButton onClick={sendOrder} />
    </Container>
  );
};

export default FormContainerAdmin;
