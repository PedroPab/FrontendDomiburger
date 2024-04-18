import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import BuscadorCliente from '../../components/Codigos/CrearCodigoReferido/BuscadorCliente';
import NameInput from '../../components/FormsInputs/NameInput';
import MyMapWithAutocomplete from '../../components/MyMapWithAutocomplete';
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
import id from 'faker/lib/locales/id_ID';

const ENV = import.meta.env

const FormContainerAdmin = ({ token, userId }) => {
  // todos los datos que se envían al servidor
  const [data, setData] = useState({});
  const [dataCliente, setDataCliente] = useState(null);
  const [dataAdrees, setDataAdrees] = useState({});//para guardar la direccion del cliente
  const [telefono, setTelefono] = useState('+57');
  const [name, setName] = useState('');
  const [direccion, setDireccion] = useState({});
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
      setDireccion(newDireccion);
    }

    if (phone) {
      setTelefono(phone);
      setData(prevData => ({ ...prevData, phone }));
    }
  }, [dataCliente]);

  useEffect(() => {
    console.log(name, '<=name');
    if (name) {
      setData({ ...data, name: name })
      console.log(`cambiamos el nombre porque no da`, name);
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
    console.log(data, '<=data');
  }, [data])


  const [listaProductosOrder, setListaProductosOrder] = useState([]);
  const [dataDomicilio, setDataDomicilio] = useState({});

  useEffect(() => {
    if (listaProductosOrder.length > 0) {

      setData({ ...data, order: listaProductosOrder })
    }

  }, [listaProductosOrder])

  //para calcular las distancia y el costo del domicilio
  useEffect(() => {
    if (direccion?.dataMatrix?.status == 'OK') {
      const timeText
        = calcularTiempo(direccion.dataMatrix.distance.value)
      const price = calcularPrecio(direccion.dataMatrix.distance.value)
      // console.log({
      //   matrixDistancia: timeText,
      //   matrixTime: price
      // });

      setDataDomicilio({
        timeText,
        price
      })
    }
  }, [direccion])


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
      setDireccion({})
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

      <MyMapWithAutocomplete
        objAdrees={direccion}
        setObjAdrees={setDireccion}
        VITE_KEYMAPS={ENV.VITE_KEYMAPS}
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
