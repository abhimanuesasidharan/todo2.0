import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addUser } from '../features/auth/authSlice';

function SignUp(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSignUp = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form['name'].value
        const email = form['email'].value
        const password = form['password'].value
        axios.post('http://localhost:3000/users/signup', {name,email,password},{withCredentials:true})
        .then(data=>{
            const user = (data.data.user)
            console.log(user)
           dispatch(addUser(user))
           navigate('/login')
        })
        .catch(err =>{
            console.log(err)
        })
    }
  return (
    <main className='h-screen'>
        <section className='h-full flex flex-col justify-center items-center'>
            <form className='flex flex-col' onSubmit={handleSignUp}>
                <label htmlFor="name">FullName</label>
                <input className='border border-orange-400 mt-2 mb-4' type="text" name="name" id="name" />
                <label htmlFor="email">Email</label>
                <input className='border border-orange-400 mt-2 mb-4' type="email" name="email" id="email" />
                <label htmlFor="password">Password</label>
                <input className='border border-orange-400 mt-2 mb-4' type="password" name ="passsword" id="password" />
                <button type ="submit" className='py-1 px-4 bg-orange-400 text-white rounded-sm'>SignUp</button>
            </form>
        </section>
    </main>
  )
}

export default SignUp