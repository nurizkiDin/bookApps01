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
import BookingModal from "./BookingModal";
import dateFormat from "dateformat";
import { numberFormat } from "../../services/numberFormat"

const Booking = () => {
    const token = JSON.parse(localStorage.getItem("token"))
    const [showModal, setShowModal] = useState(false)
    const history = useHistory()
    const [bookingData, setBookingData] = useState([])
    const [status, setStatus] = useState(0)
    const [rowID, setRowID] = useState([])

    const fields = [
        "invoice",
        "startDate",
        "endDate",
        "Total",
        "Item",
        "paymentsStatus",
        "Actions"
    ]
    const ForceRedirect = () => {
        history.push("/admin/dashboard")
    }
    function handleRefresh() {
        setStatus(status + 1)
    }
    function handleAction(id) {
        setRowID(id)
        handleShowModal()
    }
    function handleShowModal() {
        setShowModal(!showModal)
    }

    const deleteRow = (rowID) => {
        axios.delete("/booking/delete/" + rowID, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            handleRefresh()
            swal("Success", res.data.message, "success")
        }).catch((err) => {
            ForceRedirect()
            swal("Failed to delete!", err.response.data.message)
        })
    }

    useEffect(() => {
        async function getData() {
            try {
                let { data } = await axios.get("/booking/read", {
                    headers: {
                        Authorization : "Bearer " + token
                    }
                })
                setBookingData(data)
            }
            catch(err) {
                swal(err.response.data.message)
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
                            Add New Booking
                        </CButton>
                        <BookingModal
                            display={showModal}
                            handleShowModal={handleShowModal}
                            handleRefresh={handleRefresh}
                            token={token}
                            rowID={rowID}
                        />
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={bookingData}
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
                                            {item.item.name}
                                        </td>
                                    )
                                },
                                'paymentsStatus' : (item) => {
                                    return (
                                        <td className="py-2">
                                            {item.payments.status}
                                        </td>
                                    )
                                },
                                'startDate' : (item) => {
                                    return (
                                        <td className="py-2">
                                            {dateFormat(item.bookingStartDate, "mmmm dd yyyy")}
                                        </td>
                                    )
                                },
                                'endDate' : (item) => {
                                    return (
                                        <td className="py-2">
                                            {dateFormat(item.bookingEndDate, "mmmm dd yyyy")}
                                        </td>
                                    )
                                },
                                'Total' : (item) => {
                                    return (
                                        <td className="py-2">
                                            {numberFormat(item.total)}
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

export default Booking;