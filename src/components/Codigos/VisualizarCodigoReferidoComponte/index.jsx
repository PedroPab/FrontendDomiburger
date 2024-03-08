import { useEffect, useState } from "react"
import { findFilterCodigos } from "../../../Utils/api/codigos/findFilterCodigos"
import CodigoReferidoCard from "./CodigoReferidoCard"
import { Container, Row } from "react-bootstrap"

const VisualizarCodigoReferidoComponte = ({ token, userId }) => {

  const [codesReferidos, setCodesReferidos] = useState(null)
  //consultamos los codigos de referidos una vez
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!token && userId) {
      //consultamos los codigos de referidos una vez
      return
    }
    const filter = [
      {
        "key": "type",
        "options": "==",
        "value": "Referido"
      },
    ]
    // eslint-disable-next-line no-unused-vars
    findFilterCodigos({ filter: filter }, token)
      .then(rtaCodesReferidos => {
        setCodesReferidos(rtaCodesReferidos.body)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])


  return (
    <>
      <Container fluid>
        <Row>
          {codesReferidos &&
            codesReferidos.map(codigo => {
              codigo = codigo.data
              return (
                <CodigoReferidoCard
                  key={codigo.id}
                  codigo={codigo}
                />
              )
            })}
        </Row>
      </Container>

    </>
  )

}

export { VisualizarCodigoReferidoComponte }