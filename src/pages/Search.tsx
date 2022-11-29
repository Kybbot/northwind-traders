import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import { useFetch } from "../hooks/useFetch";

import { CustomerType, ProductType } from "../@types/api";

const Search: FC = () => {
	const { loading, error, data, request } = useFetch<ProductType[] | CustomerType[]>();

	const [table, setTable] = useState("products");
	const [searchText, setSearchText] = useState("");

	const handleRadio = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setTable(value);

		if (searchText) {
			void request(`/search?q=${searchText}&table=${value}`);
		}
	};

	const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setSearchText(value);
	};

	const formHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		void request(`/search?q=${searchText}&table=${table}`);
	};

	const isProducts = (searchResult: ProductType[] | CustomerType[]): searchResult is ProductType[] => {
		return (searchResult[0] as ProductType).ProductID !== undefined;
	};

	return (
		<section className="search">
			<h2 className="search__title">Search Database</h2>
			<form className="search__form" onSubmit={formHandler}>
				<div className="search__wrapper">
					<button type="submit" className="search__icon">
						<svg width="24" height="24">
							<use xlinkHref="/icons.svg#search" />
						</svg>
					</button>
					<input
						type="search"
						name="search"
						id="searchInput"
						className="search__input"
						placeholder="Enter keyword..."
						value={searchText}
						onChange={handleInput}
					/>
				</div>
				<fieldset className="search__fieldset">
					<legend className="search__legend">Tables</legend>
					<label htmlFor="products" className="search__label">
						<input
							type="radio"
							id="products"
							name="table"
							value="products"
							className="search__radio"
							defaultChecked
							onChange={handleRadio}
						/>{" "}
						Products
					</label>
					<label htmlFor="customers" className="search__label">
						<input
							type="radio"
							id="customers"
							name="table"
							value="customers"
							className="search__radio"
							onChange={handleRadio}
						/>{" "}
						Customers
					</label>
				</fieldset>
				<h3>Search results</h3>
				{loading && <h4>Searching Data</h4>}
				{error && <h4>An error has occurred: {error}</h4>}
				<output name="result" htmlFor="searchInput">
					{data ? (
						<>
							{isProducts(data)
								? data.map((item, index) => (
										<article key={item.CategoryID}>
											<Link className="search__link" to={`/product/${item.ProductID}`}>
												{item.ProductName}
											</Link>
											<p className="search__text">
												#{index + 1}, Quantity Per Unit: {item.QuantityPerUnit}, Price: {item.UnitPrice}, Stock:{" "}
												{item.UnitsInStock}
											</p>
										</article>
								  ))
								: data.map((item, index) => (
										<article key={item.CustomerID}>
											<Link className="home__link" to={`/customer/${item.CustomerID}`}>
												{item.CompanyName}
											</Link>
											<p className="search__text">
												#{index + 1}, Contact: {item.ContactName}, Title: {item.ContactTitle}, Phone: {item.Phone}
											</p>
										</article>
								  ))}
						</>
					) : (
						"No results"
					)}
				</output>
			</form>
		</section>
	);
};

export default Search;
