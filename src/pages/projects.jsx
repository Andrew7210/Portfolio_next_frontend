import React from 'react'
import Spline from '@splinetool/react-spline'
import Lottie from "lottie-react";
import linkedin from "public/lotti/linkedin.json";
import github from "public/lotti/gitcat.json";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import {motion} from 'framer-motion'
import Mywork from './Mywork';

const Projects = () => {
  const { rive, RiveComponent} = useRive({
    src: "rive/pigeons_button.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });
  return (
    <>
      <div className='flex flex-col'>
        <div className='flex flex-row h-screen'>
          <div className='absolute top-0 right-0 w-full h-full m-0 '><Spline scene="https://prod.spline.design/HJXKk3Al5odruWDq/scene.splinecode" /></div>
          <div className='flex flex-col justify-center pl-[10vw] z-10 pointer-events-none'>
            <h2 className='p-4 text-2xl font-bold text-purple-600 fill-white'>What was impossible, Technology makes possible</h2>
            <h1 className='max-w-5xl p-6 font-extrabold text-white fill-white text-8xl'>Time to check the power of knowledge </h1>
            <h2 className='max-w-2xl p-4 text-4xl font-bold text-white fill-white'>The best way to predict the future is to learn and create it.</h2>
            
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