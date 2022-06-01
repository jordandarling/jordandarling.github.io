import React from "react";
import './css/Todo.css';

let TodoList = (props) => {
    // Map each list item
    let listItems = props.listItems.map((item, index) =>{
        return <li key={index} onDoubleClick={props.editItem}><input type='checkbox' onClick={props.removeItem}></input>{item}</li>
    });

    return(
        <div>
            <input type="text" placeholder="What needs to be done?" onKeyPress={props.updateList}></input>
            <ul className='todoList'>
                {console.log(props.listItems)}
                {props.listItems.length > 0 && listItems}
            </ul>
            {props.listItems.length > 0 && <span>{props.counter}</span>}
            {props.listItems.length > 0 && <span><button onClick={()=>props.show('All')}>All</button> <button onClick={()=>props.show('Active')}>Active</button> <button onClick={()=>props.show('Completed')}>Completed</button> <button onClick={props.clearItems}>Clear Completed Items</button></span>}
        </div>
    )
}

class TodoApp extends React.Component{

    constructor(props){
        super(props);
        this.updateList = this.updateList.bind(this);
        this.editItem = this.editItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.clearItems = this.clearItems.bind(this);
        this.show = this.show.bind(this);
        this.state = {
            items: ['Check gus', 'check gus 2', 'fish'],
            toRemove: [],
            counter: 0
        }
    }

    updateList = (event) =>{
        if(event.key === 'Enter'){
            let value = event.target.value;
            // Use an update function, set items equal to expanded previous state and add
            if(!this.state.items.includes(value) && !event.target.classList.contains('tempInput')){
                this.setState(previousState =>({
                    items: [...previousState.items, value],
                    counter: previousState.counter + 1
                }));
            } else{
                let newArray = [...this.state.items];
                let arrayIndex = newArray.indexOf(event.target.dataset.originalitem);
                this.setState(previousState => {
                    const newItems = previousState.items;
                    newItems[arrayIndex] = value;
                    return {items: newItems}
                    // return {items: [...previousState.items, value]}
                });
            }
            event.target.value = '';
            if(event.target.classList.contains('tempInput')){
                event.target.remove();
            }
        }
    }

    editItem = (event) => {
        let textContent = event.target.textContent;
        let listInput = document.createElement('input');
        listInput.value = textContent;
        listInput.classList.add('tempInput');
        listInput.setAttribute('data-originalitem', textContent);
        listInput.addEventListener('keypress', this.updateList);
        event.target.replaceWith(listInput);
    }

    removeItem = (item) => {
        item.target.parentElement.classList.contains('toggle') ? this.setState(previousState => ({counter: previousState.counter + 1})) : this.setState(previousState => ({counter: previousState.counter - 1, toRemove: [...previousState.toRemove, item.target.parentElement.textContent]}))
        item.target.parentElement.classList.toggle('toggle');
    }

    clearItems = () => {
        let filteredArray = this.state.items.filter(filter => !this.state.toRemove.includes(filter));
        this.setState(previousState => ({
            items: filteredArray,
            toRemove: []
        }))
    }

    show = (action) => {
        switch(action){
            default:
            case 'All':
                document.querySelectorAll('.todoList > li').forEach(item => item.style.display = 'list-item');
                break;
            case 'Active':
                document.querySelectorAll('.todoList > li').forEach(item => item.style.display = 'list-item');
                document.querySelectorAll('.toggle').forEach(item => item.style.display = 'none');
                break;
            case 'Completed':
                document.querySelectorAll('.todoList > li').forEach(item => item.style.display = 'list-item');
                document.querySelectorAll('.todoList > li:not(.toggle)').forEach(item => item.style.display = 'none');
                break;

        }
    }

    render(){
        return(
            <div className="todoContainer">
                <h1>Todo</h1>
                <TodoList updateList={this.updateList} listItems={this.state.items} editItem={this.editItem} removeItem={this.removeItem} counter={this.state.counter} clearItems={this.clearItems} show={this.show}/>
            </div>
        )
    }
}

export default TodoApp;