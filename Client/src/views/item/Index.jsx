import React from "react";
import {
    CNav,
    CNavItem,
    CNavLink,
    CTabContent,
    CTabPane,
    CTabs
} from "@coreui/react";

const IndexItem = () => {
    const Feature = React.lazy(() => import("./Feature"))
    const Info = React.lazy(() => import("./Info"))
    const Item = React.lazy(() => import("./ItemTable"))
    return (
        <CTabs activeTab="item">
            <CNav variant="tabs">
                <CNavItem>
                    <CNavLink data-tab="item">Item</CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink data-tab="feature">Feature</CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink data-tab="info">Info</CNavLink>
                </CNavItem>
            </CNav>
            <CTabContent>
                <CTabPane data-tab="item">
                    <Item/>
                </CTabPane>
                <CTabPane data-tab="feature">
                    <Feature/>
                </CTabPane>
                <CTabPane data-tab="info">
                    <Info/>
                </CTabPane>
            </CTabContent>
        </CTabs>
    );
}

export default IndexItem;