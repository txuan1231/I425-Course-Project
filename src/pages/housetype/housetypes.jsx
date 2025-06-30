import { settings } from "../../config/config";
import { useAuth } from "../../services/useAuth";
import useAxios from "../../services/useAxios";
import { useState, useEffect, useMemo } from "react";
import Pagination from "./pagination";
import "/src/assets/css/housetype.css";
import React from "react";

const Housetypes = () => {
    const { user } = useAuth();

    // API URL to fetch ALL housetypes (no query params needed now)
    const url = settings.baseApiUrl + "/housetypes";

    // Get all data from API once
    const { error, isLoading, data: allHouseTypes } = useAxios(
        url,
        "GET",
        { Authorization: "Bearer " + user.jwt }
    );

    // State for pagination and sorting
    const [sort, setSort] = useState("house_type:asc");
    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    // Reset to page 1 when sorting or limit changes
    useEffect(() => {
        setCurrentPage(1);
    }, [sort, limit]);

    // Compute sorted and paginated data using useMemo for performance
    const paginatedHouseTypes = useMemo(() => {
        if (!Array.isArray(allHouseTypes)) return [];

        // Sort
        const [field, order] = sort.split(":");
        const sorted = [...allHouseTypes].sort((a, b) => {
            if (a[field] < b[field]) return order === "asc" ? -1 : 1;
            if (a[field] > b[field]) return order === "asc" ? 1 : -1;
            return 0;
        });

        // Paginate
        const startIndex = (currentPage - 1) * limit;
        return sorted.slice(startIndex, startIndex + limit);
    }, [allHouseTypes, sort, limit, currentPage]);

    const totalPages = allHouseTypes
        ? Math.ceil(allHouseTypes.length / limit)
        : 1;

    return (
        <>
            <div className="main-heading">
                <div className="container">House Type</div>
            </div>
            <div className="sub-heading">
                <div className="container">All House Types</div>
            </div>

            <div className="main-content container">
                {error && (
                    <div className="error">{error.message || error.toString()}</div>
                )}

                {isLoading && (
                    <div className="image-loading">
                        Please wait while data is being loaded
                        <img src="/src/assets/img/loading.gif" alt="Loading..." />
                    </div>
                )}

                {!isLoading && paginatedHouseTypes && (
                    <>
                        <div className="housetype-container">
                            <div className="housetype-row housetype-row-header">
                                <div>House Type</div>
                                <div>Recommended Residents</div>
                                <div>Description</div>
                            </div>

                            {paginatedHouseTypes.map((type) => (
                                <div key={type.house_type_id} className="housetype-row">
                                    <div>{type.house_type}</div>
                                    <div>{type.recommended_residents}</div>
                                    <div>{type.description}</div>
                                </div>
                            ))}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                            sort={sort}
                            setSort={setSort}
                            limit={limit}
                            setLimit={setLimit}
                        />
                    </>
                )}
            </div>
        </>
    );
};

export default Housetypes;
