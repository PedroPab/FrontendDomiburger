import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import BuscadorCliente from '../../../components/Codigos/CrearCodigoReferido/BuscadorCliente';
import NameInput from '../../../components/FormsInputs/NameInput';
import CommentInput from '../../../components/FormsInputs/CommentInput';
import ProductsSection from '../../../components/ProductsSection';
import { PRODUCTS } from '../../../Utils/constList';
import { Adiciones, Combo, Hamburguesa, Producto } from '../../../Utils/classProduct';
import ResumenProductosForm from '../../../components/ResumenProductosForm';
import { calcularPrecio, calcularTiempo } from '../../../Utils/matrixCalculate';
import RegisterSaleButton from '../../../components/RegisterSaleButton';
import PaymentMethodInput from '../../../components/FormsInputs/PaymentMethodInput';
import SelectDomiciliario from '../../../components/FormsInputs/SelectDomiciliario';
import InputCodigo from '../../../components/FormsInputs/InputCodigo';
import { toast } from 'react-toastify';
import postOrder from '../../../Utils/api/postOrder';
import LoadingSpinner from '../../../components/LoadingSpinner';
import MapComponent from '../../../components/MapComponent/MapComponent';
import { useLoadScript } from '@react-google-maps/api';
import { obtenerDistancia } from './googleDistanceMatrix';
import useClienteData from './hooks/useClienteData';
import useDomicilioData from './hooks/useDomicilioData';
import useOrderActions from './hooks/useOrderActions';

const ENV = import.meta.env;

const centerOrigin = { lat: 6.3017314, lng: -75.5743796 };
const libraries = ['places'];

const FormContainerAdmin = ({ token, userId }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: ENV.VITE_KEYMAPS,
    libraries,
  });

  const [coordinates, setCoordinates] = useState({});
  const [inputDataDireccion, setInputDataDireccion] = useState({
    address_complete: "",
    piso: "",
    valid: false,
  });
  const [dataCliente, setDataCliente] = useState(null);
  const [telefono, setTelefono] = useState('');
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [selectDomiciliario, setSelectDomiciliario] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Efectivo');
  const [dataCode, setDataCode] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [precioDeliveryManual, setPrecioDeliveryManual] = useState(null);
  const [listaProductosOrder, setListaProductosOrder] = useState([]);
  const [dataDomicilio, setDataDomicilio] = useState({});

  useClienteData(dataCliente, setName, setCoordinates, setInputDataDireccion, setTelefono);
  useDomicilioData(isLoaded, inputDataDireccion, coordinates, setPrevCoordinates, setDataDomicilio, centerOrigin);
  const { incrementCount, decrementCount, sendOrder, agregarCodigo, retirarCodigo } = useOrderActions({
    listaProductosOrder, setListaProductosOrder, dataCliente, setDataCliente, telefono, setTelefono, name, setName,
    comment, setComment, selectDomiciliario, setSelectDomiciliario, paymentMethod, setPaymentMethod, dataCode,
    setDataCode, coordinates, setCoordinates, precioDeliveryManual, setPrecioDeliveryManual, dataDomicilio,
    setDataDomicilio, inputDataDireccion, setInputDataDireccion, setLoading, token
  });

  return (
    <Container>
      <LoadingSpinner isLoading={isLoading} />
      <BuscadorCliente
        telefono={telefono}
        setTelefono={setTelefono}
        dataCliente={dataCliente}
        setDataCliente={setDataCliente}
        token={token}
        visibleDataClient={true}
      />
      <NameInput name={name} setName={setName} />
      {isLoaded && (
        <MapComponent
          center={centerOrigin}
          stateCoordenadas={[coordinates, setCoordinates]}
          stateDireccion={[inputDataDireccion, setInputDataDireccion]}
        />
      )}
      <InputCodigo
        client={[dataCliente, setDataCliente]}
        dataCode={dataCode}
        setDataCode={setDataCode}
        agregarCodigo={agregarCodigo}
        retirarCodigo={retirarCodigo}
      />
      <CommentInput comment={comment} setComment={setComment} />
      <SelectDomiciliario selectDomiciliario={selectDomiciliario} setSelectDomiciliario={setSelectDomiciliario} />
      <PaymentMethodInput paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
      <ProductsSection
        listaProductosOrder={listaProductosOrder}
        incrementCount={incrementCount}
        decrementCount={decrementCount}
      />
      <ResumenProductosForm
        listaProducto={listaProductosOrder}
        setListaProducto={setListaProductosOrder}
        domicilio={[dataDomicilio, setDataDomicilio]}
        addressPrice={[precioDeliveryManual, setPrecioDeliveryManual]}
      />
      <RegisterSaleButton onClick={() => sendOrder()} />
      <hr />
    </Container>
  );
};

export default FormContainerAdmin;
