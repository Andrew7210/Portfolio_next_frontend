import React from 'react'
import Spline from '@splinetool/react-spline'
import { Typewriter } from 'react-simple-typewriter'
const Introduce = ({setloaded}) => {
  return (
    <div className='flex items-center w-full adjustheight'>
      <div className='flex flex-col justify-center pl-[5vw]'>
        <h2 className='max-w-5xl text-5xl font-bold text-white '>&lt;head&gt;</h2>
        <div className='pl-[5vw] z-10 pointer-events-none'>
          <h1 className='max-w-5xl p-6 font-extrabold text-white text-7xl '>Hello, it's Me</h1>
          <h1 className='max-w-5xl p-6 font-extrabold text-white text-9xl'>Andrew Zhan </h1>
          <h2 className='max-w-5xl p-4 text-6xl font-bold text-white '>
            <span>And I'm a </span>
            <Typewriter words={["fullstack", "web", "mobile"]} loop={false} cursor cursorBlinking cursorStyle={"_"} delaySpeed={2000}/>
          </h2>
          <h2 className='max-w-5xl p-4 text-6xl font-bold text-white '>
            <Typewriter words={["developer", "designer", "learner"]} loop={false} cursor cursorBlinking cursorStyle={"_"} delaySpeed={1000}/>
          </h2>
          <h2 className='max-w-5xl p-4 text-5xl font-bold text-white '>Also a university student</h2>
        </div>
        <h2 className='max-w-5xl text-5xl font-bold text-white '>&lt;/head&gt;</h2>
      </div>
      <div className='absolute right-0'><Spline onLoad={()=>setloaded(true)} scene="https://prod.spline.design/ua1nr3Tk9lk0Yfqh/scene.splinecode" /></div>
    </div>
  )
}

export default Introduce