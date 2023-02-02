import React, { useEffect, useRef, useState } from 'react'
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import {motion, AnimatePresence, useAnimationControls} from "framer-motion";
import Lottie from "lottie-react";
import { LoremIpsum } from "react-lorem-ipsum";
import background from "public/lotti/workBackground.json"
const WorkExperience = () => {
  const [clicked, setClicked] = useState(false)
  const [selectId, setSelectId] = useState(0)
  const closeControl = useAnimationControls()
  const { rive, RiveComponent} = useRive({
    src: "rive/toemater_timer.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });
  const breakInput = useStateMachineInput(rive, "State Machine 1", "break", true);
  const lottieRef = useRef();
  useEffect(() => {
    if(lottieRef.current !== undefined){
      lottieRef.current.setSpeed(0.3);
    }
  }, [])
  
  const closeImage = () => {
    closeControl.start ({
      left: "-200%",
      transition: {
        duration:1,
        type: "spring"
      }
    })
  }
  const openImage = () => {
    closeControl.start ({
      left: 0,
      transition: {
        duration:1,
        type: "spring"
      }
    })
    
  }
  
  return (
    <div className='relative w-full h-screen snap-center'>
      <Lottie lottieRef={lottieRef} animationData={background} loop={true} className='absolute w-full h-full opacity-10' />
      <div className='flex flex-row items-center justify-center h-full'>
        {clicked &&
          <AnimatePresence>
            <motion.div layoutId={`workbox-${selectId}`} className='w-[30%] ml-10 workBoxshow ' style={{"--clr":"#2480c7"}} onClick={()=>{
              setClicked(false)
              openImage()
              setSelectId(0)
              }}>
              <div className='content max-h-[50vh] overflow-y-scroll '>
                <motion.div className='icon' layoutId={`iconbox-${selectId}`}></motion.div>
                <motion.div className='text' layoutId={`boxtext-${selectId}`}>
                  <motion.h1 className='text-4xl' layoutId={`boxtitle-${selectId}`}>RBC</motion.h1>
                  <motion.p className='text-2xl font-bold' layoutId={`boxjob-${selectId}`}>Technological system analyst</motion.p>
                  <motion.div className='flex flex-row items-center justify-center gap-5' layoutId={`boxtime-${selectId}`}>
                    <h3>01-2022</h3>
                    <h1 className='text-2xl'>to</h1>
                    <h3>01-2022</h3>
                  </motion.div>
                  <motion.p className='pt-3 text-xl' layoutId={`boxdetail-${selectId}`}><LoremIpsum
              p={12}
              avgWordsPerSentence={10}
              avgSentencesPerParagraph={10}
            /></motion.p>
                </motion.div>
              </div>
              <i></i>
              <i></i>
            </motion.div>
          </AnimatePresence>
          }
          <motion.div animate={closeControl} className={`z-10 w-1/2 h-3/4 ${clicked ? ' absolute': 'relative'}`}><RiveComponent  /></motion.div>

        <div className='flex flex-col items-start justify-center w-1/2 h-full'>
          <h2 className='w-full pb-10 text-6xl font-bold text-center text-white '>Work Experience</h2>
          <div className='flex flex-row flex-wrap items-center justify-center w-full grid-cols-2 gap-10'>
            <motion.div layoutId='workbox-1' className='workBox w-[500px] h-[200px]' style={{"--clr":"#2480c7"}} onHoverStart={()=>breakInput.value=false} onHoverEnd={()=>breakInput.value=true} onClick={()=>{
              setClicked(true)
              closeImage()
              setSelectId(1)
            }}>
              <div className='content'>
                <motion.div className='icon' layoutId='iconbox-1'></motion.div>
                <motion.div className='text' layoutId='boxtext-1'>
                  <motion.h1 className='text-4xl' layoutId='boxtitle-1'>RBC</motion.h1>
                  <motion.p className='text-2xl font-bold' layoutId='boxjob-1'>Technological system analyst</motion.p>
                  <motion.div className='flex flex-row items-center justify-center gap-5' layoutId='boxtime-1'>
                    <h3>01-2022</h3>
                    <h1 className='text-2xl'>to</h1>
                    <h3>01-2022</h3>
                  </motion.div>
                  <motion.p className='pt-3 text-xl' layoutId='boxdetail-1'>*Click to see more details</motion.p>
                </motion.div>
              </div>
            </motion.div>
            <motion.div layoutId='workbox-2' className='workBox w-[500px] h-[200px]' style={{"--clr":"#2480c7"}} onHoverStart={()=>breakInput.value=false} onHoverEnd={()=>breakInput.value=true} onClick={()=>{
              setClicked(true)
              closeImage()
              setSelectId(2)
            }}>
              <div className='content'>
                <motion.div className='icon' layoutId='iconbox-2'></motion.div>
                <motion.div className='text' layoutId='boxtext-2'>
                  <motion.h1 className='text-4xl' layoutId='boxtitle-2'>123213213213</motion.h1>
                  <motion.p className='text-2xl font-bold' layoutId='boxjob-2'>Technological system analyst</motion.p>
                  <motion.div className='flex flex-row items-center justify-center gap-5' layoutId='boxtime-2'>
                    <h3>01-2022</h3>
                    <h1 className='text-2xl'>to</h1>
                    <h3>01-2022</h3>
                  </motion.div>
                  <motion.p className='pt-3 text-xl' layoutId='boxdetail-2'>*Click to see more details</motion.p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkExperience