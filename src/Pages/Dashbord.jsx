import React, { useRef } from 'react'
import Background from '../Components/Background'
import Foreground from '../Components/Foreground'
import Card from '../Components/Card'
import Header from '../Components/Header'


const Dashbord = () => {
    const ref =useRef(null)
    
  return (
    <div className='relative w-full h-screen bg-zinc-800'>
    <Background/>
    <Header insideDash={true}/>
    <div ref={ref} className='fixed z-[3] top-20 bottom-10 left-0 w-full flex gap-8 flex-wrap px-3 pb-2'>
            <Card reference={ref}/>
            <Card reference={ref}/>
            <Card reference={ref}/>

        </div>
    </div>
  )
}

export default Dashbord