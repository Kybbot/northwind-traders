import React, { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useFetch } from "../hooks/useFetch";

import { renderIndividualData } from "../utils/renderIndividualData";

import { IndividualData } from "../constants";
import { OneEmployeeType } from "../@types/api";

const Employee: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { loading, error, data, request } = useFetch<OneEmployeeType>();

	const goBackHandler = () => {
		navigate(-1);
	};

	useEffect(() => {
		const getEmployeeData = async () => {
			await request(`/employee?id=${location.pathname.split("/")[2]}`);
		};

		void getEmployeeData();
	}, [location, request]);

	if (!data && loading) {
		return <h4>Loadig Employee Data</h4>;
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
				<h1 className="about__name">Employee information</h1>
			</header>
			<div className="about__container">
				{data && renderIndividualData<OneEmployeeType>({ arr: IndividualData.employee, data })}
			</div>
			<footer className="about__footer">
				<button type="button" className="about__btn" onClick={goBackHandler}>
					Go back
				</button>
			</footer>
		</section>
	);
};

export default Employee;
