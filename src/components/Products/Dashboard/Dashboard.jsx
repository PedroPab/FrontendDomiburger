import { Combo, Hamburguesa, SalsaDeAjo } from "../../../Utils/classProduct";
import { PRODUCTS } from "../../../Utils/constList";
import ResumenProductosForm from "../../ResumenProductosForm";
import ProductsSection from "../ProductsSection";


const DashboardProducts = ({
	listaProductosOrder, setListaProductosOrder,
	precioDeliveryManual, setPrecioDeliveryManual,
	isAdmin = false,
	delivery,
	viewType = 'STANDARD',
}) => {
	// const [listaProductosOrder, setListaProductosOrder] = useState([]);
	// const [dataDomicilio, setDataDomicilio] = useState({});
	// const [precioDeliveryManual, setPrecioDeliveryManual] = useState(null);


	const incrementCount = (product) => {
		const productClass = {}
		productClass[`${PRODUCTS.Hamburguesa}`] = Hamburguesa
		productClass[`${PRODUCTS.Combo}`] = Combo
		productClass[`${PRODUCTS.SalsaDeAjo}`] = SalsaDeAjo

		const listaProducts = [...listaProductosOrder]
		const producto = new productClass[product]({})
		listaProducts.push(producto)
		setListaProductosOrder(listaProducts)
	};

	const decrementCount = (product) => {
		//los reversamos para que saqeu el ultimo que se agrego
		const listaProducts = [...listaProductosOrder.reverse()]
		const indexProduct = listaProducts.findIndex(e => e.name === product)

		if (indexProduct <= -1) return `no se encontro ningun prouduc que cumple con las condiciones de busqueda`

		listaProducts.splice(indexProduct, 1)

		setListaProductosOrder(listaProducts.reverse())
	};

	const viewTypeConst = ['STANDARD', 'PRODUCTS', 'SUMMARY']

	if (viewType == 'STANDARD' || !viewTypeConst.includes(viewType))
		return (
			<>


				<ProductsSection
					listaProductosOrder={listaProductosOrder}
					incrementCount={incrementCount}
					decrementCount={decrementCount}

				/>

				<ResumenProductosForm
					listaProducto={listaProductosOrder}
					setListaProducto={setListaProductosOrder}
					delivery={delivery}
					addressPrice={[precioDeliveryManual, setPrecioDeliveryManual]}
					isAdmin={isAdmin}
				/>
			</>
		);

	if (viewType == 'PRODUCTS')
		return (
			<ProductsSection
				listaProductosOrder={listaProductosOrder}
				incrementCount={incrementCount}
				decrementCount={decrementCount}

			/>
		)

	if (viewType == 'SUMMARY')
		return (
			<ResumenProductosForm
				listaProducto={listaProductosOrder}
				setListaProducto={setListaProductosOrder}
				delivery={delivery}
				addressPrice={[precioDeliveryManual, setPrecioDeliveryManual]}
				isAdmin={isAdmin}
			/>
		)
}


export default DashboardProducts;