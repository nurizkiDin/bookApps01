import React from "react";
import Carousel from "react-multi-carousel";
import { ItemResponsive } from "../../services/responsive";
import { Fade } from "react-awesome-reveal";
import { CCard, CCardBody, CCardFooter, CCardHeader, CCol, CRow } from "@coreui/react";
import { numberFormat } from "../../services/numberFormat";
import Loading from "../../services/loading"
import { Link } from "react-router-dom/cjs/react-router-dom";

const Categories = ({ deviceType, category }) => {
    console.log(category.item[0].isPopular)
    return(
        <>
        {
            !category ? (<Loading/>) : (
                <section className="container">
                    <Fade direction="up" triggerOnce>
                        <h4 className="mb-3">{category ? category.categoryName : "no"}</h4>
                        <Carousel responsive={ItemResponsive} deviceType={deviceType}>
                            {
                                !category.item ? (<Loading/>) : (
                                    category.item.map((item) => (
                                        <div key={item._id}>
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
                                                                style={{width: "100%"}}
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
                                                    <CRow>
                                                        <CCol>
                                                            <strong>{item.itemName}</strong>
                                                        </CCol>
                                                        <CCol className="col-4">
                                                            <div className="text-info text-right">
                                                                {item.location}
                                                            </div>
                                                        </CCol>
                                                    </CRow>
                                                </CCardFooter>
                                            </CCard>
                                        </div>
                                    ))
                                )
                            }
                        </Carousel>
                    </Fade>
                </section>
            )
        }
        </>
    )
}

export default Categories;
