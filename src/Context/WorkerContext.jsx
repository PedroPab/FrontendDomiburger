/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
import { ProductsService } from '../apis/clientV2/ProductsService';
import { KitchenService } from '../apis/clientV2/KitchenService';
import { LocationsService } from '../apis/clientV2/LocationsService';

export const WorkerContext = createContext()


export const WorkerProvider = ({ children }) => {

  const [idOrderSelect, setIdOrderSelect] = useState(null);

  const [listProducts, setListProducts] = useState([])
  const [listKitchens, setListKitchens] = useState([])

  const { token } = useAuth()

  const productosService = useMemo(() => new ProductsService(token), [token]);
  const kitchensService = useMemo(() => new KitchenService(token), [token]);
  const locationService = useMemo(() => new LocationsService(token), [token]);

  const findsProducts = useCallback(async () => {
    try {
      const products = await productosService.getAll();
      setListProducts(products.body);
    } catch (error) {
      toast.error(`Error al cargar los productos ${error?.response?.data?.message}`);
    }
  }, [productosService]);

  const findKitchens = useCallback(async () => {
    try {
      const kitchens = await kitchensService.getAll();
      const rta = await Promise.all(kitchens.body.map(async (kitchen) => {
        const location = await locationService.getById(kitchen.locationId);
        kitchen.location = location.body;
        return kitchen;
      }));
      setListKitchens(rta);
    } catch (error) {
      toast.error(`Error al cargar las cocinas ${error?.response?.data?.message}`);
    }
  }, [kitchensService, locationService]);

  useEffect(() => {
    findsProducts();
    findKitchens();
  }, [findsProducts, findKitchens])


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
