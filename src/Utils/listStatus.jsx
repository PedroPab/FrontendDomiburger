import { FaExclamationCircle, FaCheckCircle, FaClock, FaTruck, FaBoxOpen, FaClipboardCheck, FaExchangeAlt, FaBug } from "react-icons/fa"
import { ORDER_STATUSES } from "./const/status"

const statusOrderCol = {}

statusOrderCol[ORDER_STATUSES.PENDING_CONFIRMATION] = {
    color: '#FFC107', // warning - amber
    label: 'Pendiente de confirmación',
    name: ORDER_STATUSES.PENDING_CONFIRMATION,
    icon: <FaExclamationCircle />
}

statusOrderCol[ORDER_STATUSES.FRESH] = {
    color: '#17A2B8', // info - teal
    label: 'Recién creado',
    name: ORDER_STATUSES.FRESH,
    icon: <FaExclamationCircle />
}

statusOrderCol[ORDER_STATUSES.CONFIRMED] = {
    color: '#28A745', // success - green
    label: 'Confirmado',
    name: ORDER_STATUSES.CONFIRMED,
    icon: <FaCheckCircle />
}

statusOrderCol[ORDER_STATUSES.ON_HOLD] = {
    color: '#6C757D', // secondary - gray
    label: 'En espera',
    name: ORDER_STATUSES.ON_HOLD,
    icon: <FaClock />
}

statusOrderCol[ORDER_STATUSES.PREPARING] = {
    color: '#007BFF', // primary - blue
    label: 'Preparando',
    name: ORDER_STATUSES.PREPARING,
    icon: <FaBoxOpen />
}

statusOrderCol[ORDER_STATUSES.READY_FOR_PICKUP] = {
    color: '#17A2B8', // info - teal
    label: 'Listo para recoger',
    name: ORDER_STATUSES.READY_FOR_PICKUP,
    icon: <FaClipboardCheck />
}

statusOrderCol[ORDER_STATUSES.DISPATCHED] = {
    color: '#FFC107', // warning - amber
    label: 'Despachado',
    name: ORDER_STATUSES.DISPATCHED,
    icon: <FaTruck />
}

statusOrderCol[ORDER_STATUSES.DELIVERED] = {
    color: '#28A745', // success - green
    label: 'Entregado',
    name: ORDER_STATUSES.DELIVERED,
    icon: <FaCheckCircle />
}

statusOrderCol[ORDER_STATUSES.PENDING_TRANSFER] = {
    color: '#FFC107', // warning - amber
    label: 'Pendiente de transferencia',
    name: ORDER_STATUSES.PENDING_TRANSFER,
    icon: <FaExchangeAlt />
}

statusOrderCol[ORDER_STATUSES.CODE_ERROR] = {
    color: '#DC3545', // danger - red
    label: 'Error de código',
    name: ORDER_STATUSES.CODE_ERROR,
    icon: <FaBug />
}

const listStatusRecepcion = [
    statusOrderCol[ORDER_STATUSES.PENDING_CONFIRMATION],
    statusOrderCol[ORDER_STATUSES.FRESH],
    statusOrderCol[ORDER_STATUSES.CONFIRMED],
    statusOrderCol[ORDER_STATUSES.ON_HOLD],
    statusOrderCol[ORDER_STATUSES.PREPARING],
    statusOrderCol[ORDER_STATUSES.READY_FOR_PICKUP],
    statusOrderCol[ORDER_STATUSES.DISPATCHED],
    statusOrderCol[ORDER_STATUSES.DELIVERED],
    statusOrderCol[ORDER_STATUSES.PENDING_TRANSFER],
    statusOrderCol[ORDER_STATUSES.CODE_ERROR]
]

export {
    statusOrderCol,
    listStatusRecepcion
}

// [
// 	ORDER_STATUSES.PENDING_CONFIRMATION,
// 	ORDER_STATUSES.FRESH,
// 	ORDER_STATUSES.CONFIRMED,
// 	ORDER_STATUSES.ON_HOLD,
// 	ORDER_STATUSES.PREPARING,
// 	ORDER_STATUSES.READY_FOR_PICKUP,
// 	ORDER_STATUSES.DISPATCHED,
// 	ORDER_STATUSES.DELIVERED,
// 	// ORDER_STATUSES.INVOICED,
// 	ORDER_STATUSES.PENDING_TRANSFER,
// 	ORDER_STATUSES.CODE_ERROR
// ]
