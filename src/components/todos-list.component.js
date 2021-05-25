import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

"""User-Interface for the Todo List Tracker"""

const Todo = props => {
    function deleteTodo() {
         axios.delete('http://localhost:4000/todos/delete/'+props.todo._id)
         .then(response => {
             console.log('Deleted Todo');
         })
         .catch(function(error){
             console.log(error);
         })
    }

    return (
        <tr>
            <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
            <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
            <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
            <td>
                <Link to={"/edit/"+props.todo._id}>Edit</Link>
            </td>
            <td>
                <Button onClick={deleteTodo} size="sm" variant="danger"> Delete</Button>
            </td>
        </tr>
    );
};


export default class TodosList extends Component {
    constructor(props) {
        super(props);
        this.state = {todos: []};
    }

    componentDidMount() {
        axios.get("http://localhost:4000/todos/")
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch( function (error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get("http://localhost:4000/todos/")
            .then(response => {
                this.setState({todos: response.data});
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    todoList() {
        return this.state.todos.map(function(currentTodo, index) {
            return <Todo todo={currentTodo} key={index} />;
        })
    }


    render() {
        return (
            <div>
                <h3>Todos List </h3>
                <table className="table table-striped" style = {{marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
