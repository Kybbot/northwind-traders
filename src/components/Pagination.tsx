import React, { Dispatch, FC, memo, SetStateAction } from "react";
import { Link } from "react-router-dom";

type PaginationProps = {
	currentPage: number;
	maxPages: number;
	loading: boolean;
	setCurrentPage: Dispatch<SetStateAction<number>>;
};

export const Pagination: FC<PaginationProps> = memo(({ currentPage, maxPages, loading, setCurrentPage }) => {
	const changePage = (page: number) => {
		if (page > maxPages) return;

		setCurrentPage(page);
		window.scrollTo(0, 0);
	};

	const prevPageHandler = () => {
		setCurrentPage((prevState) => (prevState === 1 ? 1 : prevState - 1));
		window.scrollTo(0, 0);
	};

	const nextPageHandler = () => {
		setCurrentPage((prevState) => (prevState === maxPages ? prevState : prevState + 1));
		window.scrollTo(0, 0);
	};

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
						defaultValue={currentPage}
						onChange={(e) => changePage(Number(e.target.value))}
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
