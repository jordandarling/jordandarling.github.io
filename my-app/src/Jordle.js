import './css/Jordle.css'
import React from 'react';
import { WORDS } from './Reuse/Words';


let GameBoard = (props) =>{

	let createGrid = (box) => {
		return box.map((grid, index) => 
			<div key={index} className={props.correctLetters.includes(grid) ? 'correct' : props.partialLetters.includes(grid) ? 'partial' : props.wrongLetters.includes(grid) ? 'wrong' : ''}>{grid}</div>
		)
	}

	let createBoard = props.wordArray.map((box, index) => 
		<div key={index} className={`a${index}`}>
			{createGrid(box)}
		</div>
	)

	return(
		<div className='gridContainer'>
			{props.wordArray.length > 0 && createBoard}
		</div>
	)
}

let KeyBoard = (props) => {


	let keyMap = (keys) => {
		console.log(keys.split(''))
		console.log(typeof keys);
		return keys.split('').map(key => 
			<button className={props.correctLetters.includes(key) ? 'correct' : props.partialLetters.includes(key) ? 'partial' : props.wrongLetters.includes(key) ? 'wrong' : ''} index={key} onClick={() => props.TextProcess(key)}>{key}</button>
		)
	}

	let keyMapWrapper = props.keyMap.map(subKeys => 
		<span>
			{keyMap(subKeys)}
		</span>
	)

	return(
		<div className='keyboardContainer'>
			{props.keyMap.length > 0 && keyMapWrapper}
			<button onClick={props.CheckGuess}>Enter</button>
		</div>
	)
}

class Jordle extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			wordArray: Array.from(Array(6), () => new Array(5).fill(null)),
			resultsArray: Array.from(Array(6), () => new Array(5).fill(null)),
			correctLetters: [],
			partialLetters: [],
			wrongLetters: [],
			currRow: 0,
			counter: 0,
			guessedWord: '',
			wordToGuess: '',
			victory: false,
		}
		this.TextProcess = this.TextProcess.bind(this);
		this.Share = this.Share.bind(this);
	}

	componentDidMount(){
		let filteredWords = WORDS.filter(word => word.includes('j'));
		// let ranNumber = Math.floor(Math.random() * filteredWords.length+1)
        let ranNumber = new Date().getDate();
		this.setState({
			wordToGuess: filteredWords[ranNumber]
		}, ()=>console.log(this.state.wordToGuess));
	}

	TextProcess = (event) => {
		let letter = ''
		typeof event === 'string' ? letter = event : letter = event.key
		if(letter === 'Enter'){
			this.CheckGuess();
			return
		}
		let updateWord = this.state.wordArray[this.state.currRow];
		if(updateWord[4] === null){
			updateWord[this.state.counter] = letter;
			this.setState(prevState => ({
				wordLength: updateWord,
				counter: prevState.counter + 1
			}));
		}
	}

	Share = () => {
		console.log(this.state.resultsArray)
		let copyString = `Jordle ${this.state.currRow}/6\n`;
		this.state.resultsArray.forEach(subArray => {
			if(subArray[0] !== null){
				subArray.forEach(letter => {
					switch(letter){
						case 'correct':
							copyString += '🟩'
							break;
						case 'partial':
							copyString += '🟨'
							break;
						default:
							copyString += '⬜'
							break;
					}
				})
				copyString += '\n'
			}
		})
		navigator.clipboard.writeText(copyString)
	}

	CheckGuess = () => {
		let correctArray = [...this.state.wordToGuess]
		let currRow = this.state.currRow
		let guessArray = this.state.wordArray[currRow]
		let updatedResults = this.state.resultsArray[currRow];
		let correct = 0;
		if(guessArray[4] !== null){
			guessArray.forEach((letter, index) => {
				let lowercaseLetter = letter.toLowerCase();
				if(lowercaseLetter === correctArray[index]){
					updatedResults[index] = 'correct';
					correct++;
					this.setState(prevState => {
						return {correctLetters: [...prevState.correctLetters, lowercaseLetter]}
					});
					if(correct === 5){
						this.setState({
							victory: true
						});
					}
				} else if(correctArray.includes(lowercaseLetter)){
					updatedResults[index] = 'partial';
					this.setState(prevState => {
						return {partialLetters: [...prevState.partialLetters, lowercaseLetter]}
					});
				} else{
					updatedResults[index] = 'wrong';
					this.setState(prevState => {
						return {wrongLetters: [...prevState.wrongLetters, lowercaseLetter]}
					});
				}
			});
			if(this.state.currRow === this.state.wordArray.length - 1 && !this.state.victory){
				document.querySelectorAll('input').forEach(input => input.disabled = true);
				this.setState({
					defeat: true
				})
			}
			this.setState((prevState) => ({
				resultsArray: prevState.resultsArray.map((row, index) => {
					if(index === currRow){
						return updatedResults
					} else{
						return row;
					}
				}),
				counter: 0,
				currRow: prevState.currRow + 1
			}));
		}
	}

	render(){
        document.title = 'Jordle'
		window.addEventListener('keyup', this.TextProcess);
		const alphabet = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
		return (
			<div className="container">
				<h1>Jordle</h1>
				<GameBoard  wordArray={this.state.wordArray} correctLetters={this.state.correctLetters} partialLetters={this.state.partialLetters} wrongLetters={this.state.wrongLetters}/>
				<KeyBoard keyMap={alphabet} TextProcess={this.TextProcess} CheckGuess={this.CheckGuess} correctLetters={this.state.correctLetters} partialLetters={this.state.partialLetters} wrongLetters={this.state.wrongLetters}/>
				<div className='allie'>
					<h3>Welcome to Jordle!</h3>
					The objective of the game is to correctly guess the 5 letter word within 6 tries. <br/>
					The word <i>will</i> contain the letter J somewhere. <br/>
					Each time you guess, the squares you most recently entered text into will change color, signifying which letters are correct, partially correct, or incorrect!
					<div className='guessGuide'>
						<span><div className='correct'></div>The letter is in the correct place</span>
						<span><div className='partial'></div>The letter exists in the word, just in a different place</span>
						<span><div className='wrong'></div>The letter appears nowhere in the word</span>
					</div>
					<button onClick={() => {document.querySelector('.allie').style.display = 'none'}}>Got it!</button>
				</div>
				{this.state.victory && <div className='victoryText'><span style={{marginTop: '20px'}}>You got it in {this.state.currRow} {this.state.currRow === 1 ? <span>guess!</span> : <span>guesses!</span>}</span><button className='victoryButton' onClick={this.Share}>Share</button></div>}
				{/* {this.state.defeat && <span style={{marginTop: '20px'}}>The correct word was {this.state.wordToGuess}</span>} */}
			</div>
		);
	}
}

export default Jordle;
