import { useEffect, useState } from "react";
import { findFilterCodigos } from "../../../Utils/api/codigos/findFilterCodigos";
import CodigoReferidoCard from "./CodigoReferidoCard";
import { Container, Row, Pagination, Col } from "react-bootstrap";
import Buscador from "../../Buscador";
import MensajeSinCodigos from "./MensajeSinCodigos";
import BuscadorTelefono from "./BuscadorTelefono";

const VisualizarCodigoReferidoComponente = ({ token, userId }) => {
  const [codesReferidos, setCodesReferidos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [busquedaDataClient, setBusquedaDataClient] = useState('');
  const [idClient, setIdClient] = useState('');
  const [page, setPage] = useState(1); // Página actual
  const [startPage, setStartPage] = useState(1); // Página inicial del rango

  useEffect(() => {
    if (!token && !userId) return;

    const params = [
      { key: 'page', value: page },
      { key: 'orderBy', value: 'dateCreate' },
      { key: 'limit', value: 12 },
      { key: 'key', value: 'type' },
      { key: 'options', value: '==' },
      { key: 'value', value: 'Referido' }
    ];

    findFilterCodigos(params, token)
      .then(rtaCodesReferidos => {
        setCodesReferidos(rtaCodesReferidos.body);
        console.log(`[ ~ useEffect ~ rtaCodesReferidos]`, rtaCodesReferidos);
      });
  }, [token, userId, page]);

  useEffect(() => {
    if (!busquedaDataClient) return setIdClient('');
    setIdClient(busquedaDataClient.id);
  }, [busquedaDataClient]);

  let codigosFiltrados = codesReferidos &&
    codesReferidos
      .filter(codigo => codigo.data.id.includes(busqueda))
      .filter(codigo => codigo.data.clientId.includes(idClient));

  // Manejo de cambio de página
  const handlePageChange = (newPage) => {
    setPage(newPage);
    if (newPage >= startPage + 5) {
      setStartPage(startPage + 5);
    } else if (newPage < startPage) {
      setStartPage(startPage - 5);
    }
  };

  return (
    <>
      <Container fluid>
        <Buscador
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          textPlaceholder="Buscar por codigo"
        />
        <BuscadorTelefono
          setDataClient={setBusquedaDataClient}
          token={token}
        />
        <Row>
          {codigosFiltrados && codigosFiltrados.length > 0 ? (
            codigosFiltrados.map(codigo => (
              <CodigoReferidoCard key={codigo.data.id} codigo={codigo.data} />
            ))
          ) : (
            <MensajeSinCodigos
              filtros={busqueda} limpiarFiltros={() => {
                setBusqueda('');
                setBusquedaDataClient(null);
              }}
            />
          )}
        </Row>

        {/* Componente de Paginación */}
        <Row className="justify-content-center mt-4">
          <Col xs="auto">
            <Pagination>
              <Pagination.Prev
                onClick={() => handlePageChange(Math.max(1, page - 1))}
                disabled={page === 1}
              />
              {[...Array(5).keys()].map(i => (
                <Pagination.Item
                  key={startPage + i}
                  active={page === startPage + i}
                  onClick={() => handlePageChange(startPage + i)}
                >
                  {startPage + i}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={() => handlePageChange(page + 1)} />
            </Pagination>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export { VisualizarCodigoReferidoComponente };
