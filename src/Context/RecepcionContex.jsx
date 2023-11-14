/* eslint-disable react-hooks/exhaustive-deps */
import { createContext } from 'react';
import { useLocalStorage } from '../Utils/localStore';

export const RecepcionContexto = createContext()

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  //las lista para tener  los domiciliaros  que queremos y no los todo los que hay
  const { item: listDomiciliarios, saveItem: setListDomiciliarios } = useLocalStorage([])



  return (
    <RecepcionContexto.Provider value={
      {
        listDomiciliarios, setListDomiciliarios
      }
    }>
      {children}
    </RecepcionContexto.Provider>
  )
}


