import { ToastContainer } from 'react-toastify';
import { ContextProviderClient, } from '../../Context/ClientContex';

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <>
      <ContextProviderClient>
        {children}
      </ContextProviderClient>
      <ToastContainer />

    </>
  )
}

export default Layout