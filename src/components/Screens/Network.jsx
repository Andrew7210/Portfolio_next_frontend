import React, {useRef, useEffect} from 'react'
import Lottie from "lottie-react";
import Background from "public/lotti/circuit.json"
import server from "public/lotti/network.json"
import {motion} from 'framer-motion'

const Network = () => {
  const lottieRef = useRef();
  useEffect(() => {
    if(lottieRef.current !== undefined){
      lottieRef.current.setSpeed(0.3);
    }
  }, [])
  const move = {
    hidden: {opacity:0},
    show:{
      opacity:1,
      transition:{staggerChildren: 0.2}
    }
  }
  const move2 = {
    hidden: {opacity:0, x:-100},
    show:{
      opacity:1,
      x:0,
      transition:{staggerChildren: 0.2}
    }
  }
  return (
    <div className='relative w-full h-screen'>
      <Lottie lottieRef={lottieRef} animationData={Background} loop={true} className='absolute w-full h-full opacity-20'/>
      <div className='flex flex-row w-full h-full gap-4 md:flex-col md:pt-20'>
        <div className='z-10 flex flex-col items-start justify-center w-1/2 pl-10 md:w-full md:px-10'>
          <motion.div variants={move2} initial="hidden" whileInView="show">
            <motion.h1 variants={move2} className='p-3 text-4xl font-bold text-white md:text-2xl md:py-1'>Last Year</motion.h1>
            <motion.h1 variants={move2} className='max-w-5xl p-3 text-4xl font-bold text-white md:text-2xl md:py-1'>I learned the network knowledge</motion.h1>
            <motion.h1 variants={move2} className='max-w-6xl p-3 py-6 text-6xl font-bold text-white md:text-4xl md:py-1'>By taking online <span className='text-purple-600 text-7xl'>CCNA</span> training courses </motion.h1>
            <motion.h1 variants={move2} className='max-w-2xl p-3 text-4xl font-bold text-[#386baa] md:text-2xl'>For personal interest and network design in my house</motion.h1>
            <motion.h1 variants={move2} className='max-w-5xl p-3 text-4xl font-bold text-white'>Cisco Certified Network Associate(CCNA) covers:</motion.h1>
          </motion.div>
          <motion.div variants={move} initial="hidden" whileInView="show" className='grid items-start justify-center grid-cols-4 gap-4 mt-4 md:grid-col-2'>
              <motion.div variants={move} className='flex flex-col items-center justify-center p-4 bg-gray-800 rounded-xl'>
                  <div className='rounded-full flex justify-center items-center bg-[#917aff] w-20 h-20 text-white text-4xl'><i class="fa-solid fa-network-wired"></i></div>
                  <div className="flex flex-col items-center justify-center">
                      <h2 className='text-[#5c90c7] text-center text-3xl font-bold px-4 md:text-2xl'>Network fundamentals</h2>
                      <ul className='' >
                        <li className="p-1 text-2xl font-bold text-white list-disc" >IPv6</li>
                        <li className="p-1 text-2xl font-bold text-white list-disc">LAN,WAN</li>
                        <li className="p-1 text-2xl font-bold text-white list-disc">Router</li>
                        <li className="p-1 text-2xl font-bold text-white list-disc">TCP/IP</li>
                      </ul>
                  </div>
              </motion.div>
              <motion.div variants={move} className='flex flex-col items-center justify-center p-4 bg-gray-800 rounded-xl'>
                  <div className='rounded-full flex justify-center items-center bg-[#386baa] w-20 h-20 text-white text-4xl'><i class="fa-solid fa-house-signal"></i></div>
                  <div className="flex flex-col items-center justify-center">
                      <h2 className='text-[#5c90c7] text-center text-3xl font-bold px-4 md:text-2xl'>Network Access</h2>
                      <ul className='' >
                        <li className="p-1 text-2xl font-bold text-white list-disc" >DHCP</li>
                        <li className="p-1 text-2xl font-bold text-white list-disc">VLSM</li>
                        <li className="p-1 text-2xl font-bold text-white list-disc">Flooding</li>
                        <li className="p-1 text-2xl font-bold text-white list-disc">CAM</li>
                      </ul>
                  </div>
              </motion.div>
              <motion.div variants={move} className='flex flex-col items-center justify-center p-4 bg-gray-800 rounded-xl'>
                  <div className='rounded-full flex justify-center items-center bg-[#4a8fe2] w-20 h-20 text-white text-4xl'><i class="fa-solid fa-tower-broadcast"></i></div>
                  <div className="flex flex-col items-center justify-center">
                      <h2 className='text-[#5c90c7] text-center text-3xl font-bold px-4 md:text-2xl'>IP Connectivity</h2>
                      <ul className='' >
                        <li className="p-1 text-2xl font-bold text-white list-disc" >RIPv1,v2</li>
                        <li className="p-1 text-2xl font-bold text-white list-disc">EIGRP</li>
                        <li className="p-1 text-2xl font-bold text-white list-disc">OSPF</li>
                        <li className="p-1 text-2xl font-bold text-white list-disc">QoS</li>
                      </ul>
                  </div>
              </motion.div>
              <motion.div variants={move} className='flex flex-col items-center justify-center p-4 bg-gray-800 rounded-xl'>
                  <div className='rounded-full flex justify-center items-center bg-[#4380c9] w-20 h-20 text-white text-4xl'><i class="fa-solid fa-shield-halved"></i></div>
                  <div className="flex flex-col items-center justify-center">
                      <h2 className='text-[#5c90c7] text-center text-3xl font-bold px-4 md:text-2xl'>Network Security</h2>
                      <ul className='' >
                        <li className="p-1 text-2xl font-bold text-white list-disc" >ACL</li>
                        <li className="p-1 text-2xl font-bold text-white list-disc">VTP</li>
                        <li className="p-1 text-2xl font-bold text-white list-disc">VPN</li>
                        <li className="p-1 text-2xl font-bold text-white list-disc">IEEE 802.1</li>
                      </ul>
                  </div>
              </motion.div>
          </motion.div>
        </div>
        <motion.div className='flex justify-start w-1/2 md:w-full md:h-[50%] md:justify-center' initial={{x:100, opacity:0}} whileInView={{x:0,opacity:1, transition:{duration:1}}}>
          <Lottie animationData={server} loop={true} className='z-10'/>
        </motion.div>

      </div>
    </div>
  )
}

export default Network