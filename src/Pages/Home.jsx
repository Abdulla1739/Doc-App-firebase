import React from 'react'
import Background from '../Components/Background'
import Foreground from '../Components/Foreground'
import Header from '../Components/Header'

const Home = () => {
    
  return (
    <div className='relative w-full h-screen bg-zinc-800'>
    <Background/>
    <Header/>
    {/* <Foreground/> */}
    </div>
  )
}

export default Home