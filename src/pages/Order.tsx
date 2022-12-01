import React, { FC, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { useFetch } from "../hooks/useFetch";

import { renderIndividualData } from "../utils/renderIndividualData";

import { IndividualData } from "../constants";
import { OneOrderType, OrderProductsType } from "../@types/api";

const Order: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { loading, error, data, request } = useFetch<OneOrderType>();

	const columnHelper = createColumnHelper<OrderProductsType>();

	const columns = useMemo(
		() => [
			columnHelper.accessor("ProductName", {
				header: () => "Product",
				cell: (info) => (
					<Link to={`/product/${info.row.original.ProductID}`} className="table__link">
						{info.getValue()}
					</Link>
				),
			}),
			columnHelper.accessor("Quantity", {
				header: () => "Quantity",
				cell: (info) => info.getValue(),
			}),
			columnHelper.accessor("OrderUnitPrice", {
				header: () => "Order Price",
				cell: (info) => {
					const price = new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(+info.getValue());

					return price;
				},
			}),
			columnHelper.accessor("Quantity", {
				header: () => "Total Price",
				cell: (info) => {
					const price = new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(+info.getValue() * +info.row.original.OrderUnitPrice);

					return price;
				},
			}),
			columnHelper.accessor("Discount", {
				header: () => "Discount",
				cell: (info) => `${info.getValue()}%`,
			}),
		],
		[columnHelper]
	);

	const table = useReactTable({
		data: data ? data.products : [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const goBackHandler = () => {
		navigate(-1);
	};

	useEffect(() => {
		const getOrderData = async () => {
			await request(`/order?id=${location.pathname.split("/")[2]}`);
		};

		void getOrderData();
	}, [location, request]);

	if (!data && loading) {
		return <h4>Loadig Order Data</h4>;
	}

	if (error) {
		return <h4>An error has occurred: {error}</h4>;
	}

	return (
		<section className="about">
			<header className="about__header">
				<svg width="24" height="24">
					<use xlinkHref="/icons.svg#info" />
				</svg>
				<h1 className="about__name">Order information</h1>
			</header>
			<div className="about__container">
				{data && renderIndividualData<typeof data.order>({ arr: IndividualData.order, data: data.order })}
			</div>
			<div className="about__table">
				<h2 className="about__subname">Products in Order</h2>
				<div className="about__wrapper">
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
			</div>
			<footer className="about__footer">
				<button type="button" className="about__btn" onClick={goBackHandler}>
					Go back
				</button>
			</footer>
		</section>
	);
};

export default Order;
