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

const BankModal = (props) => {
    const [mess, setMess] = useState("")
    const rowData = props.rowData
    const [image, setImage] = useState([])
    const handleShowModal = () => {
        setMess("")
        props.handleShowModal()
        setImage("")
        if(document.getElementById("image")) {
            document.getElementById("image").value = ""
        }
    }

    const handleRefresh = () => {
        props.handleRefresh()
    }
    const validate = (values) => {
        const errors = {}
        values.bankName || (errors.bankName = "Required")
        values.accountNumber || (errors.accountNumber = "Required")
        values.accountHolder || (errors.accountHolder = "Required")

        return errors
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            bankName: rowData.bankName || "",
            accountNumber: rowData.accountNumber || "",
            accountHolder: rowData.accountHolder || ""
        },
        validate,
        onSubmit: (values) => {
            const params = new FormData()
            params.append("bankName", values.bankName)
            params.append("accountNumber", values.accountNumber)
            params.append("accountHolder", values.accountHolder)
            if(image.length !== 0) {
                params.append("image", image)
            }

            save_data(params)
        }
    })
    async function save_data(values) {
        const token = props.token

        try {
            let response = null
            if (props.rowID === 0) {
                response = await axios.post("/bank/create", values, {
                    headers: {
                        Authorization: "Bearer " + token,
                        headers: {
                            "content-type": "multipart/form-data"
                        }
                    }
                })
            } else {
                response = await axios.patch(`/bank/update/${props.rowID}`, values, {
                    headers: {
                        Authorization: "Bearer " + token,
                        headers: {
                            "content-type": "multipart/form-data"
                        }
                    }
                })
            }

            if(response.data._id) {
                handleRefresh()
                handleShowModal()

                swal("Success", "Bank success saved", "success")
            }
        }
        catch(err) {
            setMess(err.response.data.message)
        }
    }

    return (
        <>
        <CModal show={props.display} onClose={handleShowModal}>
            <CModalHeader closeButton>Bank</CModalHeader>
            <CModalBody>
                <CContainer fluid>
                    <CRow>
                        <CCol sm="12">
                            <CForm onSubmit={formik.handleSubmit}>
                                <CFormGroup>
                                    <CLabel>Bank Name</CLabel>
                                    <CInput
                                        name="bankName"
                                        id="bankName"
                                        placeholder="Enter Bank Name..."
                                        value={formik.values.bankName}
                                        onChange={formik.handleChange}
                                    />
                                    <p className="text-warning field_validate_label">
                                        {formik.errors.bankName ? formik.errors.bankName : null}
                                    </p>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Account Holder</CLabel>
                                    <CInput
                                        name="accountHolder"
                                        id="accountHolder"
                                        placeholder="Enter Account Holder..."
                                        value={formik.values.accountHolder}
                                        onChange={formik.handleChange}
                                    />
                                    <p className="text-warning field_validate_label">
                                        {formik.errors.accountHolder ? formik.errors.accountHolder : null}
                                    </p>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Account Number</CLabel>
                                    <CInput
                                        name="accountNumber"
                                        id="accountNumber"
                                        placeholder="Enter Account Number..."
                                        value={formik.values.accountNumber}
                                        onChange={formik.handleChange}
                                    />
                                    <p className="text-warning field_validate_label">
                                        {formik.errors.accountNumber ? formik.errors.accountNumber : null}
                                    </p>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Logo Bank</CLabel>
                                    <CInput
                                        accept="image/**"
                                        name="image"
                                        id="image"
                                        type="file"
                                        onChange={(event) => {
                                            setImage(event.target.files[0])
                                        }}
                                    />
                                    <p className="text-warning field_validate_label">
                                        {formik.errors.image ? formik.errors.image : null}
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

export default BankModal
