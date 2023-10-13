import React, { useEffect, useState } from "react";
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

const ItemModal = (props) => {
    const [mess, setMess] = useState("")
    const rowData = props.rowData
    const [image, setImage] = useState([])
    const [categoryData, setCategoryData] = useState([])

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

    useEffect(() => {
        async function getData() {
            try {
                let { data } = await axios.get("/category/read", {
                    headers: {
                        Authorization: "Bearer " + props.token
                    }
                })
                setCategoryData(data)
            }
            catch(err) {
                setMess(err.response.data.message)
            }
        }

        getData()
    }, [props.token])

    const validate = (values) => {
        const errors = {}
        values.itemName || (errors.itemName = "Required")
        values.itemPrice || (errors.itemPrice = "Required")
        values.unit || (errors.unit = "Required")
        values.location || (errors.location = "Required")
        values.description || (errors.description = "Required")
        values.category || (errors.category = "Required")
        values.isPopular || (errors.isPopular = "Required")

        return errors
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            itemName: rowData.itemName || "",
            itemPrice: rowData.itemPrice || "",
            unit: rowData.unit || "",
            location: rowData.location || "",
            isPopular: rowData.isPopular ? rowData.isPopular.toString() : "false",
            description: rowData.description || "",
            category: rowData.category ? rowData.category._id : ""
        },
        validate,
        onSubmit: (values) => {
            const params = new FormData()
            params.append("itemName", values.itemName)
            params.append("category", values.category)
            params.append("itemPrice", values.itemPrice)
            params.append("unit", values.unit)
            params.append("location", values.location)
            params.append("isPopular", values.isPopular)
            params.append("description", values.description)

            if(image.length !== 0) {
                for(let i = 0; i < image.length; i++) {
                    params.append("image", image[i])
                }
            }

            save_data(params, values)
        }
    })
    async function save_data(params, values) {
        const token = props.token

        try {
            let response = null
            if (props.rowID === 0) {
                response = await axios.post("/item/create", params, {
                    headers: {
                        Authorization: "Bearer " + token,
                        headers: {
                            "content-type": "multipart/form-data"
                        }
                    }
                })
            } else {
                response = await axios.patch(`/item/update/${props.rowID}`, values, {
                    headers: {
                        Authorization: "Bearer " + token,
                        headers: {
                            "content-type": "application/x-www-form-urlencoded"
                        }
                    }
                })
            }

            if(response.data._id) {
                handleRefresh()
                handleShowModal()

                swal("Success", "Item success saved", "success")
            }
        }
        catch(err) {
            setMess(err.response.data.message)
        }
    }

    return (
        <>
        <CModal show={props.display} onClose={handleShowModal}>
            <CModalHeader closeButton>Item</CModalHeader>
            <CModalBody>
                <CContainer fluid>
                    <CRow>
                        <CCol sm="12">
                            <CForm onSubmit={formik.handleSubmit}>
                                <CFormGroup>
                                    <CLabel>Category</CLabel>
                                    <CSelect
                                        name="category"
                                        id="category"
                                        placeholder="Enter Category..."
                                        value={formik.values.category}
                                        onChange={formik.handleChange}
                                    >
                                        <option value="">Pilih Category</option>
                                        {categoryData.map((category, i) => {
                                            return(
                                                <option key={i} value={category._id}>
                                                    {category.categoryName}
                                                </option>
                                            )
                                        })}
                                    </CSelect>
                                    <p className="text-warning field_validate_label">
                                        {formik.errors.category ? formik.errors.category : null}
                                    </p>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Item Name</CLabel>
                                    <CInput
                                        name="itemName"
                                        id="itemName"
                                        placeholder="Enter Item Name..."
                                        value={formik.values.itemName}
                                        onChange={formik.handleChange}
                                    />
                                    <p className="text-warning field_validate_label">
                                        {formik.errors.itemName ? formik.errors.itemName : null}
                                    </p>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Item Price</CLabel>
                                    <CInput
                                        name="itemPrice"
                                        id="itemPrice"
                                        placeholder="Enter Item Price..."
                                        value={formik.values.itemPrice}
                                        onChange={formik.handleChange}
                                    />
                                    <p className="text-warning field_validate_label">
                                        {formik.errors.itemPrice ? formik.errors.itemPrice : null}
                                    </p>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Unit</CLabel>
                                    <CInput
                                        name="unit"
                                        id="unit"
                                        placeholder="Enter Unit..."
                                        value={formik.values.unit}
                                        onChange={formik.handleChange}
                                    />
                                    <p className="text-warning field_validate_label">
                                        {formik.errors.unit ? formik.errors.unit : null}
                                    </p>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Location</CLabel>
                                    <CInput
                                        name="location"
                                        id="location"
                                        placeholder="Enter Location..."
                                        value={formik.values.location}
                                        onChange={formik.handleChange}
                                    />
                                    <p className="text-warning field_validate_label">
                                        {formik.errors.location ? formik.errors.location : null}
                                    </p>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Popular</CLabel>
                                    <CSelect
                                        name="isPopular"
                                        id="isPopular"
                                        placeholder="Enter Item Popular..."
                                        value={formik.values.isPopular}
                                        onChange={formik.handleChange}
                                    >
                                        <option value="">Pilih Status Popular</option>
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </CSelect>
                                    <p className="text-warning field_validate_label">
                                        {formik.errors.isPopular ? formik.errors.isPopular : null}
                                    </p>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Description</CLabel>
                                    <CTextarea
                                        name="description"
                                        rows="3"
                                        id="description"
                                        placeholder="Enter Item Description..."
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                    />
                                    <p className="text-warning field_validate_label">
                                        {formik.errors.description ? formik.errors.description : null}
                                    </p>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Image Item</CLabel>
                                    <CInput
                                        accept="image/**"
                                        name="image"
                                        id="image"
                                        type="file"
                                        onChange={(event) => {
                                            setImage(event.target.files)
                                        }}
                                    />
                                    <p className="text-warning field_validate_label">
                                        You can only use this for create new data
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

export default ItemModal
