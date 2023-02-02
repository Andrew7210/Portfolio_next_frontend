import React, { useState, useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline';
import { motion, AnimatePresence} from "framer-motion";
import { LoremIpsum } from "react-lorem-ipsum";
import { items } from "../pages/data.js";


function Card({ id, title, category, backgroundColor, setselected, setselectid }) {
  return (
    <li  className={`card`} onClick={() => {setselected(true); setselectid(id)} }>
      <div className="card-content-container cursor-pointer">
        <motion.div className="bg-gray-700 card-content" layoutId={`card-container-${id}`} whileHover={{scale:1.1, boxShadow: `0 0 50px ${backgroundColor}`}} >
          <motion.div
            className="card-image-container"
            layoutId={`card-image-container-${id}`}
          >
            <img className="object-cover w-auto h-full card-image" src={`images/${id}.jpg`} alt="" />
          </motion.div>
          <motion.div className="title-container" layoutId={`title-container-${id}`}>
            <span className="category">{category}</span>
            <h2>{title}</h2>
          </motion.div>
        </motion.div>
      </div>
    </li>
  );
}
function Item({ id, setselected, setselectid }) {
  const { category, title } = items.find(item => item.id === id);

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
      <div className="z-30 card-content-container open ">
        <motion.div className="bg-gray-700 card-content" layoutId={`card-container-${id}`}>
          <motion.div
            className="card-image-container"
            layoutId={`card-image-container-${id}`}
          >
            <img className="card-image" src={`images/${id}.jpg`} alt="" />
          </motion.div>
          <motion.div
            className="title-container"
            layoutId={`title-container-${id}`}
          >
            <span className="category">{category}</span>
            <h2>{title}</h2>
          </motion.div>
          <motion.div className="content-container" animate>
            <LoremIpsum
              p={12}
              avgWordsPerSentence={10}
              avgSentencesPerParagraph={10}
            />
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
    <div className='flex flex-col w-screen pt-16 overflow-y-scroll h-screen snap-start'>
      <div style={{height: height}} className='absolute w-full'><Spline id="spline" scene="https://prod.spline.design/SRqUw6RASTHyaUqf/scene.splinecode" /></div>
      <div ref={projectsref} className='z-10 w-full' >
          <h1 className='w-full p-4 text-4xl font-bold text-center text-white '>Here is my selected projects</h1>
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