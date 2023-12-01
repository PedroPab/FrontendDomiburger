import { useEffect, useState } from 'react';
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import { BsFillGeoAltFill, BsPerson, BsWhatsapp } from 'react-icons/bs';
import CardProduct from '../../components/CardProduct';
import FormField from './../../components/FormField'; // Asegúrate de tener este componente creado
import ResumenProductosForm from '../../components/ResumenProductosForm';

import imgHamburguesa from './Hmaburguesa.png';
import imgCombo from './Combo.png';
// import { ContexClient } from '../../Context/ClientContex';
import { PRODUCTS } from '../../Utils/constList';
import { Combo, Hamburguesa } from '../../Utils/classProduct';

const FormContainer = () => {

  //estados del los datos del formulario
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [metodoDePago, setMetodoDePago] = useState('Efectivo'); // El valor inicial debe coincidir con una de las opciones
  const [nota, setNota] = useState('');
  const [validado, setValidado] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidado(true);
  };

  //la listao de los productos
  // const context = useContext(ContexClient)
  const [listaProdutosOrder, setListaProdutosOrder] = useState([]);

  const incrementCount = (product) => {
    const productClass = {}
    productClass[`${PRODUCTS.Hamburguesa}`] = Hamburguesa
    productClass[`${PRODUCTS.Combo}`] = Combo

    const listaProducts = [...listaProdutosOrder]
    const producto = new productClass[product]({})
    listaProducts.push(producto)
    setListaProdutosOrder(listaProducts)
  };

  const decrementCount = (product) => {
    const listaProducts = [...listaProdutosOrder]
    const indexProduct = listaProducts.findIndex(e => e.name === product)

    if (indexProduct <= -1) return `no se encontro ningun prouduc que cumple con las condiciones de busqueda`

    listaProducts.splice(indexProduct, 1)

    setListaProdutosOrder(listaProducts)
  };

  useEffect(() => {
    console.log(`Lista de productos`);
    console.log(listaProdutosOrder);
  }, [listaProdutosOrder])


  return (
    <Container>
      <h1 className="text-center">Formulario de Contacto</h1>
      <Form noValidate validated={validado} onSubmit={handleSubmit}>
        <FormField
          id="nameInput"
          label="Nombre completo"
          type="text"
          placeholder="Sara Restrepo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          icon={<BsPerson />}
          feedback="Que bonito nombre"
          feedbackType="valid"
        />

        <FormField
          id="phoneInput"
          label="Numero De WhatsApp"
          type="tel"
          placeholder="3054857547"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          icon={<BsWhatsapp />}
          feedback="Por favor ingrese un número de WhatsApp válido."
          feedbackType="invalid"
        />

        <FormField
          id="adressInput"
          label="Dirección"
          type="text"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          icon={<BsFillGeoAltFill />}
          feedback="Por favor ingrese una dirección válida."
          feedbackType="invalid"
        />

        <Form.Group className="mb-3">
          <Form.Label htmlFor="metodoDePagoInput">Metodo de pago</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <BsFillGeoAltFill />
            </InputGroup.Text>
            <Form.Select
              id="metodoDePagoInput"
              required
              value={metodoDePago}
              onChange={(e) => setMetodoDePago(e.target.value)}
            >
              <option value="Efectivo">Efectivo</option>
              <option value="Transferencia">Transferencia</option>
            </Form.Select>
          </InputGroup>
        </Form.Group>

        <FormField
          id="notaInput"
          label="Notas y comentarios"
          type="text"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          icon={<BsFillGeoAltFill />}
        />
        <section className="mb-3">
          <CardProduct
            img={imgHamburguesa}
            count={listaProdutosOrder.filter(e => e.name == PRODUCTS.Hamburguesa).length}
            incrementCount={() => (incrementCount(PRODUCTS.Hamburguesa))}
            decrementCount={() => (decrementCount(PRODUCTS.Hamburguesa))}
          />
        </section>
        <section className="mb-3">
          <CardProduct
            img={imgCombo}
            count={listaProdutosOrder.filter(e => e.name == PRODUCTS.Combo).length}
            incrementCount={() => (incrementCount(PRODUCTS.Combo))}
            decrementCount={() => (decrementCount(PRODUCTS.Combo))} />

        </section>

        <hr />

        <ResumenProductosForm
          listaProducto={listaProdutosOrder}
          setListaProducto={setListaProdutosOrder}
        />

        <Button variant="primary" type="submit">Enviar</Button>
      </Form>
    </Container>
  );
}

export default FormContainer;
