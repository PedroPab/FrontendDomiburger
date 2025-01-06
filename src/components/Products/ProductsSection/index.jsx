import CardProduct from "../../CardProduct";
import imgHamburguesa from "./../../../assets/img/hamburguesa.png";
import imgCombo from "./../../../assets/img/combo.png";
import { PRODUCTS } from "../../../Utils/constList";

function ProductsSection({ listaProductosOrder, incrementCount, decrementCount }) {
  // Lista de productos
  const productList = [
    {
      name: PRODUCTS.Hamburguesa,
      title: "Hamburguesa Artesanal",
      description: "Deliciosa hamburguesa.",
      img: imgHamburguesa,
    },
    {
      name: PRODUCTS.Combo,
      title: "Combo",
      description: "Hamburguesa + Papas fritas risadas.",
      img: imgCombo,
    },
  ];

  return (
    <section className="products-section py-5">
      <div className="container">
        <h2 className="text-center mb-4">Nuestros Productos</h2>
        <div className="row g-4">
          {productList.map((product, index) => (
            <article
              key={index}
              className="col-12 col-md-6 d-flex justify-content-center"
              aria-label={`Producto: ${product.title}`}
            >
              <CardProduct
                title={product.title}
                description={product.description}
                img={product.img}
                alt={`Imagen de ${product.title}`}
                count={listaProductosOrder.filter((e) => e.name === product.name).length}
                incrementCount={() => incrementCount(product.name)}
                decrementCount={() => decrementCount(product.name)}
                aria-live="polite"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductsSection;
