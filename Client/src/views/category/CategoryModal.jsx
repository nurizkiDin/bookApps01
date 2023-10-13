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

const CategoryModal = (props) => {
    const [mess, setMess] = useState("")
    const handleShowModal = () => {
        setMess("")
        props.handleShowModal()
    }

    const handleRefresh = () => {
        props.handleRefresh()
    }
    const validate = (values) => {
        const errors = {}
        values.categoryName || (errors.categoryName = "Required")

        return errors
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            categoryName: props.rowData.categoryName || ""
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
                response = await axios.post("/category/create", values, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
            } else {
                response = await axios.patch(`/category/update/${props.rowID}`, values, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
            }

            if(response.data._id) {
                handleRefresh()
                handleShowModal()

                swal("Success", "Category success saved", "success")
            }
        }
        catch(err) {
            setMess(err.response.data.message)
        }
    }

    return (
        <>
        <CModal show={props.display} onClose={handleShowModal}>
            <CModalHeader closeButton>Category</CModalHeader>
            <CModalBody>
                <CContainer fluid>
                    <CRow>
                        <CCol sm="12">
                            <CForm onSubmit={formik.handleSubmit}>
                                <CFormGroup>
                                    <CLabel>Category Name</CLabel>
                                    <CInput
                                        name="categoryName"
                                        id="categoryName"
                                        placeholder="Enter Category Name..."
                                        value={formik.values.categoryName}
                                        onChange={formik.handleChange}
                                    />
                                    <p className="text-warning field_validate_label">
                                        {formik.errors.categoryName ? formik.errors.categoryName : null}
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

export default CategoryModal
