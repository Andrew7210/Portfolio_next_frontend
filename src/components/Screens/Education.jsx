import React, {useState} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import Lottie from "lottie-react";
import { LoremIpsum } from "react-lorem-ipsum";
import certificate from "public/lotti/certificate.json"
import medal from "public/lotti/medal.json"
import roger from "public/lotti/roger.json"

function Item({ id, setselected, setselectid }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        style={{ pointerEvents: "auto" }}
        className= {`overlay z-20 ${id}`}
        onClick={()=>{setselected(false); setselectid("")}}
      >
      </motion.div>
      <div className="z-30 card-content-container open ">
        <motion.div className={`card-content bg-opacity-20 backdrop-blur-xl ${id==="waterloo"? "bg-orange-300" : "bg-purple-500"}`} layoutId={`card-container-${id}`}>
          <motion.div
            className="object-cover w-[200px] h-[200px] rounded-full overflow-hidden"
            layoutId={`card-image-container-${id}`}
          >
            <img className="card-image" src={`${id}.png`} alt={`${id}`}  />
          </motion.div>
          <motion.div
            className="title-container"
            layoutId={`title-container-${id}`}
          >
            <h2 className='text-3xl font-bold text-white'>{id==="waterloo"? "University of Waterloo" : "Wilfrid Laurier University"}</h2>
            <h2 className='text-3xl font-bold text-white'>{id==="waterloo"? "Bachelor of Computer Science" : "Bachelor of Business Administration"}</h2>
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

const FloatingCard = ({style, Lotti, text1, text2}) => (
  <div className={`absolute gradientshadow ${style}`}>
    <div className='flex flex-row items-center justify-center rounded-2xl'>
        <Lottie animationData={Lotti} loop={true} className='w-28 h-28'/>
        <div className="flex flex-col items-center justify-center p-4 ">
          <h1 className='text-2xl font-bold text-white'>{text1}</h1>
          <h1 className='text-2xl font-bold text-white'>{text2}</h1>
          <div className=''></div>
        </div>
    </div>
  </div >
)
const Education = () => {
  const [selected, setSelected] = useState(false)
  const [school, setSchool] = useState("")
  const { rive, RiveComponent} = useRive({
    src: "rive/background.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });
  const { rive:rive2, RiveComponent:Scan} = useRive({
    src: "rive/scan.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });
  return (
    <div className='relative w-full h-screen snap-center'>
      <FloatingCard style={"right-60 top-[40%] md:top-[10%]"} Lotti={certificate} text1={"Euclid Contest"} text2={"Certificate of distinction"}/>
      <FloatingCard style={"left-[7%] top-[15%]"} Lotti={medal} text1={"BDO New Venture Competition"} text2={"2021 Semi-finalist"}/>
      <FloatingCard style={"left-[15%] bottom-[15%]"} Lotti={roger} text1={"Dean's Honour Roll"} text2={"Year 2020, 2021, 2022"}/>
      <RiveComponent className='absolute w-full -z-5 adjustheight' />
      <Scan className='absolute w-full adjustheight' />
      <div className='relative z-20 flex flex-col items-center justify-center w-full h-full'>
        <h2 className='pb-20 text-6xl font-bold text-white '>My Education and Achievement</h2>
        <div className='flex flex-col items-center justify-center w-1/2'>
          <div className='flex justify-start w-full'>
            <motion.div  onClick={()=>{setSelected(true); setSchool("waterloo")}} whileHover={{scale:1.1, boxShadow: `0 0 50px orange`}} className='flex flex-row items-center justify-center my-3 bg-orange-300 rounded-3xl bg-opacity-20 backdrop-blur-lg' layoutId={`card-container-waterloo`}>
              <motion.div  className='w-[200px] h-[200px] rounded-full overflow-hidden' layoutId='card-image-container-waterloo'>
                <img className='object-cover w-[200px] h-[200px] ' src='waterloo.png' alt='waterloo' />
              </motion.div>
              <motion.div className='flex flex-col items-start px-3' layoutId={`title-container-waterloo`}>
                <h2 className='text-3xl font-bold text-white'>University of Waterloo</h2>
                <h2 className='text-3xl font-bold text-white'>Bachelor of Computer Science</h2>
                <h2 className='text-xl font-bold text-gray-500 '>* Click the block to see the course taken</h2>
              </motion.div>
            </motion.div>
          </div>
          <div className='flex justify-end w-full pt-6'>
            <motion.div onClick={()=>{setSelected(true); setSchool("wilfrid")}} whileHover={{scale:1.1, boxShadow: `0 0 80px purple`}} className='flex flex-row items-center justify-center my-3 bg-purple-500 rounded-3xl bg-opacity-20 backdrop-blur-lg' layoutId={`card-container-wilfrid`}>
              <motion.div className='flex flex-col items-end px-3' layoutId={`title-container-wilfrid`}>
                <h2 className='text-3xl font-bold text-white '>Wilfrid Laurier University</h2>
                <h2 className='text-3xl font-bold text-white '>Bachelor of Business Administration</h2>
                <h2 className='text-xl font-bold text-gray-500 '>* Click the block to see the course taken</h2>
              </motion.div>
              <motion.div className='w-[200px] h-[200px] rounded-full overflow-hidden' layoutId='card-image-container-wilfrid'>
                <img className='w-[200px] h-[200px] object-cover scale-[1.11]' src='wilfrid.png' alt='laurier' />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {selected && <Item id={school} key="item" setselected={setSelected} setselectid={setSchool} />}
      </AnimatePresence>
    </div>
  )
}

export default Education