import React from 'react'
import Spline from '@splinetool/react-spline'
import Lottie from "lottie-react";
import linkedin from "public/lotti/linkedin.json";
import github from "public/lotti/gitcat.json";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import Mywork from './Mywork';

const Projects = () => {
  const { rive, RiveComponent} = useRive({
    src: "rive/pigeons_button.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });
  return (
    <>
      <div className='flex flex-row h-screen'>
        <div className='absolute m-0 top-0 right-0 w-full h-full '><Spline scene="https://prod.spline.design/HJXKk3Al5odruWDq/scene.splinecode" /></div>
        <div className='flex flex-col justify-center pl-60 z-10'>
          <h2 className='p-4 fill-white text-purple-600 font-bold text-2xl'>What was impossible, Technology makes possible</h2>
          <h1 className='p-6 fill-white text-white font-extrabold text-8xl max-w-5xl'>Time to check the power of knowledge </h1>
          <h2 className='p-4 fill-white text-white font-bold text-4xl max-w-2xl'>The best way to predict the future is to learn and create it.</h2>
          
          <div className='flex flex-row mt-6'>
            <div className='w-20 h-20 m-4 bg-white rounded-lg flex justify-center items-center'>
              <Lottie animationData={linkedin} loop={true} onClick={()=>{}} className='w-16 h-16'/>
            </div>
            <div className='m-4 '>
              <Lottie animationData={github} loop={true} onClick={()=>{}} className='w-20 h-20'/>
            </div>
            <RiveComponent className="ml-32 relative -top-56 w-[300px] h-[400px]" />
          </div>
        </div>
      </div>
      <Mywork />
    </>
  )
}

export default Projects