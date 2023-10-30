/* eslint-disable react/prop-types */
import { Row } from "react-bootstrap"

const RowListCol = ({ children }) => {
  return (
    <Row className="flex-nowrap overflow-auto ">
      {children}
    </Row>
  )
}

export default RowListCol;
