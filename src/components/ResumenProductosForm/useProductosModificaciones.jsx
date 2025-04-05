import { Adiciones } from '../../Utils/classProduct';

const useProductosModificaciones = (listaProducto, setListaProducto, adiciones) => {
	// Agregar o modificar una adición en el producto
	const onChangeSelectAdicion = (idAdicion, idProducto) => {
		const indexAdicion = adiciones.findIndex(e => e.id === idAdicion);
		if (indexAdicion === -1) return;
		const dataAdicion = new Adiciones(adiciones[indexAdicion]);
		const indexProducto = listaProducto.findIndex(e => e.idInter === idProducto);
		if (indexProducto === -1) return;
		const dataProducto = listaProducto[indexProducto];
		dataProducto.anadirModifique(dataAdicion);
		const newData = [...listaProducto];
		newData[indexProducto] = dataProducto;
		setListaProducto(newData);
	};

	// Retirar una adición del producto
	const onClicAdicion = (idInterAdicion, idInterProducto) => {
		const indexProducto = listaProducto.findIndex(e => e.idInter === idInterProducto);
		if (indexProducto === -1) return;
		const dataProducto = listaProducto[indexProducto];
		dataProducto.retirarModifique({ idInter: idInterAdicion });
		const newData = [...listaProducto];
		newData[indexProducto] = dataProducto;
		setListaProducto(newData);
	};

	// Calcular el total de los productos (sin incluir delivery)
	const calcularTotalProductos = () => {
		let total = 0;
		if (listaProducto) {
			listaProducto.forEach(producto => {
				let totalProducto = producto.price;
				producto?.modifique.forEach(element => {
					totalProducto += element.price;
				});
				total += totalProducto;
			});
		}
		return total;
	};

	return {
		onChangeSelectAdicion,
		onClicAdicion,
		calcularTotalProductos,
	};
};

export default useProductosModificaciones;
