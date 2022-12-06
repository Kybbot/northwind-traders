import React, { useMemo } from "react";
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";

type RenderTableProps<T> = {
	data: T[];
};

const arr = [
	{ key: "ContactName", id: "Image", header: null, type: "img" },
	{
		key: "CompanyName",
		id: "CompanyName",
		header: "Company",
		type: "link",
		linkTo: "/supplier/",
		linkId: "SupplierID",
	},
	{ key: "ContactName", id: "ContactName", header: "Contact", type: "string" },
	{ key: "ContactTitle", id: "ContactTitle", header: "Title", type: "string" },
	{ key: "City", id: "City", header: "City", type: "string" },
	{ key: "Country", id: "Country", header: "Country", type: "string" },
];

export function RenderTable<T>(props: RenderTableProps<T>) {
	const { data } = props;

	const columnHelper = createColumnHelper<typeof data[0]>();

	const result = [];

	for (let i = 0; i < arr.length; i++) {
		const key = arr[i].key;
		const id = arr[i].id;
		const header = arr[i].header;
		const type = arr[i].type;
		const linkTo = arr[i]?.linkTo;
		const linkId = arr[i]?.linkId;

			if (
				type === "string"
			) {
				result.push(columnHelper.accessor(key, {
					id,
					header: () => header,
					cell: (info) => info.getValue(),
				}));
			}

			if (data && Object.prototype.hasOwnProperty.call(data, key) && type === "link" && linkTo && linkId) {
				const text = data[key as keyof typeof data] as string | number;
				result.push(

				);
			}


	const columns = useMemo(
		() => [
			columnHelper.accessor("ContactName", {
				id: "Image",
				header: () => null,
				cell: (info) => (
					<div className="table__avatar">
						<img
							src={`https://avatars.dicebear.com/v2/initials/${info.getValue()}.svg?radius=50`}
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
		data: data ? data : [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});
}
