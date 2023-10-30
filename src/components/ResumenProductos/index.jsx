import { ResumenPedidos } from '../ResumenPedidos';

const ResumenProductos = ({ listProducts }) => {
  // const rta = crearSpanProductos(listProducts)

  return (
    <>
      <ResumenPedidos
        order={listProducts}
      />
    </>
  )
}

// function crearSpanProductos(order) {
//   const productos = resumirProductos(order)

//   const colorBadge = {
//     gris: "bg-secondary",
//     verde: "bg-success",
//     amarillo: "tarjeta-color",
//     azulClaro: "bg-info",
//     rojo: "bg-danger",
//     grisClaro: "bg-light",
//     grisOscuro: "bg-dark",
//     azulOscuro: "bg-primary",

//   }

//   const listColorProducts = {
//     'Combo': "tarjeta-color",
//     'Hamburguesa': "bg-info",
//     'Domicilio': "bg-light",
//   }

//   let div = ''
//   for (const key in productos) {
//     let element = productos[key];

//     const colorProducto = element?.colorSecondary || '#3F3F40'

//     div += `
// 		<span style="background-color: ${colorProducto}"
// 			class="badge rounded-pill">
// 			 	<big >
// 					${element.cantidad}
// 				</big>
// 			${element.name}
// 		</span>`
//   }

//   let alertDivClass = 'alert-success'
//   //modificaomos la patre del la liasta de los productos si son de espcificacioens
//   if (order.find(e => e.modifique)) alertDivClass = `alert-danger`
//   div = `
// 	<div role="alert"  class="alert ${alertDivClass}">
// 		${div}
// 	</div>
// 	`



//   let ul = '<ul class="list-group">'
//   order.forEach(element => {
//     // console.log("🚀 ~ file: generarTargetasV2.js:203 ~ crearSpanProductos ~ element:", element)
//     //creamos la lista de las especifiacciones
//     let divEspecificaciones = ''
//     let totalPrecioProducto = element.price
//     for (const key in element.modifique) {
//       const elementModifique = element.modifique[key];

//       divEspecificaciones += `
// 			<span class="badge  rounded-pill" style="background-color: ${elementModifique.colorSecondary}"> 
// 				${elementModifique.name}
// 			</span>
// 			`
//       //sumamos el costo de la adicines
//       totalPrecioProducto += elementModifique.price

//     }

//     //sumamos el costo de los productos

//     ul += `
// 		<li class="list-group-item d-flex justify-content-between">
// 			<spam>${element.name}</spam>
// 			<spam>${divEspecificaciones}</spam>
// 			<spam class="numeroPrecios">${totalPrecioProducto}</spam>
// 		</li>`
//   });

//   ul += `</ul>`

//   return { div, ul }

// }

//resume los pedios 

export { ResumenProductos }