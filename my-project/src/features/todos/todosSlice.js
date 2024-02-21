import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: []
    },
    reducers: {
        addTodos: (state, action) => {
            state.todos = action.payload
        },
        addOneTodo: (state, action) => {
            state.todos.push(action.payload)
        },
        deleteTodo: (state, action) => {
            const todoId = action.payload.todoId
            state.todos = state.todos.filter(todo=>todo._id!== todoId)
        }
    }
})
export const {addTodos, addOneTodo, removeTodo} = todoSlice.actions
export default todoSlice.reducer