import React from "react";
import { CCard, CCardBody, CCardFooter, CCardHeader, CCol, CInput, CRow } from "@coreui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import axios from "../../services/api"
import Loading from "../../services/loading"
import { numberFormat } from "../../services/numberFormat";
import ReactPaginate from "react-paginate";

const ListItem = () => {
    const Header = React.lazy(() => import('../components/Header'));
    const Footer = React.lazy(() => import('../components/Footer'));
    const [pageData, setPageData] = useState([])

    const [offset, setOffset] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [perPage] = useState(4)
    const [search, setSearch] = useState("")

    useEffect(() => {
        async function getData() {
            try {
                let { data } = await axios.get("/item/read")
                let dataFiltered = await data.filter((o) => 
                    o.itemName.toString().toLowerCase().includes(search.toLowerCase()) || 
                    o.location.toString().toLowerCase().includes(search.toLowerCase())
                )
                let sliceData = dataFiltered.slice(offset, offset + perPage)
                
                setPageData(sliceData)
                setPageCount(Math.ceil(dataFiltered.length / perPage))
            }
            catch(err) {
                console.log(err.response.data)
            }
        }

        getData()
    }, [offset, search])

    const handlePageClick = (e) => {
        let { selected } = e
        setOffset(selected * perPage)
    }
    const liveSearch = (e) => {
        setSearch(e.target.value)
    }

    return(
        <>
        <Header/>
        {
            !pageData ? (<Loading/>) : (
                <section className="container">
                    <CRow className="d-flex justify-content-center">
                        <CCol className="col-8 mb-3">
                            <CInput
                                type="text"
                                placeholder="Search By Name & Location"
                                value={search}
                                onChange={liveSearch}
                            />
                        </CCol>
                    </CRow>
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
                    <CRow className="d-flex justify-content-center">
                        <ReactPaginate
                            previousLabel="previous"
                            nextLabel="next"
                            breakLabel=".."
                            breakClassName="break-me"
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName="pagination"
                            activeClassName="active"
                        />
                    </CRow>
                </section>
            )
        }
        <Footer/>
        </>
    )
}

export default ListItem;
