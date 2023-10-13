import React, { useEffect, useState } from "react";
import {
    CButton, 
    CCard,
    CCardBody, 
    CCardHeader, 
    CCol, 
    CDataTable, 
    CRow 
} from "@coreui/react";
import axios from "../../services/api"
import { useHistory } from "react-router-dom/cjs/react-router-dom";
// import ForceRedirect from "../component/ForceRedirect";
import CIcon from "@coreui/icons-react";
import swal from "sweetalert";
import FeatureModal from "./FeatureModal";

const Feature = () => {
    const token = JSON.parse(localStorage.getItem("token"))
    const [showModal, setShowModal] = useState(false)
    const history = useHistory()
    const [featureData, setFeatureData] = useState([])
    const [status, setStatus] = useState(0)
    const [rowID, setRowID] = useState([])
    const [rowData, setRowData] = useState([])

    const fields = [
        "Item",
        "featureName",
        "qty",
        "Logo",
        "Actions"
    ]
    const ForceRedirect = () => {
        localStorage.clear()
        history.push("/admin/login")
    }
    function handleRefresh() {
        setStatus(status + 1)
    }
    function handleAction(id, feature) {
        setRowID(id)
        setRowData(feature)
        handleShowModal()
    }
    function handleShowModal() {
        setShowModal(!showModal)
        if(document.getElementById("image")) {
            document.getElementById("image").value = ""
        }
    }

    const deleteRow = (rowID) => {
        axios.delete("/item/feature/delete/" + rowID, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            handleRefresh()
            swal("Success", res.data.message, "success")
        }).catch((err) => {
            // console.log(err.response.data)
            swal("Failed to delete!", err.response.data)
        })
    }

    useEffect(() => {
        async function getData() {
            try {
                let { data } = await axios.get("/item/feature/read", {
                    headers: {
                        Authorization : "Bearer " + token
                    }
                })
                setFeatureData(data)
            }
            catch(err) {
                ForceRedirect()
            }
        }
        getData()
        // eslint-disable-next-line
    }, [status])

    return (
        <CRow>
            <CCol sm="12">
                <CCard>
                    <CCardHeader>
                        <CButton onClick={() => handleAction(0, [])} color="primary" size="sm" className="m-2">
                            Add New Feature
                        </CButton>
                        <FeatureModal
                            display={showModal}
                            handleShowModal={handleShowModal}
                            handleRefresh={handleRefresh}
                            token={token}
                            rowData={rowData}
                            rowID={rowID}
                        />
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={featureData}
                            fields={fields}
                            tableFilter
                            footer
                            itemsPerPage={5}
                            itemsPerPageSelect
                            hover
                            sorter
                            pagination
                            scopedSlots={{
                                'Item' : (item) => {
                                    return (
                                        <td className="py-2">
                                            {item.item[0] ? item.item[0].itemName : "No Item Related"}
                                        </td>
                                    )
                                },
                                'Logo' : (item) => {
                                    return (
                                        <td className="py-2">
                                            <div>
                                                <img
                                                    className="size_image_table"
                                                    src={"http://localhost:3001/" + item.imageUrl}
                                                    alt={item.imageUrl}
                                                />
                                            </div>
                                        </td>
                                    )
                                },
                                'Actions' : (item) => {
                                    return (
                                        <td className="py-2">
                                            <CButton
                                                size="sm"
                                                onClick={() => {
                                                    handleAction(item._id, item)
                                                }}
                                            >
                                                <CIcon className="action_edit" name={"cilPencil"} />
                                            </CButton>
                                            <CButton
                                                size="sm"
                                                onClick={() => {
                                                    if(window.confirm("Are you sure delete this data ?")) {
                                                        deleteRow(item._id)
                                                    }
                                                }}
                                            >
                                                <CIcon className="action_delete" name={"cilTrash"} />
                                            </CButton>
                                        </td>
                                    )
                                }
                            }}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

export default Feature;