import {settings} from "../../config/config";
import {useState, useEffect} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import "../../assets/css/city.css";

import React from 'react';

const City = () => {
    const {pathname} = useLocation();
    const [subHeading, setSubHeading] = useState("All Cities");
    const url = settings.baseApiUrl + "/cities";
    const [cities, setCities] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.timeout = 2000; // time in milliseconds

        request.onload = () => { // Request finished.
            setIsLoading (false)
            if (request.status === 200) {
                setCities(JSON.parse(request.response));
            } else {
                setError("Status: " + request.status + "; Error: " + request.statusText);
            }
        }
        request.ontimeout = () => { // Request timed out.
            setIsLoading (false);
            setError("Error: The request has timed out.");
        }
        request.send();
    },[]);
    useEffect(() => {
        setSubHeading("All Cities");
    }, [pathname]);

    return (
        <div>
            <div className="main-heading">
                <div className="container">City</div>
            </div>
            <div className="sub-heading">
                <div className="container">{subHeading}</div>
            </div>
            <div className="main-content container">
                {error && <div>{error}</div>}

                {isLoading &&
                    <div className="image-loading">
                        Please wait while data is being loaded
                        <img src="/src/assets/img/loading.gif" alt="Loading ......"/>
                    </div>
                }

                {cities &&
                    <>
                        <div className="city-container">
                            <div className="city-list">
                                {cities.map((city) => (
                                    <NavLink key={city.city_id}
                                             className={({isActive}) => isActive ? "active" : ""}
                                             to="#"
                                    >
                                        <span>&nbsp;</span>
                                        <div>{city.city_name}</div>
                                    </NavLink>
                                ))}
                            </div>
                            <div className="city-item">
                                City details
                            </div>
                        </div>
                    </>
                }

            </div>
        </div>
    );
};

export default City;