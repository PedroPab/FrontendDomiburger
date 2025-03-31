import { FaExclamationCircle, FaCheckCircle, FaClock, FaTruck, FaBoxOpen, FaClipboardCheck, FaExchangeAlt, FaBug } from "react-icons/fa"
import { ORDER_STATUSES } from "./const/status"

const statusOrderCol = {}

statusOrderCol[ORDER_STATUSES.PENDING_CONFIRMATION] = {
	color: '#FF8C00', // Pendiente de confirmación: Dark Orange
	label: 'Pendiente de confirmación',
	textNextStatus: 'A Recientes',
	name: ORDER_STATUSES.PENDING_CONFIRMATION,
	icon: <FaExclamationCircle />
}

statusOrderCol[ORDER_STATUSES.FRESH] = {
	color: '#00BFFF', // Recién creado: Deep Sky Blue
	label: 'Recién creado',
	textNextStatus: 'Preparar',
	name: ORDER_STATUSES.FRESH,
	icon: <FaExclamationCircle />
}

statusOrderCol[ORDER_STATUSES.CONFIRMED] = {
	color: '#228B22', // Confirmado: Forest Green
	label: 'Confirmado',
	textNextStatus: 'En espera',
	name: ORDER_STATUSES.CONFIRMED,
	icon: <FaCheckCircle />
}

statusOrderCol[ORDER_STATUSES.ON_HOLD] = {
	color: '#808080', // En espera: Gray
	label: 'En espera',
	textNextStatus: 'A espera',
	name: ORDER_STATUSES.ON_HOLD,
	icon: <FaClock />
}

statusOrderCol[ORDER_STATUSES.PREPARING] = {
	color: '#8A2BE2', // Preparando: Blue Violet
	label: 'Preparando',
	textNextStatus: 'Creado',
	name: ORDER_STATUSES.PREPARING,
	icon: <FaBoxOpen />
}

statusOrderCol[ORDER_STATUSES.READY_FOR_PICKUP] = {
	color: '#FF69B4', // Listo para recoger: Hot Pink
	label: 'Listo para recoger',
	textNextStatus: 'Despachar',
	name: ORDER_STATUSES.READY_FOR_PICKUP,
	icon: <FaClipboardCheck />
}

statusOrderCol[ORDER_STATUSES.DISPATCHED] = {
	color: '#D2691E', // Despachado: Chocolate
	label: 'Despachado',
	textNextStatus: 'Entregado',
	name: ORDER_STATUSES.DISPATCHED,
	icon: <FaTruck />
}

statusOrderCol[ORDER_STATUSES.DELIVERED] = {
	color: '#008080', // Entregado: Teal
	label: 'Entregado',
	textNextStatus: 'Facturar',
	name: ORDER_STATUSES.DELIVERED,
	icon: <FaCheckCircle />
}

statusOrderCol[ORDER_STATUSES.PENDING_PAYMENT] = {
	color: '#800000', // Pendiente de transferencia: Maroon
	label: 'Pendiente de transferencia',
	textNextStatus: 'Facturar',
	name: ORDER_STATUSES.PENDING_PAYMENT,
	icon: <FaExchangeAlt />
}

statusOrderCol[ORDER_STATUSES.CODE_ERROR] = {
	color: '#FF0000', // Error de código: Red
	label: 'Error de código',
	name: ORDER_STATUSES.CODE_ERROR,
	icon: <FaBug />
}

statusOrderCol[ORDER_STATUSES.DELETED] = {
	color: '#000000', // Eliminado: Black
	label: 'Eliminado',
	name: ORDER_STATUSES.DELETED,
	icon: <FaBug />
}

const listStatusRecepcion = [
	// statusOrderCol[ORDER_STATUSES.PENDING_CONFIRMATION],
	statusOrderCol[ORDER_STATUSES.FRESH],
	// statusOrderCol[ORDER_STATUSES.CONFIRMED],
	// statusOrderCol[ORDER_STATUSES.ON_HOLD],
	statusOrderCol[ORDER_STATUSES.PREPARING],
	statusOrderCol[ORDER_STATUSES.READY_FOR_PICKUP],
	statusOrderCol[ORDER_STATUSES.DISPATCHED],
	statusOrderCol[ORDER_STATUSES.DELIVERED],
	statusOrderCol[ORDER_STATUSES.PENDING_PAYMENT],
	// statusOrderCol[ORDER_STATUSES.CODE_ERROR]
]

export {
	statusOrderCol,
	listStatusRecepcion
}
