import React from "react";
import { Nav } from "./Nav.jsx";
import { CustomerList } from "./CustomerList.jsx";
import "../css/home.css"
export const Home = () =>{

    return(
        <div className="home">
        <div className="homeContainer">
            <Nav/>
            <CustomerList/>
        </div>
        </div>
    );
}
