import React, {useState, useEffect} from 'react'
import Spline from '@splinetool/react-spline'
import Lottie from "lottie-react";
import linkedin from "public/lotti/linkedin.json";
import github from "public/lotti/gitcat.json";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import {motion, AnimatePresence} from 'framer-motion'
import Mywork from '../components/Mywork';
import { Typewriter } from 'react-simple-typewriter'
import { urlFor, client } from '../lib/sanity.client.ts';

const Projects = () => {
  const [showScreen, setShowScreen] = useState(true)
  const { rive, RiveComponent} = useRive({
    src: "rive/pigeons_button.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });
  
  const [links, setLinks] = useState([])
  useEffect(() => {
    const query  = "*[_type == 'link']"
    client.fetch(query).then((data) => {
      setLinks(data);
    });
  }, [])

  return (
    <>
      <AnimatePresence>
        {showScreen && (
          <motion.div className="w-screen h-screen fixed top-0 z-30 bg-[#140e20] flex flex-col justify-center items-center text-center" exit={{opacity:0}}>
            <div class="bookshelf_wrapper">
              <ul class="books_list">
                <li class="book_item first"></li>
                <li class="book_item second"></li>
                <li class="book_item third"></li>
                <li class="book_item fourth"></li>
                <li class="book_item fifth"></li>
                <li class="book_item sixth"></li>
              </ul>
              <div class="shelf"></div>
            </div>
            <h2 className='p-4 text-4xl font-bold text-purple-600 relative -bottom-[20%]'>Loading...</h2>
          </motion.div>
        )}
      </AnimatePresence> 
      <div className='flex flex-col bg-[#040505]'>
        <div className='relative flex flex-row h-screen snap-start'>
          <div className='absolute bottom-0 right-0 w-full h-full m-0 '><Spline scene="https://prod.spline.design/HJXKk3Al5odruWDq/scene.splinecode" onLoad={()=>setTimeout(() => {
            setShowScreen(false)
          }, 1000)}/></div>
          <div className='flex flex-col justify-center pl-[5vw] z-10 pointer-events-none md:justify-start'>
            <h2 className='p-2 text-2xl font-bold text-purple-600 md:py-1'>What was impossible, Technology makes possible</h2>
            <h1 className='max-w-3xl p-3 text-6xl font-extrabold text-white md:text-6xl md:py-2'>Time to check the power of knowledge </h1>
            <h2 className='max-w-xl p-2 text-2xl font-bold text-white md:py-1'>The best way to predict the future is to learn and create it.</h2>
            
            <div className='flex flex-row mt-6'>
              <a href={links.length == 1 ? links[0].resume : ""} target="_blank" rel="noopener noreferrer" ><RiveComponent className="mr-12 relative w-[200px] h-[300px] -top-40 pointer-events-auto md:mr-0" /></a>
              <motion.div whileHover={{scale:1.2}} className='flex items-center justify-center w-16 h-16 m-4 bg-white rounded-lg pointer-events-auto'>
                <a href={links.length == 1 ? links[0].linkedin : ""} target="_blank" rel="noopener noreferrer"><Lottie animationData={linkedin} loop={true} onClick={()=>{}} className='w-12 h-12'/></a>
              </motion.div>
              <motion.div whileHover={{scale:1.1}} className='m-4 pointer-events-auto '>
                <a href={links.length == 1 ? links[0].github : ""} target="_blank" rel="noopener noreferrer"><Lottie animationData={github} loop={true} onClick={()=>{}} className='w-16 h-16'/></a>
              </motion.div>
            </div>
          </div>
        </div>
        <Mywork />
      </div>
    </>
  )
}

export default Projects