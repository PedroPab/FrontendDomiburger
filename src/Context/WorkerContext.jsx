/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
import { ProductsService } from '../apis/clientV2/ProductsService';
import { KitchenService } from '../apis/clientV2/KitchenService';

export const WorkerContext = createContext()

// eslint-disable-next-line react/prop-types
export const WorkerProvider = ({ children }) => {

	const [idOrderSelect, setIdOrderSelect] = useState(null);

	const [listProducts, setListProducts] = useState([])
	const [listKitchens, setListKitchens] = useState([])

	const { token } = useAuth()

	//miramos todo los domiciliarios en la api
	const productosService = new ProductsService(token);
	const kitchensService = new KitchenService(token);
	const findsProducts = async () => {
		try {
			const products = await productosService.getAll();
			setListProducts(products.body);
		} catch (error) {
			toast.error(`Error al cargar los productos ${error?.response?.data?.message}`);
		}
	}

	const findKitchens = async () => {
		try {
			const kitchens = await kitchensService.getAll();
			setListKitchens(kitchens.body);
		} catch (error) {
			toast.error(`Error al cargar las cocinas ${error?.response?.data?.message}`);
		}
	}

	useEffect(() => {
		findsProducts();
		findKitchens();
	}
		, [])


	return (
		<WorkerContext.Provider value={
			{
				listProducts,
				listKitchens,
				idOrderSelect, setIdOrderSelect,

			}
		}>
			{children}
		</WorkerContext.Provider>
	)
}

export const useWorker = () => { return useContext(WorkerContext) }
