import React, { FC, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Pagination } from "../components/Pagination";

import { useFetch } from "../hooks/useFetch";

import { ProductType, ProsuctsResponse } from "../@types/api";

const Products: FC = () => {
	const [currentPage, setCurrentPage] = useState<number>(parseInt(location.search?.split("=")[1]) || 1);

	const { loading, error, data, request } = useFetch<ProsuctsResponse>(true);

	const columnHelper = createColumnHelper<ProductType>();

	const columns = useMemo(
		() => [
			columnHelper.accessor("ProductName", {
				header: () => "Name",
				cell: (info) => (
					<Link to={`/product/${info.row.original.ProductID}`} className="table__link">
						{info.getValue()}
					</Link>
				),
			}),
			columnHelper.accessor("QuantityPerUnit", {
				header: () => "Qt per unit",
				cell: (info) => info.getValue(),
			}),
			columnHelper.accessor("UnitPrice", {
				header: () => "Price",
				cell: (info) => {
					const price = new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(+info.getValue());

					return price;
				},
			}),
			columnHelper.accessor("UnitsInStock", {
				header: () => "Stock",
				cell: (info) => info.getValue(),
			}),
			columnHelper.accessor("UnitsOnOrder", {
				header: () => "Orders",
				cell: (info) => info.getValue(),
			}),
		],
		[columnHelper]
	);

	const table = useReactTable({
		data: data ? data.products : [],
		columns,
		manualPagination: true,
		pageCount: data ? data.pages : -1,
		getCoreRowModel: getCoreRowModel(),
	});

	useEffect(() => {
		const getSuppliers = async () => {
			await request(`/products?page=${currentPage}`);
		};

		void getSuppliers();
	}, [currentPage, request]);

	if (!data && loading) {
		return <h4>Loadig Products Data</h4>;
	}

	if (error) {
		return <h4>An error has occurred: {error}</h4>;
	}

	return (
		<section className="info">
			<header className="info__header">
				<h2 className="info__title">Products</h2>
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
										<td key={cell.id} className="table__td">
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

export default Products;
