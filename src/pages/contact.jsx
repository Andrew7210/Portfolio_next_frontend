import React, { useState } from 'react'
import Spline from '@splinetool/react-spline';
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

const Contact = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
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
    
    <div className='flex flex-row'>
      <div className='h-[90vh] w-6/12 m-5 z-10'>
        <Spline className='rounded-2xl  overflow-auto translate-y-16' scene="https://prod.spline.design/P22vGZm61zvNmypS/scene.splinecode" />
        <div className="absolute top-[70vh] left-5">
          <div className='p-3 fill-white text-white font-bold text-3xl'>Keyboard Key &</div>
          <div className='p-3 fill-white text-white font-bold text-3xl'>Interact with items in the scene</div>
          <img src='Key.svg'></img>
        </div>
      </div>
      <div className='h-[90vh] w-6/12 m-5 flex justify-center items-center'>
        <div className='absolute w-1/2 h-full left-1/2 blur-2xl top-0 ' >
          <RiveComponent />
        </div>
        <div className='boxfield min-h-[50vh] w-2/3 rounded-2xl flex flex-col justify-center items-center backdrop-blur border-4 '>
          <div className="littlebox w-36 h-36 -top-20 -right-28 z-0 opacity-80"></div>
          <div className="littlebox w-40 h-40 -left-28 z-20"></div>
          <div className="littlebox w-20 h-20 right-80 -top-28 opacity-60"></div>
          <div className="littlebox w-32 h-32 -left-20 -top-32"></div>
          <div className="littlebox w-28 h-28 -right-20 bottom-32"></div>
          <div className="littlebox w-28 h-28 left-72 -bottom-28"></div>
          <div className='w-full p-5 z-10'>
            <h1 className="text-white text-5xl font-extrabold text-center ">Take a coffee & chat with me</h1>
            <div className="app__footer-cards flex flex-row py-5">
              <div className="app__footer-card backdrop-blur-3xl shadow-md border-2 border-gray-400 border-opacity-50">
                <img  src='email.png' alt="email" />
                <a href="mailto:tianyi.zhan@outlook.com" className="text-white font-bold text-2xl">tianyi.zhan@outlook.com</a>
              </div>
              <div className="app__footer-card backdrop-blur shadow-md border-2 border-gray-400 border-opacity-50">
                <img src='mobile.png' alt="phone" />
                <a href="tel:+1 (226) 220-0555" className="text-white font-bold text-2xl">+1 (226) 220-0555</a>
              </div>
            </div>
            <div className='w-full h-10 flex flex-row justify-center items-center pb-2'>
              <h1 className="text-white font-extrabold text-2xl">Rate your experience: </h1>
              <div className='w-[250px] h-[100px] pl-2'><Rating /></div>
            </div>
            {!isFormSubmitted ? (
              <div className="flex flex-col justify-center items-center">
                <div className='w-full flex items-center justify-center py-3'>
                  <input className="w-10/12 bg-white bg-opacity-20 py-4 px-4 rounded-2xl border-2 outline-none border-none text-white font-extrabold text-xl" type="text" placeholder="Your Name" name="username"  />
                </div>
                <div className="w-full flex items-center justify-center py-3">
                  <input className="w-10/12 bg-white bg-opacity-20 py-4 px-4 rounded-2xl border-2 outline-none border-none text-white font-extrabold text-xl" type="email" placeholder="Your Email" name="email"  />
                </div>
                <div className="w-full flex items-center justify-center py-3">
                  <textarea
                    className="w-10/12 bg-white bg-opacity-20 py-4 px-4 rounded-2xl border-2 outline-none border-none text-white font-extrabold text-xl"
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
)
}

export default Contact