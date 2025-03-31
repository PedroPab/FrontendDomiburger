import { ToastContainer } from 'react-toastify';
import { ContextProviderClient, } from '../../Context/ClientContex';
import { HelmetProvider, } from 'react-helmet-async'; // Importamos Helmet
import Footer from './Footer';

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <>
      <HelmetProvider>
        <ContextProviderClient>
          {children}
        </ContextProviderClient>
        <ToastContainer position="bottom-left" />
        <Footer />
      </HelmetProvider>
    </>
  )
}

export default Layout