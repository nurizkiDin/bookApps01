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
// import '../../scss/style.scss'

const Category = () => {
    const token = JSON.parse(localStorage.getItem("token"))
    const history = useHistory()
    const [categoryData, setCategoryData] = useState([])
    const [status, setStatus] = useState(0)
    // const [rowID, setRowID] = useState([])
    // const [rowData, setRowData] = useState([])

    const fields = [
        { key : "categoryName", _style: { width: "80%" } }, "Actions"
    ]
    const ForceRedirect = () => {
        localStorage.clear()
        history.push("/admin/login")
    }
    function handleRefresh() {
        setStatus(status + 1)
    }
    // function handleAction(id, item) {
    //     setRowID(id)
    //     setRowData(item)
    // }

    const deleteRow = (rowID) => {
        axios.delete("/category/delete/" + rowID, {
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
                let { data } = await axios.get("/category/read", {
                    headers: {
                        Authorization : "Bearer " + token
                    }
                })
                setCategoryData(data)
            }
            catch(err) {
                if(err.response.status === 403) {
                    ForceRedirect()
                }
            }
        }
        getData()
    }, [status])

    return (
        <CRow>
            <CCol sm="12">
                <CCard>
                    <CCardHeader>
                        <CButton color="primary" size="sm" className="m-2">
                            Add New Category
                        </CButton>
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={categoryData}
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
                                                // onClick={(e) => {
                                                //     handleAction(item._id, item)
                                                // }}
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

export default Category;