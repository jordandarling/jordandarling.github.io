import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-solid-svg-icons';
import { SearchBar, handleSubmit, grabId } from './Reuse/Util';
import './css/MasteryData.css'

const ErrorDisplay = (props) => {
  return(
    <h1>WHOOPS!</h1>
  )
}

const LoadingBar = (props) => {
  return(
    <FontAwesomeIcon icon={faCompass} spin/>
  )
}

class PlayerDataCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: [],
      championData: []
    };
  }

  componentDidMount(){
    grabId().then(() => fetch(`https://ddragon.leagueoflegends.com/cdn/9.3.1/data/en_US/champion.json`).then(
        res => res.json()).then(
          (result) => {
            let champList = result.data;
            for(let i = 0; i < this.state.id.length; i++){
              for(let champ in champList){
                // eslint-disable-next-line eqeqeq
                if(champList[champ].key == this.state.id[i][0]){
                  //If we don't use the previous state of the array, we just overwrite the previous champion, so only one displays
                  let humanReadablePoints = this.state.id[i][2].toLocaleString("en-US");
                  this.setState(prevState => ({
                    championData: [...prevState.championData,{
                      championName: champList[champ].id,
                      championFullName: champList[champ].name,
                      championLevel: this.state.id[i][1],
                      championPoints: humanReadablePoints,
                    }],
                    showCard: true,
                  }));
                }
              }
            }
          }
      ));
  }

  render(){
    return this.state.championData.map((champion, index) => {
      const CHAMPION = champion.championName;
      const DATADRAGONIMAGEURL = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${CHAMPION}_0.jpg`;   
      return(
        <div key={champion.championFullName} className="masteryCard">
        <img src={DATADRAGONIMAGEURL} alt={CHAMPION}/>
          <div>
            <h1>{champion.championFullName} - {champion.championLevel}</h1>
            <h3>{champion.championPoints}</h3>
            <h4>{champion.championLastPlayed}</h4>
          </div>
        </div>
      );
    });
  }
}

class SummonerData extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: '',
      showSearchBar: true,
      showLoadingBar: false,
      showCard: false,
      showError: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({
      name: event.target.value
    })
  }



  render(){
    document.title = 'League Mastery';
    return(
      <div className='container'>
        {
          this.state.showSearchBar ? <SearchBar handleSubmit={handleSubmit} handleChange={this.handleChange}/> : null
        }
        {
          this.state.showLoadingBar ? <LoadingBar/> : null
        }
        {
          this.state.showCard && <div className='masteryCardContainer'><PlayerDataCard playerId={this.state.id}/></div>
        }
        {
          this.state.showError && <ErrorDisplay/>
        }
      </div>
    );
  }
}

function MasteryData(){
    return (
        <div className="App">
            {
                <SummonerData/>
            }
        </div>
    )
}


export default MasteryData;