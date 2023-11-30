import { useContext, useState } from 'react';

import NavbarCliente from "../../components/NavbarCliente";
import { MiContexto } from '../../Context';
import LayoudCliente from '../../Layout/LayoutCliente';
import { Button, Container, Form, FormControl, InputGroup } from 'react-bootstrap';
import { BsFillGeoAltFill, BsPerson, BsWhatsapp } from 'react-icons/bs';
import CardProduct from '../../components/CardProduct';

import imgHamburguesa from './Hmaburguesa.png'
import imgCombo from './Combo.png'


const FormClient = () => {
  const context = useContext(MiContexto)
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [metodoDePago, setMetodoDePago] = useState('');
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

  return (
    <>
      <LayoudCliente>
        <NavbarCliente
          modoOscuro={context.modoOscuro}
          alternarModo={context.alternarModo}
        />

        <Container>
          <h1 className="text-center">Formulario de Contacto</h1>
          <Form noValidate validated={validado} onSubmit={handleSubmit}>

            <Form.Label htmlFor="nameInput">Nombre completo</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">
                <BsPerson />
              </InputGroup.Text>
              <FormControl
                id="nameInput"
                required
                type="text"
                placeholder="Sara Restrepo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <Form.Control.Feedback type="valid">
                Que bonito nombre
              </Form.Control.Feedback>
            </InputGroup>


            <Form.Label htmlFor="phoneInput">Numero De WhatsApp</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text >
                <BsWhatsapp />
              </InputGroup.Text>
              <FormControl
                id="phoneInput"
                required
                type="tel"
                placeholder="3054857547"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingrese un numero de WhatsApp válida.
              </Form.Control.Feedback>
            </InputGroup>

            <Form.Label htmlFor="adressInput">Direccion</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text >
                <BsFillGeoAltFill />
              </InputGroup.Text>
              <FormControl
                id="adressInput"
                required
                type='text'
                placeholder="Dirección"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingrese una dirección válida.
              </Form.Control.Feedback>
            </InputGroup>

            <Form.Label htmlFor="metodoDePagoInput">Meto de pago</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text >
                <BsFillGeoAltFill />
              </InputGroup.Text>
              <Form.Select
                id="metodoDePagoInput"
                required
                type='text'
                value={metodoDePago}
                onChange={(e) => setMetodoDePago(e.target.value)}
              >
                <option value="Efectivo" selected>Efectivo</option>
                <option value="Tranferencia" selected>Transferencia</option>
              </Form.Select>
            </InputGroup>

            <Form.Label htmlFor="notaInput">Notas y comentarios</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text >
                <BsFillGeoAltFill />
              </InputGroup.Text>
              <FormControl
                id="notaInput"
                required
                type='text'
                value={nota}
                onChange={(e) => setNota(e.target.value)}
              />
            </InputGroup>
            <section className="mb-3">
              <CardProduct img={imgHamburguesa} />
            </section >
            <section className="mb-3">
              <CardProduct img={imgCombo} />
            </section >






            <Button variant="primary" type="submit">Enviar</Button>
          </Form>
        </Container>


      </LayoudCliente>
    </>
  )
}

export default FormClient