import React, { FC, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { AboutBlock } from "../components/AboutBlock";

import { useFetch } from "../hooks/useFetch";

import { OneOrderType, OrderProductsType } from "../@types/api";
import { arrType } from "../@types/arr";

const arr: arrType = [
	{ key: "CustomerID", title: "Customer ID", type: "link" },
	{ key: "OrderDate", title: "Order Date", type: "date" },
	{ key: "ShipName", title: "Ship Name", type: "string" },
	{ key: "RequiredDate", title: "Required Date", type: "date" },
	{ key: "TotalProducts", title: "Total Products", type: "string" },
	{ key: "ShippedDate", title: "Shipped Date", type: "date" },
	{ key: "TotalProductsItems", title: "Total Products Items", type: "string" },
	{ key: "ShipCity", title: "Ship City", type: "string" },
	{ key: "TotalProductsPrice", title: "Total Products Price", type: "price" },
	{ key: "ShipRegion", title: "Ship Region", type: "string" },
	{ key: "TotalProductsDiscount", title: "Total Products Discount", type: "price" },
	{ key: "ShipPostalCode", title: "Ship Postal Code", type: "string" },
	{ key: "ShipVia", title: "Ship Via", type: "string" },
	{ key: "ShipCountry", title: "Ship Country", type: "string" },
	{ key: "Freight", title: "Freight", type: "price" },
];

const Order: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { loading, error, data, request } = useFetch<OneOrderType>();

	const renderData = () => {
		const info = [];

		for (let i = 0; i < arr.length; i++) {
			const key = arr[i].key;
			const title = arr[i].title;
			const type = arr[i].type;

			if (typeof key !== "object") {
				if (
					data &&
					Object.prototype.hasOwnProperty.call(data.order, key) &&
					(type === "string" || type === "price" || type === "date")
				) {
					info.push(<AboutBlock key={i} title={title} text={data.order[key as keyof typeof data.order]} type={type} />);
				}

				if (data && Object.prototype.hasOwnProperty.call(data.order, key) && type === "link") {
					info.push(
						<AboutBlock
							key={i}
							title={title}
							text={data.order[key as keyof typeof data.order].toString()}
							type={type}
							linkTo={`/customer/${data.order.CustomerID}`}
						/>
					);
				}
			} else {
				let text = "";

				for (let j = 0; j < key.length; j++) {
					if (data && Object.prototype.hasOwnProperty.call(data.order, key[j])) {
						text += ` ${data.order[key[j] as keyof typeof data.order]}`;
					}
				}

				if (data && (type === "string" || type === "price")) {
					info.push(<AboutBlock key={i} title={title} text={text} type={type} />);
				}
			}
		}

		return info;
	};

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
			<div className="about__container">{renderData()}</div>
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
