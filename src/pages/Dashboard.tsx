import React, { FC, useEffect } from "react";

import { useFetch } from "../hooks/useFetch";

import { DashboardResponse } from "../@types/api";

const Dashboard: FC = () => {
	const { loading, error, data, request } = useFetch<DashboardResponse>();

	useEffect(() => {
		const getSuppliers = async () => {
			await request(`/dashboard`);
		};

		void getSuppliers();
	}, [request]);

	if (!data && loading) {
		return <h4>Loadig Dashboard Data</h4>;
	}

	if (error) {
		return <h4>An error has occurred: {error}</h4>;
	}

	return (
		<>
			{data ? (
				<section className="dashboard">
					<div className="dashboard__worker">
						<h2 className="dashboard__title">Worker</h2>
						<p className="dashboard__text">Colo: KBP</p>
						<p className="dashboard__text">Country: {data.geoData.country_code}</p>
					</div>
					<div className="dashboard__sql">
						<h2 className="dashboard__title">SQL Metrics</h2>
						<p className="dashboard__text">Query count: {data.query_count}</p>
						<p className="dashboard__text">Results count: {data.result_count}</p>
						<p className="dashboard__text"># SELECT: {data.select}</p>
						<p className="dashboard__text"># SELECT WHERE: {data.select_where}</p>
						<p className="dashboard__text"># SELECT LEFT JOIN: {data.select_left}</p>
					</div>
					<div className="dashboard__log">
						<h2 className="dashboard__title">Activity log</h2>
						<p className="dashboard__text dashboard__text--small">Explore the app and see metrics here</p>
						{data.logs.map((item) => (
							<article key={item.id} className="dashboard__article">
								<p className="dashboard__text">
									Result count: {item.result_count}; Type: {item.type}; Date: {item.date}, Database name:{" "}
									{item.database_name}; Time passed: {item.time_passed}.
								</p>
								<p className="dashboard__text dashboard__text--small">Query: {item.query}</p>
							</article>
						))}
					</div>
				</section>
			) : (
				"No Data"
			)}
		</>
	);
};

export default Dashboard;
