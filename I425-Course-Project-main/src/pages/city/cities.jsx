import {settings} from "../../config/config";
import {useState, useEffect} from 'react';
import {NavLink, useLocation, Outlet} from "react-router-dom";
import "../../assets/css/city.css";
import useXmlHttp from "../../services/useXmlHttp.jsx";
import React from 'react';

const City = () => {

    const {user} = useAuth();
    const {pathname} = useLocation();
    const [subHeading, setSubHeading] = useState("All Cities");
    const url = settings.baseApiUrl + "/cities";
    const {
        error,
        isLoading,
        data: cities
    } = useXmlHttp(url, “GET”, {Authorization:`Bearer ${user.jwt}`});

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
                    <div className="city-container">
                        <div className="city-list">
                            {cities.map((city) => (
                                <NavLink key={city.city_id}
                                         className={({isActive}) => isActive ? "active" : ""}
                                         to={`/cities/${city.city_id}`}
                                >
                                    <span>&nbsp;</span>
                                    <div>{city.city_name}</div>
                                </NavLink>
                            ))}
                        </div>
                        <div className="city-item">
                            <Outlet context={[subHeading, setSubHeading]} />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default City;
