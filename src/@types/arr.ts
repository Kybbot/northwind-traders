export type arrType = {
	key: string | string[];
	title: string;
	type: "string" | "link" | "price" | "date";
	linkTo?: string;
	dataId?: string;
}[];
