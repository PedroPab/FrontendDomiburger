import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import BuscadorCliente from '../../components/Codigos/CrearCodigoReferido/BuscadorCliente';
import NameInput from '../../components/FormsInputs/NameInput';
import MyMapWithAutocomplete from '../../components/MyMapWithAutocomplete';
import CommentInput from '../../components/FormsInputs/CommentInput';
import ProductsSection from '../../components/ProductsSection';
import { PRODUCTS } from '../../Utils/constList';
import { Combo, Hamburguesa } from '../../Utils/classProduct';

const ENV = import.meta.env

const FormContainerAdmin = ({ token, userId }) => {
  const [telefono, setTelefono] = useState('');
  const [name, setName] = useState('');
  const [direccion, setDireccion] = useState({});
  const [comment, setComment] = useState('');

  const [codigo, setCodigo] = useState('');
  const [valid, setValid] = useState(false);

  const [dataCliente, setDataCliente] = useState(null);
  useEffect(() => {
    if (!dataCliente) {
      setValid(false)
      return
    }
    if (dataCliente.name) {
      setName(dataCliente.name)
    }
  }, [dataCliente])

  const [listaProductosOrder, setListaProductosOrder] = useState([]);

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

  return (
    <Container>
      {/* Aquí va el contenido del formulario */}

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


      <ProductsSection
        listaProductosOrder={listaProductosOrder}
        incrementCount={incrementCount}
        decrementCount={decrementCount}

      />




    </Container>
  )
}

export default FormContainerAdmin;
