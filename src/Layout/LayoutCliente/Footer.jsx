import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css'; // Asegúrate de crear este archivo CSS
import { LOGIN_ROUTES } from '../../Utils/const/namesRutes';

const Footer = () => {
  const navigate = useNavigate();
  const [clicks, setClicks] = useState([]);
  const [animate, setAnimate] = useState(false);

  const handleClick = (index) => {
    const newClicks = [...clicks, index].slice(-4);
    setClicks(newClicks);

    // Verificar si el orden de clics activa el "easter egg"
    const easterEggSequence = [0, 2, 0, 1];
    if (newClicks.join('') === easterEggSequence.join('')) {
      setAnimate(true);
      setTimeout(() => {
        navigate(LOGIN_ROUTES.path);
      }, 2000); // Duración de la animación
    }
  };

  return (
    <footer className={`text-center ${animate ? 'animate-footer' : ''}`}>
      <div className="d-flex justify-content-between" style={{ fontSize: '110%' }}>
        <span onClick={() => handleClick(0)} style={{ userSelect: 'none' }}>⋆｡ﾟ☁︎｡⋆｡ ﾟ☾ ﾟ｡⋆</span>
        <span onClick={() => handleClick(1)} style={{ userSelect: 'none' }}>( ˶ˆᗜˆ˵ )</span>
        <span onClick={() => handleClick(2)} style={{ userSelect: 'none' }}>⋆｡ﾟ☁︎｡⋆｡ ﾟ☾ ﾟ｡⋆</span>
      </div>
    </footer>
  );
}

export default Footer;