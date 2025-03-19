import { OrderRow } from "./OrderRow"
import { FaRegSadCry } from "react-icons/fa"

const OrdersRowsContainer = ({ listOrders }) => {
	console.log("🚀 ~ OrdersRowsContainer ~ listOrders:", listOrders)

	return (
		<>
			{listOrders && listOrders.length > 0 ? (
				listOrders.map((order, index) => {
					return (
						<OrderRow key={index} order={order} />
					)
				})
			) : (
				<div style={{ textAlign: 'center', marginTop: '20px' }}>
					<FaRegSadCry size={50} />
					<p>Sin órdenes</p>
				</div>
			)}
		</>
	)
}

export { OrdersRowsContainer }