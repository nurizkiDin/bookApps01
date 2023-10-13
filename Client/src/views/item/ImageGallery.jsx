import React, { useEffect, useState } from "react";
import {
    CButton, CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, 
    CModal, CModalHeader, CModalFooter, CModalBody, CForm, CFormGroup, 
    CInput, CLabel, CFormText, CContainer
} from "@coreui/react";
import axios from "../../services/api"
import { useHistory } from "react-router-dom/cjs/react-router-dom";
// import ForceRedirect from "../component/ForceRedirect";
import CIcon from "@coreui/icons-react";
import swal from "sweetalert";
import { useFormik } from "formik";

const ImageModal = (props) => {
    const [mess, setMess] = useState("")
    const [image, setImage] = useState([])
    const handleShowModal = () => {
        props.handleShowModal()
        setImage("")
        if(document.getElementById("image")) {
            document.getElementById("image").value = ""
        }
    }

    const handleRefresh = () => {
        props.handleRefresh()
    }
    const validate = () => {
        const errors = {}
        image || (errors.Image = "Required")

        return errors
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            image: ""
        },
        validate,
        onSubmit: (values) => {
            const params = new FormData()
            params.append("image", image)

            save_data(params)
        }
    })
    async function save_data(values) {
        const token = props.token

        try {
            let response = await axios.post("/item/add-image/" + props.itemId, values, {
                headers: {
                    Authorization: "Bearer " + token,
                    headers: {
                        "content-type": "multipart/form-data"
                    }
                }
            })

            if(response.data._id) {
                handleRefresh()
                handleShowModal()

                swal("Success", "Image success saved", "success")
            }
        }
        catch(err) {
            setMess(err.response.data.message)
        }
    }

    return (
        <>
        <CModal show={props.display} onClose={handleShowModal}>
            <CModalHeader closeButton>Image</CModalHeader>
            <CModalBody>
                <CContainer fluid>
                    <CRow>
                        <CCol sm="12">
                            <CForm onSubmit={formik.handleSubmit}>
                                <CFormGroup>
                                    <CLabel>Image Item</CLabel>
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
                <CButton color="secondary" onClick={handleShowModal}>
                    Cancel
                </CButton>
            </CModalFooter>
        </CModal>
        </>
    )
}

const ImageGallery = ({ match }) => {
    const token = JSON.parse(localStorage.getItem("token"))
    const [showModal, setShowModal] = useState(false)
    const history = useHistory()
    const [ImageData, setImageData] = useState([])
    const [status, setStatus] = useState(0)
    const [rowID, setRowID] = useState([])
    const [rowData, setRowData] = useState([])

    const ItemId = match.params.id
    const fields = [
        "URL",
        "Picture",
        "Actions"
    ]
    const ForceRedirect = () => {
        history.push("/admin/item")
    }
    function handleRefresh() {
        setStatus(status + 1)
    }
    function handleAction(id, item) {
        setRowID(id)
        setRowData(item)
        handleShowModal()
    }
    function handleShowModal() {
        setShowModal(!showModal)
    }

    const deleteRow = (rowID) => {
        axios.delete("/item/delete-image/" + ItemId + "/" + rowID, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            handleRefresh()
            swal("Success", res.data.message, "success")
        }).catch((err) => {
            // console.log(err.response.data)
            ForceRedirect()
            swal("Failed to delete!", err.response.data.message)
        })
    }

    useEffect(() => {
        async function getData() {
            try {
                let { data } = await axios.get("/item/read", {
                    headers: {
                        Authorization : "Bearer " + token
                    }
                })
                let filter = await data.filter((o) => {
                    return o._id.toString().includes(ItemId)
                })
                setImageData(filter[0].image)
            }
            catch(err) {
                ForceRedirect()
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
                            Add New Image
                        </CButton>
                        <ImageModal
                            display={showModal}
                            handleShowModal={handleShowModal}
                            handleRefresh={handleRefresh}
                            token={token}
                            rowData={rowData}
                            rowID={rowID}
                            itemId={ItemId}
                        />
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={ImageData}
                            fields={fields}
                            tableFilter
                            footer
                            itemsPerPage={5}
                            itemsPerPageSelect
                            hover
                            sorter
                            pagination
                            scopedSlots={{
                                'URL' : (item) => {
                                    return(
                                        <td className="py-2">{item.imageUrl}</td>
                                    )
                                },
                                'Picture' : (item) => {
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
                                'Actions' : (Image) => {
                                    return (
                                        <td className="py-2">
                                            <CButton
                                                size="sm"
                                                onClick={() => {
                                                    if(window.confirm("Are you sure delete this data ?")) {
                                                        deleteRow(Image._id)
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

export default ImageGallery;