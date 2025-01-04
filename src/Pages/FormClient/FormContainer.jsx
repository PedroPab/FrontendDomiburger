import { useState } from 'react';
import { Container, Form, } from 'react-bootstrap';
import NameInput from '../../components/FormsInputs/NameInput';
import PhoneInputComponent from '../../components/FormsInputs/PhoneInput';
import { useLoadScript } from '@react-google-maps/api';
import MapComponent from '../../components/MapComponent/MapComponent';
import CommentInput from '../../components/FormsInputs/CommentInput';
import PaymentMethodInput from '../../components/FormsInputs/PaymentMethodInput';
import DashboardProducts from '../../components/Products/Dashboard/Dashboard';

const ENV = import.meta.env

const centerOrigin = { lat: 6.3017314, lng: -75.5743796 };
const libraries = ['places'];

const FormContainer = () => {
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
  //estados del los datos del formulario
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Efectivo'); // El valor inicial debe coincidir con una de las opciones
  const [listaProductosOrder, setListaProductosOrder] = useState([]);



  return (
    <Container>
      <h2 className="text-center">Realiza tu pedido</h2>
      <Form noValidate >


        <NameInput
          name={name}
          setName={setName}
        />

        <PhoneInputComponent
          telefono={phone}
          setTelefono={setPhone}
        />

        {/* mapa */}
        {/* solo si isLoaded esta en true */}
        {isLoaded &&
          <MapComponent center={centerOrigin}
            stateCoordenadas={[coordinates, setCoordinates]}
            stateDireccion={[inputDataDireccion, setInputDataDireccion]}
          />
        }
        <hr />

        <CommentInput
          comment={comment}
          setComment={setComment}
        />

        <PaymentMethodInput
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />


        <DashboardProducts
          listaProductosOrder={listaProductosOrder}
          setListaProductosOrder={setListaProductosOrder}
          dataDomicilio={inputDataDireccion}
          setDataDomicilio={setInputDataDireccion}
          precioDeliveryManual={null}
          setPrecioDeliveryManual={null}
        />


      </Form>
    </Container >
  );
}

export default FormContainer;
