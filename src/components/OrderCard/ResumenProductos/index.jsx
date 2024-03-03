import { ResumenPedidos } from './ResumenPedidos';

const ResumenProductos = ({ listProducts }) => {
  return (
    <>
      <ResumenPedidos
        order={listProducts}
      />
    </>
  )
}

export { ResumenProductos }