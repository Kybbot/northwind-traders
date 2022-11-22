import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Suppliers from "./pages/Suppliers";
import Supplier from "./pages/Supplier";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Orders from "./pages/Orders";
import Employees from "./pages/Employees";
import Employee from "./pages/Employee";
import Customers from "./pages/Customers";
import Customer from "./pages/Customer";

const App: FC = () => {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route index element={<Home />} />
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="suppliers" element={<Suppliers />} />
				<Route path="supplier/:id" element={<Supplier />} />
				<Route path="products" element={<Products />} />
				<Route path="product/:id" element={<Product />} />
				<Route path="orders" element={<Orders />} />
				<Route path="employees" element={<Employees />} />
				<Route path="employee/:id" element={<Employee />} />
				<Route path="customers" element={<Customers />} />
				<Route path="customer/:id" element={<Customer />} />
			</Route>
		</Routes>
	);
};

export default App;
