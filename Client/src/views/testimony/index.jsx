import React from "react";
import { CCard, CCardBody, CCardFooter, CCardHeader, CCol, CRow } from "@coreui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import axios from "../../services/api"
import Loading from "../../services/loading"
import { Fade } from "react-awesome-reveal";


const Testimony = () => {
    const Header = React.lazy(() => import('../components/Header'));
    const Footer = React.lazy(() => import('../components/Footer'));
    const [pageData, setPageData] = useState([])

    useEffect(() => {
        async function getData() {
            try {
                let { data } = await axios.get("/item/info/read")
                let dataFiltered = data.filter(function(data) {
                    return data.type === "Testimony"
                })

                setPageData(dataFiltered)
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
                                pageData.map((testimony) => (
                                    <CCol key={testimony._id} className="col-12 col-md-6">
                                        <CCard>
                                            <CCardHeader>
                                                {testimony.infoName}
                                                <div className="float-right text-info">
                                                    {testimony.isHighlight ? "Top Testimony" : ""}
                                                </div>
                                            </CCardHeader>
                                            <CCardBody>
                                                <figure>
                                                    <Link to={`/item/${testimony.item[0]._id}`}>
                                                        <img 
                                                            style={{width: "!00%"}}
                                                            src={
                                                                `http://localhost:3001/` + 
                                                                testimony.imageUrl
                                                            }
                                                            alt={testimony.imageUrl}
                                                        />
                                                    </Link>
                                                    <figcaption>
                                                        <span className="text-capitalize">
                                                            {testimony.item ? testimony.item[0].itemName : ""}
                                                        </span>
                                                    </figcaption>
                                                </figure>
                                            </CCardBody>
                                            <CCardFooter>
                                                {testimony.description}
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

export default Testimony;
