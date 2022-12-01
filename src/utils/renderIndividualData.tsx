import React from "react";

import { AboutBlock } from "../components/AboutBlock";

import { arrType } from "../@types/arr";

type TestProps<T> = {
	arr: arrType;
	data: T;
};

export function renderIndividualData<T>(props: TestProps<T>) {
	const info = [];

	const { arr, data } = props;

	for (let i = 0; i < arr.length; i++) {
		const key = arr[i].key;
		const title = arr[i].title;
		const type = arr[i].type;
		const linkTo = arr[i]?.linkTo;
		const dataId = arr[i]?.dataId;

		if (typeof key !== "object") {
			if (
				data &&
				Object.prototype.hasOwnProperty.call(data, key) &&
				(type === "string" || type === "price" || type === "date")
			) {
				const text = data[key as keyof typeof data] as string | number;
				info.push(<AboutBlock key={i} title={title} text={text} type={type} />);
			}

			if (data && Object.prototype.hasOwnProperty.call(data, key) && type === "link" && linkTo && dataId) {
				const text = data[key as keyof typeof data] as string | number;
				info.push(
					<AboutBlock
						key={i}
						title={title}
						text={text}
						type={type}
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						linkTo={`${linkTo}${data[dataId as keyof typeof data]}`}
					/>
				);
			}
		} else {
			let finalText = "";

			for (let j = 0; j < key.length; j++) {
				if (data && Object.prototype.hasOwnProperty.call(data, key[j])) {
					const text = data[key[j] as keyof typeof data] as string;
					finalText += ` ${text}`;
				}
			}

			if (data && (type === "string" || type === "price" || type === "date")) {
				info.push(<AboutBlock key={i} title={title} text={finalText} type={type} />);
			}

			if (data && type === "link" && linkTo && dataId) {
				info.push(
					<AboutBlock
						key={i}
						title={title}
						text={finalText}
						type={type}
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						linkTo={`${linkTo}${data[dataId as keyof typeof data]}`}
					/>
				);
			}
		}
	}

	return info;
}
