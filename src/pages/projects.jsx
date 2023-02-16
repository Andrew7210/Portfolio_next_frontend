import React, {useState} from 'react'
import Spline from '@splinetool/react-spline'
import Lottie from "lottie-react";
import linkedin from "public/lotti/linkedin.json";
import github from "public/lotti/gitcat.json";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import {motion, AnimatePresence} from 'framer-motion'
import Mywork from '../components/Mywork';
import { Typewriter } from 'react-simple-typewriter'

const Projects = () => {
  const [showScreen, setShowScreen] = useState(true)
  const { rive, RiveComponent} = useRive({
    src: "rive/pigeons_button.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });
  return (
    <>
      <AnimatePresence>
        {showScreen && (
          <motion.div className="w-screen h-screen fixed top-0 z-30 bg-[#140e20] flex flex-col justify-center items-center text-center" exit={{opacity:0}}>
            <div class="bookshelf_wrapper">
              <ul class="books_list">
                <li class="book_item first"></li>
                <li class="book_item second"></li>
                <li class="book_item third"></li>
                <li class="book_item fourth"></li>
                <li class="book_item fifth"></li>
                <li class="book_item sixth"></li>
              </ul>
              <div class="shelf"></div>
            </div>
            <h2 className='p-4 text-4xl font-bold text-purple-600 relative -bottom-[20%]'>Loading...</h2>
          </motion.div>
        )}
      </AnimatePresence> 
      <div className='flex flex-col bg-[#040505]'>
        <div className='flex flex-row h-screen snap-start'>
          <div className='absolute top-0 right-0 w-full h-full m-0 '><Spline scene="https://prod.spline.design/HJXKk3Al5odruWDq/scene.splinecode" onLoad={()=>setTimeout(() => {
            setShowScreen(false)
          }, 200)}/></div>
          <div className='flex flex-col justify-center pl-[10vw] z-10 pointer-events-none'>
            <h2 className='p-4 text-2xl font-bold text-purple-600 '>What was impossible, Technology makes possible</h2>
            <h1 className='max-w-5xl p-6 font-extrabold text-white text-8xl'>Time to check the power of knowledge </h1>
            <h2 className='max-w-2xl p-4 text-4xl font-bold text-white '>The best way to predict the future is to learn and create it.</h2>
            
            <div className='flex flex-row mt-6'>
              <RiveComponent className="mr-32 relative -top-56 w-[300px] h-[400px] pointer-events-auto" />
              <motion.div whileHover={{scale:1.2}} className='flex items-center justify-center w-20 h-20 m-4 bg-white rounded-lg pointer-events-auto'>
                <Lottie animationData={linkedin} loop={true} onClick={()=>{}} className='w-16 h-16'/>
              </motion.div>
              <motion.div whileHover={{scale:1.1}} className='m-4 pointer-events-auto '>
                <Lottie animationData={github} loop={true} onClick={()=>{}} className='w-20 h-20'/>
              </motion.div>
            </div>
          </div>
        </div>
        <Mywork />
      </div>
    </>
  )
}

export default Projects