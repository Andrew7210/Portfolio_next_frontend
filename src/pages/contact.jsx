import React, { useState } from 'react'
import Spline from '@splinetool/react-spline';
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import Lottie from "lottie-react";
import emailIcon from 'public/lotti/email.json'
import phoneIcon from 'public/lotti/phone.json'
import {motion, AnimatePresence} from "framer-motion";
import {client} from "../lib/sanity.client";

const Contact = () => {
  const [showScreen, setShowScreen] = useState(true)
  const { rive, RiveComponent } = useRive({
    src: "rive/helix_loader.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });
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
  const rateInput = useStateMachineInput(rive3, "State Machine 1", "Rating");

  const move = {
    show: i=> ({
      y:-50,
      transition:{repeat: Infinity, duration: 2, repeatType: "reverse", delay:i*0.4}
    })
  }


  const { rive:rive5, RiveComponent:Check } = useRive({
    src: "rive/check.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });
  const checkInput = useStateMachineInput(rive5, "State Machine 1", "Check");
  const errorInput = useStateMachineInput(rive5, "State Machine 1", "Error");
  const resetInput = useStateMachineInput(rive5, "State Machine 1", "Reset");
  const { rive:rive6, RiveComponent:Celebrate } = useRive({
    src: "rive/webcam-curve.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });
  const explosionInput = useStateMachineInput(rive6, "State Machine 1", "Trigger explosion");
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const { username, email, message } = formData;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); 
  };
  const handleSubmit = () => {
    setLoading(true);
    const contact = {
      _type: 'contact',
      rate: rateInput.value,
      name: formData.username,
      email: formData.email,
      message: formData.message,
      date: new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
    };
    client.create(contact) // create a sanity document
      .then(() => {
        checkInput.fire();
        setSuccessful(true);
        setTimeout(() => {
          explosionInput.fire();
        }, 2000)
        setTimeout(() => {
          setLoading(false);
          setIsFormSubmitted(true);
        }, 4000)
      })
      .catch((err) => {
        errorInput.fire();
        setTimeout(() => {
          setLoading(false);
          setIsFormSubmitted(true);
          setSuccessful(false);
        }, 2000)
      });
    resetInput.fire();
  };
  

  return (
    <>
      <AnimatePresence>
        {showScreen && (
          <motion.div className="w-screen h-screen fixed top-0 z-30 bg-[#140e20]" exit={{opacity:0, transition: {delay:0.6}}}>
            
            <motion.div class='speedbody' exit={{left:"150vw",transition:{duration:0.5}}}>
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
      <div className='flex flex-row w-full adjustheight md:h-[200vh] md:flex-col md:w-[95%]'>
        <div className='h-[90vh] w-6/12 m-5 z-10 md:w-full'>
          <Spline className='overflow-auto rounded-3xl' scene="https://prod.spline.design/P22vGZm61zvNmypS/scene.splinecode" onLoad={()=>setTimeout(() => {
            setShowScreen(false)
          }, 500)}/>
          <div className="absolute bottom-0 left-5">
            <div className='p-1 text-xl font-bold text-white '>Keyboard Key &</div>
            <div className='p-1 text-xl font-bold text-white '>Interact with items in the scene</div>
            <div className='w-[200px] h-[150px]'><img src='Key.svg'></img></div>
          </div>
        </div>
        <div className='relative flex items-center justify-center w-6/12 m-5 adjustheight md:w-full'>
          <div className='absolute top-0 left-0 w-full adjustheight blur-2xl' >
            <RiveComponent />
          </div>
            <motion.div variants={move} custom={1} animate="show" className="z-0 littlebox w-28 h-28 opacity-80 right-[3%] md:right-0 top-[15%]"></motion.div>
            <motion.div variants={move} custom={2} animate="show" className="z-0 w-32 h-32 littlebox left-[0%] bottom-[30%]"></motion.div>
            <motion.div variants={move} custom={3} animate="show" className="w-12 h-12 littlebox opacity-60 right-[17%] bottom-[7%] md:bottom-5"></motion.div>
            <motion.div variants={move} custom={4} animate="show" className="z-0 w-28 h-28 littlebox left-[30%] top-[6%] md:top-0"></motion.div>
            <motion.div variants={move} custom={5} animate="show" className="littlebox w-20 h-20 right-[4%] bottom-[40%]"></motion.div>
            <motion.div variants={move} custom={6} animate="show" className="z-0 littlebox w-20 h-20 left-[35%] bottom-[2%]"></motion.div>
          <div className='z-10 min-h-[50vh] flex flex-col justify-center items-center backdrop-blur  '>
            <div className='relative z-10 w-full p-5 border-4 rounded-2xl backdrop-blur boxfield'>
              <div className={`absolute w-full h-full z-10 ${loading ? "flex" : "hidden"} justify-center items-center`}><Check className='w-[200px] h-[200px]' /></div>
              <div className={`absolute w-full h-full z-10 ${successful ? "flex" : "hidden"} justify-center items-center`}><Celebrate className='w-[280px] h-[280px] scale-150' /></div>
              <h1 className="pt-5 text-3xl font-extrabold text-center text-white ">Take a coffee & chat with me</h1>
              <div className="flex flex-row items-center gap-3 py-5 app__footer-cards">
                <a href="mailto:tianyi.zhan@outlook.com" className="px-2 border-2 border-gray-400 border-opacity-50 shadow-md app__footer-card backdrop-blur-3xl">
                  <Lottie animationData={emailIcon} loop={true} className='w-16 h-16'/>
                  <div className="text-base font-bold text-white">tianyi.zhan@outlook.com</div>
                </a>
                <a href="tel:+1(226)220-0555" className="px-2 border-2 border-gray-400 border-opacity-50 shadow-md app__footer-card backdrop-blur">
                  <Lottie animationData={phoneIcon} loop={true} className='w-16 h-16'/>
                  <div className="text-base font-bold text-white">+1 (226) 220-0555</div>
                </a>
              </div>
              
              {!isFormSubmitted ? (
                <div className="flex flex-col items-center justify-center">
                  <div className='flex flex-row items-center justify-center w-full h-10 pb-2'>
                    <h1 className="text-xl font-extrabold text-white">Rate your experience: </h1>
                    <div className='w-[250px] h-[100px] pl-2'><Rating /></div>
                  </div>
                  <div className='flex items-center justify-center w-full py-3'>
                    <input className="w-10/12 px-4 py-2 text-base font-bold text-white bg-white border-2 border-none outline-none bg-opacity-20 rounded-2xl" type="text" placeholder="Your Name" name="username" value={username} onChange={handleChangeInput} />
                  </div>
                  <div className="flex items-center justify-center w-full py-3">
                    <input className="w-10/12 px-4 py-2 text-base font-bold text-white bg-white border-2 border-none outline-none bg-opacity-20 rounded-2xl" type="email" placeholder="Your Email" name="email" value={email} onChange={handleChangeInput} />
                  </div>
                  <div className="flex items-center justify-center w-full py-3">
                    <textarea
                      className="w-10/12 px-4 py-2 text-base font-bold text-white bg-white border-2 border-none outline-none bg-opacity-20 rounded-2xl"
                      placeholder="Your Message"
                      value={message}
                      name="message"
                      onChange={handleChangeInput}
                    />
                  </div>
                  <ButtonSubmit className='h-[170px] w-[300px] cursor-pointer' onClick={handleSubmit} />
                </div>
              ) : 
                successful ? (
                  <div className="py-10">
                    <h3 className="text-4xl font-extrabold text-center text-white">Thank you for getting in touch!</h3>
                  </div>
                ) : (
                  <div className='py-10'>
                    <h3 className="text-4xl font-extrabold text-center text-white">Failed to submit the form.</h3>
                    <h3 className="text-4xl font-extrabold text-center text-white">Please check network, refresh the page and try again.</h3>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        
      </div>
    </>    
)
}

export default Contact