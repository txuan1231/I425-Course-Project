import axios from 'axios';
import {useState, useEffect} from 'react';

const UseAxios = (url,
                  method = "GET",
                  headers = {},
                  body = {}) => {
    headers = {
        ...{"Content-Type": "application/json"},
        ...headers
    };

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    //useEffect function
    useEffect(() => {
        const controller = new AbortController;

        // Reset state before fetching new data
        setIsLoading(true);   // <--- ADD THIS LINE
        setError(null);       // (Optional) clear previous errors

        axios({
            url: url,
            method: method,
            headers: headers,
            data: body,
            timeout: 2000
        })
            .then(response => {
                setIsLoading(false);
                setData(response.data);
            })
            .catch(error => {
                setIsLoading(false);
                if (error.response) {
                    setError(error.response);
                } else if (error.request) {
                    setError(error.request);
                } else {
                    setError("Error: " + error.message);
                }
            });

        return () => {
            controller.abort();
        };
    }, [url]);  // Effect re-triggers on URL change


    return {data, isLoading, error};
};

export default UseAxios;