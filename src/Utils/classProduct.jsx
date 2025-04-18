import { makeId } from './makeId'
import { PRODUCTS } from './constList';

class Producto {
	constructor({
		name,
		id,
		price,
		modifique = [],
		type,
		colorPrimary,
		colorSecondary,
		code,
		applyModifications = true,
	}) {
		this.name = name
		this.id = id
		this.price = price
		this.modifique = modifique
		this.type = type
		this.idInter = makeId(5)
		this.colorPrimary = colorPrimary
		this.colorSecondary = colorSecondary
		code ? this.code = code : null
		this.applyModifications = applyModifications
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

class Adiciones {
	constructor({
		name = 'sin nombre',
		id = null,
		price = 0,
		colorPrimary = '#045701',
		colorSecondary = '#050158',
		code = null,
		description = '',
		idCodigo = null,
		imagen = null,
		type = 'complement',

	}) {
		this.name = name
		this.id = id
		this.price = price
		this.colorPrimary = colorPrimary || '#045701'
		this.colorSecondary = colorSecondary || '#050158'
		this.idInter = makeId(5)
		code ? this.code = code : null
		this.description = description
		idCodigo ? this.idCodigo = idCodigo : null
		this.imagen = imagen
		this.type = type
	}
}

class Hamburguesa extends Producto {
	constructor(props) {
		super(props)
		this.name = PRODUCTS.Hamburguesa
		this.id = `2`
		this.type = 'product'
		this.price = 18900
	}
}
class Combo extends Producto {
	constructor(props) {
		super(props)
		this.name = PRODUCTS.Combo
		this.id = `1`
		this.type = 'product'
		this.price = 22900
	}
}

class SalsaDeAjo extends Producto {
	constructor(props) {
		super({ ...props, applyModifications: true })
		this.name = PRODUCTS.SalsaDeAjo
		this.id = `38`
		this.type = `product`
		this.price = 25000
	}
}
export {
	Producto,
	Hamburguesa,
	Combo,
	SalsaDeAjo,
	Adiciones
}