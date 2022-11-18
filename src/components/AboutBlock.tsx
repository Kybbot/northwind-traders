import React, { FC } from "react";

type AboutBlockProps = {
	title: string;
	text: string;
};

export const AboutBlock: FC<AboutBlockProps> = ({ title, text }) => {
	return (
		<div>
			<h2 className="about__title">{title}</h2>
			<p className="about__text">{text}</p>
		</div>
	);
};
