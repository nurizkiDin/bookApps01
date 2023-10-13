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

const UserModal = (props) => {
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
        values.userName || (errors.firstName = "Required")
        values.role || (errors.lastName = "Required")

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
            userName: rowData.userName || "",
            role: rowData.role || "",
            password: "",
            passwordConfirm: "",
            email: rowData.email || ""
        },
        validate,
        onSubmit: (values) => {
            if(values.password === "" || values.passwordConfirm === "") {
                delete values.password
                delete values.passwordConfirm
                save_data(values)
            } else {
                save_data(values)
            }
        }
    })
    async function save_data(values) {
        const token = props.token

        try {
            let response = null
            if (props.rowID === 0) {
                response = await axios.post("/user/create", values, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
            } else {
                response = await axios.patch(`/user/update/${props.rowID}`, values, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
            }

            if(response.data._id) {
                handleRefresh()
                handleShowModal()

                swal("Success", "User success saved", "success")
            }
        }
        catch(err) {
            setMess(err.response.data.message)
        }
    }

    return (
        <>
        <CModal show={props.display} onClose={handleShowModal}>
            <CModalHeader closeButton>User</CModalHeader>
            <CModalBody>
                <CContainer fluid>
                    <CRow>
                        <CCol sm="12">
                            <CForm onSubmit={formik.handleSubmit}>
                                <CFormGroup>
                                    <CLabel>User Name</CLabel>
                                    <CInput
                                        name="userName"
                                        id="userName"
                                        placeholder="Enter User Name..."
                                        value={formik.values.userName}
                                        onChange={formik.handleChange}
                                    />
                                    <p className="text-warning field_validate_label">
                                        {formik.errors.userName ? formik.errors.userName : null}
                                    </p>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Role</CLabel>
                                    <CInput
                                        name="role"
                                        id="role"
                                        placeholder="Enter Role..."
                                        value={formik.values.role}
                                        onChange={formik.handleChange}
                                    />
                                    <p className="text-warning field_validate_label">
                                        {formik.errors.role ? formik.errors.role : null}
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
                                    <CLabel>Password</CLabel>
                                    <CInput
                                        type="password"
                                        name="password"
                                        id="password"
                                        autoComplete="off"
                                        placeholder="Enter Password..."
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                    />
                                    <p className="text-warning field_validate_label">
                                        {formik.errors.password ? formik.errors.password : null}
                                    </p>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Password Confirm</CLabel>
                                    <CInput
                                        type="password"
                                        name="passwordConfirm"
                                        id="passwordConfirm"
                                        autoComplete="off"
                                        placeholder="Enter Password Confirm..."
                                        value={formik.values.passwordConfirm}
                                        onChange={formik.handleChange}
                                    />
                                    <p className="text-warning field_validate_label">
                                        {formik.errors.passwordConfirm ? formik.errors.passwordConfirm : null}
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

export default UserModal
