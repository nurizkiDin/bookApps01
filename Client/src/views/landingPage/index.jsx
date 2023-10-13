import React, { useEffect, useState } from "react";
import axios from "../../services/api"
import Loading from "../../services/loading"

import "react-multi-carousel/lib/styles.css"

const LandingPage = () => {
    const Header = React.lazy(() => import('../components/Header'));
    const Footer = React.lazy(() => import('../components/Footer'));

    const Hero = React.lazy(() => import("./Hero"))
    const HotItem = React.lazy(() => import("./HotItem"))
    const Categories = React.lazy(() => import("./Categories"))
    const Testimony = React.lazy(() => import("./Testimony"))

    const [pageData, setPageData] = useState({})

    useEffect(() => {
        async function getData() {
            try {
                let { data } = await axios.get("/client")
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
            !pageData ? (<Loading/>) : 
            (
                <>
                <Hero summary={pageData.summaryInfo} />
                {
                    !pageData.hotItem ? (<Loading/>) : 
                    (
                        <HotItem items={pageData.hotItem} />
                    )
                }
                {
                    !pageData.categoryList ? (<Loading/>) : 
                    (
                        pageData.categoryList.map((category) => (
                            <div key={category._id}>
                                <Categories category={category} />
                            </div>
                        ))
                    )
                }
                </>
            )
        }
        {
            !pageData.testimony ? (<Loading/>) : 
            (
                <Testimony testimony={pageData.testimony} />
            )
        }
        <Footer/>
        </>
    )
}

export default LandingPage;
