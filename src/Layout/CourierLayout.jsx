import { NavbarDomiciliario } from "../components/Navbar/NavbarDomiciliario";
import Layout from "../components/Layout";

const CourierLayout = ({ children }) => {
  return (
    <Layout>
      <NavbarDomiciliario />
      {children}
    </Layout>
  );
}

export { CourierLayout }