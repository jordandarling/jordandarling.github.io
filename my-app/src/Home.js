import React from 'react';
import { useEffect, useState } from 'react';
import './css/Home.css';

const HeroText = (props) => {
    const [currentWord, wordSelect] = useState('');

    useEffect(()=> {
        let count = 0;
        wordSelect(props.specialties[count]);
        setInterval(function(){
            count = (count >= props.specialties.length - 1) ? 0 : count+=1;
            wordSelect(props.specialties[count]);
        }, 2500); 
    }, [])
    return(
        <span className="heroText">{currentWord}</span>
    )
}

function Home(){
    return(
        <div>
            <h1>Hey there, I'm Jordan!</h1>
            <h2>I'm a web developer in Rochester, New York, with knowledge in <HeroText specialties={['React', 'HTML5', 'CSS3', 'PHP']}/></h2>
            <div className="techList">
                <h5>Tech used in this site</h5>
                <ul>
                    <li>ReactJS</li>
                    <li>React Router</li>
                </ul>
            </div>
        </div>
    )
}

export default Home;