import React, { FC, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Pagination } from "../components/Pagination";

import { useFetch } from "../hooks/useFetch";

import { SupplierType, SuppliersResponse } from "../@types/api";

const Suppliers: FC = () => {
	const [currentPage, setCurrentPage] = useState<number>(parseInt(location.search?.split("=")[1]) || 1);

	const { loading, error, data, request } = useFetch<SuppliersResponse>(true);

	const columnHelper = createColumnHelper<SupplierType>();

	const columns = useMemo(
		() => [
			columnHelper.accessor("ContactName", {
				id: "Image",
				header: () => null,
				cell: (info) => (
					<div className="table__avatar">
						<img
							src={`https://avatars.dicebear.com/api/initials/${info.getValue()}.svg?radius=50`}
							alt={info.getValue()}
						/>
					</div>
				),
			}),
			columnHelper.accessor("CompanyName", {
				header: () => "Company",
				cell: (info) => (
					<Link to={`/supplier/${info.row.original.SupplierID}`} className="table__link">
						{info.getValue()}
					</Link>
				),
			}),
			columnHelper.accessor("ContactName", {
				id: "ContactName",
				header: () => "Contact",
				cell: (info) => info.getValue(),
			}),
			columnHelper.accessor("ContactTitle", {
				header: () => "Title",
				cell: (info) => info.getValue(),
			}),
			columnHelper.accessor("City", {
				header: () => "City",
				cell: (info) => info.getValue(),
			}),
			columnHelper.accessor("Country", {
				header: () => "Country",
				cell: (info) => info.getValue(),
			}),
		],
		[columnHelper]
	);

	const table = useReactTable({
		data: data ? data.suppliers : [],
		columns,
		manualPagination: true,
		pageCount: data ? data.pages : -1,
		getCoreRowModel: getCoreRowModel(),
	});

	useEffect(() => {
		const getSuppliers = async () => {
			await request(`/suppliers?page=${currentPage}`);
		};

		void getSuppliers();
	}, [currentPage, request]);

	if (!data && loading) {
		return <h4>Loadig Suppliers Data</h4>;
	}

	if (error) {
		return <h4>An error has occurred: {error}</h4>;
	}

	return (
		<section className="info">
			<header className="info__header">
				<h2 className="info__title">Suppliers</h2>
				<svg width="24" height="24">
					<use xlinkHref="/icons.svg#arrow-right" />
				</svg>
			</header>
			<div className="info__main">
				<div className="info__wrapper">
					<table className="table">
						<thead>
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<th key={header.id} className="table__th">
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody>
							{table.getRowModel().rows.map((row) => (
								<tr key={row.id} className="table__tr">
									{row.getVisibleCells().map((cell) => (
										<td key={cell.id} className={`table__td ${cell.column.id === "Image" ? "table__img" : ""}`}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
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

export default Suppliers;
