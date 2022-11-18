import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Suppliers from "./pages/Suppliers";
import Supplier from "./pages/Supplier";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Orders from "./pages/Orders";
import Employees from "./pages/Employees";
import Employee from "./pages/Employee";

const App: FC = () => {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route index element={<Home />} />
				<Route path="suppliers" element={<Suppliers />} />
				<Route path="supplier/:id" element={<Supplier />} />
				<Route path="products" element={<Products />} />
				<Route path="product/:id" element={<Product />} />
				<Route path="orders" element={<Orders />} />
				<Route path="employees" element={<Employees />} />
				<Route path="employee/:id" element={<Employee />} />
			</Route>
		</Routes>
	);
};

export default App;
