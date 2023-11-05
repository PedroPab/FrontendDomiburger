import { useState } from 'react';
import { FloatingLabel, Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
const ENV = import.meta.env
import { useContext } from 'react'
import { MiContexto } from '../../Context'
import { Navigate } from "react-router-dom";


function FormLogin() {
  const [validated, setValidated] = useState(false);
  const [redireccionar, setRedireccionar] = useState({ ok: false, to: `` });
  const [messageErrorLogin, setMessageErrorLogin] = useState(null);
  const context = useContext(MiContexto)
  const apiUrl = `${ENV.VITE_PROTOCOL}${ENV.VITE_HOST}:${ENV.VITE_PORT}`;

  //al entrar al login , borramos el token que tengamos guardado
  // context.saveToken({})

  const enviarFormualario = async () => {
    const usernameInput = document.getElementsByName(`usernameInput`)[0]
    const passwordInput = document.getElementsByName(`passwordInput`)[0]
    const roleSelect = document.getElementsByName(`roleSelect`)[0]
    const data = {
      username: String(usernameInput.value),
      password: String(passwordInput.value),
      role: String(roleSelect.value),
    };

    const res = await fetch(`${apiUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const login = await res.json()

    if (res.status == '200') {

      const token = login.body.token
      const body = login.body

      document.cookie = `token=${token}; Secure; SameSite=Strict`;

      context.saveToken(body)
      // Después de que el usuario inicie sesión, redirigirlo a la página anterior

      const objRedireccionRole = {
        admin: `recepcion`,
        cliente: `home`,
        domiciliario: `domiciliarios`,
        recepcion: `recepcion`,
        cocinero: `cocina`,
      }

      const role = body.user.role
      const urlRedirecion = `/${objRedireccionRole[role]}`;

      setRedireccionar({ ok: true, to: urlRedirecion });

      return

    } else {
      console.log(`eror en la contrasetana`, login);
      setMessageErrorLogin('Usuario o contraseña incorrectas')
      // alert('error al logearse', login)
    }


  }
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    return enviarFormualario();
  };


  const listRoles = [
    { rol: 'admin', url: `recepcion` },
    { rol: 'cliente', url: `home` },
    { rol: 'domiciliario', url: `domiciliarios` },
    { rol: 'recepcion', url: `recepcion` },
    { rol: 'cocinero', url: `cocina` },
  ]
  return (
    <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)} className='mt-3'>
      <Row className="mb-3">

        <Form.Group className="mb-3">
          <FloatingLabel
            controlId="floatingInput"
            label="Nombre de usuario"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Maria Flores"
              required
              name='usernameInput'
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label="Contraseña"
            className="mb-3"

          >
            <Form.Control
              type="password"
              placeholder="Password"
              feedback="Genial"
              required
              name="passwordInput"

            />

          </FloatingLabel>
          <Form.Select
            aria-label="Default select example"
            name="roleSelect"
            required
          >
            {
              listRoles.map(rol => (
                <option
                  key={rol.rol}
                  value={rol.rol}
                >
                  {rol.rol}

                </option>

              ))
            }
          </Form.Select>

        </Form.Group >

      </Row>
      <Row>
        {messageErrorLogin &&
          <span>
            <Alert
              variant={`danger`}
            >
              {messageErrorLogin}
            </Alert>

          </span>

        }
      </Row>

      <Button type="submit" className='mb-3'>Enviar</Button>


      {/* se encarga  de redireccionar a la url del rol */}
      {redireccionar.ok && <Navigate to={redireccionar.to} />}

    </Form >
  );
}




export default FormLogin;