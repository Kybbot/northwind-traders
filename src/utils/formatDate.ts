export const formatDate = (date: string | number) => {
	const convertedToString = String(date);
	const newDate = new Date(convertedToString);

	return `${newDate.getFullYear()}-${newDate.getMonth() < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1}-${
		newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate()
	}`;
};
