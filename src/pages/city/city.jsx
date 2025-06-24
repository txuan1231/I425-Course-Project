import { settings } from "../../config/config";
import useXmlHttp from "../../services/useXmlHttp.jsx";
import { useParams, useOutletContext } from "react-router-dom";
import "../../assets/css/city.css";
import React, { useEffect } from "react";
const City = () => {
    const [subHeading, setSubHeading] = useOutletContext();
    const { cityId } = useParams();
    const url = settings.baseApiUrl + "/cities/" + cityId;

    const { error, isLoading, data: city } = useXmlHttp(url);

    useEffect(() => {
        if (city) {
            setSubHeading(city.city_name);
        }
    }, [city, setSubHeading]);

    return (
        <>
            {error && <div>{error}</div>}

            {isLoading && (
                <div className="image-loading">
                    Please wait while data is being loaded
                    <img src="/src/assets/img/loading.gif" alt="Loading ..." />
                </div>
            )}

            {city && (
                <div className="city-details">
                    <div>
                        <strong>State:</strong> {city.state}
                    </div>
                    <div>
                        <strong>Population:</strong> {city.population}
                    </div>
                </div>
            )}
        </>
    );
};

export default City;
