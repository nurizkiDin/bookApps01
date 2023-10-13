import React from "react";

const ListItem = () => {
    const Header = React.lazy(() => import('../components/Header'));
    const Footer = React.lazy(() => import('../components/Footer'));

    return(
        <>
        <Header/>
        <Footer/>
        </>
    )
}

export default ListItem;
