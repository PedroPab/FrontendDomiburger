/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState } from 'react';
import { useLocalStorage } from '../Utils/localStore';

export const RecepcionContexto = createContext()

// eslint-disable-next-line react/prop-types
export const ContextProviderRecepcion = ({ children }) => {
  //las lista para tener  los domiciliaros  que queremos y no los todo los que hay
  const { item: listDomiciliarios, saveItem: setListDomiciliarios } = useLocalStorage({ itemName: 'listDomiciliarios', initialValue: [] })

  //el modal para agrega los domiciliarios
  const [showModalAgregarDomiciliarios, setShowModalAgregarDomiciliarios] = useState(true);
  const openCloseModalAgregarDo = () => setShowModalAgregarDomiciliarios(!showModalAgregarDomiciliarios);



  return (
    <RecepcionContexto.Provider value={
      {
        listDomiciliarios, setListDomiciliarios,

        openCloseModalAgregarDo, showModalAgregarDomiciliarios
      }
    }>
      {children}
    </RecepcionContexto.Provider>
  )
}


