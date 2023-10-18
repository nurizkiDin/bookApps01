import React, { useState } from "react";
import {
    CButton,
    CCarousel,
    CCarouselControl,
    CCarouselIndicators,
    CCarouselInner,
    CCarouselItem,
    CCol,
    CRow,
    CJumbotron,
    CModal,
    CModalBody
} from "@coreui/react";
import Loading from "../../services/loading";

const HeroItem = (images) => {
    const [modal, setModal] = useState(false)
    const toggle = () => {
        setModal(!modal)
    }

    return(
        <CJumbotron>
            <CButton onClick={toggle}>
                <section className="container">
                    <CRow>
                        <CCol className="col-sm-8 col-md-8 col-lg-8" style={{display: "flex", padding: "0"}}>
                            <img
                                src={`http://localhost:3001/${images.images[0].imageUrl}`}
                                alt="Error Load.."
                                className="img-item"
                            />
                        </CCol>
                        <CCol className="col-sm-4 col-md-4 col-lg-4" style={{display: "flex", padding: "0", flexDirection: "column"}}>
                            <img
                                src={`http://localhost:3001/${images.images[1].imageUrl}`}
                                alt="Error Load.."
                                className="img-item"
                            />
                            <img
                                src={`http://localhost:3001/${images.images[2].imageUrl}`}
                                alt="Error Load.."
                                className="img-item"
                            />
                        </CCol>
                    </CRow>
                </section>
            </CButton>
            <CModal show={modal} onClose={toggle} backdrop={false}>
                <CModalBody>
                    <CCarousel>
                        <CCarouselIndicators/>
                        <CCarouselInner>
                            {
                                !images.images ? (<Loading/>) : (
                                    images.images.map((image) => (
                                        <CCarouselItem key={image._id}>
                                            <img 
                                                className="d-block w-100"
                                                src={`http://localhost:3001/${image.imageUrl}`}
                                                alt="Error Load.."
                                            />
                                        </CCarouselItem>
                                    ))
                                )
                            }
                        </CCarouselInner>
                        <CCarouselControl direction="prev" />
                        <CCarouselControl direction="next" />
                    </CCarousel>
                </CModalBody>
            </CModal>
        </CJumbotron>
    )
}

export default HeroItem;
