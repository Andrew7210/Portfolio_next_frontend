import React from 'react'
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { motion } from 'framer-motion';
const IntroToGame = () => {
  const { rive, RiveComponent} = useRive({
    src: "rive/tour.riv",
    stateMachines: "state_machine",
    artboard: "tour_expanded",
    autoplay: true,
  });
  const { rive:rive2, RiveComponent:ScrollIndicator} = useRive({
    src: "rive/scrollIndicator.riv",
    autoplay: true,
  });
  const activeInput = useStateMachineInput(rive, "state_machine", "isLightsOn", false);
  return (
    <div className='relative w-full overflow-hidden h-screen'>
      <RiveComponent className='absolute w-full h-full -z-5 right-[50%] rotate-[30deg] scale-150' />
      <div className='flex flex-col items-center justify-center w-full h-full' >
        <motion.div className='flex flex-col items-center justify-center text-center' onHoverStart={()=>activeInput.value=true} onHoverEnd={()=>activeInput.value=false}>
          <h1 className='p-3 text-3xl font-bold text-white'>Let's start our trip to the Game and Animation </h1>
          <h1 className='max-w-5xl p-3 text-6xl font-bold text-white'>Hope your enjoy it !</h1>
          <h1 className='max-w-5xl p-3 text-6xl font-bold text-white'>Now keep scrolling</h1>
          <ScrollIndicator className='w-[200px] h-[200px] pt-20' />
        </motion.div>
      </div>
    </div>
  )
}

export default IntroToGame