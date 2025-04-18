/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from './AuthContext';
import { UsersService } from '../apis/clientV2/usersService';
import { toast } from 'react-toastify';
import { ROLES } from '../Utils/const/roles';
import { ProductsService } from '../apis/clientV2/ProductsService';

export const RecepcionContexto = createContext()

// eslint-disable-next-line react/prop-types
export const ContextProviderRecepcion = ({ children }) => {
	//las lista para tener  los domiciliarios  que queremos y no los todo los que hay
	const [listDomiciliarios, setListDomiciliarios] = useLocalStorage('listDomiciliarios1', [])

	//la lista de todos los domiciliarios
	const [users, setUsers] = useLocalStorage('Domiciliarios1', []);

	//domiciliarios seleccionados
	const [domiciliariosSeleccionados, setDomiciliariosSeleccionados] = useState([])
	//estado seleccionado
	const [listProducts, setListProducts] = useState([])
	const { token } = useAuth()

	//miramos todo los domiciliarios en la api
	const userService = new UsersService(token);
	const productosService = new ProductsService(token);

	const findUser = async () => {
		try {
			const users = await userService.getByRole(ROLES.COURIER.value);
			//filtramos los domiciliarios de la lista de listDomiciliarios para que que no muestre los que ya no están en la lista
			const listDomiciliariosFilter = listDomiciliarios.filter(e => users.body.find(u => u.id === e.id))
			setListDomiciliarios(listDomiciliariosFilter)
			setUsers(users.body);
		} catch (error) {
			console.log("🚀 ~ findUser ~ error:", error)
			toast.error(`Error al cargar los domiciliarios ${error?.response?.data?.message}`);
		}
	}

	const findsProducts = async () => {
		try {
			const products = await productosService.getAll();
			setListProducts(products.body);
		} catch (error) {
			toast.error(`Error al cargar los productos ${error?.response?.data?.message}`);
		}
	}

	useEffect(() => {
		findUser();
		findsProducts();
	}
		, [])

	//el modal para agrega los domiciliarios
	const [showModalAgregarDomiciliarios, setShowModalAgregarDomiciliarios] = useState(false);
	const openCloseModalAgregarDo = () => setShowModalAgregarDomiciliarios(!showModalAgregarDomiciliarios);


	//el filtro para buscar los domiciliarios
	const [domiciliarioIdFilter, setDomiciliarioIdFilter] = useState(null)

	const [openSidebarFilterDelivery, setOpenSidebarFilterDelivery] = useLocalStorage('openSidebarFilterDelivery', false)
	//setOpenSidebarFilterDelivery)
	const toggleSidebar = () => {
		if (domiciliarioIdFilter) {
			toast.error("No puedes cerrar el filtro, primero debes quitar el filtro del domiciliario");
			return
		}
		setOpenSidebarFilterDelivery((prevState) => !prevState);
	};

	return (
		<RecepcionContexto.Provider value={
			{
				listDomiciliarios, setListDomiciliarios,

				users, setUsers,

				listProducts,

				openCloseModalAgregarDo, showModalAgregarDomiciliarios,

				domiciliariosSeleccionados, setDomiciliariosSeleccionados,

				domiciliarioIdFilter, setDomiciliarioIdFilter,

				openSidebarFilterDelivery, toggleSidebar
			}
		}>
			{children}
		</RecepcionContexto.Provider>
	)
}

export const useRecepcion = () => { return useContext(RecepcionContexto) }
