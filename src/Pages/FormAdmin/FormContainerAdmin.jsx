import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import BuscadorCliente from '../../components/Codigos/CrearCodigoReferido/BuscadorCliente';
import NameInput from '../../components/FormsInputs/NameInput';
import CommentInput from '../../components/FormsInputs/CommentInput';
import ProductsSection from '../../components/ProductsSection';
import { PRODUCTS } from '../../Utils/constList';
import { Adiciones, Combo, Hamburguesa } from '../../Utils/classProduct';
import ResumenProductosForm from '../../components/ResumenProductosForm';
import { calcularPrecio, calcularTiempo } from '../../Utils/matrixCalculate';
import RegisterSaleButton from '../../components/RegisterSaleButton';
import PaymentMethodInput from '../../components/FormsInputs/PaymentMethodInput';
import SelectDomiciliario from '../../components/FormsInputs/SelectDomiciliario';
import InputCodigo from '../../components/FormsInputs/InputCodigo';
import { toast } from 'react-toastify';
import postOrder from '../../Utils/api/postOrder';
import LoadingSpinner from '../../components/LoadingSpinner';
import MapComponent from '../../components/MapComponent/MapComponent';
import { useLoadScript } from '@react-google-maps/api';
import { obtenerDistancia } from './googleDistanceMatrix'; // Importar la función

const ENV = import.meta.env;

const centerOrigin = { lat: 6.3017314, lng: -75.5743796 };
const libraries = ['places'];

// eslint-disable-next-line no-unused-vars
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
  // todos los dato que se envían al servidor
  const [dataCliente, setDataCliente] = useState(null);
  // const [dataAdrees, setDataAdrees] = useState({});//para guardar la direccion del cliente
  const [telefono, setTelefono] = useState('');
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [selectDomiciliario, setSelectDomiciliario] = useState('');

  const [paymentMethod, setPaymentMethod] = useState('Efectivo'); // El valor inicial debe coincidir con una de las opciones
  const [dataCode, setDataCode] = useState(null);

  const [isLoading, setLoading] = useState(false);
  const [precioDeliveryManual, setPrecioDeliveryManual] = useState(null);

  //cada vez que cambie el dato del cliente (cuando lo busquemos)
  useEffect(() => {
    const { name, address, phone } = dataCliente || {};

    // Lógica condicional agrupada por tipo de dato
    if (name) {
      setName(name);
    }

    if (address) {
      const { address_complete, coordinates } = address;

      setCoordinates(coordinates);
      setInputDataDireccion({
        ...inputDataDireccion,
        address_complete,
        valid: true,
        type: 'autocompleted',
      });
    }

    if (phone) {
      setTelefono(phone);
    }
  }, [dataCliente]);




  const [listaProductosOrder, setListaProductosOrder] = useState([]);
  const [dataDomicilio, setDataDomicilio] = useState({});

  const [prevCoordinates, setPrevCoordinates] = useState(null);
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
    if (prevCoordinates && prevCoordinates.lat === coordinates.lat && prevCoordinates.lng === coordinates.lng) return
    setPrevCoordinates(coordinates)

    obtenerDistancia(centerOrigin, coordinates)
      .then(dataMatrix => {
        if (dataMatrix) {
          const timeText
            = calcularTiempo(dataMatrix.distance.value)
          const price = calcularPrecio(dataMatrix.distance.value)

          if (!timeText || !price) return toast.error('No se pudo calcular el precio del domicilio')

          toast.success(`El domicilio tiene un costo de $${price} y tardará ${timeText}`)

          setDataDomicilio({
            timeText,
            price
          })
        }
      })
      .catch(error => toast.error(error))

  }, [inputDataDireccion])


  const incrementCount = (product) => {
    const productClass = {}
    productClass[`${PRODUCTS.Hamburguesa}`] = Hamburguesa
    productClass[`${PRODUCTS.Combo}`] = Combo

    const listaProducts = [...listaProductosOrder]
    const producto = new productClass[product]({})
    listaProducts.push(producto)
    setListaProductosOrder(listaProducts)
  };

  const decrementCount = (product) => {
    //los reversamos para que saqeu el ultimo que se agrego
    const listaProducts = [...listaProductosOrder.reverse()]
    const indexProduct = listaProducts.findIndex(e => e.name === product)

    if (indexProduct <= -1) return `no se encontro ningun prouduc que cumple con las condiciones de busqueda`

    listaProducts.splice(indexProduct, 1)

    setListaProductosOrder(listaProducts.reverse())
  };

  const sendOrder = async () => {
    let dataOrder = {}
    dataOrder.phone = telefono
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

    selectDomiciliario ? dataOrder.domiciliario_asignado = { id: selectDomiciliario } : null


    try {
      setLoading(true);
      const rta = await postOrder(dataOrder, token, true)
      if (rta.statusCode && (rta.statusCode !== 200 || rta.statusCode !== 200)) {
        throw rta?.message
      }
      toast.success('Pedido Creado')
      //limpiamos los datos
      setListaProductosOrder([])
      setDataCliente(null)
      setTelefono('')
      setName('')
      // setDireccion({})
      setComment('')
      setPaymentMethod('Efectivo')
      setSelectDomiciliario('')
      setDataCode(null)
      setCoordinates({})
      setPrecioDeliveryManual(null)
      setDataDomicilio({})
      setInputDataDireccion({
        address_complete: "",
        piso: "",
        valid: false,
      });

    } catch (error) {
      console.log(error, '<=error');
      toast.error('Error al crear el pedido')
      toast.error(error)
    }
    setLoading(false);

  }

  const agregarCodigo = (dataCode) => {
    //miramos la información del codigo y evaluamos si se agrega premio o como referido
    console.log(dataCode, '<=dataCode');
    const newListaProductosOrder = [...listaProductosOrder]
    if (dataCode.type == 'Referido') {

      if (dataCode.phone == telefono) {
        //es un premio
        toast.error('no tenemos soporte para agregar el premio');

      } else {
        //es un referido
        //tenemos que mirar si hay una hamburguesa o combo a que agregar en la lista
        const isProducto = newListaProductosOrder.findIndex(e => e.type == 'product')

        if (isProducto == -1) {
          toast.error('no se encontró ningún producto para agregar el codigo');
          return
        }

        const adicion = new Adiciones(dataCode.products[0])
        newListaProductosOrder[isProducto].modifique.push(adicion)
        setListaProductosOrder(newListaProductosOrder)

      }
    } else {
      toast.error('no tenemos soporte para este tipo de codigo :(');
    }

  }

  const retirarCodigo = (dataCode) => {
    //miramos la información del codigo y evaluamos si se agrega premio o como referido
    console.log(dataCode, '<=dataCode');

  }


  return (
    <Container>
      {/* Aquí va el contenido del formulario */}
      <LoadingSpinner isLoading={isLoading} />
      <BuscadorCliente
        telefono={telefono}
        setTelefono={setTelefono}
        dataCliente={dataCliente}
        setDataCliente={setDataCliente}
        token={token}
        visibleDataClient={true}
      />

      <NameInput
        name={name}
        setName={setName}
      />
      {/* solo si isLoaded esta en true */}
      {isLoaded &&
        <MapComponent
          center={centerOrigin}
          stateCoordenadas={[coordinates, setCoordinates]}
          stateDireccion={[inputDataDireccion, setInputDataDireccion]}
        />
      }

      <CommentInput
        comment={comment}
        setComment={setComment}
      />

      <PaymentMethodInput
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />

      <InputCodigo
        dataCode={dataCode}
        setDataCode={setDataCode}
        agregarCodigo={agregarCodigo}
        retirarCodigo={retirarCodigo}
      />

      <SelectDomiciliario
        selectDomiciliario={selectDomiciliario}
        setSelectDomiciliario={setSelectDomiciliario}
      />

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

      <RegisterSaleButton
        onClick={() => sendOrder()}
      />

      {/* un espacio de separación */}
      <hr />

    </Container>
  )
}

export default FormContainerAdmin;
