import { useEffect, useState } from "react";
import { findFilterCodigos } from "../../../Utils/api/codigos/findFilterCodigos";
import CodigoReferidoCard from "./CodigoReferidoCard";
import { Container, Row } from "react-bootstrap";
import Buscador from "../../Buscador";
import MensajeSinCodigos from "./MensajeSinCodigos";

const VisualizarCodigoReferidoComponente = ({ token, userId }) => {
  const [codesReferidos, setCodesReferidos] = useState([]);
  const [busqueda, setBusqueda] = useState('');

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

  const codigosFiltrados = codesReferidos &&
    codesReferidos.filter(codigo => codigo.data.id.includes(busqueda));

  return (
    <>
      <Container fluid>
        <Buscador
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          textPlaceholder="Buscar por codigo"
        />

        <Row>
          {codigosFiltrados && codigosFiltrados.length > 0 ? (
            codigosFiltrados.map(codigo => (
              <CodigoReferidoCard key={codigo.data.id} codigo={codigo.data} />
            ))
          ) : (
            <MensajeSinCodigos
              busqueda={busqueda} setBusqueda={setBusqueda}
            />
          )}
        </Row>
      </Container>
    </>
  );
};

export { VisualizarCodigoReferidoComponente };
