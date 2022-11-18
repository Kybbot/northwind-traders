import React, { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AboutBlock } from "../components/AboutBlock";

import { useFetch } from "../hooks/useFetch";

import { OneProductType } from "../@types/api";
import { arrType } from "../@types/arr";

const arr: arrType = [
	{ key: "ProductName", title: "Product Name", type: "string" },
	{ key: "UnitsInStock", title: "Units In Stock", type: "string" },
	{ key: "SupplierName", title: "Supplier", type: "link" },
	{ key: "UnitsOnOrder", title: "Units In Order", type: "string" },
	{ key: "QuantityPerUnit", title: "Quantity Per Unit", type: "string" },
	{ key: "ReorderLevel", title: "Reorder Level", type: "string" },
	{ key: "UnitPrice", title: "Unit Price", type: "price" },
	{ key: "Discontinued", title: "Discontinued", type: "string" },
];

const Product: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { loading, error, data, request } = useFetch<OneProductType>();

	const renderData = () => {
		const info = [];

		for (let i = 0; i < arr.length; i++) {
			const key = arr[i].key;
			const title = arr[i].title;
			const type = arr[i].type;

			if (data && Object.prototype.hasOwnProperty.call(data, key) && (type === "string" || type === "price")) {
				info.push(<AboutBlock key={i} title={title} text={data[key as keyof OneProductType].toString()} type={type} />);
			}

			if (data && Object.prototype.hasOwnProperty.call(data, key) && type === "link") {
				info.push(
					<AboutBlock
						key={i}
						title={title}
						text={data[key as keyof OneProductType].toString()}
						type={type}
						linkTo={`/supplier/${data.SupplierID}`}
					/>
				);
			}
		}

		return info;
	};

	const goBackHandler = () => {
		navigate(-1);
	};

	useEffect(() => {
		const getProductData = async () => {
			await request(`/product?id=${location.pathname.split("/")[2]}`);
		};

		void getProductData();
	}, [location, request]);

	if (!data && loading) {
		return <h4>Loadig Product Data</h4>;
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
				<h1 className="about__name">Product information</h1>
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

export default Product;
