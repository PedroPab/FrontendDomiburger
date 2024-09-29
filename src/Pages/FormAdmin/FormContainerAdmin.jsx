import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import BuscadorCliente from '../../components/Codigos/CrearCodigoReferido/BuscadorCliente';
import NameInput from '../../components/FormsInputs/NameInput';
import CommentInput from '../../components/FormsInputs/CommentInput';
import ProductsSection from '../../components/ProductsSection';
import { PRODUCTS } from '../../Utils/constList';
import { Combo, Hamburguesa } from '../../Utils/classProduct';
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
const ENV = import.meta.env;
// import { DistanceMatrixService } from "@react-google-maps/api";

const calcularDataMatrix = async (origen, destino) => {
  return new Promise((resolve, reject) => {
    // Instancia del servicio DistanceMatrix
    const service = new google.maps.DistanceMatrixService();

    const travelMode = google.maps.TravelMode.TWO_WHEELER; // Puedes cambiar esto a DRIVING, WALKING, etc.

    service.getDistanceMatrix(
      {
        origins: [origen], // Coordenadas del origen
        destinations: [destino], // Coordenadas del destino
        travelMode: travelMode,
        unitSystem: google.maps.UnitSystem.METRIC, // Sistema de unidades métrico
        avoidHighways: false,
        avoidTolls: false,
        durationInTraffic: true, // Incluir tráfico en el cálculo si está disponible
      },
      (response, status) => {
        if (status === "OK") {
          const result = response.rows[0].elements[0];
          resolve(result); // Retorna el resultado
        } else {
          console.error("Error con la API de Distance Matrix: " + status);
          reject("Error con la API de Distance Matrix: " + status);
        }
      }
    );
  });
};


const centerOrigin = { lat: 6.3017314, lng: -75.5743796 };

// eslint-disable-next-line no-unused-vars
const FormContainerAdmin = ({ token, userId }) => {
  const [coordinates, setCoordinates] = useState(centerOrigin);
  const [inputDataDireccion, setInputDataDireccion] = useState({
    address_complete: "",
    piso: "",
    valid: false,
  });
  // todos los dato que se envían al servidor
  const [data, setData] = useState({});
  const [dataCliente, setDataCliente] = useState(null);
  const [dataAdrees, setDataAdrees] = useState({});//para guardar la direccion del cliente
  const [telefono, setTelefono] = useState('');
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [selectDomiciliario, setSelectDomiciliario] = useState('');

  const [paymentMethod, setPaymentMethod] = useState('Efectivo'); // El valor inicial debe coincidir con una de las opciones
  const [dataCode, setDataCode] = useState(null);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (telefono) {
      setData({ ...data, phone: telefono })
    }
  }, [telefono])

  //cada vez que cambie el dato del cliente (cuando lo busquemos)
  useEffect(() => {
    const { name, address, phone } = dataCliente || {};

    // Lógica condicional agrupada por tipo de dato
    if (name) {
      setName(name);
      setData(prevData => ({ ...prevData, name }));
    }

    if (address) {
      const { address_complete, coordinates } = address;
      const newDireccion = {
        address_complete,
        direccionInput: address_complete,
        coordinates
      };

      // Actualizar el estado una sola vez en lugar de múltiples veces
      setDataAdrees(newDireccion);
      // setDireccion(newDireccion);
    }

    if (phone) {
      setTelefono(phone);
      setData(prevData => ({ ...prevData, phone }));
    }
  }, [dataCliente]);

  useEffect(() => {
    if (name) {
      setData({ ...data, name: name })
    }
  }, [name])

  useEffect(() => {
    if (paymentMethod) {
      setData({ ...data, fee: paymentMethod })
    }
  }, [paymentMethod])

  useEffect(() => {
    if (comment) {
      setData({ ...data, note: comment })
    }
  }, [comment])

  useEffect(() => {
    if (dataAdrees) {
      setData({ ...data, address: dataAdrees })
    }
  }, [dataAdrees])

  useEffect(() => {
  }, [data])


  const [listaProductosOrder, setListaProductosOrder] = useState([]);
  const [dataDomicilio, setDataDomicilio] = useState({});

  useEffect(() => {
    if (listaProductosOrder.length > 0) {

      setData({ ...data, order: listaProductosOrder })
    }

  }, [listaProductosOrder])


  // const calcularDataMatrix = (coordinates) => {
  //   const origin = `${coordinates.lat},${coordinates.lng}`
  //   const destination = '6.3017314,-75.5743796'
  //   const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${ENV.VITE_KEYMAPS}`
  //   const response = fetch(url)
  //     .then(response => response.json())
  //     .then(data => data)
  //     .catch(error => console.error(error))

  //   return response
  // }
  //para calcular las distancia y el costo del domicilio
  useEffect(() => {
    const obtenerDataMatrix = async () => {
      try {
        const destino = { lat: 6.250000, lng: -75.580000 }; // Coordenadas del destino (ej. la tienda)
        const resultadoMatrix = await calcularDataMatrix(coordinates, destino);

        if (resultadoMatrix) {
          const timeText = calcularTiempo(resultadoMatrix.distance.value);
          const price = calcularPrecio(resultadoMatrix.distance.value);

          setDataDomicilio({
            timeText,
            price,
          });
        }
      } catch (error) {
        console.error("Error al calcular la matriz de distancia:", error);
      }
    };
    //la logica para calcular el tiempo y el precio del domicilio segun las coordenadas y la direccion
    //miramos si es valido el input de la direccion
    if (!inputDataDireccion.valid) return

    // miramos si hay coordenadas
    if (!coordinates) return

    const dataMatrix = obtenerDataMatrix()
    console.log(`[ ~ useEffect ~ dataMatrix]`, dataMatrix)

    // if (dataMatrix?.status == 'OK') {
    //   const timeText
    //     = calcularTiempo(dataMatrix.distance.value)
    //   const price = calcularPrecio(dataMatrix.distance.value)
    //   // console.log({
    //   //   matrixDistancia: timeText,
    //   //   matrixTime: price
    //   // });

    //   setDataDomicilio({
    //     timeText,
    //     price
    //   })
    // }
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

  const sendOrder = async (dataOrder) => {
    let order = {
      "fee": paymentMethod,
      note: comment,
      ...dataOrder,
    }
    //tenemos que transformar el dato de orden para que sea aceptado por el servidor
    order.order = order?.order?.map(e => {
      return {
        id: e.id,
        price: e.price,
        modifique: e?.modifique?.map(e => { return { id: e.id, code: e?.code } }),
        note: e.note,
        code: e.code
      }
    })

    if (order.address.direccionInput) {
      delete order.address.direccionInput
    }

    if (selectDomiciliario) {
      order.domiciliario_asignado = { id: selectDomiciliario }
    }

    try {
      setLoading(true);
      const rta = await postOrder(order, token, true)
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
      toast.success('es codigo de referido ');
      console.log("🚀 ~ agregarCodigo ~ dataCode.phone:", dataCode.phone, telefono)

      if (dataCode.phone == telefono) {
        //es un premio
        toast.info('es un premio');

      } else {
        //es un referido
        toast.info('es un referido');
        //tenemos que mirar si hay una hamburguesa o combo a que agregar en la lista
        const isProducto = newListaProductosOrder.findIndex(e => e.type == 'product')
        if (isProducto >= 0) {
          //si ya tiene un producto agregado no se puede agregar el referido
          const adicion = dataCode.products[0]
          newListaProductosOrder[isProducto].modifique.push(adicion)
          setListaProductosOrder(newListaProductosOrder)

          //si no la tiene hay que crearla
        } else {
          toast.error('no se encontró ningún producto para agregar el codigo');
        }

      }
    }

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
        visibleDataClient={false}
      />

      <NameInput
        name={name}
        setName={setName}
      />
      <MapComponent
        coordinates={coordinates}
        setCoordinates={setCoordinates}
        stateDireccion={[inputDataDireccion, setInputDataDireccion]}
      />

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
        dataDomicilio={dataDomicilio}
      />

      <RegisterSaleButton
        onClick={() => sendOrder(data)}
      />

      {/* un espacio de separación */}
      <hr />

    </Container>
  )
}

export default FormContainerAdmin;
