import React, { FC, useEffect, useRef, useState } from "react";
import { Outlet, Link } from "react-router-dom";

const MainLayout: FC = () => {
	const [date, setDate] = useState(new Date());
	const [isOpenLinks, setOpenLinks] = useState(false);
	const [isOpenAside, setOpenASide] = useState(false);

	const asideRef = useRef<HTMLDivElement>(null);

	const linksBtnHandler = () => {
		setOpenLinks((prev) => !prev);
	};

	const asideBtnHandler = () => {
		setOpenASide((prev) => !prev);
	};

	useEffect(() => {
		const clickOutside = (event: Event) => {
			if (
				event.target === asideRef.current &&
				asideRef.current &&
				asideRef.current.className === "aside aside--active"
			) {
				setOpenASide(false);
			}
		};

		window.addEventListener("click", clickOutside);

		const timerId = setInterval(() => {
			setDate(new Date());
		}, 1000);

		return () => {
			clearInterval(timerId);
			window.removeEventListener("click", clickOutside);
		};
	}, []);

	return (
		<div className="container">
			<aside ref={asideRef} className={`aside ${isOpenAside ? "aside--active" : ""}`}>
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
				<button className="headerr__menu" aria-label="Open navigation" onClick={asideBtnHandler}>
					<svg width="24" height="24">
						<use xlinkHref="/icons.svg#menu" />
					</svg>
				</button>
				<button className={`header__button ${isOpenLinks ? "header__button--active" : ""}`} onClick={linksBtnHandler}>
					<svg width="24" height="24">
						<use xlinkHref="/icons.svg#menu" />
					</svg>
					SQLite Links
					<svg width="24" height="24">
						<use xlinkHref="/icons.svg#arrow-down" />
					</svg>
				</button>
				<div className={`header__links ${isOpenLinks ? "header__links--active" : ""}`}>
					<a
						href="https://blog.cloudflare.com/introducing-d1"
						target="_blank"
						rel="noreferrer noopener"
						className="header__link"
					>
						<svg width="24" height="24">
							<use xlinkHref="/icons.svg#link" />
						</svg>
						Introducing D1
					</a>
					<a href="https://www.sqlite.org/lang.html" target="_blank" rel="noreferrer noopener" className="header__link">
						<svg width="24" height="24">
							<use xlinkHref="/icons.svg#link" />
						</svg>
						SQLite SQL Flavour
					</a>
					<a
						href="https://developers.cloudflare.com/workers/learning/using-durable-objects/"
						target="_blank"
						rel="noreferrer noopener"
						className="header__link"
					>
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
