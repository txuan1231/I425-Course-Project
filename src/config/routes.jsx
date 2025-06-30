/*
Name: Thomas Xuan
Date: today's date
File: Routes.jsx
Description: create the application routes.
*/
import React from 'react';
import {BrowserRouter,Routes,Route}from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/home";
import NoMatch from "../pages/nomatch";
//Put other imports here:

import {AuthProvider} from "../services/useAuth";
import Signin from "../pages/auth/signin";
import Signout from "../pages/auth/signout";
import Signup from "../pages/auth/signup";
import Cities from "../pages/city/cities";
import RequireAuth from "../components/RequireAuth";
import City from "../pages/city/city";
import Properties from"../pages/property/properties";
import Housetypes from "../pages/housetype/housetypes";
import Realtors from "../pages/realtor/realtors";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="cities" element={<Cities/>}>
                            <Route index element={<p>Select a city to view details.</p>}/>
                            <Route path=":cityId" element={<City/>}>
                                <Route path="properties" element={<Properties />}/>
                            </Route>
                        </Route>
                        <Route path="housetypes" element={
                            <RequireAuth>
                                <Housetypes />
                            </RequireAuth>
                        }></Route>
                        <Route path="realtors" element={
                            <RequireAuth>
                                <Realtors />
                            </RequireAuth>
                        }></Route>
                        <Route path="/signin" element={<Signin/>}/>
                        <Route path="/signout" element={<Signout/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                        <Route path="*" element={<NoMatch/>}/>
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default AppRoutes;