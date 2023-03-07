import React, { useEffect, useRef, useState } from 'react'
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import {motion, AnimatePresence, useAnimationControls} from "framer-motion";
import Lottie from "lottie-react";
import background from "public/lotti/workBackground.json"
import { urlFor, client } from '../../lib/sanity.client.ts';
import {PortableText} from "@portabletext/react";
const WorkExperience = () => {
  const [clicked, setClicked] = useState(false)
  const [selectId, setSelectId] = useState(-1)
  const closeControl = useAnimationControls()
  const { rive, RiveComponent} = useRive({
    src: "rive/toemater_timer.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });
  const breakInput = useStateMachineInput(rive, "State Machine 1", "break", true);
  const lottieRef = useRef();
  useEffect(() => {
    if(lottieRef.current !== undefined){
      lottieRef.current.setSpeed(0.3);
    }
  }, [])
  
  const closeImage = () => {
    closeControl.start ({
      left: "-200%",
      transition: {
        duration:1,
        type: "spring"
      }
    })
  }
  const openImage = () => {
    closeControl.start ({
      left: 0,
      transition: {
        duration:1,
        type: "spring"
      }
    })
    
  }
  
  const move = {
    hidden: {opacity:0},
    show:{
      opacity:1,
      transition:{duration:1}
    }
  }

  const [works, setWorks] = useState([])
  useEffect(() => {
    const workQuery = '*[_type == "work"] | order(end desc)'
    client.fetch(workQuery).then((data) => {
      setWorks(data);
    });
  }, [])
  useEffect(() => {
    console.log(works);
  }, [works])
  const components = {
    listItem: {
      bullet: ({children}) => <li className="list-disc">{children}</li>
    },
    marks: {
      strong: ({children}) => <span className='font-bold text-white'>{children}</span>,
      code: ({children}) => <span className='p-1 font-bold text-white rounded-md bg-slate-500'>{children}</span>
    }
  }
  return (
    <div className='relative w-full min-h-screen snap-center'>
      <Lottie lottieRef={lottieRef} animationData={background} loop={true} className='absolute w-full h-full opacity-10' />
      <div className='flex flex-row items-center justify-center h-full md:flex-col'>
        {clicked &&
          <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                style={{ pointerEvents: "auto" }}
                className= {`overlay cursor-pointer z-20`}
                onClick={()=>{setClicked(false); setSelectId(-1);openImage()}}
              >
            </motion.div>
            <motion.div layoutId={`workbox-${selectId}`}  className='w-[40%] ml-10 workBoxshow z-30 md:fixed md:w-[80%] md:top-[20%] md:ml-0' style={{"--clr":`${works[selectId].color.hex}`}} onClick={()=>{
              setClicked(false)
              openImage()
              setSelectId(-1)
              }}>
              
              <div className='content max-h-[75vh] overflow-y-scroll'>
                <div className='flex flex-row items-center'>
                  <motion.div className='icon' layoutId={`iconbox-${selectId}`}><img src={urlFor(works[selectId].image)} /></motion.div>
                  <motion.div className='pl-10 text' layoutId={`boxtext-${selectId}`}>
                    <motion.h1 className='text-2xl' layoutId={`boxtitle-${selectId}`}>{"name" in works[selectId] ? `${works[selectId].title} (${works[selectId].name})` : `${works[selectId].title}`}</motion.h1>
                    <motion.p className='text-xl font-bold' layoutId={`boxjob-${selectId}`}>{works[selectId].job}</motion.p>
                    <motion.div className='flex flex-row items-center gap-5 mt-2' layoutId={`boxtime-${selectId}`}>
                      <h3 className='text-lg'>{works[selectId].begin.substring(0,7)}</h3>
                      <h1 className='text-lg'>to</h1>
                      <h3 className='text-lg'>{works[selectId].end.substring(0,7)}</h3>
                    </motion.div>
                  </motion.div>
                </div>
                <motion.p className='p-5 text-lg text-gray-400' layoutId={`boxdetail-${selectId}`}>
                  <PortableText value={works[selectId].description} components={components} />
                </motion.p>
              </div>
              <i></i>
              <i></i>
            </motion.div>
          </AnimatePresence>
          }
          <motion.div animate={closeControl} className={`z-10 w-1/2 h-3/4 md:w-full md:h-1/2 ${clicked ? ' absolute': 'relative'}`}><RiveComponent  /></motion.div>

        <div className='flex flex-col items-start justify-center w-1/2 h-full md:w-full md:h-3/4'>
          <motion.h2 initial={{opacity:0}} whileInView={{opacity:1, transition:{duration:1}}} className='w-full pb-10 text-4xl font-bold text-center text-white'>Work Experience</motion.h2>
          <motion.div  className='flex flex-row flex-wrap items-center justify-center w-full grid-cols-2 gap-10 md:gap-6'>
            {works.map((work, index) => 
              <motion.div layoutId={`workbox-${index}`} className='cursor-pointer workBox' style={{"--clr":`${work.color.hex}`}} onHoverStart={()=>breakInput.value=false} onHoverEnd={()=>breakInput.value=true} onClick={()=>{
              setClicked(true)
              closeImage()
              setSelectId(index)
            }}
            variants={move} initial="hidden" whileInView="show"
            >
                <motion.div className='content'>
                  <motion.div className='icon' layoutId={`iconbox-${index}`}><img src={urlFor(work.image)} /></motion.div>
                  <motion.div className='text' layoutId={`boxtext-${index}`}>
                    <motion.h1 className='text-2xl md:text-2xl' layoutId={`boxtitle-${index}`}>{work.title}</motion.h1>
                    <motion.p className='text-lg font-bold' layoutId={`boxjob-${index}`}>{work.job}</motion.p>
                    <motion.div className='flex flex-row items-center justify-center gap-5 mt-2' layoutId={`boxtime-${index}`}>
                      <h3 className='text-lg'>{work.begin.substring(0,7)}</h3>
                      <h1 className='text-lg'>to</h1>
                      <h3 className='text-lg'>{work.end.substring(0,7)}</h3>
                    </motion.div>
                    <motion.p className='pt-3 text-base' layoutId={`boxdetail-${index}`}>*Click to see more details</motion.p>
                  </motion.div>
                </motion.div>
              </motion.div>
              )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default WorkExperience