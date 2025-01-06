import { ToastContainer } from 'react-toastify';
import { ContextProviderClient, } from '../../Context/ClientContex';
import { HelmetProvider, } from 'react-helmet-async'; // Importamos Helmet

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <>
      <HelmetProvider>
        <ContextProviderClient>
          {children}
        </ContextProviderClient>
        <ToastContainer />
      </HelmetProvider>
    </>
  )
}

export default Layout