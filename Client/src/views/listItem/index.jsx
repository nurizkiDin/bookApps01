import React from "react";
import { CCard, CCardBody, CCardFooter, CCardHeader, CCol, CRow } from "@coreui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import axios from "../../services/api"
import Loading from "../../services/loading"
import { Fade } from "react-awesome-reveal";
import { numberFormat } from "../../services/numberFormat";

const ListItem = () => {
    const Header = React.lazy(() => import('../components/Header'));
    const Footer = React.lazy(() => import('../components/Footer'));
    const [pageData, setPageData] = useState([])

    useEffect(() => {
        async function getData() {
            try {
                let { data } = await axios.get("/item/read")
                
                setPageData(data)
            }
            catch(err) {
                console.log(err.response.data)
            }
        }

        getData()
    }, [])
    return(
        <>
        <Header/>
        {
            !pageData ? (<Loading/>) : (
                <Fade>
                    <section className="container">
                        <CRow>
                            {
                                pageData.map((item) => (
                                    <CCol key={item._id} className="col-12 col-md-6">
                                        <CCard>
                                            <CCardHeader>
                                                {numberFormat(item.itemPrice)} / {item.unit}
                                                <div className="float-right text-danger">
                                                    {item.isPopular ? "Hot" : ""}
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
                                                    <figcaption>
                                                        <span className="text-capitalize">
                                                            {item.category ? item.category.categoryName : ""}
                                                        </span>
                                                    </figcaption>
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
                                    </CCol>
                                ))
                            }
                        </CRow>
                    </section>
                </Fade>
            )
        }
        <Footer/>
        </>
    )
}

export default ListItem;
