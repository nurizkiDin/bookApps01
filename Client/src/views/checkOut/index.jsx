import React from "react";

const CheckOut = () => {
    const Header = React.lazy(() => import('../components/Header'));
    const Footer = React.lazy(() => import('../components/Footer'));

    return(
        <>
        <Header/>
        <Footer/>
        </>
    )
}

export default CheckOut;
