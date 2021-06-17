import TodoList from './Todo/TodoList'
import React, { useEffect } from 'react';
import Context from './context';
import AddTodo from './Todo/AddTodo';
import axios from 'axios';


function App() {

  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:3004/posts")
      setTodos(response.data)
    })();
  }, [])

  const [todos, setTodos] = React.useState([
  ])


  async function deleteTag(item, tittle, id) {
    await axios.put("http://localhost:3004/posts/" + id, { tittle: tittle.split(' ').filter(word => word !== item).join(' ') });
    const response = await axios.get("http://localhost:3004/posts")
    setTodos(response.data)
  }

  function removeTodo(id) {
    axios.delete("http://localhost:3004/posts/" + id);
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function filterTags(tag) {
    setTodos(todos.filter(todo => todo.tittle.includes(tag)))
  }

  function editTodo(id, tittleBox) {
    tittleBox.current.contentEditable = true
    for (let i = 0; i < tittleBox.current.children.length; i++) {
      tittleBox.current.children[i].className = 'editHashTag'
    }
    tittleBox.current.className = 'tittleBoxChecked'
    tittleBox.current.onblur = function () {
      (async () => {
        await axios.put("http://localhost:3004/posts/" + id, { tittle: tittleBox.current.outerText });
        const response = await axios.get("http://localhost:3004/posts")
        setTodos(response.data)
      })();
      for (let i = 0; i < tittleBox.current.children.length; i++) {
        tittleBox.current.children[i].className = 'hashTagText'
      }
      tittleBox.current.className = 'tittleBox'
      tittleBox.current.contentEditable = false;
    };
  }

  async function addTodo(tittle) {
    const post = await axios.post("http://localhost:3004/posts", { tittle: tittle });

    setTodos(todos.concat([post.data]))
  }

  return (
    <Context.Provider value={{ removeTodo, editTodo, filterTags, deleteTag }}>
      <div className="wrapper">
        <h1>
          Todo list
        </h1>
        <AddTodo onCreate={addTodo} />
        {todos.length ? <TodoList todos={todos} /> : <p>no todos</p>}

      </div>
    </Context.Provider>
  );
}

export default App;
