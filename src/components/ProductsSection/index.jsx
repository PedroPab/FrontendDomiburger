import CardProduct from "../CardProduct";

import imgHamburguesa from './../../assets/img/hamburguesa.png';
import imgCombo from './../../assets/img/combo.png'

import { PRODUCTS } from '../../Utils/constList';

function ProductsSection({ listaProductosOrder, incrementCount, decrementCount }) {
  return (
    <div className='m-3'>

      <section className="mb-3">
        <CardProduct
          img={imgHamburguesa}
          count={listaProductosOrder.filter(e => e.name == PRODUCTS.Hamburguesa).length}
          incrementCount={() => (incrementCount(PRODUCTS.Hamburguesa))}
          decrementCount={() => (decrementCount(PRODUCTS.Hamburguesa))}
        />
      </section>
      <section className="mb-3">
        <CardProduct
          img={imgCombo}
          count={listaProductosOrder.filter(e => e.name == PRODUCTS.Combo).length}
          incrementCount={() => (incrementCount(PRODUCTS.Combo))}
          decrementCount={() => (decrementCount(PRODUCTS.Combo))} />
      </section>
    </div>
  )
}
export default ProductsSection;