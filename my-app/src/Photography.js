import React from "react";
import './css/Photography.css';


const photos = [
    {'image':'Moon', 'cameraSettings': 'Nikon D3500 | ISO 100 | &#119891;/11.0 | 1/100s<br/>300mm | 6.3 | 70.0-300.0 mm f/4.5-6.3<br/>5/15/2022 - 11:00PM', 'description': '<p>Shot during the lunar eclipse of May 2022, this image was my first attempt at any form of astrophotography. The moon is an excellent place to start with astrophotography, as it\'s bright, easy to focus on, and doesn\'t require long exposure times.</p><p>This was my favorite shot of the night, despite not displaying the \'blood moon\' of the evening. While not particularly crimson, this image is a clear display of the various craters and lines that cover the lunar surface.</p>'},
    {'image':'Moon', 'cameraSettings': 'Nikon D3500 | ISO 100 | &#119891;/11.0 | 1/100s<br/>300mm | 6.3 | 70.0-300.0 mm f/4.5-6.3<br/>5/15/2022 - 11:00PM', 'description': '<p>Shot during the lunar eclipse of May 2022, this image was my first attempt at any form of astrophotography. The moon is an excellent place to start with astrophotography, as it\'s bright, easy to focus on, and doesn\'t require long exposure times.</p><p>This was my favorite shot of the night, despite not displaying the \'blood moon\' of the evening. While not particularly crimson, this image is a clear display of the various craters and lines that cover the lunar surface.</p>'}
]

const DisplayPhoto = (props) => {
    console.log(props);
    return(
        <div>
            <figure>
            <img src={require(`./images/photography/${props.photo.image}.JPG`)} alt={props.photo.image}/>
            <figcaption>
                {props.photo.cameraSettings}
            </figcaption>
            </figure>
            {props.photo.description}
        </div>
    )
}

/**
 * Generate a select element populated with options from the photos array
 * @param props  
 * @returns Select element with options from photo array
 */
const ListPhotos = (props) => {
    const photoList = props.photos.map((photo) =>
        <option>{photo.image}</option>
    );
    return(
        <select onChange={props.handleChange}>
            {photoList}
        </select>
    )
}

class Photography extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            displayedPhoto: photos[0]
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        console.log(event.target.selectedIndex);
        this.setState({
            displayedPhoto: photos[event.target.selectedIndex]
        })
    }

    render(){
        return(
            <div className="photoGallery">
                <div className="photoGalleryHeader">
                    <h1>My Photo Gallery</h1>
                    {<ListPhotos photos={photos} handleChange={this.handleChange}/>}
                </div>
                <DisplayPhoto photo={this.state.displayedPhoto} />
            </div>
        )
    }
}

export default Photography;