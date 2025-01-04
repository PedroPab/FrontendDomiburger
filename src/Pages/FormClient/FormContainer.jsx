import { useEffect, useState } from 'react';
import { Container, } from 'react-bootstrap';
import { toast } from 'react-toastify';

import NameInput from '../../components/FormsInputs/NameInput';
import PhoneInputComponent from '../../components/FormsInputs/PhoneInput';
import { useLoadScript } from '@react-google-maps/api';
import MapComponent from '../../components/MapComponent/MapComponent';
import CommentInput from '../../components/FormsInputs/CommentInput';
import PaymentMethodInput from '../../components/FormsInputs/PaymentMethodInput';
import DashboardProducts from '../../components/Products/Dashboard/Dashboard';
import { calculateDeliveryDetails } from '../../Utils/maps/calculateDeliveryDetails';
import RegisterSaleButton from '../../components/RegisterSaleButton';
import postOrder from '../../Utils/api/postOrder';
import { useNavigate } from 'react-router-dom';

const ENV = import.meta.env

const centerOrigin = { lat: 6.3017314, lng: -75.5743796 };
const libraries = ['places'];

const FormContainer = () => {
  const navigate = useNavigate()

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
        toast.success(`Domicilio calculado con éxito: ${data.timeText} y un costo de $${data.price}`);
      })
      .catch((error) => {
        toast.error(`No se pudo calcular el precio del domicilio ${error}`);
      });

  }, [inputDataDireccion])

  const sendOrder = async () => {
    let dataOrder = {}
    dataOrder.phone = phone
    dataOrder.name = name
    dataOrder.address = {
      address_complete: inputDataDireccion.address_complete,
      coordinates: coordinates
    }
    dataOrder.fee = paymentMethod
    comment ? dataOrder.note = comment : null
    dataOrder.order = listaProductosOrder.map(e => {
      return {
        id: e.id,
        price: e.price,
        modifique: e?.modifique?.map(e => { return { id: e.id, code: e?.code } }),
        note: e.note,
        code: e.code
      }
    })

    precioDeliveryManual >= 0 ? dataOrder.addressPrice = precioDeliveryManual : null
    if (!dataDomicilio.price) delete dataOrder.addressPrice
    //si dataOrder.addressPrice no es de tipo number lo eliminamos
    if (typeof dataOrder.addressPrice !== 'number') delete dataOrder.addressPrice

    try {
      const rta = await postOrder(dataOrder)
      console.log(rta, '<=rta');

      // toast.success(`Pedido Creado con un precio de ${priceTotal.COP}`)
      //limpiamos los datos
      setListaProductosOrder([])
      setPhone('')
      setName('')
      // setDireccion({})
      setComment('')
      setPaymentMethod('Efectivo')
      setCoordinates({})
      setPrecioDeliveryManual(null)
      setDataDomicilio({})
      setInputDataDireccion({
        address_complete: "",
        piso: "",
        valid: false,
      });

      //los mandamos a la pagina de gracias con el el id del pedido
      const idPedido = rta?.body?.id
      navigate(`/gracias?id=${idPedido}`)

    } catch (error) {
      console.log(error, '<=error');
      toast.error('Error al crear el pedido')
      toast.error(error)
    }
  }

  return (
    <Container>
      <h2 className="text-center">Realiza tu pedido</h2>

      <NameInput
        name={name}
        setName={setName}
      />

      <PhoneInputComponent
        telefono={phone}
        setTelefono={setPhone}
      />

      {/* mapa */}
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

      <RegisterSaleButton
        onClick={() => sendOrder()}
      />

      <hr />

    </Container >
  );
}

export default FormContainer;
