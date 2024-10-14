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
import MyMapWithAutocomplete from '../../components/MyMapWithAutocomplete';
import { calcularPrecio, calcularTiempo } from '../../Utils/matrixCalculate';
import crearPedido from '../../Utils/crearPedido';
// import GoogleMapsApp from '../../components/GoogleMapsApp';
const ENV = import.meta.env

const FormContainer = () => {

  //estados del los datos del formulario
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState({});
  const [dataDomicilio, setDataDomicilio] = useState({});
  const [metodoDePago, setMetodoDePago] = useState('Efectivo'); // El valor inicial debe coincidir con una de las opciones
  const [nota, setNota] = useState('');
  const [validado, setValidado] = useState(false);

  //para cualcual las distancia y el costo del domcilio 
  useEffect(() => {

    if (direccion?.dataMatrix?.status == 'OK') {
      const timeText = calcularTiempo(direccion.dataMatrix.distance.value)
      const price = calcularPrecio(direccion.dataMatrix.distance.value)
      console.log({
        matrixDistancia: timeText,
        matrixTime: price
      });

      setDataDomicilio({
        timeText,
        price
      })


    }
  }, [direccion])

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidado(true);

    //organimosmos al data para ser enviada al servirdor
    const newDireccion = direccion
    newDireccion.verified = newDireccion.valid
    delete newDireccion.valid

    const dataPedido = {
      name: nombre,
      phone: codigoPais + telefono,
      address: newDireccion,
      note: nota,
      fee: metodoDePago,
      order: listaProdutosOrder
    }

    // const creado = 
    await crearPedido(dataPedido)
      .then(data => {
        alert(JSON.parse(data))
      })
      .catch(error => {
        alert(JSON.parse(error))
      })
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
    //los reversamos para que saqeu el ultimo que se agrego
    const listaProducts = [...listaProdutosOrder.reverse()]
    const indexProduct = listaProducts.findIndex(e => e.name === product)

    if (indexProduct <= -1) return `no se encontro ningun prouduc que cumple con las condiciones de busqueda`

    listaProducts.splice(indexProduct, 1)

    setListaProdutosOrder(listaProducts.reverse())
  };
  //select de codigo de telefno 
  const [codigoPais, setCodigoPais] = useState('');
  const countryCodes = [
    { code: '+57', name: 'Colombia' },
    { code: '+1', name: 'USA' },
    { code: '+61', name: 'Australia' },
    { code: '+55', name: 'Brazil' },
    { code: '+33', name: 'France' },
    { code: '+49', name: 'Germany' },
    { code: '+81', name: 'Japan' },
    { code: '+34', name: 'Spain' },
    { code: '+58', name: 'Venezuela' },
    { code: '+1', name: 'Canadá' },
    { code: '+52', name: 'México' },
    { code: '+503', name: 'El Salvador' },
    { code: '+505', name: 'Nicaragua' },
    { code: '+506', name: 'Costa Rica' },
    { code: '+507', name: 'Panamá' },
    { code: '+51', name: 'Perú' },
    { code: '+54', name: 'Argentina' },
    { code: '+55', name: 'Brasil' },
    { code: '+56', name: 'Chile' },
    { code: '+58', name: 'Venezuela' },
    { code: '+591', name: 'Bolivia' },
    { code: '+593', name: 'Ecuador' },
    { code: '+595', name: 'Paraguay' },
    { code: '+598', name: 'Uruguay' },
    { code: '+599', name: 'Curazao' },
    // ... y así sucesivamente para otros países
  ];


  const Agregado = () => {
    return (
      <div>
        <Form.Control
          as="select"
          value={codigoPais}
          onChange={(e) => setCodigoPais(e.target.value)}
          style={{ width: "auto" }}
        >
          {countryCodes.map((country, index) => (
            <option key={index} value={country.code}> {country.code}</option>
          ))}
        </Form.Control>
      </div>
    )
  }

  return (
    <Container>
      <h2 className="text-center">Pide tu domi</h2>
      <Form noValidate validated={validado} onSubmit={handleSubmit}>
        <FormField
          id="nameInput"
          label="Nombre completo"
          type="text"
          placeholder="Sara Restrepo"
          value={nombre}
          onChange={(e) => {
            // Convierte la primera letra de cada palabra a mayúscula
            const capitalizedValue = e.target.value.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });

            setNombre(capitalizedValue)
          }}
          icon={<BsPerson />}
          feedback="Que bonito nombre"
          feedbackType="valid"
          minLength={3}

        />

        <FormField
          id="phoneInput"
          label="Numero De WhatsApp"
          type="tel"
          placeholder="3054857547"
          value={telefono}
          onChange={(e) => {

            // Permite solo números
            const onlyNums = e.target.value.replace(/[^0-9]/g, '');
            setTelefono(onlyNums);
          }}
          icon={<BsWhatsapp />}
          feedback="Por favor ingrese un número de WhatsApp válido."
          feedbackType="invalid"
          minLength={9}

          agregado={(<Agregado />)}

        />

        <MyMapWithAutocomplete
          objAdrees={direccion}
          setObjAdrees={setDireccion}
          VITE_KEYMAPS={ENV.VITE_KEYMAPS}
        />

        <br />

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

        <hr />

        <ResumenProductosForm
          listaProducto={listaProdutosOrder}
          setListaProducto={setListaProdutosOrder}
          domicilio={[dataDomicilio, setDataDomicilio]}
          addressPrice={[dataDomicilio.price, setDataDomicilio]}
        />

        <div className='text-center mt-3 mb-2'>

          <Button variant="primary" type="submit">Enviar</Button>

        </div>


      </Form>
    </Container >
  );
}

export default FormContainer;
