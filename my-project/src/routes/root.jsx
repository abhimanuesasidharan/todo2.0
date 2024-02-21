import React from 'react'
import {useSelector} from 'react-redux'
import { Link, Outlet } from 'react-router-dom'

function Root(props) {
    const user = useSelector(state=>state.auth.user)
    return (
        <>
            <header className='h-20 flex flex-row justify-between items-center p-4 shadow-lg'>
                <span>Todo App 📝</span>
                <nav>
                    <ul className='flex flex-row gap-6'>
                        <li>
                            <Link to={'#'}>Home</Link>
                        </li>
                        <li>
                            <Link to={'/todos'}>Todos</Link>
                        </li>
                    </ul>
                </nav>
                {user?<span className='w-10 h-10 rounded-full bg-orange-400 flex flex-row items-center justify-center text-white font-extrabold'>{user.name.charAt(0)}</span>:<Link className='px-4 py-1 bg-orange-400 text-white rounded-md text-center mt-6' to={'/login'}>Login</Link>}
            </header>
            <Outlet/>
            <footer>
                <span className='flex flex-row justify-center items-center bg-black text-white p-4 text-xs'>&copy ABSD</span>
            </footer>

        </>
    )
}

export default Root