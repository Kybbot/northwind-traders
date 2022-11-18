import React, { FC, useEffect, useMemo, useState } from "react";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Pagination } from "../components/Pagination";

import { useFetch } from "../hooks/useFetch";

import { OrderType, OrdersResponse } from "../@types/api";

const Orders: FC = () => {
	const [currentPage, setCurrentPage] = useState<number>(parseInt(location.search?.split("=")[1]) || 1);

	const { loading, error, data, request } = useFetch<OrdersResponse>(true);

	const columnHelper = createColumnHelper<OrderType>();

	const columns = useMemo(
		() => [
			columnHelper.accessor("OrderId", {
				header: () => "Id",
				cell: (info) => info.getValue(),
			}),
			columnHelper.accessor("TotalProductsPrice", {
				header: () => "Total Price",
				cell: (info) => {
					const price = new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(info.getValue());

					return price;
				},
			}),
			columnHelper.accessor("TotalProducts", {
				header: () => "Products",
				cell: (info) => info.getValue(),
			}),
			columnHelper.accessor("TotalProductsItems", {
				header: () => "Quantity",
				cell: (info) => info.getValue(),
			}),
			columnHelper.accessor("ShippedDate", {
				header: () => "Shipped",
				cell: (info) => {
					const date = new Date(info.getValue());

					return `${date.getFullYear()}-${date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${
						date.getDay() < 10 ? `0${date.getDay() + 1}` : date.getDay() + 1
					}`;
				},
			}),
			columnHelper.accessor("ShipName", {
				header: () => "Ship Name",
				cell: (info) => info.getValue(),
			}),
			columnHelper.accessor("ShipCity", {
				header: () => "City",
				cell: (info) => info.getValue(),
			}),
			columnHelper.accessor("ShipCountry", {
				header: () => "Country",
				cell: (info) => info.getValue(),
			}),
		],
		[columnHelper]
	);

	const table = useReactTable({
		data: data ? data.orders : [],
		columns,
		manualPagination: true,
		pageCount: data ? data.pages : -1,
		getCoreRowModel: getCoreRowModel(),
	});

	useEffect(() => {
		const getSuppliers = async () => {
			await request(`/orders?page=${currentPage}`);
		};

		void getSuppliers();
	}, [currentPage, request]);

	if (!data && loading) {
		return <h4>Loadig Orders Data</h4>;
	}

	if (error) {
		return <h4>An error has occurred: {error}</h4>;
	}

	return (
		<section className="info">
			<header className="info__header">
				<h2 className="info__title">Orders</h2>
				<svg width="24" height="24">
					<use xlinkHref="/icons.svg#arrow-right" />
				</svg>
			</header>
			<div className="info__main">
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
									<td key={cell.id} className="table__td">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
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

export default Orders;
