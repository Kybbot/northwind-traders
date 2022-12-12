import React, { FC, useEffect, useState } from "react";

import { Pagination } from "../components/Pagination";

import { useFetch } from "../hooks/useFetch";

import { renderTable } from "../utils/renderTable";

import { TableData } from "../constants";
import { EmployeeType, EmployeesResponse } from "../@types/api";

const Employees: FC = () => {
	const [currentPage, setCurrentPage] = useState<number>(parseInt(location.search?.split("=")[1]) || 1);

	const { loading, error, data, request } = useFetch<EmployeesResponse>(true);

	useEffect(() => {
		const getSuppliers = async () => {
			await request(`/employees?page=${currentPage}`);
		};

		void getSuppliers();
	}, [currentPage, request]);

	if (!data && loading) {
		return <h4>Loadig Employees Data</h4>;
	}

	if (error) {
		return <h4>An error has occurred: {error}</h4>;
	}

	return (
		<section className="info">
			<header className="info__header">
				<h2 className="info__title">Employees</h2>
				<svg width="24" height="24">
					<use xlinkHref="/icons.svg#arrow-right" />
				</svg>
			</header>
			<div className="info__main">
				<div className="info__wrapper">
					{data && renderTable<EmployeeType>({ arr: TableData.employes, data: data.orders })}
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

export default Employees;
