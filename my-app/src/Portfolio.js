import React, { useState } from "react"
import './css/Portfolio.css';

//When using webpack, img src needs to have {require(./<imgdir>)}
const DisplayedProject = (props) =>{
    const [firstImageDisplayed, updateFirstImage] = useState(true);
    const [secondImageDisplayed, updateSecondImage] = useState(true);
    const [thirdImageDisplayed, updateThirdImage] = useState(true);
    switch(props.display){
        case "android":
            return(
                <div className='workContainer' id="Android">
                    <h2>PlastiTrak</h2>
                    <p>PlastiTrak is an Android app developed in Kotlin that helps users track their usage of single use plastics in everyday life.</p>
                    <ul>
                        <li>When you use a single use plastic, you can open the app and log it, with details such as</li>
                        <ul>
                            <li>Name</li>
                            <li>Size</li>
                            <li>Date</li>
                        </ul>
                        <li>Logging can be done manually or via a barcode scan</li>
                        <li>Barcode scans get the item UPC and run it to an online service to find details on the items scanned</li>
                    </ul>
                    <br/>
                    <div className="phoneScreenshots">
                        <img src={require("./images/plastitrak/plastitrak1.png")} alt="PlastiTrack home screen, featuring app details and action menu"/>
                        <img src={require("./images/plastitrak/plastitrak2.png")} alt="PlastiTrack dashboard, showing two entries of single use plastic items"/>
                    </div>
                </div> 
            )
        case "ios":
            return(
                <div className='workContainer' id="iOS">
                    <h2>Whether</h2>
                    <p>Whether is an iOS application built in Swift that offers simple weather forecasting using the Dark Sky API.</p>
                    <ul>
                        <li>Whether uses your location or allows you to enter a location in order to view the weather forecast for that region</li>
                        <li>Whether takes that forecast and offers guidance on what to wear for the day</li>
                        <li>In addition, the background of the app changes based on the temperature</li>
                    </ul>
                    <br/>
                    <div className="phoneScreenshots">
                        <img src={require("./images/whether/whether1.png")} alt="The weather forecast for Rochester, New York, alongside an advisory on dressing with layers."/>
                        <img src={require("./images/whether/whether2.png")} alt="The weather forecase for Orlando, Florida, alongside an advisory on dressing with layers."/>
                    </div>
                </div>  
            )
        default:
        case "web":
            return(
                <div className='workContainer' id="Web">
                    <h2><a href="https://start.rit.edu">start.rit.edu</a></h2>
                    <p>Working with a small team, I was involved in the process of redesigning start.rit.edu, a tool used by the RIT community to manage their accounts with RIT. I was involved in the process of creating a new design, implementing it, and testing it alongside several other people.</p>
                    <h3>Click to view before/after</h3>
                    <br/>
                    <div className="imageContainer">
                        <div className="clickChange" onClick={() => updateFirstImage(!firstImageDisplayed)}>
                            {firstImageDisplayed ? <img src={require("./images/before/index.png")} alt="The original dashboard for start.rit.edu, featuring a grid of options related to account management"/> : <img src={require("./images/after/index.png")} alt="The updated dashboard for start.rit.edu, with a new color scheme and completely redesigned interface"/>}
                        </div>
                        <br/>
                        <div className="clickChange" onClick={() => updateSecondImage(!secondImageDisplayed)}>
                            {secondImageDisplayed ? <img src={require("./images/before/directory.png")} alt="The original directory management page for a user account at RIT"/> : <img src={require("./images/after/directory.png")} alt="The updated directory management page for a user account at RIT"/>}
                        </div>
                        <br/>
                        <div className="clickChange" onClick={() => updateThirdImage(!thirdImageDisplayed)}>
                            {thirdImageDisplayed ? <img src={require("./images/before/username.png")} alt="The original page used for recovering RIT usernames"/> : <img src={require("./images/after/username.png")} alt="The updated page used for recovering RIT usernames"/>}
                        </div>
                        <br/>
                    </div> 
                </div>  
            )
    }
}

class Portfolio extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            display: 'web'
        }
        this.display = this.display.bind(this);
        this.clickChange = this.clickChange.bind(this);
    }

    display(renderTarget){
        this.setState({
            display: renderTarget
        });
    }

    clickChange(){
        console.log("click!");
        console.log(this);
        // this.children.classList.toggle("hidden");
        // this.siblings("img").toggle();
    }
    
    render (){
        return (
            <div>
                <h2>Work I've Done - <button className="workLink" href="#" onClick={() => this.display('web')}>Web</button> - <button className="workLink" onClick={() => this.display('android')}>Android</button> - <button className="workLink" onClick={() => this.display('ios')}>iOS</button></h2>
                <DisplayedProject display={this.state.display} changeManager={this.clickChange}/>
            </div>
        )
    } 
}

export default Portfolio;