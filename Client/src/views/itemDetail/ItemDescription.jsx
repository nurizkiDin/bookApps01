import {
    CBadge, CButton, CCard,
    CCardBody, CCol, CRow, CListGroup,
    CListGroupItem
} from "@coreui/react";
import React from "react";
import Loading from "../../services/loading";

const ItemDescription = ({
    category, isPopular, itemName, itemPrice,
    location, unit, feature, info, description,
    idItem, image
}) => {
    const ItemInfo = React.lazy(() => import("./ItemInfo"))
    const BookingForm = React.lazy(() => import("./BookingForm"))

    return(
        <div>
            <section className="container">
                <CRow>
                    <CCol className="col-12 col-sm-12 col-md-12 col-lg-8">
                        <div>
                            {
                                isPopular ? <CButton color="danger">Hot</CButton> : ""
                            }
                            &emsp;
                            {
                                category ? <CButton color="info">{category.categoryName}</CButton> : ""
                            }
                        </div>
                        <CRow className="card p-3 mt-2">
                            <div>
                                <span className="display-5">{itemName}</span>
                            </div>
                            <div>
                                <span className="display-6">
                                    {location ? "Location : " + location : ""}
                                </span>
                            </div>
                            <div>
                                <p className="itemTextDesc">{description ? description : ""}</p>
                            </div>
                        </CRow>
                        {
                            !feature ? (<Loading/>) : (
                                <CRow>
                                    <CCol>
                                        <CCard>
                                            {
                                                !feature[0] ? ("") : (<h3 className="card-header">Feature</h3>)
                                            }
                                            <CCardBody>
                                                <CListGroup>
                                                    {feature.map((feature) => (
                                                        <CListGroupItem key={feature._id} className="justify-content-between">
                                                            <img
                                                                style={{maxHeight: "40px", maxWidth: "40px"}}
                                                                src={`http://localhost:3001/${feature.imageUrl}`}
                                                                alt="Error Load.."
                                                            />
                                                            {feature.featureName}
                                                            <CBadge className="float-right" shape="pill" color="info">
                                                                {feature.qty}
                                                            </CBadge>
                                                        </CListGroupItem>
                                                    ))}
                                                </CListGroup>
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                </CRow>
                            )
                        }
                        <CRow>
                            {
                                !info ? (<Loading/>) : (<ItemInfo info={info} />)
                            }
                        </CRow>
                    </CCol>
                    <CCol className="d-none d-sm-none d-md-none d-lg-block col-lg-4">
                        <BookingForm
                            idItem={idItem}
                            itemName={itemName}
                            itemPrice={itemPrice}
                            image={image}
                            unit={unit}
                            location={location}
                        />
                    </CCol>
                </CRow>
            </section>
        </div>
    )
}

export default ItemDescription;
