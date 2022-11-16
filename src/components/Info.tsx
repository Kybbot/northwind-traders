import React, { FC, useMemo, useState } from "react";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

type InfoProps = { title: string };

type Supplier = {
	image: string;
	company: string;
	contact: string;
	title: string;
	city: string;
	country: string;
};

const defaultData: Supplier[] = [
	{
		image: "AS",
		company: "First",
		contact: "First c",
		title: "First t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "XD",
		company: "Second",
		contact: "Second c",
		title: "Second t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "ER",
		company: "Third",
		contact: "Third c",
		title: "Third t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "KG",
		company: "4",
		contact: "4 c",
		title: "4 t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "RT",
		company: "5",
		contact: "5 c",
		title: "5 t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "YB",
		company: "6",
		contact: "6 c",
		title: "6 t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "AO",
		company: "7",
		contact: "7 c",
		title: "7 t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "XD",
		company: "8",
		contact: "8 c",
		title: "8 t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "MN",
		company: "9",
		contact: "9 c",
		title: "9 t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "AS",
		company: "First",
		contact: "First c",
		title: "First t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "XD",
		company: "Second",
		contact: "Second c",
		title: "Second t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "ER",
		company: "Third",
		contact: "Third c",
		title: "Third t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "KG",
		company: "4",
		contact: "4 c",
		title: "4 t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "RT",
		company: "5",
		contact: "5 c",
		title: "5 t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "YB",
		company: "6",
		contact: "6 c",
		title: "6 t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "AO",
		company: "7",
		contact: "7 c",
		title: "7 t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "XD",
		company: "8",
		contact: "8 c",
		title: "8 t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "MN",
		company: "9",
		contact: "9 c",
		title: "9 t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "AS",
		company: "First",
		contact: "First c",
		title: "First t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "XD",
		company: "Second",
		contact: "Second c",
		title: "Second t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "ER",
		company: "Third",
		contact: "Third c",
		title: "Third t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "KG",
		company: "4",
		contact: "4 c",
		title: "4 t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "RT",
		company: "5",
		contact: "5 c",
		title: "5 t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "YB",
		company: "6",
		contact: "6 c",
		title: "6 t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "AO",
		company: "7",
		contact: "7 c",
		title: "7 t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "XD",
		company: "8",
		contact: "8 c",
		title: "8 t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "MN",
		company: "9",
		contact: "9 c",
		title: "9 t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "AS",
		company: "First",
		contact: "First c",
		title: "First t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "XD",
		company: "Second",
		contact: "Second c",
		title: "Second t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "ER",
		company: "Third",
		contact: "Third c",
		title: "Third t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "KG",
		company: "4",
		contact: "4 c",
		title: "4 t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "RT",
		company: "5",
		contact: "5 c",
		title: "5 t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "YB",
		company: "6",
		contact: "6 c",
		title: "6 t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "AO",
		company: "7",
		contact: "7 c",
		title: "7 t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "XD",
		company: "8",
		contact: "8 c",
		title: "8 t",
		city: "Dnipto",
		country: "Ukraine",
	},
	{
		image: "MN",
		company: "9",
		contact: "9 c",
		title: "9 t",
		city: "Dnipto",
		country: "Ukraine",
	},
];

export const Info: FC<InfoProps> = ({ title }) => {
	const columnHelper = createColumnHelper<Supplier>();

	const columns = useMemo(
		() => [
			columnHelper.accessor("image", {
				header: () => <span></span>,
				cell: (info) => (
					<div className="table__avatar">
						<img
							src={`https://avatars.dicebear.com/api/initials/${info.getValue()}.svg?radius=50`}
							alt={info.getValue()}
						/>
					</div>
				),
			}),
			columnHelper.accessor("company", {
				header: () => <span>Company</span>,
				cell: (info) => info.getValue(),
			}),
			columnHelper.accessor("contact", {
				header: () => <span>Contact</span>,
				cell: (info) => <span>{info.getValue()}</span>,
			}),
			columnHelper.accessor("title", {
				header: () => <span>Title</span>,
				cell: (info) => <span>{info.getValue()}</span>,
			}),
			columnHelper.accessor("city", {
				header: () => <span>City</span>,
				cell: (info) => <span>{info.getValue()}</span>,
			}),
			columnHelper.accessor("country", {
				header: () => <span>Country</span>,
				cell: (info) => <span>{info.getValue()}</span>,
			}),
		],
		[columnHelper]
	);

	const [data] = useState(() => [...defaultData]);

	const table = useReactTable({
		data,
		columns,
		manualPagination: true,
		pageCount: -1,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<section className="info">
			<header className="info__header">
				<h2 className="info__title">{title}</h2>
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
									<td key={cell.id} className={`table__td ${cell.column.id === "image" ? "table__img" : ""}`}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
};
