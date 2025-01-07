import LayoutCliente from '../../Layout/LayoutCliente';
import { NavbarCliente } from '../../components/Navbar/NavbarCliente';

const Nosotros = () => {

  return (
    <LayoutCliente>
      <NavbarCliente />
      <div className="container my-5">
        <div className="text-center mb-4">
          <h1 className="display-4 fw-bold text-success">Sobre Nosotros</h1>
          <p className="text-muted fs-5">
            Conoce más sobre nuestro negocio y nuestra misión.
          </p>
        </div>
        <div className="card shadow-lg border-0 mb-4">
          <div className="card-body">
            <h2 className="card-title text-primary">Nuestra Historia</h2>
            <p className="card-text">
              Somos una empresa dedicada a ofrecer los mejores productos de hamburguesas con ingredientes frescos y de alta calidad. Nuestro compromiso es brindar una experiencia única a nuestros clientes.
            </p>
            <h2 className="card-title text-primary">Nuestra Misión</h2>
            <p className="card-text">
              Nuestra misión es ser el lugar preferido para disfrutar de una deliciosa hamburguesa, ofreciendo un servicio excepcional y un ambiente acogedor.
            </p>
          </div>
        </div>
      </div>
    </LayoutCliente>
  );
};

export default Nosotros;
