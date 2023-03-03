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
              <h2 className='relative z-20 text-2xl font-bold text-gray-500 top-20'>Important Note: For MacOS and IOS users, please press ⌘ and - zoom out to 50% for best experience</h2>
              <h2 className='relative z-20 text-2xl font-bold text-gray-500 top-20'>If stuck or get any error, check youtube video in the section of selected project in .project()</h2>
              { !loaded ?
                <div className="scale-150 homeloader top-40">
                  <span>Loading</span>
                  <span>Loading</span>
                </div>
              :
                <RiveButton className={`h-[250px] w-[500px] relative top-20 ${loaded ? "flex" : "hidden"}`} 
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
        <WorkExperience />
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