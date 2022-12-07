import React, { FC } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";

import { formatDate } from "../utils/formatDate";

type SimpleAboutBlock = {
	type: "string";
};

type LinkAboutBlock = {
	type: "link";
	linkTo: string;
};

type PriceAboutBlock = {
	type: "price";
};

type DateAboutBlock = {
	type: "date";
};

type AboutBlockProps = {
	title: string;
	text: string | number;
	linkTo?: string;
} & (SimpleAboutBlock | LinkAboutBlock | PriceAboutBlock | DateAboutBlock);

export const AboutBlock: FC<AboutBlockProps> = ({ title, text, type, linkTo }) => {
	return (
		<div>
			<h2 className="about__title">{title}</h2>
			{type === "string" && <p className="about__text">{text}</p>}
			{type === "link" && (
				<p className="about__text">
					<Link className="about__link" to={linkTo}>
						{text}
					</Link>
				</p>
			)}
			{type === "price" && <p className="about__text">{formatCurrency(text)}</p>}
			{type === "date" && <p className="about__text">{formatDate(text)}</p>}
		</div>
	);
};
