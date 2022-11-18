import React, { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AboutBlock } from "../components/AboutBlock";

import { useFetch } from "../hooks/useFetch";

import { Supplier } from "../@types/api";

const arr = [
	{ key: "CompanyName", title: "Company Name" },
	{ key: "Region", title: "Region" },
	{ key: "ContactName", title: "Contact Name" },
	{ key: "PostalCode", title: "Postal Code" },
	{ key: "ContactTitle", title: "Contact Title" },
	{ key: "Country", title: "Country" },
	{ key: "Address", title: "Address" },
	{ key: "Phone", title: "Phone" },
	{ key: "City", title: "City" },
];

const About: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { loading, error, data, request } = useFetch<Supplier>();

	const renderData = () => {
		const info = [];

		for (let i = 0; i < arr.length; i++) {
			const key = arr[i].key;
			const title = arr[i].title;

			if (data && Object.prototype.hasOwnProperty.call(data, key)) {
				info.push(<AboutBlock key={i} title={title} text={data[key as keyof Supplier].toString()} />);
			}
		}

		return info;
	};

	const goBackHandler = () => {
		navigate(-1);
	};

	useEffect(() => {
		const getSupplierData = async () => {
			await request(`/supplier?id=${location.pathname.split("/")[2]}`);
		};

		void getSupplierData();
	}, [location, request]);

	if (!data && loading) {
		return <h4>Loadig Suppliers Data</h4>;
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
				<h1 className="about__name">Supplier information</h1>
			</header>
			<div className="about__container">{renderData()}</div>
			<footer className="about__footer">
				<button type="button" className="about__btn" onClick={goBackHandler}>
					Go back
				</button>
			</footer>
		</section>
	);
};

export default About;
