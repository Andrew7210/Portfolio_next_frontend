import React, { useEffect, useState } from 'react'
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import Lottie from "lottie-react";
import lines from "public/lotti/lines.json"
import starry from "public/lotti/starry.json"
import {motion, useMotionValue} from 'framer-motion'
import ScrollText from '../ScrollText'
const Learning = () => {
  const [age, setAge] = useState(1);
  const { rive, RiveComponent} = useRive({
    src: "rive/ageselection.riv",
    stateMachines: "AgeClasses",
    autoplay: true,
  });
  const riveInput = useStateMachineInput(rive, "AgeClasses", "age_class");
  useEffect(() => {
    if (riveInput !== null) {
      riveInput.value = age;
    }
  }, [age])
  
  return (
    <div className='relative w-full overflow-hidden h-screen snap-center'>
      <ScrollText className="absolute w-full" speed={-10}>
        <div className='w-[200px] h-10 mx-2 bg-white'>
          test
        </div>
      </ScrollText>
      <ScrollText className="absolute bottom-0 w-full" speed={10}>
        <div className='w-[300px] h-10 mx-2 bg-white'>
          test
        </div>
      </ScrollText>
      <Lottie animationData={lines} loop={true} className='absolute w-full h-full opacity-[0.05]'/>
      <Lottie animationData={starry} loop={true} className='absolute w-full h-full scale-150 rotate-90'/>
      <div className='flex flex-row items-center w-full h-full'>
        <div className='flex flex-col items-start pl-[5%]'>
          <h1 className='p-3 text-3xl font-bold text-white'>Live and learn</h1>
          <h1 className='max-w-5xl p-3 text-6xl font-bold text-white'>Knowledge and skills from school and work is far from enough for me</h1>
          <h1 className='max-w-5xl p-3 text-6xl font-bold text-white'>Every will go through following steps</h1>
          <div className='flex flex-row items-center justify-start'>
            <button className="m-3 skillButton" style={{'--clr': 'rgb(64, 52, 177)'}} onClick={()=>setAge(0)} ><span>Beginner</span><i></i></button>
            <button className="m-3 skillButton" style={{'--clr': 'rgb(102, 13, 204)'}} onClick={()=>setAge(1)} ><span>Junior</span><i></i></button>
            <button className="m-3 skillButton" style={{'--clr': 'rgb(184, 11, 184)'}} onClick={()=>setAge(2)} ><span>Senior</span><i></i></button>
            <button className="m-3 skillButton" style={{'--clr': 'rgb(187, 20, 112)'}} onClick={()=>setAge(3)} ><span>Professional</span><i></i></button>
          </div>
          <h1 className='max-w-5xl p-3 text-6xl font-bold text-white'>But I want to be much faster than others</h1>
          <h1 className='max-w-5xl p-3 text-6xl font-bold text-white'>All components scrolling are skills I learned myself</h1>
          <h1 className='max-w-5xl p-3 text-4xl font-bold text-white'>Feel free to keep scroolling and </h1>
          <h1 className='max-w-5xl p-3 text-3xl font-bold text-white'>check</h1>
        </div>
        <RiveComponent className='z-10 w-1/2 h-[90%]' />
      </div>
    </div>
  )
}

export default Learning