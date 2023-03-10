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
    <div className='relative flex flex-col items-center justify-center w-screen h-screen'>
        <div className='w-3/4 h-3/4'>
          <RiveComponent />
        </div>
        <div className='flex flex-row justify-center w-full'>
          <motion.div className='flex flex-col items-center justify-center' onMouseEnter={()=>input.value=false} onMouseLeave={()=>input.value=true}>
            <h1 className='p-6 text-6xl font-extrabold text-center text-white '>The End !</h1>
            <h1 className='p-1 text-3xl font-bold text-center text-white '>Hope you enjoy my portfolio !</h1>
            <h1 className='p-1 text-3xl font-bold text-center text-white '>Please check other tabs in the navbar.</h1>
            <h1 className='p-1 text-xl font-semibold text-center text-gray-600 '>*Hover the text to show the Easter Egg</h1>
          </motion.div>
        </div>
    </div>
  )
}

export default FinalScreen