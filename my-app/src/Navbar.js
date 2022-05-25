import React from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css'

function Navbar(){
    return(
        <ul className="menu">
            <Link to="/">
                Home
            </Link>
            <Link to="/Contact">
                Contact
            </Link>
            <Link to="/Portfolio">
                Portfolio
            </Link>
            {/* <Link to="/MasteryData">
                Mastery Data
            </Link>
            <Link to="/CurrentMatch">
                Spells?
            </Link> */}
            <Link to="/Photography">
                Photography
            </Link>
            <Link to="/Attributions">
                Attributions
            </Link>
        </ul>
    )
}

export default Navbar;