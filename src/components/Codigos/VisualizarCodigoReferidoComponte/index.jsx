import { useEffect, useState } from "react";
import { findFilterCodigos } from "../../../Utils/api/codigos/findFilterCodigos";
import CodigoReferidoCard from "./CodigoReferidoCard";
import { Container, Row } from "react-bootstrap";
import Buscador from "../../Buscador";
import MensajeSinCodigos from "./MensajeSinCodigos";
import BuscadorTelefono from "./BuscadorTelefono";

const VisualizarCodigoReferidoComponente = ({ token, userId }) => {
  const [codesReferidos, setCodesReferidos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [busquedaDataClient, setBusquedaDataClient] = useState('');
  const [idClient, setIdClient] = useState('');

  useEffect(() => {
    if (!token && !userId) {
      return;
    }
    const filter = [{ "key": "type", "options": "==", "value": "Referido" }];

    findFilterCodigos({ filter }, token)
      .then(rtaCodesReferidos => {
        setCodesReferidos(rtaCodesReferidos.body);
      });
  }, [token, userId]);

  useEffect(() => {
    if (!busquedaDataClient) return setIdClient('')
    setIdClient(busquedaDataClient.id)
  }, [busquedaDataClient])

  let codigosFiltrados = codesReferidos &&
    codesReferidos
      .filter(codigo => codigo.data.id.includes(busqueda))
      .filter(codigo => codigo.data.clientId.includes(idClient))



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
                setBusqueda('')
                setBusquedaDataClient(null)
              }}
            />
          )}
        </Row>
      </Container>
    </>
  );
};

export { VisualizarCodigoReferidoComponente };
