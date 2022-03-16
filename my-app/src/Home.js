import React from 'react';
import './css/Home.css';

function Home(){
    return(
        <div>
            <h1>Hey there, I'm Jordan!</h1>
            <h3>Welcome to my ReactJS practice site.</h3>
            <div className="techList">
                <h5>Tech used in this site</h5>
                <ul>
                    <li>ReactJS</li>
                    <li>React Router</li>
                    <li>Redux</li>
                </ul>
            </div>
        </div>
    )
}

export default Home;