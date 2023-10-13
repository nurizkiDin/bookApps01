import React, { useEffect, useState } from "react";
import {
    CButton, 
    CCol, 
    CContainer,
    CForm, 
    CFormGroup, 
    CFormText, 
    CImg, 
    CInput, 
    CLabel, 
    CModal, 
    CModalBody, 
    CModalFooter, 
    CModalHeader, 
    CRow 
} from "@coreui/react";
import axios from "../../services/api"
import swal from "sweetalert";
import { numberFormat } from "../../services/numberFormat"
import dateFormat from "dateformat";

const BookingModal = (props) => {
    const [mess, setMess] = useState("")
    const [bookingDataDetail, setBookingDataDetail] = useState({})

    const handleShowModal = () => {
        setMess("")
        props.handleShowModal()
    }

    const handleRefresh = () => {
        props.handleRefresh()
    }

    useEffect(() => {
        async function getData() {
            const ID = await props.rowID
            try {
                let { data } = await axios.get(`/booking/read/${ID}`, {
                    headers: {
                        Authorization: "Bearer " + props.token
                    }
                })

                setBookingDataDetail(data)
            }
            catch(err) {
                swal("Something went wrong", "Failed to load data", "danger")
            }
        }
        getData()
        // eslint-disable-next-line
    }, [props.rowID])

    async function Confirmation(status) {
        const token = props.token

        try {
            let response = null
            if(status === true) {
                response = await axios.put(`/booking/accept/${props.rowID}`, {}, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
            }
            if(status === false) {
                response = await axios.put(`/booking/reject/${props.rowID}`, {}, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
            }

            if(response.data._id) {
                handleRefresh()
                handleShowModal()
                swal("success", "Booking Success Updated", "success")
            }
        }
        catch(err) {
            setMess(err.response.data.message)
        }
    }

    return (
        <>
        <CModal show={props.display} onClose={handleShowModal}>
            <CModalHeader closeButton>Booking</CModalHeader>
            <CModalBody>
                <CContainer fluid>
                    <CRow>
                        <CCol sm="12">
                            <CForm>
                                <CFormGroup>
                                    <CLabel>Invoice</CLabel>
                                    <CInput
                                        id="bookingName"
                                        value={bookingDataDetail.invoice}
                                        disabled
                                    />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Item</CLabel>
                                    <CInput
                                        id="item"
                                        value={bookingDataDetail.item ? bookingDataDetail.item.name : ""}
                                        disabled
                                    />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Date</CLabel>
                                    <CInput
                                        id="date"
                                        value={
                                            dateFormat(bookingDataDetail.bookingStartDate, "mmmm dd yyyy") + 
                                            " - " +
                                            dateFormat(bookingDataDetail.bookingEndDate, "mmmm dd yyyy")
                                        }
                                        disabled
                                    />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Unit Booked</CLabel>
                                    <CInput
                                        name="booked"
                                        id="booked"
                                        value={
                                            bookingDataDetail.item ? bookingDataDetail.item.booked : ""
                                        }
                                        disabled
                                    />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Total IDR</CLabel>
                                    <CInput
                                        name="total"
                                        id="total"
                                        value={numberFormat(bookingDataDetail.total)}
                                        disabled
                                    />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Data Customer</CLabel>
                                    <CInput
                                        id="customer"
                                        value={
                                            bookingDataDetail.customer ? 
                                            "name : " + bookingDataDetail.customer[0].firstName + 
                                            "name : " + bookingDataDetail.customer[0].lastName + 
                                            "name : " + bookingDataDetail.customer[0].email + 
                                            "name : " + bookingDataDetail.customer[0].phoneNumber 
                                            : ""
                                        }
                                        disabled
                                    />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Payment Info</CLabel>
                                    <CInput
                                        id="payment"
                                        value={
                                            bookingDataDetail.payments ? 
                                            "name : " + bookingDataDetail.payments.accountHolder + 
                                            "name : " + bookingDataDetail.payments.bankFrom + 
                                            "name : " + bookingDataDetail.payments.status 
                                            : ""
                                        }
                                        disabled
                                    />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Proof Payment</CLabel>
                                    <CImg
                                        id="imagePayment"
                                        className="proofPayment"
                                        src={
                                            `http://localhost:3001/${
                                                bookingDataDetail.payments ? 
                                                bookingDataDetail.payments.proofPayment : ""
                                            }`
                                        }
                                        disabled
                                    />
                                </CFormGroup>
                            </CForm>
                        </CCol>
                    </CRow>
                    <CFormText className="help-block" color="danger">
                        {mess}
                    </CFormText>
                </CContainer>
            </CModalBody>
            <CModalFooter>
                <CButton onClick={(e) => Confirmation(true)} color="info">
                    Accept
                </CButton>
                <CButton onClick={(e) => Confirmation(false)} color="danger">
                    Reject
                </CButton>
                <CButton color="secondary" onClick={handleShowModal}>
                    Cancel
                </CButton>
            </CModalFooter>
        </CModal>
        </>
    )
}

export default BookingModal
