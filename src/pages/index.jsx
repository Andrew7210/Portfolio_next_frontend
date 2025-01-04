import React, {useEffect, useState} from 'react'
import {Education, Introduce,Learning, WorkExperience, Network, IntroToGame, SuperMarioScene, HolwsCastleScene,FinalScreen}from '../components/Screens'
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import {motion, AnimatePresence } from 'framer-motion';
const index = () => {
  const [loaded, setloaded] = useState(false)
  const [showScreen, setShowScreen] = useState(true)
  const { rive, RiveComponent } = useRive({
    src: "rive/newsletter_bot.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });
  const robotInput = useStateMachineInput(rive, "State Machine 1", "States", 3);
  const { rive:rive2, RiveComponent:RiveButton } = useRive({
    src: "rive/creative_jam_jeff_looks.riv",
    artboard: "Button",
    stateMachines: "State Machine 1",
    autoplay: true,
  });
  useEffect(() => {
    if (loaded && robotInput !== null) {
      robotInput.value = 1
    }
  })
  const [showrest, setShowrest] = useState(false)
  return (
    <>
      <div className="flex flex-col w-full">
        <AnimatePresence>
          {showScreen && (
            <motion.div className={`fixed flex flex-col top-0 items-center w-screen h-screen bg-[#140e20] z-30`} exit={{rotateX:90, y:"-50vh", transition:{duration:1}}}>
              <RiveComponent className='relative w-full h-1/2 top-20' />
              { !loaded ?
                <>
                  <div className="homeloader top-40">
                    <span>Loading</span>
                    <span>Loading</span>
                  </div>
                  <div className="text-center text-base font-semibold p-5 text-white"> *Please be patient for the loading of 3d assets, button will show right away</div>
                </>
              :
                <RiveButton className={`h-40 w-80 relative cursor-pointer top-20 ${loaded ? "flex" : "hidden"}`} 
                  onMouseEnter={()=>robotInput.value=2} 
                  onMouseLeave={()=>robotInput.value=1}
                  onClick={() => setShowScreen(false)} />
              }
            </motion.div>
          )}
        </AnimatePresence>
        {showScreen && <div className="h-[500vh] w-screen"></div>}
        <Introduce setloaded={setloaded}/>
        <Education />
        <Learning />
        <Network /> 
        <IntroToGame />
        <SuperMarioScene showRest={setShowrest} />
        {showrest && <HolwsCastleScene />}
        {showrest && <FinalScreen />}
      </div>
    </>
  )
}

export default index
