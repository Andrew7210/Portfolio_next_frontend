import React, { useState, useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline';
import { motion, AnimatePresence} from "framer-motion";
import YouTube from 'react-youtube';
import getYouTubeID from 'get-youtube-id';
import {PortableText} from "@portabletext/react";
import { urlFor, client } from '../lib/sanity.client.ts';
import Lottie from "lottie-react";
import github from "public/lotti/gitcat.json";
const components = {
  listItem: {
    bullet: ({children}) => <li className="list-disc">{children}</li>
  },
  marks: {
    strong: ({children}) => <span className='font-bold text-white'>{children}</span>,
    code: ({children}) => <span className='p-1 font-bold text-white rounded-md bg-slate-500'>{children}</span>
  }
}

function Card({ project, id, setselected, setselectid }) {
  return (
    <li  className='card opacity-90' onClick={() => {setselected(true); setselectid(id)} }>
      <div className="cursor-pointer card-content-container">
        <motion.div className="bg-gray-700 card-content" layoutId={`card-container-${id}`} whileHover={{scale:1.1, boxShadow: `0 0 50px ${project.color.hex}`}} >
          <motion.div
            className="flex items-center justify-center card-image-container"
            layoutId={`card-image-container-${id}`}
          >
            <img className="object-cover w-auto h-full" src={urlFor(project.image)} alt="" />
          </motion.div>
          <motion.div className="absolute w-full h-full left-4 top-4" layoutId={`title-container-${id}`}>
            <span className="text-3xl font-bold text-white">{project.title}</span>
            <div className='flex flex-row flex-wrap gap-1 max-w-[90%] pt-1'>
              {project.technology.map((tech, index) => (
                <div className='px-2 py-1 text-center text-white rounded-lg bg-slate-500'>
                  <h3 className='text-base font-bold'>{tech}</h3>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </li>
  );
}
function Item({ id,project, setselected, setselectid }) {
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
        onClick={()=>{setselected(false); setselectid(-1)}}
      >
      </motion.div>
      <div className="z-30 card-content-container open top-20">
        <motion.div className="flex flex-col bg-gray-700 bg-opacity-80 backdrop-blur-lg card-content" layoutId={`card-container-${id}`}>
          <div className='absolute top-0 right-0 z-40 flex items-center justify-center w-20 h-20 text-5xl text-white cursor-pointer' onClick={()=>{setselected(false); setselectid(-1)}}><i class="fa-solid fa-xmark"></i></div>
          <div className='flex flex-row md:flex-col'>
            <motion.div
              className="max-w-[50%] overflow-hidden md:max-w-[90%]"
              layoutId={`card-image-container-${id}`}
            >
              <img className="card-image rounded-2xl" src={urlFor(project.image)} alt="" />
            </motion.div>
            <motion.div className="flex flex-col flex-1 pl-5" layoutId={`title-container-${id}`}>
              <h3 className="text-5xl font-bold text-white md:text-5xl md:pt-5">{project.title}</h3>
              <h3 className="py-4 text-xl font-medium text-white md:text-3xl">{project.description}</h3>
              <div className='flex flex-row flex-wrap gap-2 '>
              {project.technology.map((tech, index) => (
                <div className='px-2 py-1 text-center text-white rounded-lg bg-slate-500'>
                  <h3 className='text-base font-bold'>{tech}</h3>
                </div>
              ))}
              </div>
              <div className='flex flex-row items-center'>
                {"website" in project &&
                (<motion.div whileHover={{scale:1.1}} className='flex items-center justify-center m-3 text-4xl text-white pointer-events-auto'>
                  <a href={project.website} target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                </motion.div>)}
                <motion.div whileHover={{scale:1.1}} className='flex items-center justify-center m-3 text-5xl text-white pointer-events-auto'>
                  <a href={project.github} target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-square-github"></i></a>
                </motion.div>
              </div>
              <h3 className="text-base font-bold text-gray-500 md:text-xl">*If the website is not working due to hosting plan change, please check youtube video for project demonstration</h3>
            </motion.div>
          </div>
          <motion.div className="flex flex-row w-full h-full p-5 content-container md:flex-col" animate>
          {"youtube" in project &&
            <div className='flex flex-col w-1/2 md:w-full' >
              <h3 className='py-5 text-3xl font-bold text-white md:text-4xl'>Project demonstration (Youtube):</h3>
              <div className='w-full aspect-video'><YouTube videoId={getYouTubeID(project.youtube)} opts={opts} className='w-full h-full' /></div>
              <h3 className='py-3 text-base font-bold text-gray-500 md:text-xl'>*If the video not showing, be patient and check you network</h3>
            </div>}
            <div className='flex flex-1 pt-10 pl-[5%] flex-col md:pl-0'>
              <h3 className='pb-5 text-3xl font-bold text-white md:text-4xl'>Project details:</h3>
              <div className='text-lg font-medium text-gray-300'><PortableText value={project.details} components={components} /></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
const Mywork = () => {
  const [selected, setSelected] = useState(false)
  const [selectId, setSelectId] = useState(-1)
  const [height, setheight] = useState(0)
  const projectsref = useRef(null)
  useEffect(() => {
    setheight(projectsref.current.offsetHeight)
  })
  
  const [projects, setProjects] = useState([])
  useEffect(() => {
    const projectQuery = '*[_type == "project"]'
    client.fetch(projectQuery).then((data) => {
      setProjects(data);
    });
  }, [])
  


  return (
    <div className='flex flex-col w-screen snap-start'>
      <div style={{height: height}} className='absolute w-full'><Spline id="spline" scene="https://prod.spline.design/SRqUw6RASTHyaUqf/scene.splinecode" /></div>
      <div ref={projectsref} className='z-10 w-full min-h-screen' >
          <h3 className='pt-20 pb-4 text-5xl font-semibold text-center uppercase glowText'>Selected Project</h3>
            <ul className="w-full card-list">
                {projects.map((project,index) => {
                  return <Card project={project} id={index} key={index} setselected={setSelected} setselectid={setSelectId} />
                })}
            </ul>
          <AnimatePresence>
            {selected && <Item id={selectId} key="item" project={projects[selectId]} setselected={setSelected} setselectid={setSelectId} />}
          </AnimatePresence>
      </div>
        
      
    </div>
  )
}

export default Mywork