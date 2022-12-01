import React, { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useFetch } from "../hooks/useFetch";

import { renderIndividualData } from "../utils/renderIndividualData";

import { IndividualData } from "../constants";
import { SupplierType } from "../@types/api";

const Supplier: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { loading, error, data, request } = useFetch<SupplierType>();

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
		return <h4>Loadig Supplier Data</h4>;
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
			<div className="about__container">
				{data && renderIndividualData<SupplierType>({ arr: IndividualData.supplier, data })}
			</div>
			<footer className="about__footer">
				<button type="button" className="about__btn" onClick={goBackHandler}>
					Go back
				</button>
			</footer>
		</section>
	);
};

export default Supplier;
