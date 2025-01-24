import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import useFetchIntegrameloApi from '../../Hooks/useFetchIntegrameloApi';
import CardStoreRequestAutorization from '../RequestAuthorization/CardStoreRequestAutorization';
import Layout from '../../Layout/LayoutDefault';
// import { useToast } from '../../Hooks/useToast';
// import Loading from '../Loading';
// import CreateStoreCard from '../Stores/CreateStore';
import SearchBar from '../Search';

const RequestAuthorization = () => {
  // const notify = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  // Consumir la API para mostrar la lista de tiendas
  const { data, loading, error } = useFetchIntegrameloApi('v3/stores');
  const stores = data;

  useEffect(() => {
    if (error) {
      // notify.notifyError(`Failed to fetch stores: ${error}`, 'error');
    }
  }, [error]);

  return (
    <Layout>
      <Container>
        <div className='d-flex justify-content-between align-items-center'>
          <h1 className='m-3'>Tiendas en Integramelo</h1>
          {/* <CreateStoreCard /> */}
        </div>

        {/* Buscador para filtrar las tiendas por su id o nombre */}
        <div className='m-3'>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder={`Buscar Tienda por su id o nombre`} />
        </div>

        {/* Mostrar loading si se están cargando los datos */}
        {loading && (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
          </div>
        )}

        {/* Mostrar error si ocurre */}
        {error && <p className="text-danger">Error: {error.message}</p>}

        {/* Mostrar las tiendas solo si los datos están disponibles */}
        {stores && stores.length > 0 ? (
          stores
            .filter((store) => {
              const searchTermLower = searchTerm.toLowerCase();
              const storeIdLower = store.name.toLowerCase();
              return storeIdLower.includes(searchTermLower);
            })
            .map((store) => (
              <CardStoreRequestAutorization
                id={store.id}
                name={store.name}
                key={store.id}
              />
            ))
        ) : (
          !loading && <p className="text-center mt-4">No se encontraron tiendas registradas.</p>
        )}
      </Container>
    </Layout>
  );
};

export default RequestAuthorization;
