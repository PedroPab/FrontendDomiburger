import { ContextProviderClient, } from '../../Context/ClientContex';

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <>
      <ContextProviderClient>
        {children}
      </ContextProviderClient>

    </>
  )
}

export default Layout