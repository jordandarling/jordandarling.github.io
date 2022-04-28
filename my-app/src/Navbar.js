import React from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css'

function Navbar(){
    return(
        <ul className="menu">
            <Link to="/">
                Home
            </Link>
            <Link to="/MasteryData">
                Mastery Data
            </Link>
            <Link to="/CurrentMatch">
                What are my spells??
            </Link>
        </ul>
    )
}

export default Navbar;