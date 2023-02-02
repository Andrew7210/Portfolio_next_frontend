import React from 'react'
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import {motion} from "framer-motion";
const FinalScreen = () => {
  const { rive, RiveComponent } = useRive({
    src: "rive/happy.riv",
    stateMachines: "controller",
    autoplay: true,
  });
  const input = useStateMachineInput(rive, "controller", "onHover", true);
  return (
    <div className='relative flex-col w-screen h-screen flex justify-center items-center'>
        <div className='w-3/4 h-3/4'>
          <RiveComponent />
        </div>
        <motion.div className='w-full flex flex-col justify-center items-center' onMouseEnter={()=>input.value=false} onMouseLeave={()=>input.value=true}>
          <h1 className='p-6 font-extrabold text-white text-center text-7xl '>The End !</h1>
          <h1 className='p-1 font-bold text-white text-center text-4xl '>Hope you enjoy my portfolio !</h1>
          <h1 className='p-1 font-bold text-white text-center text-4xl '>Please check other tabs in the navbar.</h1>
          <h1 className='p-1 font-semibold text-gray-600 text-center text-2xl '>*Hover the text will show Easter Egg</h1>
        </motion.div>
    </div>
  )
}

export default FinalScreen