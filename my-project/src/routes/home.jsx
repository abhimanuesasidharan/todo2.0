import React from 'react'

function Home(props) {
  return (
    <main className='h-screen'>
        <section className='h-full flex flex-col items-center justify-center'>
          <h1>Welcome to Todos app</h1>
          <button className='px-4 py-1 bg-orange-400 text-white rounded-md text-center mt-6'>Login</button>
        </section>
    </main>
  )
}

export default Home