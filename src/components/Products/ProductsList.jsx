import { Alert, Col, Row } from "react-bootstrap"
import { ProductCard } from "./ProductCard"
import CardCreate from "../CardCreate"

const ProductsList = ({ products, loading, error, handleCardClick }) => {

  return (
    <>
      <Row className="g-3 mt-4 mb-4">
        {/* Tarjeta para crear un nuevo focus */}
        <Col xs={12} sm={4} lg={3}>
          <CardCreate
            handleCardClick={handleCardClick}
            messageText='Crear un Producto' />
        </Col>
        {products.length === 0 ? (
          <Alert variant="warning" className="mt-4 text-center">
            No hay Productos para mostrar
          </Alert>
        ) : (
          <>{products.map((product) => (
            <Col xs={12} sm={6} lg={4} key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
          </>
        )}
      </Row>
    </>
  )
}

export { ProductsList }