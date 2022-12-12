import React from "react";
import { Link } from "react-router-dom";

import { formatCurrency } from "./formatCurrency";
import { formatDate } from "./formatDate";
import { chooseText } from "./chooseText";

import { tableData } from "../@types/arr";

type RenderTableProps<T> = {
	arr: tableData;
	data: T[];
};

export function renderTable<T>(props: RenderTableProps<T>) {
	const tableHeaders = [];
	const tableData = [];

	const { arr, data } = props;

	const headersLabels = arr.map((item, index) => (
		<th key={`${item.id}-${index}`} className="table__th">
			{item.header}
		</th>
	));

	tableHeaders.push(<tr key={"thead"}>{headersLabels}</tr>);

	for (let i = 0; i < data.length; i++) {
		const currentItem = data[i];

		const tds = arr.map((item) => {
			const key = item.key;
			const safetyKey = item.safetyKey;
			const id = item.id;
			const type = item.type;
			const linkTo = item.linkTo;
			const dataId = item.dataId;
			const multiply = item.multiply;

			const textByKey = currentItem[key as keyof typeof currentItem] as string | number;
			const textBySafetyKey = currentItem[safetyKey as keyof typeof currentItem] as string | number;
			const text = chooseText(textByKey, textBySafetyKey);

			const linkId = currentItem[dataId as keyof typeof currentItem] as string;
			const multiplyValue = currentItem[multiply as keyof typeof currentItem] as string | number;

			if (typeof key !== "object") {
				if (type === "string") {
					return (
						<td key={`${id}-${i}`} className="table__td">
							{text}
						</td>
					);
				}

				if (type === "date") {
					return (
						<td key={`${id}-${i}`} className="table__td">
							{formatDate(text)}
						</td>
					);
				}

				if (type === "price") {
					const currency = multiplyValue ? +text * +multiplyValue : text;
					return (
						<td key={`${id}-${i}`} className="table__td">
							{formatCurrency(currency)}
						</td>
					);
				}

				if (type === "link" && linkTo && dataId) {
					return (
						<td key={`${id}-${i}}`} className="table__td">
							<Link to={`${linkTo}${linkId}`} className="table__link">
								{text}
							</Link>
						</td>
					);
				}

				if (type === "img") {
					return (
						<td key={`${id}-${i}`} className="table__td table__img">
							<div className="table__avatar">
								<img src={`https://avatars.dicebear.com/v2/initials/${text}.svg?radius=50`} alt={text.toString()} />
							</div>
						</td>
					);
				}
			} else {
				let finalText = "";
				for (let j = 0; j < key.length; j++) {
					const text = currentItem[key[j] as keyof typeof currentItem] as string;
					finalText += ` ${text}`;
				}

				if (type === "string") {
					return (
						<td key={`${id}-${i}`} className="table__td">
							{finalText}
						</td>
					);
				}

				if (type === "date") {
					return (
						<td key={`${id}-${i}`} className="table__td">
							{formatDate(finalText)}
						</td>
					);
				}

				if (type === "price") {
					const currency = multiplyValue ? +finalText * +multiplyValue : finalText;
					return (
						<td key={`${id}-${i}`} className="table__td">
							{formatCurrency(currency)}
						</td>
					);
				}

				if (type === "link" && linkTo && dataId) {
					return (
						<td key={`${id}-${i}}`} className="table__td">
							<Link to={`${linkTo}${linkId}`} className="table__link">
								{finalText}
							</Link>
						</td>
					);
				}

				if (type === "img") {
					return (
						<td key={`${id}-${i}`} className="table__td table__img">
							<div className="table__avatar">
								<img
									src={`https://avatars.dicebear.com/v2/initials/${finalText}.svg?radius=50`}
									alt={finalText.toString()}
								/>
							</div>
						</td>
					);
				}
			}
		});

		tableData.push(
			<tr className="table__tr" key={i}>
				{tds}
			</tr>
		);
	}

	return (
		<table className="table">
			<thead>{tableHeaders}</thead>
			<tbody>{tableData}</tbody>
		</table>
	);
}
