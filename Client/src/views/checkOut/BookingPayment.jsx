import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useFormik } from "formik";
import {
    CButton, CCard, CCardBody, CCardFooter, CCardHeader,
    CCol, CRow, CContainer, CInput, CLabel, CListGroup, CListGroupItem
} from "@coreui/react";
import { numberFormat } from "../../services/numberFormat";
import axios from "../../services/api"
import swal from "sweetalert";

const BookingPayment = ({ itemBooked, refresh, bank }) => {
    const {
        booked, itemPrice,
        dateInput, endDate,
        idItem, firstName,
        lastName, email, phoneNumber
    } = itemBooked
    const [proof, setProof] = useState([])

    const tax = 10
    const subTotal = itemPrice * booked
    const grandTotal = ((subTotal * tax) / 100) + subTotal

    const validate = (value) => {
        const errors = {}
        value.account || (errors.account = "Required")
        value.bank || (errors.bank = "Required")
        proof || (errors.proof = "Required")

        return errors
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            account: "",
            bank: ""
        },
        validate,
        onSubmit: (values) => {
            var formData = new FormData()
            formData.append("image", proof)
            formData.append("firstName", firstName)
            formData.append("lastName", lastName)
            formData.append("email", email)
            formData.append("phoneNumber", phoneNumber)
            formData.append("itemId", idItem)
            formData.append("bankForm", values.bank)
            formData.append("accountHolder", values.account)
            formData.append("bookingStartDate", dateInput)
            formData.append("bookingEndDate", endDate)
            formData.append("itemBooked", booked)

            addBooking(formData, values)
        }
    })

    async function addBooking(formData, values) {
        try {
            let res = null
            res = await axios.post("/booking/create", formData, {
                headers: {
                    headers: {"content-type": "multipart/form-data"}
                }
            })
            if(res.data.booking._id) {
                const update = Object.assign(itemBooked, values, {
                    idBooking: res.data.booking._id
                })
                localStorage.setItem("itemBooked", JSON.stringify(update))
                swal(res.data.message).then(() => {
                    refresh()
                })
            }
        }
        catch(err) {
            swal("Failed", "", "danger")
        }
    }

    return(
        <Fade>
            <CContainer>
                <CRow>
                    <CCol className="col-12 col-sm-12 col-md-6">
                        <CCard>
                            <CCardHeader>Transfer Payment</CCardHeader>
                            <CCardBody>
                                <p>Tax : 10%</p>
                                <p>Sub Total : {numberFormat(subTotal)}</p>
                                <p>Total : {numberFormat(grandTotal)}</p>
                            </CCardBody>
                            <CCardFooter>
                                <h5>Bank</h5>
                                <CListGroup>
                                    {bank.map((bank) => (
                                        <CListGroupItem key={bank._id} className="justify-content-between">
                                            <dl className="float-left">
                                                <dt>{bank.bankName}</dt>
                                                <dd>
                                                    {bank.accountHolder} || {bank.accountNumber}
                                                </dd>
                                            </dl>
                                            <img 
                                                className="float-right"
                                                style={{maxHeight: "120px"}}
                                                src={`http://localhost:3001/${bank.imageUrl}`}
                                                alt="Error Load"
                                            />
                                        </CListGroupItem>
                                    ))}
                                </CListGroup>
                            </CCardFooter>
                        </CCard>
                    </CCol>
                    <CCol className="col-12 col-sm-12 col-md-6">
                        <CCard>
                            <CCardHeader>Transfer Payment</CCardHeader>
                            <CCardBody>
                                <CLabel>Payment Proof</CLabel>
                                <CInput
                                    type="file"
                                    id="proofFile"
                                    name="proofFile"
                                    onChange={(e) => {
                                        setProof(e.target.files[0])
                                    }}
                                />
                                {formik.errors.proof ? 
                                (<p className="text-danger">{formik.errors.proof}</p>) : ("")}
                                <CLabel>Bank</CLabel>
                                <CInput
                                    id="bank"
                                    name="bank"
                                    onChange={(e) => {
                                        formik.handleChange(e)
                                    }}
                                />
                                {formik.errors.bank ? 
                                (<p className="text-danger">{formik.errors.bank}</p>) : ("")}
                                <CLabel>Account Holder</CLabel>
                                <CInput
                                    id="account"
                                    name="account"
                                    onChange={(e) => {
                                        formik.handleChange(e)
                                    }}
                                />
                                {formik.errors.account ? 
                                (<p className="text-danger">{formik.errors.account}</p>) : ("")}
                            </CCardBody>
                            <CCardFooter>
                                <CButton color="info" onClick={formik.handleSubmit}>
                                    Submit
                                </CButton>
                            </CCardFooter>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </Fade>
    )
}

export default BookingPayment;
