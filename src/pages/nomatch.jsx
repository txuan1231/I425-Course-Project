/*
Name: Thomas Xuan
Date: today's date
File: Home.jsx
Description: create the Home page
*/
import React from 'react';

const Nomatch = () => {
    return (
        <>
            <div className="main-heading">
                <div className="container">Error</div>
            </div>
            <div className="sub-heading">
                <div className="container">404 Page Not Found</div>
            </div>
            <div className="main-content container">
                The page requested could not found. Please check your request and  try again.
            </div>
        </>
    );
};

export default Nomatch;