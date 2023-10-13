import React, { useState, useEffect } from "react";
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
    CRow, 
    CSelect
} from "@coreui/react";
import axios from "../../services/api"
import swal from "sweetalert";
import { useFormik } from "formik";

const FeatureModal = (props) => {
    const [mess, setMess] = useState("")
    const rowData = props.rowData
    const [image, setImage] = useState([])
    const [itemData, setItemData] = useState([])

    const handleShowModal = () => {
        setMess("")
        props.handleShowModal()
        if(document.getElementById("imageFeature")) {
            document.getElementById("imageFeature").value = ""
        }
    }

    const handleRefresh = () => {
        props.handleRefresh()
    }

    useEffect(() => {
        async function getData() {
            try {
                let { data } = await axios.get("/item/read", {
                    headers: {
                        Authorization: "Bearer " + props.token
                    }
                })
                setItemData(data)
            }
            catch(err) {
                setMess(err.response.data.message)
            }
        }

        getData()
    }, [props.token])

    const validate = (values) => {
        const errors = {}
        values.itemFeature || (errors.itemFeature = "Required")
        values.featureName || (errors.featureName = "Required")
        values.qty || (errors.qty = "Required")

        return errors
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            featureName: rowData.featureName || "",
            itemFeature: rowData.item ? rowData.item[0] : "",
            qty: rowData.qty || ""
        },
        validate,
        onSubmit: (values) => {
            const params = new FormData()
            params.append("featureName", values.featureName)
            params.append("item", values.itemFeature)
            params.append("qty", values.qty)

            if(image.length !== 0) {
                params.append("image", image)
            }
            save_data(params)
        }
    })
    async function save_data(params) {
        const token = props.token

        try {
            let response = null
            if (props.rowID === 0) {
                response = await axios.post("/item/feature/create", params, {
                    headers: {
                        Authorization: "Bearer " + token,
                        headers: { "content-type": "multipart/form-data" }
                    }
                })
            } else {
                response = await axios.patch(`/item/feature/update/${props.rowID}`, params, {
                    headers: {
                        Authorization: "Bearer " + token,
                        headers: { "content-type": "multipart/form-data" }
                    }
                })
            }

            if(response.data._id) {
                handleRefresh()
                handleShowModal()

                swal("Success", "Feature success saved", "success")
            }
        }
        catch(err) {
            setMess(err.response.data.message)
        }
    }

    return (
        <>
        <CModal show={props.display} onClose={handleShowModal}>
            <CModalHeader closeButton>Feature</CModalHeader>
            <CModalBody>
                <CContainer fluid>
                    <CRow>
                        <CCol sm="12">
                            <CForm onSubmit={formik.handleSubmit}>
                                <CFormGroup>
                                    <CLabel>Item</CLabel>
                                    <CSelect
                                        name="itemFeature"
                                        id="itemFeature"
                                        value={formik.values.itemFeature}
                                        onChange={formik.handleChange}
                                    >
                                        <option value="">Pilih Item</option>
                                        {itemData.map((item, i) => {
                                            return(
                                                <option key={i} value={item._id}>
                                                    {item.itemName}
                                                </option>
                                            )
                                        })}
                                    </CSelect>
                                    <p className="text-warning field_validate_label">
                                        {formik.errors.itemFeature ? formik.errors.itemFeature : null}
                                    </p>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Feature Name</CLabel>
                                    <CInput
                                        name="featureName"
                                        id="featureName"
                                        placeholder="Enter Feature Name..."
                                        value={formik.values.featureName}
                                        onChange={formik.handleChange}
                                    />
                                    <p className="text-warning field_validate_label">
                                        {formik.errors.featureName ? formik.errors.featureName : null}
                                    </p>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Quantity</CLabel>
                                    <CInput
                                        name="qty"
                                        id="qty"
                                        placeholder="Enter Feature Quantity..."
                                        value={formik.values.qty}
                                        onChange={formik.handleChange}
                                    />
                                    <p className="text-warning field_validate_label">
                                        {formik.errors.qty ? formik.errors.qty : null}
                                    </p>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Image Feature</CLabel>
                                    <CInput
                                        accept="image/**"
                                        type="file"
                                        name="imageFeature"
                                        id="imageFeature"
                                        onChange={(event) => {
                                            setImage(event.target.files[0])
                                        }}
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

export default FeatureModal
