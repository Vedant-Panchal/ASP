import React from 'react'
import { HashLoader } from 'react-spinners'


function Loading({loading}) {
  return (
    <HashLoader color="#D93273" loading={loading}  size={50} className='bg-transparent'/>

  )
}

export default Loading