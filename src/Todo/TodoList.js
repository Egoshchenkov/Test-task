import React from 'react';
import './TodoList.scss'
import TodoItem from './TodoItem';


export default function TodoList(props) {
    return (
        <ul>
            {props.todos.map((todo, index) => {
                return <TodoItem
                TodoItem_2 
                todo={todo} 
                key={todo.id} 
                index={index} 
                onChange={props.onToggle}/>
            })}
        </ul>
    )
}