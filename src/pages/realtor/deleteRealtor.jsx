import {useState} from "react";
import UseFetch from "../../services/useFetch";
import {Button, Modal} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import JSONPretty from "react-json-pretty";

const DeleteRealtor = ({showModal, setShowModal, data, reload, setReload, setSubHeading}) => {
    const {error, isLoading, data: response, remove} = UseFetch();
    const [showButton, setShowButton] = useState(true);
    const navigate = useNavigate();

    const handleDelete = () => {
        remove(data.realtor_id);
        setShowButton(false);
    }

    const handleCancel = () => {
        setShowModal(false);
        setSubHeading("All Realtors");
        navigate("/realtors");
    }

    const handleClose = () => {
        setShowModal(false);
        setShowButton(true);
        setReload(!reload);
        setSubHeading("All Realtors");
        navigate("/realtors");
    }

    return (
        <Modal show={showModal} onHide={handleClose} centered animation={false} backdrop="static">
            <Modal.Header closeButton>
                <h4>Delete Realtor</h4>
            </Modal.Header>
            <Modal.Body>
                {error && <JSONPretty data={error} style={{color: "red"}} />}
                {isLoading &&
                    <div className="image-loading">
                        Please wait while data is being loaded
                        <img src="/src/assets/img/loading.gif" alt="Loading ......"/>
                    </div>
                }
                {response
                    ? <JSONPretty data={response} />
                    : <div>
                        <span style={{color: "red"}}>Are you sure you want to delete the following realtor?</span>
                        <JSONPretty data={data} />
                    </div>
                }
            </Modal.Body>
            <Modal.Footer style={{justifyContent: "center"}}>
                <Button variant="danger" onClick={handleDelete} style={{display: showButton ? "" : "none"}}>
                    Remove
                </Button>
                <Button variant="secondary" onClick={handleCancel} style={{display: showButton ? "" : "none"}}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleClose} style={{display: !showButton ? "" : "none"}}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteRealtor;
