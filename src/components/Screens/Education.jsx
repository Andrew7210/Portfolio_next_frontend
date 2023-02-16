import React, {useState, useEffect} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import Lottie from "lottie-react";
import { LoremIpsum } from "react-lorem-ipsum";
import certificate from "public/lotti/certificate.json"
import medal from "public/lotti/medal.json"
import roger from "public/lotti/roger.json"
import { urlFor, client } from '../../lib/sanity.client.ts';

function Item({ id, setselected, setselectid, csCourses=[],mathCourses=[],buCourses=[]}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        style={{ pointerEvents: "auto" }}
        className= {`overlay cursor-pointer z-20 ${id}`}
        onClick={()=>{setselected(false); setselectid("")}}
      >
      </motion.div>
      <div className="z-30 card-content-container open ">
        <motion.div className={`card-content bg-opacity-20 backdrop-blur-xl ${id==="waterloo"? "bg-orange-300" : "bg-purple-500"}`} layoutId={`card-container-${id}`}>
          <div className='w-20 h-20 absolute top-0 right-0 flex justify-center items-center text-white text-5xl cursor-pointer' onClick={()=>{setselected(false); setselectid("")}}><i class="fa-solid fa-xmark" ></i></div>
          <div className='flex flex-row items-center'>
            <motion.div
              className="w-[200px] h-[200px] rounded-full overflow-hidden flex flex-row items-center"
              layoutId={`card-image-container-${id}`}
            >
              <img className="card-image" src={`${id}.png`} alt={`${id}`}  />
            </motion.div>
            <motion.div
              className="pl-8"
              layoutId={`title-container-${id} `}
            >
              <h2 className='text-5xl font-bold text-white'>{id==="waterloo"? "University of Waterloo" : "Wilfrid Laurier University"}</h2>
              <h2 className='text-3xl font-bold text-white'>{id==="waterloo"? "Bachelor of Computer Science" : "Bachelor of Business Administration"}</h2>
              { id==="waterloo" &&
                <div>
                  <h3 className='text-2xl font-semibold text-gray-400'>Artificial Intelligence Specialization</h3>
                  <h3 className='text-2xl font-semibold text-gray-400'>Computational Mathematics Minor</h3>
                </div>
              }
            </motion.div>
          </div>
          {id==="waterloo" ? 
            <motion.div className="flex flex-col " >
              <h2 className='text-3xl font-bold text-white'>Computer Science Courses:</h2>
              <div className='flex flex-row flex-wrap gap-5'>
                {csCourses.map((course, index) => 
                  <motion.a className='backdrop-blur-md p-4 rounded-xl' href={course.url}  whileHover={{scale:1.1}} target="_blank" rel="noopener noreferrer">
                    <h3 className='text-2xl font-bold text-white'>{course.title}</h3>
                    <h3 className='text-lg font-bold text-white'>{course.description}</h3>
                  </motion.a>
                )}
              </div>
              <h2 className='text-3xl font-bold text-white'>Mathematics Courses:</h2>
              <div className='flex flex-row flex-wrap gap-5'>
                {mathCourses.map((course, index) => 
                  <motion.a className='backdrop-blur-md p-4 rounded-xl' href={course.url}  whileHover={{scale:1.1}} target="_blank" rel="noopener noreferrer">
                    <h3 className='text-2xl font-bold text-white'>{course.title}</h3>
                    <h3 className='text-lg font-bold text-white'>{course.description}</h3>
                  </motion.a>
                )}
              </div>
              <h2 className='text-2xl font-bold text-gray-500 pt-10 '>* Click the block to see the course description</h2>
            </motion.div>
          :
            <motion.div className="flex flex-col " >
              <h2 className='text-3xl font-bold text-white'>Business Courses:</h2>
              <div className='flex flex-row flex-wrap gap-5'>
                {buCourses.map((course, index) => 
                  <motion.a className='backdrop-blur-md p-4 rounded-xl' href={course.url}  whileHover={{scale:1.1}} target="_blank" rel="noopener noreferrer">
                    <h3 className='text-2xl font-bold text-white'>{course.title}</h3>
                    <h3 className='text-lg font-bold text-white'>{course.description}</h3>
                  </motion.a>
                )}
              </div>
              <h2 className='text-2xl font-bold text-gray-500 pt-10 '>* Click the block to see the course description</h2>
            </motion.div>
          }
        </motion.div>
      </div>
    </>
  );
}

const FloatingCard = ({style, Lotti, text1, text2, delay}) => (
  <motion.div className={`absolute gradientshadow  ${style}`}
  initial={{ opacity: 0, y:100 }} whileInView={{ opacity: 1, y:0, transition: { delay:delay,duration:1 } }} 
  >
    <div className='flex flex-row items-center justify-center rounded-2xl'>
        <Lottie animationData={Lotti} loop={true} className='w-28 h-28'/>
        <div className="flex flex-col items-center justify-center p-4 ">
          <h1 className='text-2xl font-bold text-white'>{text1}</h1>
          <h1 className='text-2xl font-bold text-white'>{text2}</h1>
          <div className=''></div>
        </div>
    </div>
  </motion.div >
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

  const [waterlooCourseCS, setWaterlooCourseCS] = useState([])
  const [waterlooCourseMath, setWaterlooCourseMath] = useState([])
  const [laurierCourse, setLaurierCourse] = useState([])
  useEffect(() => {
    const waterlooQueryCS = '*[_type == "waterloo" && type == "cs"] | order(title desc)'
    const waterlooQueryMath = '*[_type == "waterloo" && type == "math"] | order(title desc)'
    const laurierQuery = '*[_type == "laurier"] | order(title desc)'
    client.fetch(waterlooQueryCS).then((data) => {
      setWaterlooCourseCS(data);
    });
    client.fetch(waterlooQueryMath).then((data) => {
      setWaterlooCourseMath(data);
    });
    client.fetch(laurierQuery).then((data) => {
      setLaurierCourse(data);
    });
    
  }, [])
  
  
  return (
    <div className='relative w-full h-screen snap-center '>
      <FloatingCard delay={0} style={"right-60 top-[40%] md:top-[80%] md:right-10"} Lotti={certificate} text1={"Euclid Mathematics Contest"} text2={"Certificate of Distinction"}/>
      <FloatingCard delay={0.2} style={"left-[7%] top-[15%] md:left-[20%] md:top-[10%]"} Lotti={medal} text1={"BDO New Venture Competition"} text2={"2021 Semi-finalist"}/>
      <FloatingCard delay={0.4} style={"left-[15%] bottom-[15%] md:left-[5%]"} Lotti={roger} text1={"Dean's Honour Roll"} text2={"Year 2020, 2021, 2022"}/>
      <RiveComponent className='absolute w-full -z-5 adjustheight' />
      <Scan className='absolute w-full adjustheight' />
      <div className='relative z-20 flex flex-col items-center justify-center w-full h-full'>
        <motion.h2 className='pb-20 text-6xl font-bold text-white '
          initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration:1 } }}
        >My Education and Achievement</motion.h2>
        <div className='flex flex-col items-center justify-center w-1/2 md:w-[95%]'>
          <div className='flex justify-start w-full'>
            <motion.div  onClick={()=>{setSelected(true); setSchool("waterloo")}} whileHover={{scale:1.1, boxShadow: `0 0 50px orange`}} className='flex flex-row items-center justify-center my-3 bg-orange-300 rounded-3xl bg-opacity-20 backdrop-blur-lg cursor-pointer' layoutId={`card-container-waterloo`}
              initial={{ opacity: 0, x:-200 }} whileInView={{ opacity: 1, x:0, transition: { delay:0,duration:1 } }}
            >
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
            <motion.div onClick={()=>{setSelected(true); setSchool("wilfrid")}} whileHover={{scale:1.1, boxShadow: `0 0 80px purple`}} className='flex flex-row items-center justify-center my-3 bg-purple-500 rounded-3xl bg-opacity-20 backdrop-blur-lg cursor-pointer' layoutId={`card-container-wilfrid`}
             initial={{ opacity: 0, x:200 }} whileInView={{ opacity: 1, x:0, transition: { delay:0.2,duration:1 } }}>
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
        {selected && <Item id={school} key="item" setselected={setSelected} setselectid={setSchool} mathCourses={waterlooCourseMath} csCourses={waterlooCourseCS} buCourses={laurierCourse}/>}
      </AnimatePresence>
    </div>
  )
}

export default Education