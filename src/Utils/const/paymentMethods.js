const PAYMENT_METHODS = {
	CASH: { value: 'cash', name: 'Efectivo', active: true, color: '#347fb1' },
	CREDIT_CARD: { value: 'credit_card', name: 'Credit Card', active: false, color: '#1E90FF' },
	DEBIT_CARD: { value: 'debit_card', name: 'Debit Card', active: false, color: '#32CD32' },
	TRANSFER: { value: 'transfer', name: 'Transfer', active: false, color: '#FF4500' },
	BANCOLOMBIA: { value: 'bancolombia', name: 'Bancolombia', active: true, color: '#a5860a' },
	NEQUI: { value: 'nequi', name: 'Nequi', active: true, color: '#638d01' },
}

export { PAYMENT_METHODS }