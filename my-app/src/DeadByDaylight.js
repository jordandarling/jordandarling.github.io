import React from "react";
import './css/DeadByDaylight.css';

/**
 * Displays perk search and resulting perks
 * @param props 
 * @returns 
 */
let PerkSearch = (props) => {
    let parsePerks = props.perks;
    if(props.searchString){
        props.searchParameter.toUpperCase() === 'NAME' ? parsePerks = parsePerks.filter(matchingPerks => matchingPerks.name.toUpperCase().includes(props.searchString)) : parsePerks = parsePerks.filter(matchingPerks => matchingPerks.description.toUpperCase().includes(props.searchString))
    }

    let perkIcons = parsePerks.map((perk) => 
        <div className='perkContainer'>
            <img key={perk.name} data-perkname={perk.name} data-perkdescription={perk.description} alt={perk.name} src={perk.icon} onClick={props.addPerk} onMouseOver={props.displayPerk}/>
        </div>
        
    );

    return(
        <div>
            <span className="formContainer">
                <input type="text" onKeyUp={props.searchPerks}></input>
                <span className="selectContainer">
                    <select onChange={props.chooseFaction}>
                        <option>Killers</option>
                        <option>Survivors</option>
                    </select>
                    <select onChange={props.updateSearchParameters}>
                        <option>Name</option>
                        <option>Description</option>
                    </select>
                </span>
            </span>
            <div className="perkContainer">
                {perkIcons}
            </div>
        </div>
    )
}

/**
 * Displays perk info
 * @param props 
 * @returns 
 */
let ShowInfo = (props) => {
    return(
        <div data-tooltip={props.name} className='toolTip'>
            <h1>{props.name}</h1>
            <p>{props.description}</p>
        </div>
    )
}

/**
 * Shows user chosen perks
 * @param props 
 * @returns 
 */
let SelectedPerks = (props) => {
    let chosenPerks = props.chosenPerks.map((perk) => {
        let determinedPerk = props.perks.find(tempPerk => tempPerk.name === perk);
        return (
            <div key={determinedPerk.name}>
                <img className='selectedPerkIcon' onMouseOver={props.displayPerk} key={determinedPerk.name} alt={determinedPerk.name} data-perkname={determinedPerk.name} data-perkdescription={determinedPerk.description} onClick={props.removePerk} src={determinedPerk.icon}/>
                <span>{determinedPerk.name}</span>
            </div>
        )
    });

    return(
        <div className='selectedPerks'>
            {chosenPerks}
        </div>
    )
}

class DeadByDaylight extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            searchString: "",
            processedData: false,
            hovering: false,
            perkName: "",
            perkDescription: "",
            searchParameter: "name",
            KillerData: [],
            SurvivorData: [],
            FilteredData: [],
            chosenPerks: []
        }
        this.AddPerk = this.AddPerk.bind(this);
        this.DisplayPerkInfo = this.DisplayPerkInfo.bind(this);
        this.RemovePerk = this.RemovePerk.bind(this);
        this.SearchPerks = this.SearchPerks.bind(this);
        this.UpdateSearchParameters = this.UpdateSearchParameters.bind(this);
        this.ChooseFaction = this.ChooseFaction.bind(this);
    }

    componentDidMount(){
        this.RequestPerks();
    }

    /**
     * Make the fetch request to get perk data, we're interested in 'description' 'role' 'perk_name' 'description' and 'icon'
     */
    RequestPerks = () =>{
        let requestOptions = {
            method: 'GET',
            redirect: 'follow',
          };
          
        fetch("https://afternoon-peak-54092.herokuapp.com/https://dbd-api.herokuapp.com/perks?lang=en", requestOptions)
            .then(response => response.json())
            .then(result => this.ProcessPerks(result))
            .catch(error => console.log('error', error));
    }

    /**
     * Takes all the perks given to us from the API, and categorizes them into Survivor or Killer Maps, with only the relevant info we need
     * Keys are the perk description, value is an object of the name and icon URI
     * @param JSON perkList JSON of all perks in game
     */
    ProcessPerks = (perkList) => {
        let SurvivorMap = [];
        let KillerMap = [];

        perkList.forEach((perk) => {
            let [perkName, perkDescription, perkRole, perkIcon] = [perk.perk_name, perk.description, perk.role, perk.icon];
            if(perkRole.toUpperCase() === 'SURVIVOR'){
                SurvivorMap.push({description: perkDescription, name: perkName, icon: perkIcon});
            } else{
                KillerMap.push({description: perkDescription, name: perkName, icon: perkIcon});
            }
        });

        KillerMap.sort((a, b) => (a.name > b.name) ? 1 : -1);
        SurvivorMap.sort((a, b) => (a.name > b.name) ? 1 : -1)

        this.setState({
            FilteredData: KillerMap,
            KillerData: KillerMap,
            SurvivorData: SurvivorMap,
            processData: true
        });
    }

    /**
     * Displays the details of the perk being hovered over
     * @param onMouseOver event 
     */
    DisplayPerkInfo = (event) => {
        this.setState({
            hovering: true,
            perkName: event.target.dataset.perkname,
            perkDescription: event.target.dataset.perkdescription
        })
    }

    /**
     * Adds the selected perk to the overview section
     * @param onClick event 
     */
    AddPerk = (event) => {
        if(this.state.chosenPerks.length <= 3){
            this.setState(prevState => ({
                chosenPerks: [...prevState.chosenPerks, event.target.dataset.perkname]
            }))
        }
    }

    /**
     * Removes the selected perk from the overview section
     * @param onClick event 
     */
    RemovePerk = (event) => {
        this.setState(prevState => ({
            chosenPerks: prevState.chosenPerks.filter(allowedPerk => allowedPerk !== event.target.dataset.perkname)
        }))
    }

    /**
     * Changes the search parameters of the input box between name and description
     * @param onChange event 
     */
    UpdateSearchParameters = (event) => {
        this.setState({
            searchParameter: event.target.value.toUpperCase()
        })
    }

    /**
     * Changes between displaying killer perks or survivor perks
     * @param onChange event 
     */
    ChooseFaction = (event) => {
        event.target.value.toUpperCase() === 'KILLERS' ? this.setState({FilteredData: this.state.KillerData}) : this.setState({FilteredData: this.state.SurvivorData})
    }

    /**
     * Search for the specific term
     * @param onKeyPress event 
     */
    SearchPerks = (event) => {
        this.setState({
            searchString: event.target.value.toUpperCase()
        })
    }

    render(){
        document.title = 'Dead by Daylight Perks';
        return(
            <div>
                <h1>Dead By Daylight Perk Search</h1>
                {!this.state.processData && <div className="lds-dual-ring"></div>}
                <div className="perkFlex">
                    {this.state.processData && <PerkSearch perks={this.state.FilteredData} searchParameter={this.state.searchParameter} updateSearchParameters={this.UpdateSearchParameters} searchString={this.state.searchString} displayPerk={this.DisplayPerkInfo} addPerk={this.AddPerk} searchPerks={this.SearchPerks} chooseFaction={this.ChooseFaction}/>}
                    <div className="flexColumn">
                        {<SelectedPerks chosenPerks={this.state.chosenPerks} perks={this.state.FilteredData} displayPerk={this.DisplayPerkInfo} removePerk={this.RemovePerk}/>}
                        {this.state.hovering && <ShowInfo name={this.state.perkName} description={this.state.perkDescription}/>}
                    </div>
                </div>
            </div>
        )
    }
}

export default DeadByDaylight;