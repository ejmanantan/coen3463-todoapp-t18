import React, {PropTypes} from 'react';
import '../components/App.css';
import Todoitems from '../components/Todoitems.js';
import Loading from './loading';
import TodoApi from '../api/TodoApi';
var moment = require('moment-timezone');



class Todo extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state={
        }
        this.onAddTodo = this.onAddTodo.bind(this);
    }
    onAddTodo(e) {
        e.preventDefault();
        var lastState = this.props.items; //get last state of item
        let toDo = { //create a todo object to be saved
            name: this.refs.todo.value,
            user: this.props.user,
            createDate: moment().tz("Asia/Manila").format('LLL'),
        }
        this.setState({ //update items
            items :[...lastState,Object.assign({},toDo)]
        });
        TodoApi.onAddTodo(toDo).then(res=>{
            
            console.log(res.data.response);
            if(res.data.success){
                this.props.setStateItem([...lastState,Object.assign({},res.data.response)]);
                this.props.setOriginalItems();
                 
                return;
            }
            
        }).catch(err=>{
            
            console.log(err);
        }); 
    }
    
    render(){
    return(
        <div className="App-section">
         <div id="hello2">
                <div className = "form">
                {this.props.isLoading? 
                <Loading text="Loading" speed={300}/>
                :
                <div>
                <br></br>
                <br></br>
               <center> <strong><h1><p>Hello {this.props.name} ! </p></h1></strong></center>
                 <h3><center>{this.props.onCounting? <Loading text="Loading" speed={300}/>:
                <div>
                 <br></br>
                 You have completed {this.props.completedCount}/{this.props.originalitems} of your Todo List
                </div>
                }</center></h3>
                 <br></br>
                <div className="App-section">
                <center>
                <button onClick={this.props.todoAll} size="small" className="button3">ALL</button> 
                <button onClick={this.props.todoOpen} size="small" className="button3">OPEN</button> 
                <button onClick={this.props.todoCompleted} size="small" className="button3">COMPLETED</button> 
                <button onClick={this.props.DelAllComplete}size="small" className="button3">CLEAR COMPLETED</button>
                </center>
                <form onSubmit={this.onAddTodo}>
                 <br></br> <center>
                    <input placeholder="Add a ToDo item" ref="todo" className ="in" / >
                    <button type="submit" className="button2" ><span>Add</span></button></center>
                </form>
                 <br/>
                </div>
                <div className="App-section1">
                {this.props.onUpdate? <Loading text="Loading" speed={300}/>:
                <div>
                <ul>

                {this.props.items.map((item, index)=>
                    
                    <Todoitems key={index}
                            item={item}
                            index={index}
                            onComplete={this.props.onComplete}
                            OnDelete={this.props.OnDelete}/>
                          
                )}

                </ul>

                </div>
                }
                </div>
                <br/>
                <br/>
                
                <button onClick={this.props.onLogOut} value="Logout" className="button">Logout</button>
                
                </div>
                }
                </div>
                </div>
        </div>
    )
}
}

Todo.PropTypes = {
    onLogOut: PropTypes.func.isRequired,
    onAddTodo: PropTypes.func.isRequired,
    
}
export default Todo;
