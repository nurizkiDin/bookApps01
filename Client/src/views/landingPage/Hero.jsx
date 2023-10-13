import { 
    CButton,
    CCol,
    CImg,
    CJumbotron,
    CRow
} from "@coreui/react";
import CountUp from "react-countup";
import React from "react";
import { Fade } from "react-awesome-reveal";
import Bg from "../../assets/images/htel-trnslvnia.jpg"

const Hero = ({ summary }) => {
    const sumHotel = summary ? summary["sum Hotel"] : 0
    const sumEvent = summary ? summary["sum Event"] : 0
    const sumTour = summary ? summary["sum Tour"] : 0

    return(
        <>
        <Fade cascade>
            <CJumbotron>
                <CRow>
                    <CCol className="col-12 col-sm-12 col-md-6">
                        <h1 className="display-3">Booking Apps</h1>
                        <p className="lead">
                            The Best Appointment Scheduling and Booking Website
                        </p>
                        <div>
                            <h3>
                                <CountUp end={sumHotel} />
                                &nbsp;Hotel&emsp;
                                <CountUp end={sumTour} />
                                &nbsp;Tour&emsp;
                                <CountUp end={sumEvent} />
                                &nbsp;Event
                            </h3>
                        </div>
                        <CButton className="mb-3 mt-3" color="primary" to="/list" target="_blank">
                            Let`s Book
                        </CButton>
                    </CCol>
                    <CCol>
                        <CImg
                            style={{width: "100%"}}
                            src={Bg}
                            alt="Booking"
                        />
                    </CCol>
                </CRow>
            </CJumbotron>
        </Fade>
        </>
    )
}

export default Hero;
