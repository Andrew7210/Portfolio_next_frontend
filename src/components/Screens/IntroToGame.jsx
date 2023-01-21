import React, {useEffect, useRef} from 'react'
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

function useDegree(value, negative=false) {
  if (negative) {
    return useTransform(value, [0, 0.5, 1], [90, 0, 90]);
  }
  return useTransform(value, [0, 0.5, 1], [-90, 0, -90]);
}

function useVertical(value, height, negative=false) {
  if (negative) {
    return useTransform(value, [0, 0.5, 1], [-height, 0, -height]);
  }
  return useTransform(value, [0, 0.5, 1], [height, 0, height]);
}

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

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const y = useVertical(scrollYProgress,200);
  const rotateX = useDegree(scrollYProgress);
  const y2 = useVertical(scrollYProgress,200,true);
  const rotateX2 = useDegree(scrollYProgress,true);
  useEffect(() => {
    console.log(scrollYProgress.get())
  })
  
  return (
    <div ref={ref}  className='relative w-full overflow-hidden h-[200vh]'>
      <RiveComponent  className='absolute w-full h-full -z-5 right-[50%] rotate-[30deg] scale-150' />
      <motion.div  className='flex top-0 fixed flex-col items-center justify-center w-full h-full' >
        <motion.div  className='flex flex-col items-center justify-center text-center' onHoverStart={()=>activeInput.value=true} onHoverEnd={()=>activeInput.value=false}>
          <motion.h1 style={{y:y2,rotateX:rotateX2}} className='p-3 text-3xl font-bold text-white z-30 top-1/2'>Let's start our trip to the Game and Animation </motion.h1>
          <motion.h1 style={{y,rotateX}} className='max-w-5xl p-3 text-6xl font-bold text-white'>Hope your enjoy it !</motion.h1>
          <motion.h1 style={{y,rotateX}} className='max-w-5xl p-3 text-6xl font-bold text-white'>Now keep scrolling</motion.h1>
          <ScrollIndicator className='w-[200px] h-[200px] pt-20' />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default IntroToGame