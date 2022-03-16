import '../css/Util.css'

const TOKEN = '';

export const SearchBar = (props) => {
    return(
      <form onSubmit={props.handleSubmit}>
        <input placeholder="Summoner Name" onChange={props.handleChange}/>
        <button type="submit">Get Data</button>
      </form>
    )
}

export function handleSubmit(event){
  event.preventDefault();
  this.setState({
    showCard:false,
    showSearchBar: false,
    showLoadingBar: true,
  })
  let name = this.state.name;
  fetch(`https://afternoon-peak-54092.herokuapp.com/https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`, {
    method: 'GET',
    headers:{
      'X-Riot-Token': TOKEN
    }
  }).then(res => res.json()).then(
    (result) =>{
      this.setState({
        id: result.id,
        showLoadingBar: false,
        showCard: true,
        showSearchBar: true
      })
    },
    (error) => {
      this.setState({
        showLoadingBar: false,
        showSearchBar: true,
        showError: true
      })
    }
  )
}

export function grabId(){
  const id = this.props.playerId;
  let topChamps = [];
  return fetch(`https://afternoon-peak-54092.herokuapp.com/https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}`, {
    method: 'GET',
    headers:{
      'X-Riot-Token': TOKEN
    }
  }).then(
    res => res.json()).then(
      (result) => {
          for(let i = 0; i < result.length; i++){
            topChamps.push([result[i].championId, result[i].championLevel, result[i].championPoints])
          }
          this.setState({
            id: topChamps,
          });
      }, (error) => {

      }
    );
}