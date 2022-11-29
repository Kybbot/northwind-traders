export type SupplierType = {
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
	suppliers: SupplierType[];
};

export interface ProductType {
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
}

export interface OneProductType extends ProductType {
	SupplierName: string;
}

export type ProsuctsResponse = {
	items: number;
	page: number;
	pages: number;
	hasNextPage: boolean;
	products: ProductType[];
};

export type OrderType = {
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

export type OneOrderType = {
	order: {
		ShipViaCompanyName: string;
		TotalProductsDiscount: number;
		TotalProductsPrice: number;
		TotalProductsItems: number;
		TotalProducts: number;
		OrderID: string;
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
		ProductID: string;
	};
	products: {
		OrderID: string;
		Quantity: string;
		OrderUnitPrice: string;
		Discount: string;
		ProductID: string;
		ProductName: string;
		SupplierID: string;
		CategoryID: string;
		QuantityPerUnit: string;
		ProductUnitPrice: string;
		UnitsInStock: string;
		UnitsOnOrder: string;
		ReorderLevel: string;
		Discontinued: string;
	}[];
};

export type OrderProductsType = {
	OrderID: string;
	Quantity: string;
	OrderUnitPrice: string;
	Discount: string;
	ProductID: string;
	ProductName: string;
	SupplierID: string;
	CategoryID: string;
	QuantityPerUnit: string;
	ProductUnitPrice: string;
	UnitsInStock: string;
	UnitsOnOrder: string;
	ReorderLevel: string;
	Discontinued: string;
};

export type OrdersResponse = {
	items: number;
	page: number;
	pages: number;
	hasNextPage: boolean;
	orders: OrderType[];
};

export interface EmployeeType {
	EmployeeID: string;
	LastName: string;
	FirstName: string;
	Title: string;
	TitleOfCourtesy: string;
	BirthDate: string;
	HireDate: string;
	Address: string;
	City: string;
	Region: string;
	PostalCode: string;
	Country: string;
	HomePhone: string;
	Extension: string;
	Notes: string;
	ReportsTo: string;
}

export interface OneEmployeeType extends EmployeeType {
	ReportId: string;
	ReportFirstName: string;
	ReportLastName: string;
}

export type EmployeesResponse = {
	items: number;
	page: number;
	pages: number;
	hasNextPage: boolean;
	orders: EmployeeType[];
};

export type CustomerType = {
	id: number;
	CustomerID: string;
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
};

export type CustomerssResponse = {
	items: number;
	page: number;
	pages: number;
	hasNextPage: boolean;
	suppliers: CustomerType[];
};

export type DashboardResponse = {
	geoData: {
		ip_address: string;
		city: string;
		city_geoname_id: number;
		region: string;
		region_iso_code: string;
		region_geoname_id: number;
		postal_code: string;
		country: string;
		country_code: string;
		country_geoname_id: number;
		country_is_eu: false;
		continent: string;
		continent_code: string;
		continent_geoname_id: number;
		longitude: number;
		latitude: number;
		security: { is_vpn: false };
		timezone: { name: string; abbreviation: string; gmt_offset: number; current_time: string; is_dst: false };
		flag: { emoji: string; unicode: string; png: string; svg: string };
		currency: { currency_name: string; currency_code: string };
		connection: {
			autonomous_system_number: number;
			autonomous_system_organization: string;
			connection_type: string;
			isp_name: string;
			organization_name: string;
		};
	};
	query_count: number;
	select: number;
	select_where: number;
	select_left: number;
	result_count: number;
	logs: {
		id: number;
		result_count: string;
		type: string;
		date: string;
		database_name: string;
		time_passed: string;
		query: string;
	}[];
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
