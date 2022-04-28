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
    }, [props.specialties])
    return(
        <span className="heroText">{currentWord}</span>
    )
}

function Home(){

    useEffect(() =>{
        document.title ="Home"
    })

    return(
        <div>
            {/* <div className='sun'></div> */}
            <div className="splashText">
                <h1 className="alien">Hey There!</h1>
                <h1 className='synth'>I'm Jordan</h1>
            </div>
            <h4 className="subHeader">I'm a full stack developer with knowledge of <HeroText specialties={['ReactJS', 'HTML5', 'CSS3', 'PHP', 'jQuery']}/></h4>
            <p>Hi, I'm Jordan! I'm a full stack web developer working at the Rochester Institute of Technology! I've been working at RIT for several years now, and in my time have had extensive experience working with PHP, HTML, CSS, and jQuery.</p>

            <p>In addition to my experience listed above, I'm also currently learning ReactJS, and built this site using ReactJS with React Router as a small showcase!</p>
        </div>
    )
}

export default Home;