import { useState, useEffect } from 'react';
import { Combo, Hamburguesa } from '../../../Utils/classProduct';
import { PRODUCTS } from '../../../Utils/constList.js';

export const useProductos = (data, setData) => {
  console.log(`[ ~ useProductos ~ setData]`, setData)
  console.log(`[ ~ useProductos ~ data]`, data)
  const [listaProductosOrder, setListaProductosOrder] = useState([]);

  const incrementCount = (product) => {
    const productClass = {
      [PRODUCTS.Hamburguesa]: Hamburguesa,
      [PRODUCTS.Combo]: Combo,
    };

    const producto = new productClass[product]({});
    setListaProductosOrder([...listaProductosOrder, producto]);
  };

  const decrementCount = (product) => {
    const listaProducts = [...listaProductosOrder.reverse()];
    const indexProduct = listaProducts.findIndex(e => e.name === product);

    if (indexProduct > -1) {
      listaProducts.splice(indexProduct, 1);
      setListaProductosOrder(listaProducts.reverse());
    }
  };

  useEffect(() => {
    if (listaProductosOrder.length > 0) {
      setData({ ...data, order: listaProductosOrder });
    }
  }, [listaProductosOrder, setData]);

  return { listaProductosOrder, incrementCount, decrementCount };
};
