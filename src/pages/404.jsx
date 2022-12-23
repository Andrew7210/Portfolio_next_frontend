import React from 'react';
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

const FourOFour = () => {
  const { rive, RiveComponent } = useRive({
    src: "rive/404.riv",
    autoplay: true,
  });
  const { rive:rive2, RiveComponent:HomeButton } = useRive({
    src: "rive/home.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });
  return (
    <div>
      <div className=" h-[70vh] w-1/2 absolute">
        <RiveComponent />
      </div>
        <div className='absolute left-[40%] top-[40%]'>
          <h1 className='font-black text-7xl text-white' >ERROR(404)</h1>
          <h2 className='font-bold text-3xl text-white py-2' >The page you requested could not be found.</h2>
          <h2 className='font-bold text-3xl text-white' >Remember don't manually type the url, use the link in navbar!!!</h2>
          <div className='w-full flex flex-row items-center'>
            <div className='h-[100px] w-[200px]'>
              <HomeButton />
            </div>
            <div>
              <i class="fa-solid fa-arrow-left font-bold text-3xl text-white px-3" />
              <span className='font-bold text-4xl text-white'>Back to home</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default FourOFour