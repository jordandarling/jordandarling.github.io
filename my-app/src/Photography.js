import React from "react";
import './css/Photography.css';

const DisplayPhoto = (props) => {
    return(
        <div>
            <figure>
            <img src={require(`./images/photography/${props.photo}.JPG`)}/>
            <figcaption></figcaption>
            </figure>

        </div>
    )
}

class Photography extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div className="photoGallery">
                <h1>My Photo Gallery</h1>
                <DisplayPhoto photo="Moon"/>
            </div>
        )
    }
}


let moon = {'image':'Moon', 'cameraSettings': 'Nikon D3500 | ISO 100 | &#119891;/11.0 | 1/100s<br/>300mm | 6.3 | 70.0-300.0 mm f/4.5-6.3<br/>5/15/2022 - 11:00PM', 'description': '<p>Shot during the lunar eclipse of May 2022, this image was my first attempt at any form of astrophotography. The moon is an excellent place to start with astrophotography, as it\'s bright, easy to focus on, and doesn\'t require long exposure times.</p><p>This was my favorite shot of the night, despite not displaying the \'blood moon\' of the evening. While not particularly crimson, this image is a clear display of the various craters and lines that cover the lunar surface.</p>'},
gus = {'image':'Moon', 'cameraSettings': 'Nikon D3500 | ISO 100 | &#119891;/11.0 | 1/100s<br/>300mm | 6.3 | 70.0-300.0 mm f/4.5-6.3<br/>5/15/2022 - 11:00PM', 'description': '<p>Shot during the lunar eclipse of May 2022, this image was my first attempt at any form of astrophotography. The moon is an excellent place to start with astrophotography, as it\'s bright, easy to focus on, and doesn\'t require long exposure times.</p><p>This was my favorite shot of the night, despite not displaying the \'blood moon\' of the evening. While not particularly crimson, this image is a clear display of the various craters and lines that cover the lunar surface.</p>'}

let photos = new Map();

photos.set('moon', moon).set('gus', gus);

console.log(photos);

export default Photography;