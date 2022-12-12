export const chooseText = (a: string | number, b: string | number) => {
	if (typeof a === "string" && a.length < 1) return b;
	if (a === "null" || a === undefined) return b;

	return a;
};
