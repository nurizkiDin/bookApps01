import React, { useEffect, useState } from "react";
import Loading from "../../services/loading";

const CheckOut = () => {
    const itemBooked = JSON.parse(localStorage.getItem("itemBooked"))
    const bank = JSON.parse(localStorage.getItem("bank"))

    const Header = React.lazy(() => import('../components/Header'));
    const Footer = React.lazy(() => import('../components/Footer'));
    const NoItem = React.lazy(() => import('./NoItem'));
    const BookingInformation = React.lazy(() => import('./BookingInformation'));
    const BookingPayment = React.lazy(() => import('./BookingPayment'));
    const Completed = React.lazy(() => import('./Completed'));

    const [status, setStatus] = useState(0)
    function handleRefresh() {
        let stat = status + 1
        setStatus(stat)
    }

    useEffect(() => {}, [status])

    return(
        <>
        <Header/>
        {
            !itemBooked ? (<NoItem/>) : 
                itemBooked.idBooking ? (<Completed itemBooked={itemBooked} />) : 
                !itemBooked.email ? (<BookingInformation itemBooked={itemBooked} refresh={handleRefresh} />) :
                !bank ? (<Loading/>) : (
                    <BookingPayment
                        refresh={handleRefresh}
                        itemBooked={itemBooked}
                        bank={bank}
                    />
                )
        }
        <Footer/>
        </>
    )
}

export default CheckOut;
