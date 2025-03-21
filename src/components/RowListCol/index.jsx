/* eslint-disable react/prop-types */
import { Row } from "react-bootstrap"

const RowListCol = ({ children }) => {
  return (
    // ocupa toda la pantalla disponible
    <div
      className='d-flex justify-content-end'
    >
      <Row
        className="flex-nowrap overflow-auto "
        style={{
          "height": "90vh",
          "width": "100%" // Descomentar esta línea para asegurar que el ancho sea 100%
        }}
      >
        {children}
      </Row>
    </div>
  )
}

export default RowListCol;
