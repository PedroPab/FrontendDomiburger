/* eslint-disable react/prop-types */
import { Row } from "react-bootstrap"

const RowListCol = ({ children }) => {
  return (
    // ocupa toda la pantalla disponible
    <Row
      className="flex-nowrap overflow-auto"
      style={{ "height": "90vh" }}>
      {children}
    </Row>
  )
}

export default RowListCol;
