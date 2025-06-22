/*
Name: Thomas Xuan
Date: today's date
File: Footer.js
Description: create the page footer
*/

const Footer = () => {
    const year = new Date().getFullYear();  //determine the current year with JavaScript
    return (
        <footer>
            <div className="container">
                <span>&copy;Zillow Inc. 2006-{year}</span>
            </div>
        </footer>
    );
};

export default Footer;