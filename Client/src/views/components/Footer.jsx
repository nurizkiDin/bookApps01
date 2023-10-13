import React from "react";
import { CButton, CCol, CRow } from "@coreui/react";

const Footer = () => {
    return(
        <footer style={{ marginTop: "20px" }}>
            <div className="card p-5">
                <CRow className="d-none d-md-flex d-lg-flex d-xl-flex">
                    <CCol>
                        <h3>Booking Apps</h3>
                        <p>The Best Appointment Scheduling and Booking Website</p>
                    </CCol>
                    <CCol>
                        <h6 className="mt-2">Start Book</h6>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <CButton type="link" to="/list">
                                    Hotel
                                </CButton>
                            </li>
                            <li className="list-group-item">
                                <CButton type="link" to="/list">
                                    Tour Package
                                </CButton>
                            </li>
                            <li className="list-group-item">
                                <CButton type="link" to="/list">
                                    Event
                                </CButton>
                            </li>
                        </ul>
                    </CCol>
                    <CCol>
                        <h6 className="mt-2">Contact</h6>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <CButton type="link" href="mailto:nutrisi1udin@gmail.com">
                                    nutrisi1udin@gmail.com
                                </CButton>
                            </li>
                            <li className="list-group-item">
                                <CButton type="link" href="https://wa.me/6289503066528" target="_blank">
                                    WhatsApp +62-89503066528
                                </CButton>
                            </li>
                            <li className="list-group-item">
                                <CButton type="link" href="tel:+6289503066528">
                                    Tel 089503066528
                                </CButton>
                            </li>
                        </ul>
                    </CCol>
                </CRow>
                <CRow>
                    <div className="text-center col">
                        &copy; Nurizki
                    </div>
                </CRow>
            </div>
        </footer>
    )
}

export default Footer;
