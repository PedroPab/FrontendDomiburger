/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../Utils/localStore';
import { MiContexto } from '../Context';
import { UtilsApi } from '../Utils/utilsApi';

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
  const [estadoSeleccionado, setEstadoSeleccionado] = useState()

  const context = useContext(MiContexto)

  //miramos todo los domiciliarios en la api
  useEffect(() => {
    const token = context.tokenLogin.token
    UtilsApi({ peticion: `domiciliarios`, token: token, vervo: `GET` })
      .then(result => {
        setUsers(result)
      })
      .catch(error => console.log('error 👿', error));
  }, [])

  //el modal para agrega los domiciliarios
  const [showModalAgregarDomiciliarios, setShowModalAgregarDomiciliarios] = useState(false);
  const openCloseModalAgregarDo = () => setShowModalAgregarDomiciliarios(!showModalAgregarDomiciliarios);



  return (
    <RecepcionContexto.Provider value={
      {
        listDomiciliarios, setListDomiciliarios,

        users, setUsers,

        openCloseModalAgregarDo, showModalAgregarDomiciliarios,

        domiciliariosSeleccionados, setDomiciliariosSeleccionados,
        estadoSeleccionado, setEstadoSeleccionado,
      }
    }>
      {children}
    </RecepcionContexto.Provider>
  )
}


