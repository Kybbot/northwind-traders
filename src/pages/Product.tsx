import React, { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useFetch } from "../hooks/useFetch";

import { renderIndividualData } from "../utils/renderIndividualData";

import { IndividualData } from "../constants";
import { OneProductType } from "../@types/api";

const Product: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { loading, error, data, request } = useFetch<OneProductType>();

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
			<div className="about__container">
				{data && renderIndividualData<OneProductType>({ arr: IndividualData.product, data })}
			</div>
			<footer className="about__footer">
				<button type="button" className="about__btn" onClick={goBackHandler}>
					Go back
				</button>
			</footer>
		</section>
	);
};

export default Product;
