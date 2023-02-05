import React from 'react'
import Spline from '@splinetool/react-spline'
import { Typewriter } from 'react-simple-typewriter'
import {motion} from 'framer-motion'
const Introduce = ({setloaded}) => {
  const move = {
    hidden: {opacity:0},
    show:{
      opacity:1,
      transition:{delayChildren: 2, staggerChildren: 0.2}
    }
  }
  return (
    <div className='flex items-center w-full h-screen snap-center '>
      <div className='flex flex-col z-10 justify-center pl-[5vw] '>
        <motion.h2 className='max-w-5xl text-5xl font-bold text-gray-500 pb-8 md:text-2xl'
        initial={{y:300}} whileInView={{y:0}} transition={{duration:1}}
        >&lt;head&gt;</motion.h2>
        <motion.div variants={move} initial="hidden" whileInView="show" className='pl-[5vw] z-10 pointer-events-none' >
          <motion.h1 className='max-w-5xl p-4 font-extrabold text-purple-700 text-6xl md:text-2xl'
            variants={move} >Hello, it's Me</motion.h1>
          <motion.h1 className='max-w-5xl p-6 pl-16 font-extrabold text-white text-9xl md:text-5xl'
            variants={move} >Tianyi Zhan </motion.h1>
          <motion.h2 className='max-w-5xl p-4 text-6xl font-bold text-white md:text-4xl'
          variants={move} >
            <span>And I'm a </span>
            <Typewriter words={["fullstack", "web", "mobile"]} loop={false} cursor cursorBlinking cursorStyle={"_"} delaySpeed={2000}/>
          </motion.h2>
          <motion.h2 className='max-w-5xl p-4 text-6xl font-bold text-white md:text-4xl'
          variants={move} >
            <Typewriter words={["developer", "designer", "learner"]} loop={false} cursor cursorBlinking cursorStyle={"_"} delaySpeed={1000}/>
          </motion.h2>
          <motion.h2 className='max-w-5xl p-4 text-5xl font-extrabold text-purple-700 md:text-2xl'
          variants={move} >Also a university student</motion.h2>
        </motion.div>
        <motion.h2 className='max-w-5xl text-5xl font-bold text-gray-500 pt-8 md:text-2xl'
        initial={{y:-300}} whileInView={{y:0}} transition={{duration:1}}
        >&lt;/head&gt;</motion.h2>
      </div>
      <div className='absolute right-0 md:scale-50 md:left-0'><Spline onLoad={()=>setTimeout(() => {
        setloaded(true)
      }, 3000)} scene="https://prod.spline.design/ua1nr3Tk9lk0Yfqh/scene.splinecode" />
      </div>
    </div>
  )
}

export default Introduce