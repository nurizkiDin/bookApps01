import React from "react";
import CIcon from "@coreui/icons-react";
import { 
    CCollapse,
    CImg,
    CNavbar,
    CNavbarBrand,
    CNavbarNav,
    CNavLink,
    CToggler
} from "@coreui/react";
import { useState } from "react";
import Logo from "../../assets/images/logo.png"
import { ToastContainer } from "react-toastify";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    return(
        <header style={{marginBottom: "90px"}}>
            <ToastContainer/>
            <CNavbar expandable="sm" color="info" className="fixed-top">
                <CToggler inNavbar onClick={() => setIsOpen(!isOpen)} />
                <CNavbarBrand>
                    <CImg className="c-sidebar-brand-full" src={Logo} height={50} />
                </CNavbarBrand>
                <CCollapse show={isOpen} navbar>
                    <CNavbarNav>
                        <CNavLink to="/">Home</CNavLink>
                        <CNavLink to="/list">Let`s Book</CNavLink>
                        <CNavLink to="/testimony">Testimony</CNavLink>
                    </CNavbarNav>
                    <CNavbarNav className="ml-auto">
                        <CNavLink to="/booking">
                            <CIcon size="xl" name="cilCart" />
                            &emsp;Checkout
                        </CNavLink>
                    </CNavbarNav>
                </CCollapse>
            </CNavbar>
        </header>
    )
}

export default Header;
