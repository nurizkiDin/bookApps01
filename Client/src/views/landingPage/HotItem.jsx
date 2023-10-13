import React from "react";
import Carousel from "react-multi-carousel";
import { ItemResponsive } from "../../services/responsive";
import { Fade } from "react-awesome-reveal";
import { CCard, CCardBody, CCardFooter, CCardHeader } from "@coreui/react";
import { numberFormat } from "../../services/numberFormat";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Loading from "../../services/loading";

const HotItem = ({ deviceType, items }) => {
    return(
        <>
        {
            !items ? (<Loading/>) : (
                <section className="container">
                    <Fade triggerOnce>
                        <h4 className="mb-3">Hot Item</h4>
                        <Carousel responsive={ItemResponsive} deviceType={deviceType}>
                            {
                                items.map((item) => (
                                    <div key={item._id}>
                                        <Fade direction="up">
                                            <CCard>
                                                <CCardHeader>
                                                    {numberFormat(item.itemPrice)} / {item.unit}
                                                    <div className="float-right text-danger">
                                                        {item.isPopular === "true" ? "Hot" : ""}
                                                    </div>
                                                </CCardHeader>
                                                <CCardBody>
                                                    <figure>
                                                        <Link to={`/item/${item._id}`}>
                                                            <img
                                                                style={{ width: "100%" }}
                                                                src={
                                                                    `http://localhost:3001/` + 
                                                                    item.image[0].imageUrl
                                                                }
                                                                alt={item.image[0].imageUrl}
                                                            />
                                                        </Link>
                                                    </figure>
                                                </CCardBody>
                                                <CCardFooter>
                                                    <strong>{item.itemName}</strong>
                                                    <div className="float-right text-info">
                                                        {item.location}
                                                    </div>
                                                </CCardFooter>
                                            </CCard>
                                        </Fade>
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

export default HotItem;
