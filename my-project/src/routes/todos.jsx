import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { addOneTodo, addTodos, removeTodo } from '../features/todos/todosSlice'

function Todos(props) {
  const[todoFormVisible, setTodoFormVisible] = useState(false)
  const dispatch = useDispatch()
  const todos = useSelector(state=>state.todos.todos)


  async function getData(){
    try{
    const verified = await axios.post('http://localhost:3000/users/verify', {}, { withCredentials: true })
    const todosData = await axios.get('http://localhost:3000/todos', { withCredentials: true })
    const todos = todosData.data
    return todos
    }
    catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    getData().then(data=> dispatch(addTodos(data))).catch(error=>console.log(error))
  }, [])

  function handleSubmit(e){
    e.preventDefault()
    const form = e.target 
    const title = form['title'].value
    const description = form['description'].value

    const payload = {
      title: title,
      description: description
    }
    axios.post('http://localhost:3000/todos', payload, {withCredentials:true})
    .then(data =>{
      const newTodo = data.data
      dispatch(addOneTodo(newTodo))
      setTodoFormVisible(false)
    })
    .catch(err => {
      console.log(err)
      setTodoFormVisible(false)
    })
  }

  function deleteTodo(todoId) {
    axios.delete(`http://localhost:3000/todos/${todoId}`, { withCredentials: true })
      .then(() => {
        dispatch(removeTodo({ todoId: todoId }));
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <main className='relative'>
     {todoFormVisible && <>
     <div className='fixed top-0 left-0 w-full h-full bg-black opacity-80'>&nbsp;</div>
     <div className='fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center'>
        <button onClick={()=>{setTodoFormVisible(false)}} className='fixed top-4 right-4'><img className='w-8 h-8 bg-white rounded-full' src="/icons/close.png" alt="close-btn" /></button>
        <form onSubmit={handleSubmit} className='flex flex-col max-w-xl w-full p-8 bg-gray-100'>
          <label className='font-semibold m-2' htmlFor="title">Title</label>
          <input className='mb-6 p-2 border border-orange-300' type="text" id="title" />
          <label className='font-semibold m-2' htmlFor="description">Description</label>
          <textarea className='p-2 border border-orange-300' id="description" cols="30" rows="10"></textarea>
          <button className='py-2 px-3 bg-orange-400 hover:bg-orange-300 text-white mt-4' type='submit'>Add your todo</button>
        </form>
      </div>
      </>}
        <section className='h-40 flex flex-col justify-center items-center bg-orange-400 text-white'>
          <h1 className='text-3xl font-bold'>Your todos</h1>
        </section>
        <section>
          <div className='flex flex-row justify-center items-center p-8'>
            <button onClick={()=>{setTodoFormVisible(true)}} className='bg-orange-400 py-2 px-4 rounded-lg hover:bg-orange-300 text-white'>Add todo</button>
          </div>
          <ul className='flex flex-col gap-4'>
            {
              todos.map(todo=>{
                return(
            <li key={todo._id} className='p-4 shadow-md flex flex-row items-center justify-between '>
              <div>
              <h3 className='text-lg font-semibold text-orange-300'>{todo.title}</h3>
              <p className='text-gray-600'>{todo.description}</p>
              </div>
              <button onClick={()=>{deleteTodo(todo._id)}} className='bg-red-500 py-2 px-4 rounded-lg hover:bg-orange-300 text-white'>Delete</button>
            </li>
                )
              })
            }
          </ul>
        </section>
    </main>
  )
}

export default Todos