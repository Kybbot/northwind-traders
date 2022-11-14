import React, { FC, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";

const MainLayout: FC = () => {
	const [date, setDate] = useState(new Date());
	const [isOpen, setOpen] = useState(false);

	const btnHandler = () => {
		setOpen((prev) => !prev);
	};

	useEffect(() => {
		const timerId = setInterval(() => {
			setDate(new Date());
		}, 1000);

		return () => clearInterval(timerId);
	}, []);

	return (
		<div className="container">
			<aside className="aside">
				<section className="aside__container">
					<header className="aside__header">
						<h1 className="aside__titel">
							<span className="aside__bold">Northwind</span> Traders
						</h1>
					</header>
					<nav className="aside__nav">
						<h2 className="aside__subtitle">General</h2>
						<ul className="aside__ul">
							<li className="aside__li">
								<Link to="/" className="aside__link aside__li--active">
									<svg width="24" height="24">
										<use xlinkHref="/icons.svg#home" />
									</svg>
									Home
								</Link>
							</li>
							<li className="aside__li">
								<Link to="/dashboard" className="aside__link">
									<svg width="24" height="24">
										<use xlinkHref="/icons.svg#dashboard" />
									</svg>
									Dashboard
								</Link>
							</li>
						</ul>
						<h2 className="aside__subtitle">Backoffice</h2>
						<ul className="aside__ul">
							<li className="aside__li">
								<Link to="/suppliers" className="aside__link">
									<svg width="24" height="24">
										<use xlinkHref="/icons.svg#suppliers" />
									</svg>
									Suppliers
								</Link>
							</li>
							<li className="aside__li">
								<Link to="/products" className="aside__link">
									<svg width="24" height="24">
										<use xlinkHref="/icons.svg#products" />
									</svg>
									Products
								</Link>
							</li>
							<li className="aside__li">
								<Link to="/orders" className="aside__link">
									<svg width="24" height="24">
										<use xlinkHref="/icons.svg#orders" />
									</svg>
									Orders
								</Link>
							</li>
							<li className="aside__li">
								<Link to="/employees" className="aside__link">
									<svg width="24" height="24">
										<use xlinkHref="/icons.svg#employees" />
									</svg>
									Employees
								</Link>
							</li>
							<li className="aside__li">
								<Link to="/customers" className="aside__link">
									<svg width="24" height="24">
										<use xlinkHref="/icons.svg#customers" />
									</svg>
									Customers
								</Link>
							</li>
							<li className="aside__li">
								<Link to="/search" className="aside__link">
									<svg width="24" height="24">
										<use xlinkHref="/icons.svg#search" />
									</svg>
									Search
								</Link>
							</li>
						</ul>
					</nav>
				</section>
			</aside>
			<header className="header">
				<div className="header__clock">{date.toLocaleTimeString()}</div>
				<button className={`header__button ${isOpen ? "header__button--active" : ""}`} onClick={btnHandler}>
					<svg width="24" height="24">
						<use xlinkHref="/icons.svg#menu" />
					</svg>
					SQLite Links
					<svg width="24" height="24">
						<use xlinkHref="/icons.svg#arrow-down" />
					</svg>
				</button>
				<div className={`header__links ${isOpen ? "header__links--active" : ""}`}>
					<a href="https://blog.cloudflare.com/introducing-d1" className="header__link">
						<svg width="24" height="24">
							<use xlinkHref="/icons.svg#link" />
						</svg>
						Introducing D1
					</a>
					<a href="https://www.sqlite.org/lang.html" className="header__link">
						<svg width="24" height="24">
							<use xlinkHref="/icons.svg#link" />
						</svg>
						SQLite SQL Flavour
					</a>
					<a href="https://developers.cloudflare.com/workers/learning/using-durable-objects/" className="header__link">
						<svg width="24" height="24">
							<use xlinkHref="/icons.svg#link" />
						</svg>
						Durable Objects
					</a>
				</div>
			</header>
			<main className="main">
				<Outlet />
			</main>
		</div>
	);
};

export default MainLayout;
