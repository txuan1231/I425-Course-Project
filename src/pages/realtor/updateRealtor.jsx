/*
Name: Brett Beasley
Date: 6-29-25
File: updateRealtor.jsx
Description: update a new realtor.
*/

import {useState, useEffect} from "react";
import UseFetch from "../../services/useFetch";
import {useNavigate} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import JSONPretty from "react-json-pretty";
import "/src/assets/css/student.css";

const UpdateRealtor =
    ({showModal, setShowModal, data, reload, setReload, setSubHeading}) => {
        const {error, isLoading, data: response, update} = UseFetch();
        const navigate = useNavigate();
        const [submitted, setSubmitted] = useState(false);
        const [showButton, setShowButton] = useState(true);
        const {register, handleSubmit, formState: {errors}} = useForm({
            defaultValues: data,
            shouldUseNativeValidation: false
        });
        const editFormOptions = {
            id: {required: "ID is required"},
            name: {required: "Name is required"},
            email: {required: "Email is required"},
            phone: {required: "Phone is required"},
            state: {required: "State is required"}

        }
        const handleUpdate = (realtor) => {
            update(realtor);
            setSubmitted(true);
        }
        const handleCancel = () => {
            setShowModal(false);
            setSubHeading("All Realtor");
            navigate("realtor")
        }
        const handleClose = () => {
            setShowModal(false);
            setShowButton(true);
            setSubmitted(false);
            setReload(!reload);
            setSubHeading("All Realtor");
            navigate("/realtor")
        }
        useEffect(() => {
            if (!submitted || error != null) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        })
        return (
            <>
            </>
        );
    };
export default UpdateRealtor;