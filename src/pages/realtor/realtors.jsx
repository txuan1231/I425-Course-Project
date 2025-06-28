import {useEffect, useState} from 'react';
import UseFetch from "../../services/useFetch";
import JSONPretty from 'react-json-pretty';
import "/src/assets/css/realtor.css";

const Realtors = () => {
    //add code here to get data from the API server using the useFetch service
    const {error, isLoading, data: realtors, getAll, search} = UseFetch();
    const [subHeading, setSubHeading] = useState("All Realtors");
    // let realtorsArray = [];
    // if(realtors != null){
    //     realtorsArray = realtors.data;
    // }
    // if(realtorsArray === undefined){
    //     realtorsArray = realtors;
    // }
    // console.log(realtors);
    // console.log(realtorsArray);

    useEffect(() => {
        getAll();
    }, [])

    const handleSearch = (e) => {
        e.preventDefault();
        const term = document.getElementById("realtor-search-term").value;
        if(term == '')
            setSubHeading("All Realtors");
        else if(isNaN(term))
            setSubHeading("Realtors containing '" + term + "'");
        search(term);
    }

    const clearSearchBox = (e) => {
        e.preventDefault();
        document.getElementById("realtor-search-term").value = "";
        search("");
    }

    return (
        <>
            <div className="main-heading">
                <div className="container">Realtor</div>
            </div>
            <div className="sub-heading">
                <div className="container">{subHeading}</div>
            </div>
            <div className="main-content container">
                {error && <JSONPretty data={error}></JSONPretty>}
                {isLoading &&
                    <div className="image-loading">
                        Please wait while data is being loaded
                        <img src="/src/assets/img/loading.gif" alt="Loading ......"/>
                    </div>}
                {realtors &&
                    <div className="realtor-container">
                        <form style={{textAlign: "right", marginBottom: "3px"}} onSubmit={handleSearch}>
                            <input id="realtor-search-term" placeholder="Enter search terms"/>
                            <button type="submit" className="button-light"
                                    style={{marginLeft: "5px"}}>Search</button>
                            <button className="button-light" style={{marginLeft: "5px"}}
                                    onClick={clearSearchBox}>Clear</button>
                        </form>
                        <div className="realtor-row realtor-row-header">
                            <div className="realtor-info">
                                <div className="realtor-name">Name</div>
                                <div className="realtor-phone">Phone</div>
                                <div className="realtor-email">Email</div>
                                <div className="realtor-state">State</div>
                            </div>
                            <div className="realtor-buttons" style={{textAlign: "center"}}>Actions</div>
                        </div>
                        {realtors.map((realtor) => (
                            <div key={realtor.id} className="realtor-row">
                                <div className="realtor-info">
                                    <div id={"realtor-name-" + realtor.id} className="realtor-name">{realtor.realtor_name}</div>
                                    <div id={"realtor-phone-" + realtor.id} className="realtor-phone">{realtor.phone}</div>
                                    <div id={"realtor-email-" + realtor.id} className="realtor-email">{realtor.email}</div>
                                    <div id={"realtor-state-" + realtor.id} className="realtor-state">{realtor.state}</div>
                                </div>
                                <div className="realtor-buttons">
                                    <button className="button-light" id={realtor.id}>Edit</button>
                                    <button className="button-light" id={realtor.id}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>}
            </div>
        </>
    );
};
export default Realtors;