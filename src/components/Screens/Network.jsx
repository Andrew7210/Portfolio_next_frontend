import React, {useRef, useEffect} from 'react'
import Lottie from "lottie-react";
import Background from "public/lotti/circuit.json"
import server from "public/lotti/network.json"

const Network = () => {
  const lottieRef = useRef();
  useEffect(() => {
    if(lottieRef.current !== undefined){
      lottieRef.current.setSpeed(0.3);
    }
  }, [])
  return (
    <div className='relative w-full h-screen'>
      <Lottie lottieRef={lottieRef} animationData={Background} loop={true} className='absolute w-full h-full opacity-20'/>
      <div className='grid w-full h-full grid-cols-2 gap-4'>
        <div className='flex flex-col items-start justify-center pl-10 z-10'>
          <h1 className='p-3 text-3xl font-bold text-white'>Live and learn</h1>
          <h1 className='max-w-5xl p-3 text-6xl font-bold text-white'>Knowledge and skills from school and work is far from enough for me</h1>
          <h1 className='max-w-5xl p-3 text-6xl font-bold text-white'>Every will go through following steps</h1>
        </div>
        <div className='flex justify-start'>
          <Lottie animationData={server} loop={true} className='absolute h-full z-10'/>
        </div>

      </div>
    </div>
  )
}

export default Network