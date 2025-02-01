import React from 'react';
import CardProduct from '../../CardProduct';

// React Bootstrap
import { Container, Row, Col } from 'react-bootstrap';

// Imágenes
import imgHamburguesa from '../../../assets/img/hamburguesa.png';
import imgCombo from '../../../assets/img/combo.png';
import salsaDeAjo from '../../../assets/img/salsaDeAjo.png';

// Constantes
import { PRODUCTS } from '../../../Utils/constList';

function ProductsSection({ listaProductosOrder, incrementCount, decrementCount }) {
  // Función auxiliar para obtener la cantidad de un producto específico
  const getProductCount = (productName) =>
    listaProductosOrder.filter((item) => item.name === productName).length;

  // Lista de productos
  const products = [
    {
      title: 'Nueva Salsa de Ajo',
      description: 'Nuestra propia salsa de Ajo artesanal.',
      img: salsaDeAjo,
      productKey: PRODUCTS.SalsaDeAjo,
      isNew: true,
    },
    {
      title: 'Hamburguesa Artesanal',
      description: 'La clásica hamburguesa artesanal.',
      img: imgHamburguesa,
      productKey: PRODUCTS.Hamburguesa,
    },
    {
      title: 'Combo Especial',
      description: 'Hamburguesa + Papas fritas risadas.',
      img: imgCombo,
      productKey: PRODUCTS.Combo,
    },
  ];

  return (
    <Container className="my-5">
      <h3 className="text-center mb-4 fw-bold text-primary">Nuestros Productos</h3>
      <Row className="g-3 text-center">
        {products.map(({ title, description, img, productKey, isNew }) => (
          <Col key={productKey} xs={12} sm={6} md={4} lg={4} className="d-flex justify-content-center text-center">
            <CardProduct
              title={title}
              description={description}
              img={img}
              count={getProductCount(productKey)}
              incrementCount={() => incrementCount(productKey)}
              decrementCount={() => decrementCount(productKey)}
              isNew={isNew}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductsSection;
