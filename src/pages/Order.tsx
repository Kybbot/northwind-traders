import React, { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useFetch } from "../hooks/useFetch";

import { renderIndividualData } from "../utils/renderIndividualData";
import { renderTable } from "../utils/renderTable";

import { IndividualData, TableData } from "../constants";
import { OneOrderType, OrderProductsType } from "../@types/api";

const Order: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { loading, error, data, request } = useFetch<OneOrderType>();

	const goBackHandler = () => {
		navigate(-1);
	};

	useEffect(() => {
		const getOrderData = async () => {
			await request(`/order?id=${location.pathname.split("/")[2]}`);
		};

		void getOrderData();
	}, [location, request]);

	if (!data && loading) {
		return <h4>Loadig Order Data</h4>;
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
				<h1 className="about__name">Order information</h1>
			</header>
			<div className="about__container">
				{data && renderIndividualData<typeof data.order>({ arr: IndividualData.order, data: data.order })}
			</div>
			<div className="about__table">
				<h2 className="about__subname">Products in Order</h2>
				<div className="about__wrapper">
					{data && renderTable<OrderProductsType>({ arr: TableData.order, data: data.products })}
				</div>
			</div>
			<footer className="about__footer">
				<button type="button" className="about__btn" onClick={goBackHandler}>
					Go back
				</button>
			</footer>
		</section>
	);
};

export default Order;
