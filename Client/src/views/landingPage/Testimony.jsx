import React from "react";
import Carousel from "react-multi-carousel";
import { InfoResponsive } from "../../services/responsive";
import { Fade } from "react-awesome-reveal";
import { CCard, CCardBody, CCardFooter, CCardHeader } from "@coreui/react";
import TruncateText from "../../services/truncateText";
import Loading from "../../services/loading"
import { Link } from "react-router-dom/cjs/react-router-dom";

const Testimony = ({ deviceType, testimony }) => {
    return(
        <>
        {
            !testimony ? (<Loading/>) : (
                <section className="container">
                    <Fade direction="left" triggerOnce>
                        <h4 className="mb-3">Testimony</h4>
                        <Carousel responsive={InfoResponsive} deviceType={deviceType}>
                            {
                                testimony.map((testimony) => (
                                    <div key={testimony._id}>
                                        <CCard>
                                            <CCardHeader>
                                                {testimony.infoName}
                                            </CCardHeader>
                                            <CCardBody>
                                                <figure>
                                                    <Link to={`/item/${testimony.item[0]._id}`}>
                                                        <img 
                                                            style={{width: "100%"}}
                                                            src={
                                                                `http://localhost:3001/` + 
                                                                testimony.imageUrl
                                                            }
                                                            alt={testimony.imageUrl}
                                                        />
                                                    </Link>
                                                    <figcaption>
                                                        <span className="text-capitalize">
                                                            {testimony.item ? testimony.item[0].itemName : " "}
                                                        </span>
                                                        <span className="text-capitalize">
                                                            {testimony.item ? testimony.item[0].location : " "}
                                                        </span>
                                                    </figcaption>
                                                </figure>
                                            </CCardBody>
                                            <CCardFooter>
                                                <TruncateText 
                                                    text={
                                                        testimony ? testimony.description : "No Description"
                                                    }
                                                />
                                            </CCardFooter>
                                        </CCard>
                                    </div>
                                ))
                            }
                        </Carousel>
                    </Fade>
                </section>
            )
        }
        </>
    )
}

export default Testimony;
