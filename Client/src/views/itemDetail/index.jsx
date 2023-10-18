import React, { useState, useEffect } from "react";
import axios from "../../services/api"
import Loading from "../../services/loading"
import { Fade } from "react-awesome-reveal";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import "react-multi-carousel/lib/styles.css"

const ItemDetail = () => {
    const Header = React.lazy(() => import('../components/Header'));
    const Footer = React.lazy(() => import('../components/Footer'));
    const HeroItem = React.lazy(() => import('./HeroItem'));
    const ItemDescription = React.lazy(() => import('./ItemDescription'));
    const BookingFormFooter = React.lazy(() => import('./BookingFormFooter'));

    const location = useLocation()
    const id = location.pathname.split("/")[2]
    const [pageData, setPageData] = useState({})

    useEffect(() => {
        async function getData() {
            try {
                let { data } = await axios.get(`/client/item/${id}`)

                setPageData(data)
                localStorage.setItem("bank", JSON.stringify(data.bank))
            }
            catch(err) {
                console.log(err.response.data)
            }
        }

        getData()
    }, [id])

    return(
        <Fade>
            <Header/>
            {
                !pageData.image ? (<Loading/>) : (<HeroItem images={pageData.image} />)
            }
            {
                !pageData.image ? (<Loading/>) : (
                    <ItemDescription
                        idItem={pageData._id}
                        category={pageData.category}
                        isPopular={pageData.isPopular}
                        itemName={pageData.itemName}
                        itemPrice={pageData.itemPrice}
                        location={pageData.location}
                        unit={pageData.unit}
                        feature={pageData.feature}
                        info={pageData.info}
                        description={pageData.description}
                        image={pageData.image[0]}
                    />
                )
            }
            {
                !pageData.image ? (<Loading/>) : (
                    <div className="d-block d-sm-block d-md-block d-lg-none">
                        <BookingFormFooter
                            idItem={pageData._id}
                            itemName={pageData.itemName}
                            itemPrice={pageData.itemPrice}
                            location={pageData.location}
                            unit={pageData.unit}
                            image={pageData.image[0]}
                        />
                    </div>
                )
            }
            <Footer/>
        </Fade>
    )
}

export default ItemDetail;
