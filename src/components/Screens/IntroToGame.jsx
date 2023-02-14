import React, {useEffect, useRef,useState} from 'react'
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { motion, useScroll, useSpring, useTransform, useInView } from 'framer-motion';

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
  const y = useVertical(scrollYProgress,150);
  const rotateX = useDegree(scrollYProgress);
  const y2 = useVertical(scrollYProgress,150,true);
  const rotateX2 = useDegree(scrollYProgress,true);

  const opacity = useTransform(scrollYProgress,[0,0.5,1],[0,1,0]);
  const [show, setshow] = useState(false)
  const isInView = useInView(ref, {margin: "-10px 0px -10px 0px"})
  useEffect(() => {
    if (isInView) {
      setshow(true);
    } else {
      setshow(false);
    }
  }, [isInView])
  
  return (
    <div ref={ref}  className='relative w-full overflow-hidden h-[200vh]'>
      <div className={`${show ? "": "hidden"}`}>
        <RiveComponent  className='absolute w-screen h-screen top-[50vh] -z-5 right-[50%] rotate-[30deg] scale-150' />
        <motion.div  className='flex top-0 fixed flex-col items-center justify-center w-full h-full' >
          <motion.div  className='flex flex-col items-center justify-center text-center' onHoverStart={()=>activeInput.value=true} onHoverEnd={()=>activeInput.value=false}>
            <motion.h1 style={{y:y2,rotateX:rotateX2}} className='p-3 text-5xl font-bold text-white z-30 top-1/2 md:text-4xl'>Let's start the trip to the Game and Animation </motion.h1>
            <motion.h1 style={{y,rotateX}} className='max-w-5xl p-3 text-8xl font-bold text-white md:text-6xl'>Now keep scrolling</motion.h1>
            <motion.h1 style={{opacity}} className='max-w-5xl p-3 text-2xl font-bold text-gray-500 pt-10'>*Hover the text, pathfinder will guide your trip</motion.h1>
            <ScrollIndicator className='absolute w-[200px] h-[200px] bottom-[10%]' />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default IntroToGame