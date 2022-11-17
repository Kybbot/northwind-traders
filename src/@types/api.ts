export type Supplier = {
	id: number;
	SupplierID: string;
	CompanyName: string;
	ContactName: string;
	ContactTitle: string;
	Address: string;
	City: string;
	Region: string;
	PostalCode: string;
	Country: string;
	Phone: string;
	Fax: string;
	HomePage: string;
};

export type SuppliersResponse = {
	items: number;
	page: number;
	pages: number;
	hasNextPage: boolean;
	suppliers: Supplier[];
};

export type Prosuct = {
	id: number;
	ProductID: string;
	ProductName: string;
	SupplierID: string;
	CategoryID: string;
	QuantityPerUnit: string;
	UnitPrice: string;
	UnitsInStock: string;
	UnitsOnOrder: string;
	ReorderLevel: string;
	Discontinued: string;
};

export type Order = {
	TotalProductsDiscount: number;
	TotalProductsPrice: number;
	TotalProductsItems: number;
	TotalProducts: number;
	OrderId: string;
	CustomerID: string;
	EmployeeID: string;
	OrderDate: string;
	RequiredDate: string;
	ShippedDate: string;
	ShipVia: string;
	Freight: string;
	ShipName: string;
	ShipAddress: string;
	ShipCity: string;
	ShipRegion: string;
	ShipPostalCode: string;
	ShipCountry: string;
	ProductId: string;
};

export type ApiResult<T> = {
	data: T;
	success: true;
};

export type ApiError = {
	error: {
		message: string;
	};
	success: false;
};

export type ApiResponse<T> = ApiError | ApiResult<T>;
