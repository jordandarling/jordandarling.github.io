import './css/Jordle.css'
import React from 'react';
import { WORDS } from './Reuse/Words';


let GameBoard = (props) =>{
	let createBoard = props.guesses.map((row, index) => 
		<div key={index} className={`a${index}`}>
			{props.wordLength.map((box, index) => 
				<input disabled autoCorrect='false' key={index} maxLength='1' onKeyUp={props.textProcess} className={`b${index}`} ></input>
			)}
		</div>
	)

	return(
		<div className='gridContainer'>
			{props.guesses.length > 0 && createBoard}
		</div>
	)
}

class Jordle extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			wordLength: Array.from(Array(5)),
			guesses: Array.from(Array(5)),
			currRow: 0,
			counter: 0,
			guessedWord: '',
			wordToGuess: '',
			victory: false,
			defeat: false
		}
		// this.HandleClick = this.HandleClick.bind(this);
		this.TextProcess = this.TextProcess.bind(this);
	}

	componentDidMount(){
		let filteredWords = WORDS.filter(word => word.includes('j'));
		// let ranNumber = Math.floor(Math.random() * filteredWords.length+1)
        let ranNumber = new Date().getDate();
		this.setState({
			wordToGuess: filteredWords[ranNumber]
		}, ()=>console.log(this.state.wordToGuess));
		document.querySelector(`.a0 .b0`).disabled = false;
	}

	componentDidUpdate(){
		console.log(this.state.guesses.length)
	}

	TextProcess = (event) => {
		let children = Array.from(event.target.parentElement.children);
		this.setState(prevState =>{
			return {counter: prevState.counter + 10}
		})
		switch(event.key){
			case 'Enter':
				let array = [];
				children.forEach(textEntry => array.push(textEntry.value))
				if(event.target.parentElement.nextSibling){
					event.target.parentElement.nextSibling.firstChild.disabled = false
					event.target.parentElement.nextSibling.firstChild.focus()
				};
				this.setState({
					guessedWord: array.join('')
				}, ()=>this.CheckGuess())
				break;
			case 'Backspace':
				event.target.previousSibling.focus();
				break;
			default:
				console.log(event);
				if(event.target.nextSibling){
					event.target.nextSibling.disabled = false
					event.target.nextSibling.focus();	
				} 
		}

	}

	CheckGuess = () => {
		let guessArray = [...this.state.guessedWord]
		let correctArray = [...this.state.wordToGuess]
		let correct = 0;
		let currRow = this.state.currRow
		guessArray.forEach((letter, index) => {
			let lowercaseLetter = letter.toLowerCase();
			let letterIndex = guessArray.indexOf(letter);
			if(lowercaseLetter === correctArray[index]){
				document.querySelector(`.a${currRow} .b${index}`).classList.add('correct')
				correct++;
				if(correct === 5){
					this.setState({
						victory: true
					});
					document.querySelectorAll('input').forEach(input => input.disabled = true)
				}
			} else if(correctArray.includes(lowercaseLetter)){
				document.querySelector(`.a${currRow} .b${letterIndex}`).classList.add('partial')
			} else{
				document.querySelector(`.a${currRow} .b${letterIndex}`).classList.add('wrong')
			}
		});
		if(this.state.currRow === this.state.guesses.length - 1 && !this.state.victory){
			document.querySelectorAll('input').forEach(input => input.disabled = true);
			this.setState({
				defeat: true
			})
		}
		this.setState((prevState) => ({
			currRow: prevState.currRow + 1
		}));
	}

	render(){
        document.title = 'Jordle'
		return (
			<div className="container">
				<h1>Jordle</h1>
				<GameBoard wordLength={this.state.wordLength} guesses={this.state.guesses} textProcess={this.TextProcess} handleClick={this.HandleClick}/>
				<div className='allie'>it's wordle, but the word must contain j, ok</div>
				{this.state.victory && <span style={{marginTop: '20px'}}>You got it in {this.state.currRow} {this.state.currRow === 1 ? <span>guess!</span> : <span>guesses!</span>}</span>}
				{this.state.defeat && <span style={{marginTop: '20px'}}>The correct word was {this.state.wordToGuess}</span>}
			</div>
		);
	}
}

export default Jordle;
