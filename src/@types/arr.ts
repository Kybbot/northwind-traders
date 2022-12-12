export type infoType = {
	key: string | string[];
	title: string;
	type: "string" | "link" | "price" | "date";
	linkTo?: string;
	dataId?: string;
}[];

export type tableData = {
	key: string | string[];
	safetyKey?: string;
	id: string;
	header: string;
	type: "string" | "link" | "price" | "date" | "img";
	linkTo?: string;
	dataId?: string;
	multiply?: string;
}[];
