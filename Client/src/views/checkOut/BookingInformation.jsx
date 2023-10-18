import React, { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { useFormik } from "formik";
import { numberFormat } from "../../services/numberFormat";
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CInput,
    CLabel,
    CRow
} from "@coreui/react";
import "react-phone-input-2/lib/style.css"
import PhoneInput from "react-phone-input-2";

const BookingInformation = ({ itemBooked, refresh }) => {
    const [phone, setPhone] = useState("")
    const [textDate, setTextDate] = useState("")

    const handleChangePhone = (value) => {
        setPhone(value)
    }

    const {
        unit,
        booked,
        bookedFooter,
        itemName,
        itemPrice,
        dateInput,
        dateInputFooter,
        endDate,
        image,
        location
    } = itemBooked

    const validate = (value) => {
        const errors = {}
        value.firstName || (errors.firstName = "Required")
        value.lastName || (errors.lastName = "Required")
        phone || (errors.phoneNumber = "Required")
        if(!value.email) {
            errors.email = "Required"
        } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
            errors.email = "Invalid Email Address"
        }

        return errors
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: ""
        },
        validate,
        onSubmit: (values) => {
            startPayment(values)
        }
    })
    async function startPayment(values) {
        const infoUser = Object.assign(values, { phoneNumber: phone })
        const update = Object.assign(itemBooked, infoUser)
        localStorage.setItem("itemBooked", JSON.stringify(update))
        refresh()
    }

    useEffect(() => {
        function setData() {
            if(booked == null || dateInput == null) {
                itemBooked.booked = bookedFooter
                itemBooked.dateInput = dateInputFooter
                delete itemBooked.bookedFooter
                delete itemBooked.dateInputFooter
            }
            if(new Date(endDate) > new Date(dateInput)) {
                setTextDate(dateInput + " -> " + endDate.substring(0, 10))
            } else {
                setTextDate(dateInput)
            }
        }

        setData()
    })

    return(
        <Fade>
            <CRow>
                <CCol className="col-12 col-sm-12 col-md-6">
                    <CCard>
                        <CCardHeader>
                            {itemName}
                            <div className="float-right">
                                Location : {location}
                            </div>
                        </CCardHeader>
                        <CCardBody className="text-center">
                            <img
                                style={{width: "50%"}}
                                src={`http://localhost:3001/${image.imageUrl}`}
                                alt={image.imageUrl}
                            />
                        </CCardBody>
                        <CCardFooter className="font-weight-bold">
                            Date Booking : {textDate}
                            <div className="float-right">
                                Total : {numberFormat(itemPrice * (booked ? booked : bookedFooter))}
                                For {(booked ? booked : bookedFooter)} {unit}
                            </div>
                        </CCardFooter>
                    </CCard>
                </CCol>
                <CCol className="col-12 col-sm-12 col-md-6">
                    <CCard>
                        <CCardHeader>Form Customer</CCardHeader>
                        <CCardBody>
                            <CLabel>First Name</CLabel>
                            <CInput
                                name="firstName"
                                id="firstName"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.firstName ? (
                                <p className="text-danger">{formik.errors.firstName}</p>
                            ) : ("")}
                            <CLabel>Last Name</CLabel>
                            <CInput
                                name="lastName"
                                id="lastName"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.lastName ? (
                                <p className="text-danger">{formik.errors.lastName}</p>
                            ) : ("")}
                            <CLabel>Email</CLabel>
                            <CInput
                                name="email"
                                id="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.email ? (
                                <p className="text-danger">{formik.errors.email}</p>
                            ) : ("")}
                            <CLabel>Phone Number</CLabel>
                            <PhoneInput
                                name="phoneNumber"
                                id="phoneNumber"
                                value={formik.values.phoneNumber}
                                onChange={handleChangePhone}
                            />
                            {formik.errors.phoneNumber ? (
                                <p className="text-danger">{formik.errors.phoneNumber}</p>
                            ) : ("")}
                        </CCardBody>
                        <CCardFooter>
                            <CButton
                                variant="outline"
                                color="info"
                                block
                                onClick={formik.handleSubmit}
                            >
                                Continue To Payment
                            </CButton>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
        </Fade>
    )
}

export default BookingInformation;
