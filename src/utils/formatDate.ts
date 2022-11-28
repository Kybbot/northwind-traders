export const formatDate = (date: string) => {
	const newDate = new Date(date);

	return `${newDate.getFullYear()}-${newDate.getMonth() < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1}-${
		newDate.getDay() < 10 ? `0${newDate.getDay() + 1}` : newDate.getDay() + 1
	}`;
};
