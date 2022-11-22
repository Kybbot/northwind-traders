import React, { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AboutBlock } from "../components/AboutBlock";

import { useFetch } from "../hooks/useFetch";

import { CustomerType } from "../@types/api";
import { arrType } from "../@types/arr";

const arr: arrType = [
	{ key: "CompanyName", title: "Company Name", type: "string" },
	{ key: "PostalCode", title: "Postal Code", type: "string" },
	{ key: "ContactName", title: "Contact Name", type: "string" },
	{ key: "Region", title: "Region", type: "string" },
	{ key: "ContactTitle", title: "Contact Title", type: "string" },
	{ key: "Country", title: "Country", type: "string" },
	{ key: "Address", title: "Address", type: "string" },
	{ key: "Phone", title: "Phone", type: "string" },
	{ key: "City", title: "City", type: "string" },
	{ key: "Fax", title: "Fax", type: "string" },
];

const Customer: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { loading, error, data, request } = useFetch<CustomerType>();

	const renderData = () => {
		const info = [];

		for (let i = 0; i < arr.length; i++) {
			const key = arr[i].key;
			const title = arr[i].title;
			const type = arr[i].type;

			if (typeof key !== "object") {
				if (data && Object.prototype.hasOwnProperty.call(data, key) && (type === "string" || type === "price")) {
					info.push(<AboutBlock key={i} title={title} text={data[key as keyof typeof data]} type={type} />);
				}
			} else {
				let text = "";

				for (let j = 0; j < key.length; j++) {
					if (data && Object.prototype.hasOwnProperty.call(data, key[j])) {
						text += ` ${data[key[j] as keyof typeof data]}`;
					}
				}

				if (data && (type === "string" || type === "price")) {
					info.push(<AboutBlock key={i} title={title} text={text} type={type} />);
				}
			}
		}

		return info;
	};

	const goBackHandler = () => {
		navigate(-1);
	};

	useEffect(() => {
		const getSupplierData = async () => {
			await request(`/customer?id=${location.pathname.split("/")[2]}`);
		};

		void getSupplierData();
	}, [location, request]);

	if (!data && loading) {
		return <h4>Loadig Customer Data</h4>;
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
				<h1 className="about__name">Customer information</h1>
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

export default Customer;
