import React, { useState, useEffect } from "react";
import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CContainer,
    CRow
} from "@coreui/react";
import { Fade } from "react-awesome-reveal";
import { numberFormat } from "../../services/numberFormat";
import Pic from "../../assets/images/completed.jpg"

const Completed = ({ itemBooked }) => {
    const [textDate, setTextDate] = useState("")
    const { unit, booked, itemName, itemPrice, dateInput, endDate, idBooking } = itemBooked

    useEffect(() => {
        function setData() {
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
            <div className="c-app c-default-layout flex-row">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol className="d-none d-sm-none d-md-block d-lg-block col-md-6">
                            <CCard>
                                <CCardHeader>Booking Information</CCardHeader>
                                <CCardBody className="text-center">
                                    <img className="img-fluid" style={{maxHeight: "300px"}} src={Pic} alt="Please Wait" />
                                </CCardBody>
                            </CCard>
                        </CCol>
                        <CCol className="col-12 col-sm-12 col-md-6">
                            <CCard>
                                <CCardHeader>Booking Information</CCardHeader>
                                <CCardBody>
                                    <dl>
                                        <dt>Booking Id</dt>
                                        <dd>{idBooking}</dd>
                                    </dl>
                                    <dl>
                                        <dt>{itemName}</dt>
                                        <dd>{numberFormat(itemPrice * booked)} for {booked} {unit}</dd>
                                    </dl>
                                    <dl>
                                        <dt>Date : </dt>
                                        <dd>{textDate}</dd>
                                    </dl>
                                </CCardBody>
                                <CCardFooter>Your Booking Still in Process</CCardFooter>
                            </CCard>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        </Fade>
    )
}

export default Completed;
