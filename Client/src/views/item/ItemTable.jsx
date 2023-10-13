import React, { useEffect, useState } from "react";
import {
    CButton, 
    CCard,
    CCardBody, 
    CCardHeader, 
    CCol, 
    CDataTable, 
    CLink, 
    CRow 
} from "@coreui/react";
import axios from "../../services/api"
import { useHistory } from "react-router-dom/cjs/react-router-dom";
// import ForceRedirect from "../component/ForceRedirect";
import CIcon from "@coreui/icons-react";
import swal from "sweetalert";
import ItemModal from "./ItemModal";

const ItemTable = () => {
    const token = JSON.parse(localStorage.getItem("token"))
    const [showModal, setShowModal] = useState(false)
    const history = useHistory()
    const [itemData, setItemData] = useState([])
    const [status, setStatus] = useState(0)
    const [rowID, setRowID] = useState([])
    const [rowData, setRowData] = useState([])

    const fields = [
        "category",
        "itemName",
        "unit",
        "location",
        "itemPrice",
        "isPopular",
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
        axios.delete("/item/delete/" + rowID, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            handleRefresh()
            swal("Success", res.data.message, "success")
        }).catch((err) => {
            swal("Failed to delete!", err.response.data)
        })
    }

    useEffect(() => {
        async function getData() {
            try {
                let { data } = await axios.get("/item/read", {
                    headers: {
                        Authorization : "Bearer " + token
                    }
                })
                setItemData(data)
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
                            Add New Item
                        </CButton>
                        <ItemModal
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
                            items={itemData}
                            fields={fields}
                            tableFilter
                            footer
                            itemsPerPage={5}
                            itemsPerPageSelect
                            hover
                            sorter
                            pagination
                            scopedSlots={{
                                'category' : (item) => {
                                    return (
                                        <td className="py-2">
                                            {item.category.categoryName}
                                        </td>
                                    )
                                },
                                'Actions' : (item) => {
                                    return (
                                        <td className="py-2">
                                            <CLink to={`/admin/image/${item._id}`}>
                                                <CIcon className="action_view" name="cilImage" />
                                            </CLink>
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

export default ItemTable;