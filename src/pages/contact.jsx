import React, { useState } from 'react'
import Spline from '@splinetool/react-spline';
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import Lottie from "lottie-react";
import email from 'public/lotti/email.json'
import phone from 'public/lotti/phone.json'
import {motion, AnimatePresence} from "framer-motion";

const Contact = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [showScreen, setShowScreen] = useState(true)
  const { rive, RiveComponent } = useRive({
    src: "rive/helix_loader.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });
  const handleChangeInput = (e) => { 
    const { name, value } = e.target; 
  };
  const { rive:rive2, RiveComponent:ButtonSubmit } = useRive({
    src: "rive/let's_jam_button.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });
  const { rive:rive3, RiveComponent:Rating } = useRive({
    src: "rive/rating_animation.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });
  return (
    <>
      <AnimatePresence>
        {showScreen && (
          <motion.div className="w-screen h-screen fixed top-0 z-30 bg-[#140e20]" exit={{opacity:0, transition: {delay:0.6}}}>
            
            <motion.div class='body' exit={{left:"150vw",transition:{duration:0.5}}}>
              <span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </span>
              <div class='base'>
                <span></span>
                <div class='face'></div>
              </div>
            </motion.div>
            <div class='longfazers'>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <motion.h1 exit={{opacity:0}} className="absolute font-bold text-2xl text-purple-600 uppercase left-1/2 top-[53%] -ml-6">Loading...</motion.h1>
          </motion.div>
        )}
      </AnimatePresence> 
      <div className='flex flex-row w-full adjustheight'>
        <div className='h-[92vh] w-6/12 m-5 z-10'>
          <Spline className='overflow-auto rounded-3xl' scene="https://prod.spline.design/P22vGZm61zvNmypS/scene.splinecode" onLoad={()=>setTimeout(() => {
            setShowScreen(false)
          }, 500)}/>
          <div className="absolute bottom-5 left-5">
            <div className='p-3 text-3xl font-bold text-white '>Keyboard Key &</div>
            <div className='p-3 text-3xl font-bold text-white '>Interact with items in the scene</div>
            <img src='Key.svg'></img>
          </div>
        </div>
        <div className='flex items-center justify-center w-6/12 m-5 adjustheight'>
          <div className='absolute top-0 w-1/2 adjustheight left-1/2 blur-2xl ' >
            <RiveComponent />
          </div>
            <div className="z-20 littlebox w-36 h-36 opacity-80 right-[5%] top-[15%]"></div>
            <div className="z-20 w-40 h-40 littlebox right-[40%] bottom-[30%]"></div>
            <div className="w-20 h-20 littlebox opacity-60 right-[17%] bottom-[7%]"></div>
            <div className="z-0 w-36 h-36 littlebox right-[38%] top-[12%]"></div>
            <div className="littlebox w-28 h-28 right-[4%] top-[40%]"></div>
            <div className="z-0 littlebox w-28 h-28 right-[35%] bottom-[2%]"></div>
          <div className='z-10 min-h-[50vh] w-2/3 flex flex-col justify-center items-center backdrop-blur  '>
            <div className='z-10 w-full p-5 border-4 rounded-2xl backdrop-blur boxfield'>
              <h1 className="pt-5 text-5xl font-extrabold text-center text-white ">Take a coffee & chat with me</h1>
              <div className="flex flex-row py-5 app__footer-cards">
                <div className="border-2 border-gray-400 border-opacity-50 shadow-md app__footer-card backdrop-blur-3xl">
                  <Lottie animationData={email} loop={true} className='w-20 h-20'/>
                  <a href="mailto:tianyi.zhan@outlook.com" className="text-2xl font-bold text-white">tianyi.zhan@outlook.com</a>
                </div>
                <div className="border-2 border-gray-400 border-opacity-50 shadow-md app__footer-card backdrop-blur">
                  <Lottie animationData={phone} loop={true} className='w-24 h-20'/>
                  <a href="tel:+1 (226) 220-0555" className="text-2xl font-bold text-white">+1 (226) 220-0555</a>
                </div>
              </div>
              <div className='flex flex-row items-center justify-center w-full h-10 pb-2'>
                <h1 className="text-2xl font-extrabold text-white">Rate your experience: </h1>
                <div className='w-[250px] h-[100px] pl-2'><Rating /></div>
              </div>
              {!isFormSubmitted ? (
                <div className="flex flex-col items-center justify-center">
                  <div className='flex items-center justify-center w-full py-3'>
                    <input className="w-10/12 px-4 py-4 text-xl font-extrabold text-white bg-white border-2 border-none outline-none bg-opacity-20 rounded-2xl" type="text" placeholder="Your Name" name="username"  />
                  </div>
                  <div className="flex items-center justify-center w-full py-3">
                    <input className="w-10/12 px-4 py-4 text-xl font-extrabold text-white bg-white border-2 border-none outline-none bg-opacity-20 rounded-2xl" type="email" placeholder="Your Email" name="email"  />
                  </div>
                  <div className="flex items-center justify-center w-full py-3">
                    <textarea
                      className="w-10/12 px-4 py-4 text-xl font-extrabold text-white bg-white border-2 border-none outline-none bg-opacity-20 rounded-2xl"
                      placeholder="Your Message"
                      name="message"
                    />
                  </div>
                  <ButtonSubmit className='h-[250px] w-full' />
                </div>
              ) : ( // when form is submitted
                <div>
                  <h3 className="head-text">
                    Thank you for getting in touch!
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </>    
)
}

export default Contact