/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../Utils/localStore';
import { useAuth } from './AuthContext';
import { UsersService } from '../apis/clientV2/usersService';
import { toast } from 'react-toastify';
import { ROLES } from '../Utils/const/roles';

export const RecepcionContexto = createContext()

// eslint-disable-next-line react/prop-types
export const ContextProviderRecepcion = ({ children }) => {
	//las lista para tener  los domiciliarios  que queremos y no los todo los que hay
	const { item: listDomiciliarios, saveItem: setListDomiciliarios } = useLocalStorage({ itemName: 'listDomiciliarios', initialValue: [] })

	//la lista de todos los domiciliarios
	const { item: users, saveItem: setUsers } = useLocalStorage({ itemName: 'Domiciliarios', initialValue: [] });

	//domiciliarios seleccionados
	const [domiciliariosSeleccionados, setDomiciliariosSeleccionados] = useState([])
	//estado seleccionado

	const { token } = useAuth()

	//miramos todo los domiciliarios en la api
	const userService = new UsersService(token);

	const findUser = async () => {
		try {
			const users = await userService.getByRole(ROLES.COURIER.value);
			console.log("🚀 ~ findUser ~ users:", users)
			toast.success(`Domiciliarios cargados correctamente ${users?.body?.length}`);
			setUsers(users.body);
		} catch (error) {
			console.log("🚀 ~ findUser ~ error:", error)
			toast.error(`Error al cargar los domiciliarios ${error?.response?.data?.message}`);
		}
	}

	useEffect(() => {
		findUser();
	}
		, [])

	//el modal para agrega los domiciliarios
	const [showModalAgregarDomiciliarios, setShowModalAgregarDomiciliarios] = useState(false);
	const openCloseModalAgregarDo = () => setShowModalAgregarDomiciliarios(!showModalAgregarDomiciliarios);


	//el filtro para buscar los domiciliarios
	const [domiciliarioIdFilter, setDomiciliarioIdFilter] = useState(null)

	const { item: openSidebarFilterDelivery, saveItem: setOpenSidebarFilterDelivery } = useLocalStorage({ itemName: 'openSidebarFilterDelivery', initialValue: false })
	//setOpenSidebarFilterDelivery)
	const toggleSidebar = () => {
		setOpenSidebarFilterDelivery((prevState) => !prevState);
	};

	return (
		<RecepcionContexto.Provider value={
			{
				listDomiciliarios, setListDomiciliarios,

				users, setUsers,

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
