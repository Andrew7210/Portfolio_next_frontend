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
    <div className='relative w-full h-screen snap-center'>
      <Lottie lottieRef={lottieRef} animationData={Background} loop={true} className='absolute w-full h-full opacity-20'/>
      <div className='grid w-full h-full grid-cols-2 gap-4'>
        <div className='flex flex-col items-start justify-center pl-10 z-10'>
          <h1 className='p-3 text-4xl font-bold text-white'>Last Year</h1>
          <h1 className='max-w-5xl p-3 text-4xl font-bold text-white'>I taught myself the network knowledge</h1>
          <h1 className='max-w-6xl p-3 py-6 text-6xl font-bold text-white'>By taking online <span className='text-7xl text-purple-600'>CCNA</span> training courses </h1>
          <h1 className='max-w-2xl p-3 text-4xl font-bold text-[#386baa]'>For personal interest and network configuration at my house</h1>
          <h1 className='max-w-5xl p-3 text-4xl font-bold text-white'>Cisco Certified Network Associate(CCNA) covers:</h1>
          <div className='grid-cols-4 md:grid-col-2 grid justify-center items-start gap-4 mt-4'>
              <div className='flex flex-col justify-center items-center  p-4 rounded-xl bg-gray-800'>
                  <div className='rounded-full flex justify-center items-center bg-[#917aff] w-20 h-20 text-white text-4xl'><i class="fa-solid fa-network-wired"></i></div>
                  <div className="flex flex-col justify-center items-center">
                      <h2 className='text-[#5c90c7] text-center text-3xl font-bold px-4'>Network fundamentals</h2>
                      <ul className='' >
                        <li className="list-disc text-2xl p-1 font-bold text-white" >AS</li>
                        <li className="list-disc text-2xl p-1 font-bold text-white">LAN,WAN</li>
                        <li className="list-disc text-2xl p-1 font-bold text-white">Router</li>
                        <li className="list-disc text-2xl p-1 font-bold text-white">TCP/IP</li>
                      </ul>
                  </div>
              </div>
              <div className='flex flex-col justify-center items-center  p-4 rounded-xl bg-gray-800'>
                  <div className='rounded-full flex justify-center items-center bg-[#386baa] w-20 h-20 text-white text-4xl'><i class="fa-solid fa-house-signal"></i></div>
                  <div className="flex flex-col justify-center items-center">
                      <h2 className='text-[#5c90c7] text-center text-3xl font-bold px-4'>Network Access</h2>
                      <ul className='' >
                        <li className="list-disc text-2xl p-1 font-bold text-white" >DHCP</li>
                        <li className="list-disc text-2xl p-1 font-bold text-white">VLSM</li>
                        <li className="list-disc text-2xl p-1 font-bold text-white">Flooding</li>
                        <li className="list-disc text-2xl p-1 font-bold text-white">CAM</li>
                      </ul>
                  </div>
              </div>
              <div className='flex flex-col justify-center items-center  p-4 rounded-xl bg-gray-800'>
                  <div className='rounded-full flex justify-center items-center bg-[#4a8fe2] w-20 h-20 text-white text-4xl'><i class="fa-solid fa-tower-broadcast"></i></div>
                  <div className="flex flex-col justify-center items-center">
                      <h2 className='text-[#5c90c7] text-center text-3xl font-bold px-4'>IP Connectivity</h2>
                      <ul className='' >
                        <li className="list-disc text-2xl p-1 font-bold text-white" >RIPv1,v2</li>
                        <li className="list-disc text-2xl p-1 font-bold text-white">EIGRP</li>
                        <li className="list-disc text-2xl p-1 font-bold text-white">OSPF</li>
                        <li className="list-disc text-2xl p-1 font-bold text-white">QoS</li>
                      </ul>
                  </div>
              </div>
              <div className='flex flex-col justify-center items-center  p-4 rounded-xl bg-gray-800'>
                  <div className='rounded-full flex justify-center items-center bg-[#4380c9] w-20 h-20 text-white text-4xl'><i class="fa-solid fa-shield-halved"></i></div>
                  <div className="flex flex-col justify-center items-center">
                      <h2 className='text-[#5c90c7] text-center text-3xl font-bold px-4'>Network Security</h2>
                      <ul className='' >
                        <li className="list-disc text-2xl p-1 font-bold text-white" >ACL</li>
                        <li className="list-disc text-2xl p-1 font-bold text-white">VTP</li>
                        <li className="list-disc text-2xl p-1 font-bold text-white">VPN</li>
                        <li className="list-disc text-2xl p-1 font-bold text-white">IEEE 802.1</li>
                      </ul>
                  </div>
              </div>
          </div>
        </div>
        <div className='flex justify-start'>
          <Lottie animationData={server} loop={true} className='absolute h-full z-10'/>
        </div>

      </div>
    </div>
  )
}

export default Network