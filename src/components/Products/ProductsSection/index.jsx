import React, { useState } from 'react';
import CardProduct from '../../CardProduct';
import { Container, Row, Col } from 'react-bootstrap';
import imgHamburguesa from '../../../assets/img/hamburguesa.png';
import imgCombo from '../../../assets/img/combo.png';
import salsaDeAjo from '../../../assets/img/73c4aead-1e1c-4c67-a454-38fd2b6d57e6.jpeg';
import { PRODUCTS } from '../../../Utils/constList';
import ProductDetailsModal from './ProductDetailsModal';

const ProductsSection = ({ listaProductosOrder, incrementCount, decrementCount }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleShowModal = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const getProductCount = (productName) =>
    listaProductosOrder.filter((item) => item.name === productName).length;

  const products = [
    {
      title: 'Nueva Salsa de Ajo',
      description: 'Nuestra propia salsa de Ajo artesanal.',
      img: salsaDeAjo,
      productKey: PRODUCTS.SalsaDeAjo,
      isNew: true,
      moreInfo: 'La salsa de casa. La misma que usamos en la hamburguesa.',
    },
    {
      title: "Hamburguesa Artesanal",
      description: "Deliciosa hamburguesa de carne 100% de res con ingredientes frescos.",
      images: [
        imgHamburguesa,
        imgCombo
      ],
      img: imgHamburguesa,
      price: 22900,
      moreInfo: "Incluye queso cheddar, lechuga y tomate fresco.",
      ingredients: ["Pan artesanal", "Queso Mozzarella", "Salsa de Ajo", "Carne de Res", "Salsa de tomate", "Tocineta", "Pepinos", "Cebolla sofrita", "Lechuga", "Tomate",],
    }
    ,
    {
      title: 'Combo Especial',
      description: 'Hamburguesa + Papas fritas risadas.',
      img: imgCombo,
      productKey: PRODUCTS.Combo,
      moreInfo: 'Incluye una hamburguesa con papas fritas risadas y una bebida.',
    },
  ];

  return (
    <Container className="my-5">
      <h3 className="text-center mb-4 fw-bold text-primary">Nuestros Productos</h3>
      <Row className="g-3 text-center">
        {products.map((product) => (
          <Col key={product.productKey} xs={12} sm={6} md={4} lg={4} className="d-flex justify-content-center">
            <CardProduct
              title={product.title}
              description={product.description}
              img={product.img}
              count={getProductCount(product.productKey)}
              incrementCount={() => incrementCount(product.productKey)}
              decrementCount={() => decrementCount(product.productKey)}
              isNew={product.isNew}
              toggleInfo={() => handleShowModal(product)}
              moreInfo={product.moreInfo}
            />
          </Col>
        ))}
      </Row>

      {/* Modal reutilizable para mostrar detalles del producto */}
      <ProductDetailsModal product={selectedProduct} show={!!selectedProduct} handleClose={handleCloseModal} />
    </Container>
  );
};

export default ProductsSection;
