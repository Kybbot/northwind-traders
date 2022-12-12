import React, { FC, useEffect, useState } from "react";

import { Pagination } from "../components/Pagination";

import { useFetch } from "../hooks/useFetch";

import { renderTable } from "../utils/renderTable";

import { TableData } from "../constants";
import { CustomerType, CustomerssResponse } from "../@types/api";

const Customers: FC = () => {
	const [currentPage, setCurrentPage] = useState<number>(parseInt(location.search?.split("=")[1]) || 1);

	const { loading, error, data, request } = useFetch<CustomerssResponse>(true);

	useEffect(() => {
		const getSuppliers = async () => {
			await request(`/customers?page=${currentPage}`);
		};

		void getSuppliers();
	}, [currentPage, request]);

	if (!data && loading) {
		return <h4>Loadig Customers Data</h4>;
	}

	if (error) {
		return <h4>An error has occurred: {error}</h4>;
	}

	return (
		<section className="info">
			<header className="info__header">
				<h2 className="info__title">Customers</h2>
				<svg width="24" height="24">
					<use xlinkHref="/icons.svg#arrow-right" />
				</svg>
			</header>
			<div className="info__main">
				<div className="info__wrapper">
					{data && renderTable<CustomerType>({ arr: TableData.customers, data: data.suppliers })}
				</div>
				{data && (
					<Pagination
						currentPage={currentPage}
						maxPages={data.pages}
						loading={loading}
						setCurrentPage={setCurrentPage}
					/>
				)}
			</div>
		</section>
	);
};

export default Customers;
