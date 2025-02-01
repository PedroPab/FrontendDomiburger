import { useState, useEffect } from 'react';
import LayoutCliente from '../../Layout/LayoutCliente';
import FormContainer from './FormContainer';
import { NavbarCliente } from '../../components/Navbar/NavbarCliente';
import { HelmetClientHome } from './HelmetClientHome';
import ClosedNotice from './ClosedNotice';

// Obtiene el entorno de ejecución
const VITE_NODE_ENV = import.meta.env.VITE_NODE_ENV;

const FormClient = () => {
  const horarioApertura = { hora: 16, minuto: 30 }; // 4:30 pm
  const horarioCierre = { hora: 24, minuto: 0 }; // 10:00 pm

  const [cerrado, setCerrado] = useState(false);
  const [proximaApertura, setProximaApertura] = useState(null);

  useEffect(() => {
    if (VITE_NODE_ENV === 'development') {
      setCerrado(false); // En desarrollo, siempre está abierto
      setProximaApertura(null);
      return;
    }

    const actualizarEstadoNegocio = () => {
      const ahora = new Date();

      const apertura = new Date();
      apertura.setHours(horarioApertura.hora, horarioApertura.minuto, 0);

      const cierre = new Date();
      cierre.setHours(horarioCierre.hora, horarioCierre.minuto, 0);

      if (ahora < apertura || ahora >= cierre) {
        setCerrado(true);
        setProximaApertura(ahora >= cierre ? apertura.setDate(apertura.getDate() + 1) : apertura);
      } else {
        setCerrado(false);
        setProximaApertura(null);
      }
    };

    actualizarEstadoNegocio();
    const intervalo = setInterval(actualizarEstadoNegocio, 10000);

    return () => clearInterval(intervalo); // Limpiar intervalo al desmontar
  }, []);

  return (
    <>
      <LayoutCliente>
        <HelmetClientHome />
        <NavbarCliente />

        {cerrado && VITE_NODE_ENV === 'production' && <ClosedNotice proximaApertura={proximaApertura} />}

        <div style={{ opacity: cerrado && VITE_NODE_ENV === 'production' ? 0.6 : 1, pointerEvents: cerrado && VITE_NODE_ENV === 'production' ? 'none' : 'auto' }}>
          <FormContainer />
        </div>
      </LayoutCliente>
    </>
  );
};

export default FormClient;
