// hooks/useCashPaymentCalculation.js
export const useCashPaymentCalculation = (totalPrice, unit = 50000) => {
	// Calcula el billete sugerido como el siguiente múltiplo de "unit" (por defecto 50.000)
	const billAmount = Math.ceil(totalPrice / unit) * unit;
	// Calcula el cambio a devolver (asegurando que sea al menos 0)
	const changeAmount = billAmount >= totalPrice ? billAmount - totalPrice : 0;
	return { billAmount, changeAmount };
};
