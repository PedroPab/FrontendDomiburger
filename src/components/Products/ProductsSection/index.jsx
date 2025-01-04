import CardProduct from "../../CardProduct";
import imgHamburguesa from './../../../assets/img/hamburguesa.png';
import imgCombo from './../../../assets/img/combo.png';
import { PRODUCTS } from '../../../Utils/constList';

function ProductsSection({ listaProductosOrder, incrementCount, decrementCount }) {
  return (
    <>
      <section className="mb-3">
        <h3 className="text-center mb-4">Nuestros Productos</h3>
        <div className="d-flex flex-column flex-md-row justify-content-around">
          <div className="mb-4 mb-md-0">
            <CardProduct
              title="Hamburguesa Artesanal"
              // description="Deliciosa hamburguesa con ingredientes frescos y pan artesanal."
              img={imgHamburguesa}
              count={listaProductosOrder.filter(e => e.name === PRODUCTS.Hamburguesa).length}
              incrementCount={() => incrementCount(PRODUCTS.Hamburguesa)}
              decrementCount={() => decrementCount(PRODUCTS.Hamburguesa)}
            />
          </div>
          <div className="mb-4 mb-md-0">
            <CardProduct
              title="Combo Especial"
              description="Hamburguesa + Papas fritas risadas"
              img={imgCombo}
              count={listaProductosOrder.filter(e => e.name === PRODUCTS.Combo).length}
              incrementCount={() => incrementCount(PRODUCTS.Combo)}
              decrementCount={() => decrementCount(PRODUCTS.Combo)}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductsSection;
