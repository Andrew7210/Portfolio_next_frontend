import React from 'react'
import Spline from '@splinetool/react-spline'
import { Typewriter } from 'react-simple-typewriter'
import {motion} from 'framer-motion'
const Introduce = ({setloaded}) => {
  const move = {
    hidden: {opacity:0},
    show:{
      opacity:1,
      transition:{delayChildren: 1, staggerChildren: 0.2}
    }
  }
  return (
    <div className='flex items-center w-full h-screen snap-center h-screen-ios'>
      <div className='flex flex-col z-10 justify-center pl-[5vw] md:bottom-0 md:absolute md:text-center md:w-full md:pl-0 md:justify-end'>
        <motion.h2 className='max-w-5xl pb-8 text-3xl font-bold text-gray-500 md:pb-0'
        initial={{y:300}} whileInView={{y:0}} transition={{duration:1}}
        >&lt;head&gt;</motion.h2>
        <motion.div variants={move} initial="hidden" whileInView="show" className='pl-[5vw] z-10 pointer-events-none md:pl-0' >
          <motion.h1 className='max-w-5xl p-4 text-4xl font-extrabold text-purple-700 md:p-0 '
            variants={move} >Hello, it's Me</motion.h1>
          <motion.h1 className='max-w-5xl p-6 pl-16 font-extrabold text-white text-7xl md:p-0 '
            variants={move} >Tianyi Zhan </motion.h1>
          <motion.h2 className='max-w-5xl p-4 text-5xl font-bold text-white md:text-4xl md:p-0'
          variants={move} >
            <span>And I'm a </span>
            <Typewriter words={["fullstack", "web", "mobile"]} loop={false} cursor cursorBlinking cursorStyle={"_"} delaySpeed={2000}/>
          </motion.h2>
          <motion.h2 className='max-w-5xl p-4 text-5xl font-bold text-white md:text-4xl md:p-0'
          variants={move} >
            <Typewriter words={["developer", "designer", "learner"]} loop={false} cursor cursorBlinking cursorStyle={"_"} delaySpeed={1000}/>
          </motion.h2>
          <motion.h2 className='max-w-5xl p-4 text-3xl font-extrabold text-purple-700 md:p-0'
          variants={move} >Also a university student</motion.h2>
        </motion.div>
        <motion.h2 className='max-w-5xl pt-8 text-3xl font-bold text-gray-500 md:pt-0'
        initial={{y:-300}} whileInView={{y:0}} transition={{duration:1}}
        >&lt;/head&gt;</motion.h2>
      </div>
      <div className='absolute right-0 md:scale-75 md:-right-[20vh] md:-top-[5%]'><Spline onLoad={()=>setTimeout(() => {
        setloaded(true)
      }, 3000)} scene="https://prod.spline.design/ua1nr3Tk9lk0Yfqh/scene.splinecode" />
      </div>
    </div>
  )
}

export default Introduce