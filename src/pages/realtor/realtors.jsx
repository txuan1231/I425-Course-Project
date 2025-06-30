import { useEffect, useState } from 'react';
import UseFetch from "../../services/useFetch";
import JSONPretty from 'react-json-pretty';
import CreateRealtor from './createRealtor';
import UpdateRealtor from './updateRealtor';
import DeleteRealtor from './deleteRealtor';
import "/src/assets/css/realtor.css";

const Realtors = () => {
    const { error, isLoading, data: realtors, getAll, search } = UseFetch();

    const [subHeading, setSubHeading] = useState("All Realtors");
    const [reload, setReload] = useState(false);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedRealtor, setSelectedRealtor] = useState(null);

    useEffect(() => {
        getAll();
    }, [reload]);

    const handleSearch = (e) => {
        e.preventDefault();
        const term = document.getElementById("realtor-search-term").value;
        if (term === '') {
            setSubHeading("All Realtors");
        } else if (isNaN(term)) {
            setSubHeading("Realtors containing '" + term + "'");
        }
        search(term);
    };

    const clearSearchBox = (e) => {
        e.preventDefault();
        document.getElementById("realtor-search-term").value = "";
        search("");
        setSubHeading("All Realtors");
    };

    const handleEdit = (realtor) => {
        setSelectedRealtor(realtor);
        setShowEditModal(true);
    };

    const handleDelete = (realtor) => {
        setSelectedRealtor(realtor);
        setShowDeleteModal(true);
    };

    return (
        <>
            <div className="main-heading">
                <div className="container">Realtor</div>
            </div>
            <div className="sub-heading">
                <div className="container">{subHeading}</div>
            </div>
            <div className="main-content container">
                <div style={{ textAlign: "right", marginBottom: "10px" }}>
                    <button className="button-dark" onClick={() => setShowCreateModal(true)}>+ Create Realtor</button>
                </div>

                {error && <JSONPretty data={error}></JSONPretty>}

                {isLoading &&
                    <div className="image-loading">
                        Please wait while data is being loaded
                        <img src="/src/assets/img/loading.gif" alt="Loading ..." />
                    </div>
                }

                {realtors &&
                    <div className="realtor-container">
                        <form style={{ textAlign: "right", marginBottom: "3px" }} onSubmit={handleSearch}>
                            <input id="realtor-search-term" placeholder="Enter search terms" />
                            <button type="submit" className="button-light" style={{ marginLeft: "5px" }}>Search</button>
                            <button className="button-light" style={{ marginLeft: "5px" }} onClick={clearSearchBox}>Clear</button>
                        </form>
                        <div className="realtor-row realtor-row-header">
                            <div className="realtor-info">
                                <div className="realtor-name">Name</div>
                                <div className="realtor-phone">Phone</div>
                                <div className="realtor-email">Email</div>
                                <div className="realtor-state">State</div>
                            </div>
                            <div className="realtor-buttons" style={{ textAlign: "center" }}>Actions</div>
                        </div>
                        {Array.isArray(realtors) && realtors.map((realtor) => (
                            <div key={realtor.id} className="realtor-row">
                                <div className="realtor-info">
                                    <div id={"realtor-name-" + realtor.id} className="realtor-name">{realtor.realtor_name}</div>
                                    <div id={"realtor-phone-" + realtor.id} className="realtor-phone">{realtor.phone}</div>
                                    <div id={"realtor-email-" + realtor.id} className="realtor-email">{realtor.email}</div>
                                    <div id={"realtor-state-" + realtor.id} className="realtor-state">{realtor.state}</div>
                                </div>
                                <div className="realtor-buttons">
                                    <button className="button-light" onClick={() => handleEdit(realtor)}>Edit</button>
                                    <button className="button-light" onClick={() => handleDelete(realtor)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>

            {/* Modals */}
            <CreateRealtor
                showModal={showCreateModal}
                setShowModal={setShowCreateModal}
                reload={reload}
                setReload={setReload}
                setSubHeading={setSubHeading}
            />
            {selectedRealtor &&
                <UpdateRealtor
                    showModal={showEditModal}
                    setShowModal={setShowEditModal}
                    data={selectedRealtor}
                    reload={reload}
                    setReload={setReload}
                    setSubHeading={setSubHeading}
                />
            }
            {selectedRealtor &&
                <DeleteRealtor
                    showModal={showDeleteModal}
                    setShowModal={setShowDeleteModal}
                    data={selectedRealtor}
                    reload={reload}
                    setReload={setReload}
                    setSubHeading={setSubHeading}
                />
            }
        </>
    );
};

export default Realtors;
