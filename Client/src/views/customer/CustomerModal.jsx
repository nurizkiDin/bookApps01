import React, { useState } from "react";
import {
    CButton, 
    CCol, 
    CContainer,
    CForm, 
    CFormGroup, 
    CFormText, 
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
import { useFormik } from "formik";

const CustomerModal = (props) => {
    const [mess, setMess] = useState("")
    const rowData = props.rowData
    const handleShowModal = () => {
        setMess("")
        props.handleShowModal()
    }

    const handleRefresh = () => {
        props.handleRefresh()
    }
    const validate = (values) => {
        const errors = {}
        values.firstName || (errors.firstName = "Required")
        values.lastName || (errors.lastName = "Required")
        if(!values.phoneNumber) {
            errors.phoneNumber = "Required"
        } else if(!/^[+-]?[0-9]+$/i.test(values.phoneNumber)) {
            errors.phoneNumber = "Invalid phone number"
        }
        if(!values.email) {
            errors.email = "Required"
        } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = "Invalid email address"
        }

        return errors
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: rowData.firstName || "",
            lastName: rowData.lastName || "",
            phoneNumber: rowData.phoneNumber || "",
            email: rowData.email || ""
        },
        validate,
        onSubmit: (values) => {
            save_data(values)
        }
    })
    async function save_data(values) {
        const token = props.token

        try {
            let response = null
            if (props.rowID === 0) {
                response = await axios.post("/customer/create", values, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
            } else {
                response = await axios.patch(`/customer/update/${props.rowID}`, values, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
            }

            if(response.data._id) {
                handleRefresh()
                handleShowModal()

                swal("Success", "Customer success saved", "success")
            }
        }
        catch(err) {
            setMess(err.response.data.message)
        }
    }

    return (
        <>
        <CModal show={props.display} onClose={handleShowModal}>
            <CModalHeader closeButton>Customer</CModalHeader>
            <CModalBody>
                <CContainer fluid>
                    <CRow>
                        <CCol sm="12">
                            <CForm onSubmit={formik.handleSubmit}>
                                <CFormGroup>
                                    <CLabel>First Name</CLabel>
                                    <CInput
                                        name="firstName"
                                        id="firstName"
                                        placeholder="Enter First Name..."
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                    />
                                    <p className="text-warning field_validate_label">
                                        {formik.errors.firstName ? formik.errors.firstName : null}
                                    </p>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Last Name</CLabel>
                                    <CInput
                                        name="lastName"
                                        id="lastName"
                                        placeholder="Enter Last Name..."
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                    />
                                    <p className="text-warning field_validate_label">
                                        {formik.errors.lastName ? formik.errors.lastName : null}
                                    </p>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Email</CLabel>
                                    <CInput
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Enter Email..."
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                    />
                                    <p className="text-warning field_validate_label">
                                        {formik.errors.email ? formik.errors.email : null}
                                    </p>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Phone Number</CLabel>
                                    <CInput
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        placeholder="Enter Phone Number..."
                                        value={formik.values.phoneNumber}
                                        onChange={formik.handleChange}
                                    />
                                    <p className="text-warning field_validate_label">
                                        {formik.errors.phoneNumber ? formik.errors.phoneNumber : null}
                                    </p>
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
                <CButton onClick={formik.handleSubmit} type="submit" color="info">
                    Save
                </CButton>
                {" "}
                <CButton color="secondary" onClick={handleShowModal}>
                    Cancel
                </CButton>
            </CModalFooter>
        </CModal>
        </>
    )
}

export default CustomerModal
