import React from 'react';
import { FaClock, FaEnvelope, FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row">
          {/* Sección de Información de Contacto */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase fw-bold">Contacto</h5>
            <ul className="list-unstyled">
              <li className="d-flex align-items-center mb-2">
                <FaClock className="me-2" />
                <span>4:30pm - 10:00pm</span>
              </li>
              <li className="d-flex align-items-center mb-2">
                <FaEnvelope className="me-2" />
                <a href="mailto:domiburgermedellin@gmail.com" className="text-decoration-none text-light">
                  domiburgermedellin@gmail.com
                </a>
              </li>
              <li className="d-flex align-items-center mb-2">
                <FaWhatsapp className="me-2" />
                <a
                  href="https://wa.me/573506186772"
                  className="text-decoration-none text-light"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +57 350 6186772
                </a>
              </li>
              <li className="d-flex align-items-center mb-2">
                <FaMapMarkerAlt className="me-2" />
                <span>Medellín - Pedregal</span>
              </li>
            </ul>
          </div>

          {/* Sección de Navegación */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase fw-bold">Navegación</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#home" className="text-decoration-none text-light">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#menu" className="text-decoration-none text-light">
                  Menú
                </a>
              </li>
              <li>
                <a href="#about" className="text-decoration-none text-light">
                  Acerca de Nosotros
                </a>
              </li>
              <li>
                <a href="#contact" className="text-decoration-none text-light">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Sección de Redes Sociales */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase fw-bold">Síguenos</h5>
            <div className="d-flex gap-3">
              <a
                href="https://facebook.com"
                className="text-light text-decoration-none fs-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                className="text-light text-decoration-none fs-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com/domiburguer_"
                className="text-light text-decoration-none fs-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Línea Divisoria */}
        <hr className="my-4 text-light" />

        {/* Sección Inferior */}
        <div className="text-center">
          <p className="mb-0">&copy; 2025 DomiBurger. Todos los derechos reservados.</p>
          <small>
            <a href="#terms" className="text-light text-decoration-none">
              Términos y Condiciones
            </a>{' '}
            |{' '}
            <a href="#privacy" className="text-light text-decoration-none">
              Política de Privacidad
            </a>
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
