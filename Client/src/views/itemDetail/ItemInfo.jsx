import { CCard, CCardBody, CCardFooter, CCardHeader } from "@coreui/react";
import React from "react";
import Loading from "../../services/loading";
import Carousel from "react-multi-carousel";
import { InfoResponsive } from "../../services/responsive";

const ItemInfo = ({ deviceType, info }) => {
    return(
        <>
        {
            !info ? (<Loading/>) : (
                <section className="container">
                    {!info[0] ? ("") : (<h4 className="mb-3">Testimony &amp; Info</h4>)}
                    <Carousel responsive={InfoResponsive} deviceType={deviceType}>
                        {info.map((testimony) => (
                            <CCard key={testimony._id}>
                                <CCardHeader>
                                    {testimony.infoName}
                                    <div className="float-right text-info">
                                        {testimony ? testimony.type : ""}
                                    </div>
                                </CCardHeader>
                                <CCardBody>
                                    <figure>
                                        <img 
                                            style={{width: "100%"}}
                                            src={`http://localhost:3001/${testimony.imageUrl}`}
                                            alt={testimony.imageUrl}
                                        />
                                    </figure>
                                </CCardBody>
                                <CCardFooter>
                                    {testimony ? testimony.description : "No Description"}
                                </CCardFooter>
                            </CCard>
                        ))}
                    </Carousel>
                </section>
            )
        }
        </>
    )
}

export default ItemInfo;
