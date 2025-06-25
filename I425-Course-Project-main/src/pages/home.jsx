/*
Name: Thomas Xuan
Date: today's date
File: Home.jsx
Description: create the Home page
*/
import React from 'react';

const Home = () => {
    return (
        <>
            <div className="main-heading">
                <div className="container">Home</div>
            </div>
            <div className="sub-heading">
                <div className="container">Zillow Housing Database</div>
            </div>
            <div className="main-content container">
                <p>This application demonstrates a responsive Single Page Application (SPA) architecture.
                    SPAs are for an improved user experience. A SPA avoids interruption of the user experience between
                    successive pages, making the application behave more like a desktop application.
                    This application is created with the <a href="https://reactjs.org/" target="_blank">React</a>&nbsp;
                    and <a href="https://react-bootstrap.github.io/" target="_blank">React Bootstrap</a> libraries.</p>
                <p>This application is an API client. Data of the application is provided by a API service called <strong>Zillow Housing API</strong>.
                    The application uses four common HTTP methods for CRUD operations: <strong>GET, POST, PUT, and DELETE</strong>.
                </p>
                <p>This application uses three different approaches for making API calls:</p>
                <ul>
                    <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest" target="_blank">XMLHTTPRequest</a> </li>
                    <li><a href="https://github.com/axios/axios" target="_blank">Axios</a></li>
                    <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" target="_blank">Fetch</a></li>
                </ul>
                <p>Please click on the "Sign in" link to sign in and explore the site. If you don't already have an account,
                    please sign up and create a new account.</p>
            </div>
        </>
    );
};

export default Home;