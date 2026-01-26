

import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import iconos from './Icons';

/***
 * @param {Object}  lista
 * @param {String}  lista.nombre
 * @param {String}  lista.path
 * @returns
 */
const ListaBotonesLink = ({ lista }) => {
  //creamos una el link dentro de un botón , se debe de usar de forma provisional
  const getRandomIcon = () => {
     
    const icons = iconos;
    const randomIndex = Math.floor(Math.random() * icons.length);
    return icons[randomIndex];
  };

  return (
    <>
      {lista.map((item) => (
        <div key={item.path}>
          <h3>{item.nombre}</h3>
          <Link to={item.path}>
            <Button>
              Ir a {item.nombre}
              <i > {getRandomIcon()}</i>
            </Button>
          </Link>
        </div>
      ))}
    </>
  );
};

export default ListaBotonesLink;
