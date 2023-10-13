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
    CSelect,
    CTextarea
} from "@coreui/react";
import axios from "../../services/api"
import swal from "sweetalert";
import { useFormik } from "formik";

const InfoModal = (props) => {
    const [mess, setMess] = useState("")
    const rowData = props.rowData
    const [image, setImage] = useState([])
    const [itemData, setItemData] = useState([])

    const handleShowModal = () => {
        setMess("")
        props.handleShowModal()
        if(document.getElementById("imageInfo")) {
            document.getElementById("imageInfo").value = ""
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
        values.infoName || (errors.infoName = "Required")
        values.item || (errors.item = "Required")
        values.type || (errors.type = "Required")
        values.isHighlight || (errors.isHighlight = "Required")
        values.descriptionInfo || (errors.descriptionInfo = "Required")

        return errors
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            infoName: rowData.infoName || "",
            item: rowData.item ? rowData.item[0]._id : "",
            type: rowData.type || "",
            isHighlight: rowData.isHighlight ? rowData.isHighlight.toString() : "false",
            descriptionInfo: rowData.description || ""
        },
        validate,
        onSubmit: (values) => {
            const params = new FormData()
            params.append("infoName", values.infoName)
            params.append("item", values.item)
            params.append("type", values.type)
            params.append("isHighlight", values.isHighlight)
            params.append("description", values.descriptionInfo)

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
                response = await axios.post("/item/info/create", values, {
                    headers: {
                        Authorization: "Bearer " + token,
                        headers: { "content-type": "multipart/form-data" }
                    }
                })
            } else {
                response = await axios.patch(`/item/info/update/${props.rowID}`, values, {
                    headers: {
                        Authorization: "Bearer " + token,
                        headers: { "content-type": "multipart/form-data" }
                    }
                })
            }

            if(response.data._id) {
                handleRefresh()
                handleShowModal()

                swal("Success", "Info success saved", "success")
            }
        }
        catch(err) {
            setMess(err.response.data.message)
        }
    }

    return (
        <>
        <CModal show={props.display} onClose={handleShowModal}>
            <CModalHeader closeButton>Info</CModalHeader>
            <CModalBody>
                <CContainer fluid>
                    <CRow>
                        <CCol sm="12">
                            <CForm onSubmit={formik.handleSubmit}>
                                <CFormGroup>
                                    <CLabel>Item</CLabel>
                                    <CSelect
                                        name="item"
                                        id="item"
                                        value={formik.values.item}
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
                                        {formik.errors.item ? formik.errors.item : null}
                                    </p>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Info Name</CLabel>
                                    <CInput
                                        name="infoName"
                                        id="infoName"
                                        placeholder="Enter Info Name..."
                                        value={formik.values.infoName}
                                        onChange={formik.handleChange}
                                    />
                                    <p className="text-warning field_validate_label">
                                        {formik.errors.infoName ? formik.errors.infoName : null}
                                    </p>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Type</CLabel>
                                    <CSelect
                                        name="type"
                                        id="type"
                                        value={formik.values.type}
                                        onChange={formik.handleChange}
                                    >
                                        <option value="">Pilih Type</option>
                                        <option value="Testimony">Testimony</option>
                                        <option value="NearBy">Near By</option>
                                    </CSelect>
                                    <p className="text-warning field_validate_label">
                                        {formik.errors.type ? formik.errors.type : null}
                                    </p>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Highlight</CLabel>
                                    <CSelect
                                        name="isHighlight"
                                        id="isHighlight"
                                        value={formik.values.isHighlight}
                                        onChange={formik.handleChange}
                                    >
                                        <option value="">Pilih Status Popular</option>
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </CSelect>
                                    <p className="text-warning field_validate_label">
                                        {formik.errors.isHighlight ? formik.errors.isHighlight : null}
                                    </p>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Description</CLabel>
                                    <CTextarea
                                        name="descriptionInfo"
                                        rows="3"
                                        id="descriptionInfo"
                                        placeholder="Enter Item Description..."
                                        value={formik.values.descriptionInfo}
                                        onChange={formik.handleChange}
                                    />
                                    <p className="text-warning field_validate_label">
                                        {formik.errors.descriptionInfo ? formik.errors.descriptionInfo : null}
                                    </p>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Image Info</CLabel>
                                    <CInput
                                        accept="image/**"
                                        type="file"
                                        name="imageInfo"
                                        id="imageInfo"
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
                <CButton color="secondary" onClick={handleShowModal}>
                    Cancel
                </CButton>
            </CModalFooter>
        </CModal>
        </>
    )
}

export default InfoModal
