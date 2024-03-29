import { ProductoBadge } from "../../ProductoBadge";

const ResumenPedidos = ({ order }) => {
  let productos = resumirProductos(order)

  return (
    <div role="alert" className={`alert ${order.find((e) => e.modifique) ? 'alert-danger' : 'alert-success'}`}>
      {Object.keys(productos).map((key) => {
        return (
          <ProductoBadge
            key={key}
            cantidad={productos[key].cantidad}
            name={productos[key].name}
            colorSecondary={productos[key].colorSecondary}
          />
        )
      })}
    </div>
  );
};

function resumirProductos(order) {
  const productos = {}

  order.forEach((e) => {
    //miramos si hay una gaseoa
    if (e?.modifique) {
      e.modifique.forEach(ee => {
        if (ee.id == '9' || ee.id == '10') {
          const nameModificado = `🍺 ${ee.name}`
          if (productos[ee.id]) {
            productos[ee.id].cantidad += 1
          } else {
            productos[ee.id] = {
              ...ee,
              cantidad: 1,
              name: nameModificado,
            }
          }
        }

      })
    }

    if (productos[e.id]) {
      productos[e.id].cantidad += 1
    } else {
      productos[e.id] = {
        ...e,
        cantidad: 1
      }
    }
  });
  return productos
}


export { ResumenPedidos }
