const TotalPrice = ({ productOrderList, delivery }) => {
	const totalProductsPrice = productOrderList.reduce((total, product) => {
		const price = product?.price || 0;
		const quantity = product?.quantity || 1;

		const totalComplement = product?.modifique?.reduce((total, complement) => {
			return total + (complement?.price || 0);
		}, 0) || 0;

		return total + (price * quantity) + totalComplement;
	}, 0);

	const finalTotal = totalProductsPrice + (delivery?.price || 0);

	return (
		<div className="p-3 mt-3 border rounded shadow-sm">
			<h5 className="text-center text-primary fw-bold">Total a Pagar</h5>
			<hr className="my-2" />
			<p className="text-center fs-4 fw-semibold">
				${finalTotal.toLocaleString()}
			</p>
			<p className="text-center text-muted">Solo productos : {totalProductsPrice.toLocaleString()}</p>
			<p className="text-center text-muted">Solo delivery : {delivery?.price.toLocaleString()}</p>
			<p className="text-center text-muted">Total productos + delivery : {finalTotal.toLocaleString()}</p>
		</div>
	);
};

export { TotalPrice }