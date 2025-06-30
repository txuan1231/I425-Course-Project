/*
Name: Brett Beasley
Date: 6-29-25
File: createRealtor.jsx
Description: create a new realtor.
*/
import { useState, useEffect } from "react";
import UseFetch from "../../services/useFetch";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import JSONPretty from "react-json-pretty";
import "/src/assets/css/realtor.css";

const CreateRealtor = ({ showModal, setShowModal, reload, setReload, setSubHeading }) => {
    const { error, isLoading, data: response, create } = UseFetch();
    const [submitted, setSubmitted] = useState(false);
    const [showButton, setShowButton] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: { name: "", phone: "", email: "", state: "" },
        shouldUseNativeValidation: false
    });

    const createFormOptions = {
        name: { required: "Name is required" },
        phone: { required: "Phone is required" },
        email: { required: "Email is required" },
        state: { required: "State is required" }
    };

    const handleCreate = (data) => {
        const realtor = {
            realtor_name: data.name,
            phone: data.phone,
            email: data.email,
            state: data.state
        };
        create(realtor);
        setSubmitted(true);
    };

    const handleCancel = () => {
        setShowModal(false);
        setSubHeading("All Realtors");
    };

    const handleClose = () => {
        setShowModal(false);
        setShowButton(true);
        setSubmitted(false);
        setReload(!reload);
        setSubHeading("All Realtors");
    };

    useEffect(() => {
        if (!submitted || error != null) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    }, [submitted, error]);

    return (
        <>
            <Modal show={showModal} onHide={handleClose} centered animation={false} backdrop="static">
                <Modal.Header closeButton>
                    <h4>Create Realtor</h4>
                </Modal.Header>
                <Modal.Body>
                    {error && <JSONPretty data={error} style={{ color: "red" }}></JSONPretty>}
                    {isLoading && (
                        <div className="image-loading">
                            Please wait while data is being loaded
                            <img src="/src/assets/img/loading.gif" alt="Loading ......" />
                        </div>
                    )}
                    {response && <JSONPretty data={response}></JSONPretty>}
                    {(!submitted || error != null) && (
                        <form className="form-realtor" id="form-realtor-edit" onSubmit={handleSubmit(handleCreate)}>
                            <ul className="form-realtor-errors">
                                {errors?.name && <li key="name">{errors.name.message}</li>}
                                {errors?.email && <li key="email">{errors.email.message}</li>}
                                {errors?.phone && <li key="phone">{errors.phone.message}</li>}
                                {errors?.state && <li key="state">{errors.state.message}</li>}
                            </ul>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" name="name" {...register("name", createFormOptions.name)} />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input name="email" {...register("email", createFormOptions.email)} />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input name="phone" {...register("phone", createFormOptions.phone)} />
                            </div>
                            <div className="form-group">
                                <label>State</label>
                                <input name="state" {...register("state", createFormOptions.state)} />
                            </div>
                        </form>
                    )}
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: "center" }}>
                    <Button variant="primary" form="form-realtor-edit" type="submit" style={{ display: !showButton ? "none" : "" }}>
                        Create
                    </Button>
                    <Button variant="secondary" onClick={handleCancel} style={{ display: !showButton ? "none" : "" }}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleClose} style={{ display: showButton ? "none" : "" }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CreateRealtor;
