import { settings } from "../../config/config";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";

const Pagination = ({
                        currentPage,
                        totalPages,
                        setCurrentPage,
                        sort,
                        setSort,
                        limit,
                        setLimit,
                    }) => {
    const handlePageClick = (pageNum) => {
        if (pageNum >= 1 && pageNum <= totalPages) {
            setCurrentPage(pageNum);
        }
    };

    const setItemsPerPage = (e) => {
        const newLimit = parseInt(e.target.value, 10);
        setLimit(newLimit);
        setCurrentPage(1); // reset to first page on limit change
    };

    const sortHousetypes = (e) => {
        const newSort = e.target.value;
        setSort(newSort);
        setCurrentPage(1); // reset to first page on sort change
    };

    return (
        <div className="housetype-pagination-container">
            <div className="housetype-pagination">
                Showing page {currentPage} of {totalPages} &nbsp;
                <button onClick={() => handlePageClick(1)} disabled={currentPage === 1}>
                    {"<<"}
                </button>
                <button
                    onClick={() => handlePageClick(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    {"<"}
                </button>
                <button
                    onClick={() => handlePageClick(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    {">"}
                </button>
                <button
                    onClick={() => handlePageClick(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    {">>"}
                </button>
                &nbsp; Items per page &nbsp;
                <select onChange={setItemsPerPage} value={limit}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
            <div className="housetype-sorting">
                Sort by:&nbsp;
                <select onChange={sortHousetypes} value={sort}>
                    <option value="house_type:asc">House Type A-Z</option>
                    <option value="house_type:desc">House Type Z-A</option>
                    <option value="recommended_residents:asc">
                        Recommended Residents (Low → High)
                    </option>
                    <option value="recommended_residents:desc">
                        Recommended Residents (High → Low)
                    </option>
                </select>
            </div>
        </div>
    );
};

export default Pagination;
