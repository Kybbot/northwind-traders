import React, { FC } from "react";
import { Link } from "react-router-dom";

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

type AboutBlockProps = {
	title: string;
	text: string;
	linkTo?: string;
} & (SimpleAboutBlock | LinkAboutBlock | PriceAboutBlock);

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
			{type === "price" && (
				<p className="about__text">
					{new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(+text)}
				</p>
			)}
		</div>
	);
};
