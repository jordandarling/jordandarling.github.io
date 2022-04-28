import React from 'react';
import { useEffect, useState } from 'react';
import './css/Home.css';
import './css/App.css';

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

    useEffect(() =>{
        
    }    
    )

    return(
        <div>
            {/* <div className='sun'></div> */}
            <div className="splashText">
                <h1 className="alien">Hey There!</h1>
                <h1 className='synth'>I'm Jordan</h1>
            </div>
            <h4 className="subHeader">I'm a full stack developer in Rochester, New York, with knowledge of <HeroText specialties={['React', 'HTML5', 'CSS3', 'PHP']}/></h4>
        </div>
    )
}

export default Home;