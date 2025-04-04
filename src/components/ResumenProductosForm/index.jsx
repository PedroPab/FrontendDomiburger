import { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import ProductoRow from './../../components//Products/ProductoRow'; // Nuevo componente
import formatearNumeroConPuntos from '../../Utils/formatearNumeroConPuntos';
import { Adiciones } from '../../Utils/classProduct';
import { ProductsService } from '../../apis/clientV2/ProductsService';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';

const ResumenProductosForm = ({ listaProducto, setListaProducto, domicilio, addressPrice, isAdmin = false }) => {
	const [dataDomicilio] = domicilio
	const [precioDeliveryManual, setPrecioDeliveryManual] = addressPrice
	const [adiciones, setAdiciones] = useState([]);

	const token = useAuth();
	const productsService = new ProductsService(token);
	useEffect(() => {
		const findProducts = async () => {
			try {
				const response = await productsService.getAll();
				let data = response.body;
				//filtramos solo las adiciones
				data = data.filter(e => e.type === 'complement');

				setAdiciones(data);
			} catch (error) {
				console.error(error);
				toast.error('Error obteniendo las adiciones.');
			}
		};

		findProducts()
	}, []);



	const onChangeSelectAdicion = (idAdicion, idProducto) => {
		const indexAdicion = adiciones.findIndex(e => e.id == idAdicion);

		const dataAdicion = new Adiciones(adiciones[indexAdicion]);
		// dataAdicion.idInter = makeId();
		const indexProducto = listaProducto.findIndex(e => e.idInter == idProducto);
		const dataProducto = listaProducto[indexProducto];
		dataProducto.anadirModifique(dataAdicion);
		const newData = [...listaProducto];
		newData[indexProducto] = dataProducto;
		setListaProducto(newData);

	};

	const onClicAdicion = (idInterAdicion, idInterProducto) => {
		const indexProducto = listaProducto.findIndex(e => e.idInter == idInterProducto);
		const dataProducto = listaProducto[indexProducto];
		dataProducto.retirarModifique({ idInter: idInterAdicion });
		const newData = [...listaProducto];
		newData[indexProducto] = dataProducto;
		setListaProducto(newData);
	};

	const totalProductos = () => {
		let total = 0;
		if (listaProducto) {
			listaProducto.forEach(producto => {
				let totalProducto = producto.price;
				producto?.modifique.forEach(element => {
					totalProducto += element.price;
				});
				total += totalProducto;
			});
		}

		if (typeof (precioDeliveryManual) === 'number') {
			total += precioDeliveryManual
		} else if (dataDomicilio.price >= 0) {
			total += dataDomicilio.price;
		}

		return total;
	};



	return (
		<Card.Body>
			<Card.Title style={{ fontSize: '20px' }}>RESUMEN DE PEDIDO</Card.Title>
			<div id="totalResumido">
				<Table striped>
					<thead>
						<tr>
							<th>PRODUCTOS</th>
							<th>MAS...</th>
							<th>PRECIO</th>
						</tr>
					</thead>
					<tbody>
						{listaProducto && listaProducto.map((producto, index) => (
							<ProductoRow
								key={index}
								producto={producto}
								adiciones={adiciones}
								setListaProducto={setListaProducto}
								onChangeSelectAdicion={onChangeSelectAdicion}
								onClicAdicion={onClicAdicion}
							/>
						))}
						{
							dataDomicilio &&
							dataDomicilio.timeText &&
							<tr>
								<th>Domicilio</th>
								<th>{dataDomicilio.timeText}</th>
								<th>
									{isAdmin ? (
										<>
											<input
												type="number"
												min="0"
												step="500"
												value={precioDeliveryManual ?? dataDomicilio.price}
												onChange={(e) => {
													setPrecioDeliveryManual(parseInt(e.target.value) ?? 0);
												}}
												className="form-control form-control-sm text-center"
												style={{ width: '100px', display: 'inline-block' }}
											/>
											<button
												className="btn btn-sm btn-primary"
												onClick={() => {
													setPrecioDeliveryManual(null)
												}}
											>
												Reset
											</button>
										</>
									) : (
										<span>{formatearNumeroConPuntos(precioDeliveryManual ?? dataDomicilio.price)}</span>
									)}
								</th>
							</tr>
						}
					</tbody>
					<tfoot>
						<tr>
							<th colSpan="2">TOTAL</th>
							<th>{formatearNumeroConPuntos(totalProductos())}</th>
						</tr>
					</tfoot>
				</Table>
			</div>
		</Card.Body>

	);
};

export default ResumenProductosForm;
