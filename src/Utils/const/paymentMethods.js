const PAYMENT_METHODS = {
  CASH: { value: 'cash', name: 'Efectivo', active: true },
  CREDIT_CARD: { value: 'credit_card', name: 'Credit Card', active: false },
  DEBIT_CARD: { value: 'debit_card', name: 'Debit Card', active: false },
  TRANSFER: { value: 'transfer', name: 'Transfer', active: false },
  BANCOLOMBIA: { value: 'bancolombia', name: 'Bancolombia', active: true },
  NEQUI: { value: 'nequi', name: 'Nequi', active: true },
}

export { PAYMENT_METHODS }