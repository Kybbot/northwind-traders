import React, { FC } from "react";

const Home: FC = () => {
	return (
		<section className="home">
			<div className="home__text">
				<h2 className="home__title">Welcome to Northwind Traders</h2>
				<p className="home__text home__text--grey">Running on Cloudflare&apos;s D1</p>
				<p className="home__text">
					This is a demo of the Northwind dataset, running on{" "}
					<a href="https://workers.cloudflare.com/" target="_blank" rel="noreferrer noopener" className="home__link">
						Cloudflare Workers
					</a>{" "}
					, and D1 - Cloudflare&apos;s newest SQL database, running on SQLite.
				</p>
				<p className="home__text">
					Read our{" "}
					<a
						href="https://blog.cloudflare.com/introducing-d1"
						target="_blank"
						rel="noreferrer noopener"
						className="home__link"
					>
						D1 announcement
					</a>{" "}
					to learn more about D1.
				</p>
				<p className="home__text">
					This dataset was sourced from{" "}
					<a
						href="https://github.com/jpwhite3/northwind-SQLite3"
						target="_blank"
						rel="noreferrer noopener"
						className="home__link"
					>
						northwind-SQLite3
					</a>{" "}
					.
				</p>
				<p className="home__text">
					You can use the UI to explore Supplies, Orders, Customers, Employees and Products, or you can use search if
					you know what you&apos;re looking for.
				</p>
			</div>
			<div className="home__dec">
				<img src="/db.webp" width="800" height="450" alt="db" className="home__img" aria-hidden="true" />
			</div>
		</section>
	);
};

export default Home;
