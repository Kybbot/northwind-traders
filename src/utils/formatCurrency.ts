export const formatCurrency = (price: string | number) => {
	const convertedToNumber = Number(price);
	const result = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(convertedToNumber);

	return result;
};
