import React, { useContext, useRef} from 'react';
import './TodoItem.scss'
import Context from '../context';

export default function TodoItem(props) {
    const hashTag = props.todo.tittle.split(' ').filter(item => { return item.includes('#') })

    const tittleBox = useRef();
    const { removeTodo } = useContext(Context);
    const { editTodo } = useContext(Context);
    const { filterTags } = useContext(Context);
    const { deleteTag } = useContext(Context);

    function getEventTarget(event) {
        filterTags(event.target.outerText)
    }

    return (
        <li>
            <div className="main">
                <div>
                    <strong>
                        {props.index + 1}
                    </strong>
                    &nbsp;
                    <div contentEditable='false' suppressContentEditableWarning={true} ref={tittleBox} className="tittleBox"> 
                        {props.todo.tittle}
                        {/* {props.todo.tittle.split(' ').map((item, index) => {
                            if (item.includes('#')) { return <span className="hashTagText" key={index}>{item} </span> }
                            else return ' ' + item + ' '
                        })} */}
                    </div>
                    <div className="hashTagBox">
                        {hashTag.map((item, index) => {
                            return  <div key={index} className="hashTag">
                                        <span key={index} onClick={getEventTarget}>
                                            {item}
                                        </span>
                                        <button className="deleteTagButton" onClick={() => deleteTag(item, props.todo.tittle, props.todo.id)}>&times;</button>
                                    </div>
                        })}
                    </div>
                </div>
            </div>
            <span className="buttons">
                <button onClick={() => editTodo(props.todo.id, tittleBox)} className="button button__edit">Edit</button>
                <button onClick={() => removeTodo(props.todo.id)} className="button button__remove">&times;</button>
            </span>
        </li>)
}