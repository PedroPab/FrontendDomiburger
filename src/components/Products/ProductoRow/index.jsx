import { AdditionSelector } from '../../AdditionSelector';
import formatearNumeroConPuntos from './../../../Utils/formatearNumeroConPuntos';

const ProductoRow = ({ producto, adiciones, onClicAdicion, onChangeSelectAdicion }) => {
	// Define las funciones onChangeSelectAdicion y onClicAdicion aquí

	let totalProducto = producto.price;
	producto?.modifique.forEach(element => {
		totalProducto += element.price;
	});

	return (
		<tr>
			<td>
				<small>
					{producto.name}
					<div>
						{producto?.modifique && producto.modifique.map(modifique => {

							return (
								<span
									className='badge'
									style={{ backgroundColor: modifique.colorPrimary }}
									key={modifique.idInter}
									onClick={() => onClicAdicion(modifique.idInter, producto.idInter)}
								>
									{modifique.code ? `CODE ${modifique.code} ` : ''}{modifique.name}
								</span>
							)
						})}
					</div>
				</small>
			</td>
			<td>
				{
					producto?.applyModifications &&
					<AdditionSelector
						producto={producto}
						onChangeSelect={onChangeSelectAdicion}
						adiciones={adiciones}
					/>
				}
			</td>
			<td>
				<span>{formatearNumeroConPuntos(totalProducto)}</span>
			</td>
		</tr>
	);
};

export default ProductoRow;
