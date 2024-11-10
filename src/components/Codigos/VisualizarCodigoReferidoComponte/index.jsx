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
  const [preCodigos, setPreCodigos] = useState([]);
  const [idClient, setIdClient] = useState('');
  const [pageList, setPageList] = useState([1, 2, 3, 4, 5]); // Lista de páginas
  const [page, setPage] = useState(1); // Página actual

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
        setPreCodigos(rtaCodesReferidos.body);
      });
  }, [token, userId, page]);

  useEffect(() => {
    // Actualiza `pageList` cuando cambia la página actual
    const start = Math.max(1, page - 2);
    const newPageList = Array.from({ length: 5 }, (_, i) => start + i);
    setPageList(newPageList);
  }, [page]);

  useEffect(() => {
    if (!busquedaDataClient) return setIdClient('');
    //buscamos todo los codigos que tengan el id del cliente po la api
    const params = [
      { key: 'page', value: 1 },
      { key: 'orderBy', value: 'dateCreate' },
      { key: 'limit', value: 12 },
      { key: 'key', value: 'clientId' },
      { key: 'options', value: '==' },
      { key: 'value', value: busquedaDataClient.id },
    ];

    findFilterCodigos(params, token)
      .then(rtaCodesReferidos => {
        setCodesReferidos(rtaCodesReferidos.body);
      });

    setIdClient(busquedaDataClient.id);

  }, [busquedaDataClient, token]);

  let codigosFiltrados = codesReferidos &&
    codesReferidos
      .filter(codigo => codigo.data.id.includes(busqueda))
      .filter(codigo => codigo.data.clientId.includes(idClient));

  // Manejo de cambio de página
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const buscarCodigo = () => {
    //miramo el id del codigo y lo buscamos por la api
    const params = [
      { key: 'page', value: 1 },
      { key: 'orderBy', value: 'dateCreate' },
      { key: 'limit', value: 12 },
      { key: 'key', value: 'id' },
      { key: 'options', value: '==' },
      { key: 'value', value: busqueda },
    ];
    findFilterCodigos(params, token)
      .then(rtaCodesReferidos => {
        setCodesReferidos(rtaCodesReferidos.body);
      });

  }

  return (
    <>
      <Container >
        <Buscador
          buscarCodigo={buscarCodigo}
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
              limpiarFiltros={() => {
                setBusqueda('');
                setBusquedaDataClient(null);
                page != 1 ? setPage(1) : null
                //init codes
                setCodesReferidos(preCodigos);

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
              {pageList.map((pageNum) => (
                <Pagination.Item
                  key={pageNum}
                  active={page === pageNum}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
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
