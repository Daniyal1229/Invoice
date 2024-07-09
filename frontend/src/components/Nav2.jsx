import React from 'react';
import "../css/nav.css"

function Nav2() {
    return (
        <div className="navbar">
            <div className="logo">
                {/* <img src="/path/to/your/logo.png" alt="Logo" /> */}
                <h1>LOKSUN AI</h1>
            </div>
            <div className="help-text">
                <a href=""> Customer Support </a>
                <a href=""> Help </a>
                <a href=""> Bhavitha </a>
            </div>
        </div>
    );
}

export default Nav2;
