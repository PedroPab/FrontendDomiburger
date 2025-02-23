const ORDER_STATUSES = {
    PENDING_CONFIRMATION: 'pending_confirmation',  // Pendiente de confirmación
    FRESH: 'fresh',  // Pedido recién creado, aún no procesado
    CONFIRMED: 'confirmed',  // Pedido confirmado
    ON_HOLD: 'on_hold',  // Pedido en espera por alguna razón
    CANCELLED: 'cancelled',  // Pedido cancelado por el cliente
    REJECTED: 'rejected',  // Pedido rechazado
    PREPARING: 'preparing',  // En preparación
    READY_FOR_PICKUP: 'ready_for_pickup',  // Listo para ser recogido
    // WAITING: 'Waiting',  // En espera
    DISPATCHED: 'dispatched',  // Despachado (enviado)
    DELIVERED: 'delivered',  // Entregado
    RETURNED: 'returned',  // Pedido devuelto por el cliente
    REFUNDED: 'refunded',  // Pedido reembolsado
    INVOICED: 'invoiced',  // Facturado
    FAILED: 'failed',  // Pedido fallido por algún problema
    DELETED: 'deleted',  // Eliminado
    PENDING_TRANSFER: 'pending_transfer',  // Pendiente de transferencia (pago en proceso)
    UNDEFINED: 'undefined',  // Indefinido
    //programodo: cuando se programa un pedido para el futuro
    CODE_ERROR: 'code_error'  // Error de código
};

const PAYMENT_METHODS = {
    CASH: 'cash',
    CREDIT_CARD: 'credit_card',
    DEBIT_CARD: 'debit_card',
    TRANSFER: 'transfer',
    BANCOLOMBIA: 'bancolombia',
    NEQUI: 'nequi',
}

export {
    ORDER_STATUSES,
    PAYMENT_METHODS,
}