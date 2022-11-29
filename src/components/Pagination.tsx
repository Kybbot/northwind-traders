import React, { ChangeEvent, Dispatch, FC, memo, SetStateAction, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type PaginationProps = {
	currentPage: number;
	maxPages: number;
	loading: boolean;
	setCurrentPage: Dispatch<SetStateAction<number>>;
};

export const Pagination: FC<PaginationProps> = memo(({ currentPage, maxPages, loading, setCurrentPage }) => {
	const navigate = useNavigate();

	const [input, setInput] = useState(currentPage);
	const [debouncedValue, setDebouncedValue] = useState(input);

	const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		const number = +value;

		setInput(number);
	};

	const prevPageHandler = () => {
		setCurrentPage((prevState) => (prevState === 1 ? 1 : prevState - 1));
		window.scrollTo(0, 0);
	};

	const nextPageHandler = () => {
		setCurrentPage((prevState) => (prevState === maxPages ? prevState : prevState + 1));
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(input);
		}, 500);

		return () => {
			clearTimeout(handler);
		};
	}, [input]);

	useEffect(() => {
		if (debouncedValue > maxPages) return;

		setCurrentPage(debouncedValue);
		navigate(`?page=${debouncedValue}`);
		window.scrollTo(0, 0);
	}, [debouncedValue, maxPages, navigate, setCurrentPage]);

	return (
		<div className="pagination">
			<div className="pagination__btns">
				<Link
					to={`${currentPage === 1 || currentPage - 1 === 1 ? "?page=1" : `?page=${currentPage - 1}`}`}
					className={`pagination__btn pagination__left ${currentPage === 1 ? "pagination__disable" : ""}`}
					onClick={prevPageHandler}
				>
					<svg width="24" height="24">
						<use xlinkHref="/icons.svg#arrow-down" />
					</svg>
				</Link>
				<Link
					to={`${currentPage === maxPages ? `?page=${maxPages}` : `?page=${currentPage + 1}`}`}
					className={`pagination__btn pagination__right ${currentPage === maxPages ? "pagination__disable" : ""}`}
					onClick={nextPageHandler}
				>
					<svg width="24" height="24">
						<use xlinkHref="/icons.svg#arrow-down" />
					</svg>
				</Link>
				<div className="pagination__change">
					<p className="pagination__info">Go to page:</p>
					<input
						type="number"
						min={1}
						max={maxPages}
						value={input}
						onChange={inputHandler}
						className="pagination__input"
					/>
				</div>
			</div>
			{loading ? (
				<p className="pagination__info">Loading</p>
			) : (
				<p className="pagination__info">
					Page {currentPage} of {maxPages}
				</p>
			)}
		</div>
	);
});

Pagination.displayName = "Pagination";
