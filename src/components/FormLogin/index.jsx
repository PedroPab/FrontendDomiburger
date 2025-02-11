import { useState } from 'react';
import { FloatingLabel, Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Navigate } from "react-router-dom";
import { getUrlBackend } from '../../Utils/getUrlApiByOriginPath.js';
import { usePreferences } from '../../Context/PreferencesContext.jsx';
// import { MiContexto } from '../../Context/index.jsx';


function FormLogin() {
  const [validated, setValidated] = useState(false);
  const [redireccionar, setRedireccionar] = useState({ ok: false, to: `` });
  const [messageErrorLogin, setMessageErrorLogin] = useState(null);
  const { setTokenLogin } = usePreferences()
  const [showPassword, setShowPassword] = useState(false);

  const apiUrl = getUrlBackend()

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
      setTokenLogin(body)
      // setTokenLogin2(body)
      // Después de que el usuario inicie sesión, redirigirlo a la página anterior

      const objRedireccionRole = {
        admin: `recepcion`,
        cliente: `me`,
        domiciliario: `domiciliario`,
        recepcion: `recepcion`,
        cocinero: `cocina`,
      }

      const role = body.user.role
      const urlRedirecion = `/${objRedireccionRole[role]}`;

      setRedireccionar({ ok: true, to: urlRedirecion });

      return

    } else {
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      <Row className="mb-2">

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
          <div className="d-flex mb-3">
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              feedback="Genial"
              required
              name="passwordInput"
              className="flex-grow-1"
            />
            <Button variant="secondary" onClick={togglePasswordVisibility} className="ms-2">
              {showPassword ? "Ocultar" : "Mostrar"}
            </Button>
          </div>
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

      <Button variant="primary" type="submit" className="w-100 ">Ingresar</Button>

      {/* se encarga  de redireccionar a la url del rol */}
      {redireccionar.ok && <Navigate to={redireccionar.to} />}

    </Form >
  );
}




export default FormLogin;