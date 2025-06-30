import { useState, useEffect } from "react";
import UseFetch from "../../services/useFetch";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import JSONPretty from "react-json-pretty";
import "/src/assets/css/realtor.css";

const UpdateRealtor = ({ showModal, setShowModal, data, reload, setReload, setSubHeading }) => {
    const { error, isLoading, data: response, update } = UseFetch();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [showButton, setShowButton] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: data || {},
        shouldUseNativeValidation: false
    });

    useEffect(() => {
        if (data) reset(data);
    }, [data, reset]);

    const editFormOptions = {
        realtor_name: { required: "Name is required" },
        email: { required: "Email is required" },
        phone: { required: "Phone is required" },
        state: { required: "State is required" }
    };

    const handleUpdate = (realtor) => {
        update({ ...realtor, id: data.realtor_id });
        setSubmitted(true);
    };

    const handleCancel = () => {
        setShowModal(false);
        setSubHeading("All Realtors");
        navigate("/realtors");
    };

    const handleClose = () => {
        setShowModal(false);
        setShowButton(true);
        setSubmitted(false);
        setReload(!reload);
        setSubHeading("All Realtors");
        navigate("/realtors");
    };

    useEffect(() => {
        setShowButton(!submitted || !!error);
    }, [submitted, error]);

    return (
        <Modal show={showModal} onHide={handleClose} centered animation={false} backdrop="static">
            <Modal.Header closeButton>
                <h4>Update Realtor</h4>
            </Modal.Header>
            <Modal.Body>
                {error && <JSONPretty data={error} style={{ color: "red" }} />}
                {isLoading && (
                    <div className="image-loading">
                        Please wait while data is being loaded
                        <img src="/src/assets/img/loading.gif" alt="Loading..." />
                    </div>
                )}
                {response && <JSONPretty data={response} />}
                {(!submitted || error != null) && (
                    <form className="form-realtor" id="form-realtor-update" onSubmit={handleSubmit(handleUpdate)}>
                        <ul className="form-realtor-errors">
                            {errors?.realtor_name && <li>{errors.realtor_name.message}</li>}
                            {errors?.email && <li>{errors.email.message}</li>}
                            {errors?.phone && <li>{errors.phone.message}</li>}
                            {errors?.state && <li>{errors.state.message}</li>}
                        </ul>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" {...register("realtor_name", editFormOptions.realtor_name)} />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input {...register("email", editFormOptions.email)} />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input {...register("phone", editFormOptions.phone)} />
                        </div>
                        <div className="form-group">
                            <label>State</label>
                            <input {...register("state", editFormOptions.state)} />
                        </div>
                    </form>
                )}
            </Modal.Body>
            <Modal.Footer style={{ justifyContent: "center" }}>
                <Button
                    variant="primary"
                    form="form-realtor-update"
                    type="submit"
                    style={{ display: showButton ? "" : "none" }}
                >
                    Update
                </Button>
                <Button
                    variant="secondary"
                    onClick={handleCancel}
                    style={{ display: showButton ? "" : "none" }}
                >
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={handleClose}
                    style={{ display: showButton ? "none" : "" }}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateRealtor;
