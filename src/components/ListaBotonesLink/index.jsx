

import { Button } from 'react-bootstrap';
import { BiAddToQueue, BiTable } from 'react-icons/bi';
import { Link } from 'react-router-dom';

/***
 * @param {Object}  lista
 * @param {String}  lista.nombre
 * @param {String}  lista.path
 * @returns
 */
const ListaBotonesLink = ({ lista }) => {
  //creamos una el link dentro de un botón , se debe de usar de forma provisional
  const getRandomIcon = () => {
    // eslint-disable-next-line react/jsx-key
    const icons = [<BiTable />, <BiAddToQueue />];
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
