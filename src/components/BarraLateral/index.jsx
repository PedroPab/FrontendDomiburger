import { Nav } from 'react-bootstrap';
import { NavItemDomiciliario } from './NavItemDomiciliario';
import { useContext, useState } from 'react';
import { RecepcionContexto } from '../../Context/RecepcionContex';

const BarraLateral = ({ modoOscuro }) => {
  // Clase para el navbar

  const contextRecepcion = useContext(RecepcionContexto)
  //creamos la lista con lo domiciliarios y su estado
  const domiciliarios = contextRecepcion.listDomiciliarios.map(domiciliario => {
    return {
      id: domiciliario.id,
      name: domiciliario.name,
      imageUrl: domiciliario.imagen || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    }
  })
  const listDomiciliarios = contextRecepcion.domiciliariosSeleccionados

  const listIsActive = (idDomiciliriario) => {
    const domiciliario = listDomiciliarios.find(id => id == idDomiciliriario)
    if (domiciliario === undefined) {
      return false
    } else {
      return true
    }
  }

  const activeListIsActive = (idDomiciliriario) => {
    const domiciliarioIndex = listDomiciliarios.findIndex(id => id === idDomiciliriario)
    console.log("🚀  ~ domiciliarioIndex:", domiciliarioIndex)
    if (domiciliarioIndex === -1) {
      //agregamos el domiciliario
      contextRecepcion.setDomiciliariosSeleccionados([...listDomiciliarios, idDomiciliriario])
      return
    }
    //retiramos el domiciliario con splice y lo guardamos en una nueva lista
    const meLaPela = [...listDomiciliarios]
    meLaPela.splice(domiciliarioIndex, 1)
    contextRecepcion.setDomiciliariosSeleccionados(meLaPela)
  }

  const [collapsable, setCollapsable] = useState(false);
  return (
    <Nav
      className={`flex-column ${modoOscuro ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}
      style={{ height: '100vh', position: 'fixed', top: 50, left: 0, width: 'auto', padding: '10px' }}
    >
      {/* botón para collapsible */}
      <Nav.Link className="" onClick={() => setCollapsable(!collapsable)}>H</Nav.Link>
      {collapsable ?
        domiciliarios.map((domiciliario) => (
          <NavItemDomiciliario
            key={domiciliario.id}
            domiciliario={domiciliario}
            isActive={(id) => listIsActive(id)}
            active={(id) => activeListIsActive(id)}
          />
        ))
        : ''}

    </Nav >
  );
};

export { BarraLateral };
