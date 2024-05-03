import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../InnerComponents/Header'
import { UserContext } from '../../context/AuthContext'
function Maintenance() {
    const { mode, setmode } = useContext(UserContext)
  useEffect(() => {
    return (
      (mode === 'dark') ?
        document.getElementById('root').classList.add('dark') :
        document.getElementById('root').classList.remove('dark')
    )
  }, [mode])
  return (
    <section className="bg-light dark:bg-dark h-screen flex items-center justify-center">
      <Header />
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 mt-12 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <div className='flex items-center justify-center'>
            <img src="/assets/404.png" alt="404"
              className='w-[50%] h-[50%]'
            />
          </div>
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-5xl text-primary-600 dark:text-primary-500">
            Under Maintenance
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-xl dark:text-white">
            You are have been using ASP too much let it also rest some time.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            We will be available soon.
          </p>
          <Link to={"/"}

            className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Maintenance