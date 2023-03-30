import React from 'react';
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

const FourOFour = () => {
  const { rive, RiveComponent } = useRive({
    src: "/rive/404.riv",
    autoplay: true,
  });
  const { rive:rive2, RiveComponent:HomeButton } = useRive({
    src: "/rive/home.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });
  return (
    <div>
      <div className=" h-[70vh] w-1/2 absolute md:w-full md:top-0">
        <RiveComponent />
      </div>
        <div className='absolute left-[40%] top-[40%] md:left-[10%] md:top-[60%]'>
          <h1 className='font-black text-purple-500 text-7xl ' >ERROR(404)</h1>
          <h2 className='py-2 text-4xl font-bold text-white' >The page you requested could not be found.</h2>
          <h2 className='text-4xl font-bold text-white' >Don't manually type the URL, use the link in navbar!!!</h2>
          <div className='flex flex-row items-center w-full'>
            <div className='h-[100px] w-[200px]'>
              <a href='/'><HomeButton /></a>
            </div>
            <div>
              <i class="fa-solid fa-arrow-left font-bold text-3xl text-white px-3" />
              <span className='text-4xl font-bold text-white'>Back to home</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default FourOFour