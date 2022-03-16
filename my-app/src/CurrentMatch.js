import React from 'react';
import { SearchBar } from './Reuse/Util';

class SummonerData extends React.Component{
    handleSubmit(event){
        event.preventDefault();
    }

    render(){
        return(
            <div className="container">
                <SearchBar handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}


function CurrentMatch(){
    return(
        <div className="App">
            {
                <SummonerData/>
            }
        </div>
    )
}

export default CurrentMatch;