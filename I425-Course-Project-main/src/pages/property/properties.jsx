import {settings} from "../../config/config";
import useXmlHttp from '../../services/useXmlHttp';
import {useParams} from "react-router-dom";
import '../../assets/css/property.css';

const Properties = () => {
    const {user} = useAuth();
    const {cityId} = useParams();
    const url = settings.baseApiUrl + "/cities/" + cityId + "/properties";
    const {
        error,
        isLoading,
        data: properties
    } = useXmlHttp(url, “GET”, {Authorization:`Bearer ${user.jwt}`});

    //add code here to get data from the API server using the useXmlHttp service
    return (
        <>
            {error && <div>{error}</div>}
            {isLoading &&
                <div className="image-loading">
                    Please wait while data is being loaded
                    <img src="/src/assets/img/loading.gif" alt="Loading ......"/>
                </div>}
            {properties && (properties.length === 0
                    ? <p>Properties were not found.</p>
                    : <div className="class-row class-row-header">
                        <div>February Value</div>
                        <div>March Value</div>
                        <div>April Value</div>
                    </div>
            )}
            {properties && (
                properties.map((pro, index) => (//cannot use "class" as a variable name. "class" is a reserved word/
                    <div key={index} className="class-row">
                        <div>{pro.feb_value}</div>
                        <div>{pro.mar_value}</div>
                        <div>{pro.apr_value}</div>
                    </div>
                ))
            )}
        </>
    );
};
export default Properties;
