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
import UserModal from "./UserModal";

const User = () => {
    const token = JSON.parse(localStorage.getItem("token"))
    const [showModal, setShowModal] = useState(false)
    const history = useHistory()
    const [userData, setUserData] = useState([])
    const [status, setStatus] = useState(0)
    const [rowID, setRowID] = useState([])
    const [rowData, setRowData] = useState([])

    const fields = [
        "userName",
        "role",
        "email",
        "Actions"
    ]
    const ForceRedirect = () => {
        localStorage.clear()
        history.push("/admin/login")
    }
    function handleRefresh() {
        setStatus(status + 1)
    }
    function handleAction(id, item) {
        setRowID(id)
        setRowData(item)
        handleShowModal()
    }
    function handleShowModal() {
        setShowModal(!showModal)
    }

    const deleteRow = (rowID) => {
        axios.delete("/user/delete/" + rowID, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            handleRefresh()
            swal("Success", res.data.message, "success")
        }).catch((err) => {
            // console.log(err.response.data)
            swal("Failed to delete!", err.response.data.message)
        })
    }

    useEffect(() => {
        async function getData() {
            try {
                let { data } = await axios.get("/user/read", {
                    headers: {
                        Authorization : "Bearer " + token
                    }
                })
                setUserData(data)
            }
            catch(err) {
                ForceRedirect()
                console.log(err.response.data)
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
                            Add New User
                        </CButton>
                        <UserModal
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
                            items={userData}
                            fields={fields}
                            tableFilter
                            footer
                            itemsPerPage={5}
                            itemsPerPageSelect
                            hover
                            sorter
                            pagination
                            scopedSlots={{
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

export default User;