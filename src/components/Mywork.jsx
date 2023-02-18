import React, { useState, useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline';
import { motion, AnimatePresence} from "framer-motion";
import { LoremIpsum } from "react-lorem-ipsum";
import { items } from "../pages/data.js";
import YouTube from 'react-youtube';
import getYouTubeID from 'get-youtube-id';

function Card({ id, title, category, backgroundColor, setselected, setselectid }) {
  return (
    <li  className='card opacity-90' onClick={() => {setselected(true); setselectid(id)} }>
      <div className="cursor-pointer card-content-container">
        <motion.div className="bg-gray-700 card-content" layoutId={`card-container-${id}`} whileHover={{scale:1.1, boxShadow: `0 0 50px ${backgroundColor}`}} >
          <motion.div
            className="card-image-container"
            layoutId={`card-image-container-${id}`}
          >
            <img className="object-cover w-auto h-full card-image" src={`images/${id}.jpg`} alt="" />
          </motion.div>
          <motion.div className="absolute w-full h-full left-4 top-4" layoutId={`title-container-${id}`}>
            <span className="text-4xl font-bold text-white">{category}</span>
            <div className='flex flex-row flex-wrap gap-2 max-w-[70%]'>
              <div className='px-2 py-1 text-center text-white rounded-lg bg-slate-500'>
                <h3 className='text-xl font-bold'>figma</h3>
              </div>
              <div className='px-2 py-1 text-center text-white rounded-lg bg-slate-500'>
                <h3 className='text-xl font-bold'>figma</h3>
              </div>
              <div className='px-2 py-1 text-center text-white rounded-lg bg-slate-500'>
                <h3 className='text-xl font-bold'>figma</h3>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </li>
  );
}
function Item({ id, setselected, setselectid }) {
  const { category, title } = items.find(item => item.id === id);
  const opts = {
    height: '100%',
    width: '100%',
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        style={{ pointerEvents: "auto", cursor: "pointer" }}
        className= {`overlay z-20 ${id}`}
        onClick={()=>{setselected(false); setselectid("")}}
      >
      </motion.div>
      <div className="z-30 card-content-container open top-20">
        <motion.div className="flex flex-col bg-gray-700 bg-opacity-80 backdrop-blur-lg card-content" layoutId={`card-container-${id}`}>
          <div className='absolute top-0 right-0 z-40 flex items-center justify-center w-20 h-20 text-5xl text-white cursor-pointer' onClick={()=>{setselected(false); setselectid("")}}><i class="fa-solid fa-xmark"></i></div>
          <div className='flex flex-row md:flex-col'>
            <motion.div
              className="max-w-[50%] overflow-hidden rounded-2xl md:max-w-[90%]"
              layoutId={`card-image-container-${id}`}
            >
              <img className="card-image" src={`images/${id}.jpg`} alt="" />
            </motion.div>
            <motion.div className="flex flex-col flex-1 pl-5" layoutId={`title-container-${id}`}>
              <h3 className="text-6xl font-bold text-white md:text-4xl">{category}</h3>
              <h3 className="text-4xl font-bold text-white md:text-2xl">The is the description of the project</h3>
              <div className='flex flex-row flex-wrap gap-2 max-w-[70%]'>
                <div className='px-2 py-1 text-center text-white rounded-lg bg-slate-500'>
                  <h3 className='text-xl font-bold'>figma</h3>
                </div>
                <div className='px-2 py-1 text-center text-white rounded-lg bg-slate-500'>
                  <h3 className='text-xl font-bold'>figma</h3>
                </div>
                <div className='px-2 py-1 text-center text-white rounded-lg bg-slate-500'>
                  <h3 className='text-xl font-bold'>figma</h3>
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div className="flex flex-row w-full h-full p-5 content-container md:flex-col" animate>
            <div className='flex flex-col w-1/2 md:w-full' >
              <h3 className='pb-5 text-4xl font-bold text-white md:text-2xl'>Project demonstration (Youtube):</h3>
              <div className='w-full aspect-video'><YouTube videoId={getYouTubeID("https://www.youtube.com/watch?v=xiGLqU9hXWc&ab_channel=%E6%9F%B4%E7%9F%A5%E9%81%93ChaiKnowsOfficialChannel")} opts={opts} className='w-full h-full' /></div>
            </div>
            <div className='flex flex-1 pt-10 pl-[5%] flex-col md:pl-0'>
              <h3 className='pb-5 text-4xl font-bold text-white md:text-2xl'>Features:</h3>
              <LoremIpsum />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
const Mywork = () => {
  const [selected, setSelected] = useState(false)
  const [selectId, setSelectId] = useState("")
  const [height, setheight] = useState(0)
  const projectsref = useRef(null)
  useEffect(() => {
    setheight(projectsref.current.offsetHeight)
  },[])
  
  
  return (
    <div className='flex flex-col w-screen snap-start'>
      <div style={{height: height}} className='absolute w-full'><Spline id="spline" scene="https://prod.spline.design/SRqUw6RASTHyaUqf/scene.splinecode" /></div>
      <div ref={projectsref} className='z-10 w-full' >
          <h3 className='pt-12 pb-4 font-semibold text-center uppercase glowText text-7xl'>Selected Project</h3>
            <ul className="w-full card-list">
                {items.map((card,index) => {
                  return <Card {...card} setselected={setSelected} setselectid={setSelectId} />
                })}
            </ul>
          <AnimatePresence>
            {selected && <Item id={selectId} key="item" setselected={setSelected} setselectid={setSelectId} />}
          </AnimatePresence>
      </div>
        
      
    </div>
  )
}

export default Mywork