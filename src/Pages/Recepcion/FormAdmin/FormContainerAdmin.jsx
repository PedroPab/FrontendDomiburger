import { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import BuscadorCliente from '../../../components/Codigos/CrearCodigoReferido/BuscadorCliente';
import NameInput from '../../../components/FormsInputs/NameInput';
import CommentInput from '../../../components/FormsInputs/CommentInput';
import { Adiciones, Producto } from '../../../Utils/classProduct';
import RegisterSaleButton from '../../../components/RegisterSaleButton';
import PaymentMethodInput from '../../../components/FormsInputs/PaymentMethodInput';
import SelectDomiciliario from '../../../components/FormsInputs/SelectDomiciliario';
import InputCodigo from '../../../components/FormsInputs/InputCodigo';
import { toast } from 'react-toastify';
import postOrder from '../../../Utils/api/postOrder';
import LoadingSpinner from '../../../components/LoadingSpinner';
import MapComponent from '../../../components/MapComponent/MapComponent';
import { useLoadScript } from '@react-google-maps/api';
import NoteClientInput from '../../../components/FormsInputs/NoteClientInput';
import DashboardProducts from '../../../components/Products/Dashboard/Dashboard';
import { calculateDeliveryDetails } from '../../../Utils/maps/calculateDeliveryDetails';
import { MiContexto } from '../../../Context';

const ENV = import.meta.env;

const centerOrigin = { lat: 6.3017314, lng: -75.5743796 };
const libraries = ['places'];

// eslint-disable-next-line no-unused-vars
const FormContainerAdmin = () => {
  const context = useContext(MiContexto)

  const token = context.tokenLogin.token
  console.log(`[ ~ FormContainerAdmin ~ token]`, token)

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
  const [clientNote, setNoteClient] = useState('');
  const [comment, setComment] = useState('');
  const [selectDomiciliario, setSelectDomiciliario] = useState('');

  const [paymentMethod, setPaymentMethod] = useState('Efectivo'); // El valor inicial debe coincidir con una de las opciones
  const [dataCode, setDataCode] = useState(null);

  const [isLoading, setLoading] = useState(false);
  const [precioDeliveryManual, setPrecioDeliveryManual] = useState(null);

  //cada vez que cambie el dato del cliente (cuando lo busquemos)
  useEffect(() => {
    const { name, address, phone, clientNote } = dataCliente || {};

    // Lógica condicional agrupada por tipo de dato
    if (name) {
      setName(name);
    }

    if (clientNote !== '') {
      setNoteClient(clientNote)
    }

    if (address) {
      console.log('%cEstamos estableciendo la dirección', 'color: purple;')
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
    console.log('%cCambio el estado de la direccion de google', 'color: yellow;')
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
    // if (prevCoordinates &&
    //   prevCoordinates.lat === coordinates.lat &&
    //   prevCoordinates.lng === coordinates.lng ) return

    setPrevCoordinates(coordinates)
    calculateDeliveryDetails(centerOrigin, coordinates)
      .then((data) => {
        console.log('Domicilio calculado');
        setDataDomicilio(data);
        toast.success(`Domicilio calculado con éxito: ${data.timeText} y un costo de $${data.price}`);
      })
      .catch((error) => {
        toast.error(`No se pudo calcular el precio del domicilio ${error}`);
      })

  }, [inputDataDireccion])

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
    if (!dataDomicilio.price) delete dataOrder.addressPrice
    //si dataOrder.addressPrice no es de tipo number lo eliminamos
    if (typeof dataOrder.addressPrice !== 'number') delete dataOrder.addressPrice

    selectDomiciliario ? dataOrder.domiciliario_asignado = { id: selectDomiciliario } : null

    //miramos si la nota del cliente cambio
    if ((typeof (clientNote) == 'string') &&
      !(dataCliente?.clientNote == undefined && clientNote == '') &&
      dataCliente?.clientNote !== clientNote) {
      dataOrder.clientNote = clientNote
    }

    try {
      setLoading(true);
      const rta = await postOrder(dataOrder, token, true)
      const { priceTotal } = rta
      console.log(rta, '<=rta');

      toast.success(`Pedido Creado con un precio de ${priceTotal.COP}`)
      //limpiamos los datos
      setListaProductosOrder([])
      setDataCliente(null)
      setTelefono('')
      setName('')
      setNoteClient('')
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
    const checkIfAdicionExists = (newListaProductosOrder, dataCode) => {
      const isAdicion = newListaProductosOrder.find(e => {
        let o = false;
        // Verifica si existe la propiedad 'modifique' y si contiene el código que estamos buscando
        if (e?.modifique) {
          o = e.modifique.find(modificado => modificado.code == dataCode.id);
        }
        // Retorna true si el código actual o el código modificado coincide con el que estamos buscando
        if (e?.code == dataCode.id || o) {
          return true;
        }
        return false;
      });

      // Si ya existe en la lista de productos, muestra el error y retorna true
      if (isAdicion) {
        toast.error('Ya tienes este código en tu pedido');
        return true;
      }

      // Si no existe, retorna false
      return false;
    }

    //miramos la información del codigo y evaluamos si se agrega premio o como referido
    let newListaProductosOrder = [...listaProductosOrder]
    if (dataCode.type == 'Referido') {

      if (dataCode?.clientId == dataCliente?.id) {
        //es un premio
        const premios = dataCode.productsReward
        const productReward = new Producto(premios[0])

        if (checkIfAdicionExists(newListaProductosOrder, dataCode)) return

        newListaProductosOrder.push(productReward)
        setListaProductosOrder(newListaProductosOrder)

      } else {
        //es un referido
        //tenemos que mirar si hay una hamburguesa o combo a que agregar en la lista
        const isProducto = newListaProductosOrder.reverse().findIndex(e => e.type == 'product')

        if (isProducto == -1) {
          toast.error('no se encontró ningún producto para agregar el codigo');
          return
        }

        const adicion = new Adiciones(dataCode.products[0])
        //miramos que no tenga ya el codigo
        if (checkIfAdicionExists(newListaProductosOrder, dataCode)) return

        newListaProductosOrder[isProducto].modifique.push(adicion)
        setListaProductosOrder(newListaProductosOrder.reverse())

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

      {/* nota del cliente */}
      <NoteClientInput
        note={clientNote}
        setNote={setNoteClient}
      />
      {/* solo si isLoaded esta en true */}
      {isLoaded &&
        <MapComponent
          center={centerOrigin}
          stateCoordenadas={[coordinates, setCoordinates]}
          stateDireccion={[inputDataDireccion, setInputDataDireccion]}
          errors={[null, null]}
        />
      }

      <InputCodigo
        client={[dataCliente, setDataCliente]}
        dataCode={dataCode}
        setDataCode={setDataCode}
        agregarCodigo={agregarCodigo}
        retirarCodigo={retirarCodigo}
      />

      <CommentInput
        comment={comment}
        setComment={setComment}
      />

      <SelectDomiciliario
        selectDomiciliario={selectDomiciliario}
        setSelectDomiciliario={setSelectDomiciliario}
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
        isAdmin={true}
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
