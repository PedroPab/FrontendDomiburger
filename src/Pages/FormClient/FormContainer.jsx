import { useEffect, useState } from 'react';
import { Container, Form, } from 'react-bootstrap';
import NameInput from '../../components/FormsInputs/NameInput';
import PhoneInputComponent from '../../components/FormsInputs/PhoneInput';
import { useLoadScript } from '@react-google-maps/api';
import MapComponent from '../../components/MapComponent/MapComponent';
import CommentInput from '../../components/FormsInputs/CommentInput';
import PaymentMethodInput from '../../components/FormsInputs/PaymentMethodInput';
import DashboardProducts from '../../components/Products/Dashboard/Dashboard';
import { calculateDeliveryDetails } from '../../Utils/maps/calculateDeliveryDetails';

const ENV = import.meta.env

const centerOrigin = { lat: 6.3017314, lng: -75.5743796 };
const libraries = ['places'];

const FormContainer = () => {
  const [precioDeliveryManual, setPrecioDeliveryManual] = useState(null);

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

  const [dataDomicilio, setDataDomicilio] = useState({});
  const [prevCoordinates, setPrevCoordinates] = useState(null);

  //estados del los datos del formulario
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Efectivo'); // El valor inicial debe coincidir con una de las opciones
  const [listaProductosOrder, setListaProductosOrder] = useState([]);


  //para calcular las distancia y el costo del domicilio
  useEffect(() => {
    if (!isLoaded) {
      console.log('Cargando Google Maps...')
      return
    }
    //la logica para calcular el tiempo y el precio del domicilio segun las coordenadas y la direccion
    //miramos si es valido el input de la direccion

    if (!inputDataDireccion.valid) return

    // miramos si hay coordenadas
    if (!coordinates) return

    //miramos si las coordenadas son las mismas
    if (prevCoordinates &&
      prevCoordinates.lat === coordinates.lat &&
      prevCoordinates.lng === coordinates.lng) return

    setPrevCoordinates(coordinates)
    calculateDeliveryDetails(centerOrigin, coordinates)
      .then((data) => {
        console.log('Domicilio calculado');
        setDataDomicilio(data);
        // toast.success(`Domicilio calculado con éxito: ${data.timeText} y un costo de $${data.price}`);
      })
      .catch((error) => {
        // toast.error(`No se pudo calcular el precio del domicilio ${error}`);
      });

  }, [inputDataDireccion])

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
          dataDomicilio={dataDomicilio}
          setDataDomicilio={setDataDomicilio}
          precioDeliveryManual={precioDeliveryManual}
          setPrecioDeliveryManual={setPrecioDeliveryManual}
        />



      </Form>
    </Container >
  );
}

export default FormContainer;
