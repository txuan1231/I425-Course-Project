/*
Name: Thomas Xuan
Date: today's date
File: Layout.js
Description: create the page layout.
*/

import {Outlet} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    return (
        <>
            <Header/>
            <Outlet />
            <Footer />
        </>
    );
};

export default Layout;