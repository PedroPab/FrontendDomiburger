
import { useState } from 'react';
import { toast } from 'react-toastify';
import { PRODUCTS } from '../../../Utils/constList';
import { Adiciones, Combo, Hamburguesa, Producto } from '../../../Utils/classProduct';
import postOrder from '../../../Utils/api/postOrder';

const useOrderActions = ({
  listaProductosOrder, setListaProductosOrder, dataCliente, setDataCliente, telefono, setTelefono, name, setName,
  comment, setComment, selectDomiciliario, setSelectDomiciliario, paymentMethod, setPaymentMethod, dataCode,
  setDataCode, coordinates, setCoordinates, precioDeliveryManual, setPrecioDeliveryManual, dataDomicilio,
  setDataDomicilio, inputDataDireccion, setInputDataDireccion, setLoading, token
}) => {
  const incrementCount = (product) => {
    const productClass = {};
    productClass[`${PRODUCTS.Hamburguesa}`] = Hamburguesa;
    productClass[`${PRODUCTS.Combo}`] = Combo;

    const listaProducts = [...listaProductosOrder];
    const producto = new productClass[product]({});
    listaProducts.push(producto);
    setListaProductosOrder(listaProducts);
  };

  const decrementCount = (product) => {
    const listaProducts = [...listaProductosOrder.reverse()];
    const indexProduct = listaProducts.findIndex(e => e.name === product);

    if (indexProduct <= -1) return `no se encontro ningun prouduc que cumple con las condiciones de busqueda`;

    listaProducts.splice(indexProduct, 1);
    setListaProductosOrder(listaProducts.reverse());
  };

  const sendOrder = async () => {
    let dataOrder = {};
    dataOrder.phone = telefono;
    dataOrder.name = name;
    dataOrder.address = {
      address_complete: inputDataDireccion.address_complete,
      coordinates: coordinates
    };
    dataOrder.fee = paymentMethod;
    if (comment) dataOrder.note = comment;
    dataOrder.order = listaProductosOrder.map(e => ({
      id: e.id,
      price: e.price,
      modifique: e?.modifique?.map(e => ({ id: e.id, code: e?.code })),
      note: e.note,
      code: e.code
    }));

    if (precioDeliveryManual >= 0) dataOrder.addressPrice = precioDeliveryManual;
    if (!dataDomicilio.price) delete dataOrder.addressPrice;
    if (typeof dataOrder.addressPrice !== 'number') delete dataOrder.addressPrice;
    if (selectDomiciliario) dataOrder.domiciliario_asignado = { id: selectDomiciliario };

    try {
      setLoading(true);
      const rta = await postOrder(dataOrder, token, true);
      const { priceTotal } = rta;
      toast.success(`Pedido Creado con un precio de ${priceTotal.COP}`);

      setListaProductosOrder([]);
      setDataCliente(null);
      setTelefono('');
      setName('');
      setComment('');
      setPaymentMethod('Efectivo');
      setSelectDomiciliario('');
      setDataCode(null);
      setCoordinates({});
      setPrecioDeliveryManual(null);
      setDataDomicilio({});
      setInputDataDireccion({
        address_complete: "",
        piso: "",
        valid: false,
      });
    } catch (error) {
      toast.error('Error al crear el pedido');
      toast.error(error);
    }
    setLoading(false);
  };

  const agregarCodigo = (dataCode) => {
    const checkIfAdicionExists = (newListaProductosOrder, dataCode) => {
      const isAdicion = newListaProductosOrder.find(e => {
        let o = false;
        if (e?.modifique) {
          o = e.modifique.find(modificado => modificado.code == dataCode.id);
        }
        if (e?.code == dataCode.id || o) {
          return true;
        }
        return false;
      });

      if (isAdicion) {
        toast.error('Ya tienes este código en tu pedido');
        return true;
      }
      return false;
    };

    let newListaProductosOrder = [...listaProductosOrder];
    if (dataCode.type == 'Referido') {
      if (dataCode?.clientId == dataCliente?.id) {
        const premios = dataCode.productsReward;
        const productReward = new Producto(premios[0]);

        if (checkIfAdicionExists(newListaProductosOrder, dataCode)) return;

        newListaProductosOrder.push(productReward);
        setListaProductosOrder(newListaProductosOrder);
      } else {
        const isProducto = newListaProductosOrder.reverse().findIndex(e => e.type == 'product');

        if (isProducto == -1) {
          toast.error('no se encontró ningún producto para agregar el codigo');
          return;
        }

        const adicion = new Adiciones(dataCode.products[0]);
        if (checkIfAdicionExists(newListaProductosOrder, dataCode)) return;

        newListaProductosOrder[isProducto].modifique.push(adicion);
        setListaProductosOrder(newListaProductosOrder.reverse());
      }
    } else {
      toast.error('no tenemos soporte para este tipo de codigo :(');
    }
  };

  const retirarCodigo = (dataCode) => {
    console.log(dataCode, '<=dataCode');
  };

  return { incrementCount, decrementCount, sendOrder, agregarCodigo, retirarCodigo };
};

export default useOrderActions;