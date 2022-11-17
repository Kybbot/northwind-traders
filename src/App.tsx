import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Suppliers from "./pages/Suppliers";

const App: FC = () => {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route index element={<Home />} />
				<Route path="suppliers" element={<Suppliers />} />
				<Route path="products" element={<Products />} />
			</Route>
		</Routes>
	);
};

export default App;
