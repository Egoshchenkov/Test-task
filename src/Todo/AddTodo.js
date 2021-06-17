import React, {useState} from 'react';

function useInputValue(defaultValue = '') {
    const [value, setValue] = useState(defaultValue)

    return {
        bind: {
            value,
            onChange: event => setValue(event.target.value)
        },
        clear: () => setValue(''),
        value: () => value
    }
}

function AddTodo(props) {
    const input = useInputValue('')

    function submitHandler(event) {
        event.preventDefault()

        if(input.value().trim()) {
            props.onCreate(input.value());
            input.clear()
        }
    }
    return (
        <form style={ { marginBottom: '1rem'}} onSubmit={submitHandler}>
            <input {...input.bind}></input>
            <button type='submit' className="button button__add">Add todo</button>
        </form>
    )
}

export default AddTodo