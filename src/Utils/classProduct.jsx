import { makeid } from './makeId'
import { PRODUCTS } from './constList';

class Producto {
  constructor({
    name,
    id,
    price,
    modifique = [],
    type,
    colorPrimary,
    colorSecondary
  }) {
    this.name = name
    this.id = id
    this.price = price
    this.modifique = modifique
    this.type = type
    this.idInter = makeid(5)
    this.colorPrimary = colorPrimary
    this.colorSecondary = colorSecondary

  }
  anadirModifique(modifique) {
    this.modifique.push(modifique)
  }
  retirarModifique({ name, index, id, idInter }) {
    let indexProducto
    if (name !== undefined) {
      indexProducto = this.modifique.findIndex(producto => producto.name == name)
    }
    if (id !== undefined) {
      indexProducto = this.modifique.findIndex(producto => producto.id == id)
    }
    if (index !== undefined) {
      indexProducto = index
    }
    if (idInter !== undefined) {
      indexProducto = this.modifique.findIndex(producto => producto.idInter == idInter)
    }
    if (indexProducto <= -1) throw `no se encontro ningun prouduc que cumple con las condiciones de busqueda`
    this.modifique.splice(indexProducto, 1)
  }
}

class Hamburguesa extends Producto {
  constructor(props) {
    super(props)
    this.name = PRODUCTS.Hamburguesa
    this.id = `2`
    this.type = 'product'
    this.price = 16000
  }
}
class Combo extends Producto {
  constructor(props) {
    super(props)
    this.name = PRODUCTS.Combo
    this.id = `1`
    this.type = 'product'
    this.price = 19500
  }
}
export {
  Producto,
  Hamburguesa,
  Combo,
}