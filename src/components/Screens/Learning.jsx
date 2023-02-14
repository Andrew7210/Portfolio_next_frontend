import React, { useEffect, useState } from 'react'
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import Lottie from "lottie-react";
import lines from "public/lotti/lines.json"
import starry from "public/lotti/starry.json"
import {motion, useMotionValue} from 'framer-motion'
import { urlFor, client } from '../../lib/sanity.client.ts';
import ScrollText from '../ScrollText'
const Learning = () => {
  const [age, setAge] = useState(1);
  const { rive, RiveComponent} = useRive({
    src: "rive/ageselection.riv",
    stateMachines: "AgeClasses",
    autoplay: true,
  });
  const riveInput = useStateMachineInput(rive, "AgeClasses", "age_class");
  useEffect(() => {
    if (riveInput !== null) {
      riveInput.value = age;
    }
  }, [age])
  const move2 = {
    hidden: {opacity:0, x:-100},
    show:{
      opacity:1,
      x:0,
      transition:{delayChildren:0.5,staggerChildren: 0.2}
    }
  }

  const [skills, setSkills] = useState([])
  useEffect(() => {
    const skillQuery = '*[_type == "skill"]'
    client.fetch(skillQuery).then((data) => {
      setSkills(data);
    });
  }, [])
  useEffect(() => {
    console.log(skills)
  }, [skills])

  return (
    <div className='relative w-full overflow-hidden h-screen flex flex-col'>
      <Lottie animationData={lines} loop={true} className='absolute w-full h-full opacity-[0.05]'/>
      <Lottie animationData={starry} loop={true} className='absolute w-full h-full scale-150 rotate-90'/>
      <div className='flex flex-row items-center h-full relative z-10'>
        <motion.div variants={move2} initial="hidden" whileInView="show" className='flex flex-col items-start pl-[5%] md:w-3/4'>
          <motion.h1 variants={move2} className='pl-3 text-4xl font-bold text-white md:text-2xl'>Live and learn</motion.h1>
          <motion.h1 variants={move2} className='max-w-5xl p-3 text-6xl font-bold text-white md:text-4xl'>Knowledge and skills from school and work is far from enough for me</motion.h1>
          <motion.h1 variants={move2} className='max-w-5xl p-3 text-3xl font-bold text-gray-300 md:text-2xl'>Learning is a lifelong process of keeping abreast of change</motion.h1>
          <motion.div variants={move2} className='flex flex-row items-center justify-start flex-wrap'>
            <button className="m-3 skillButton" style={{'--clr': 'rgb(64, 52, 177)'}} onClick={()=>setAge(0)} ><span>Beginner</span><i></i></button>
            <button className="m-3 skillButton" style={{'--clr': 'rgb(102, 13, 204)'}} onClick={()=>setAge(1)} ><span>Junior</span><i></i></button>
            <button className="m-3 skillButton" style={{'--clr': 'rgb(184, 11, 184)'}} onClick={()=>setAge(2)} ><span>Senior</span><i></i></button>
            <button className="m-3 skillButton" style={{'--clr': 'rgb(187, 20, 112)'}} onClick={()=>setAge(3)} ><span>Professional</span><i></i></button>
          </motion.div>
          <motion.h1 variants={move2} className='max-w-5xl p-3 text-3xl font-bold text-gray-300 md:text-2xl'>But I want to be much faster than others</motion.h1>
        </motion.div>
        <h1 className='p-3 text-2xl font-bold text-gray-300 absolute bottom-0 left-[5%] md:text-xl'>*All blocks scrolling are technologies I have learned </h1>
        <motion.div initial={{x:"30vw", opacity:0}} whileInView={{x:"0", opacity:1, transition:{duration:2}}}  className='z-10 w-1/2 h-[90%] md:absolute md:right-0'><RiveComponent /></motion.div>
      </div>
      <div className='w-full md:pb-[10%] '>
        <ScrollText  speed={-0.7} >
          <div className='flex flex-row gap-4'>
            {skills.map((skill, index) => 
              <div className='bg-[#232a35] rounded-xl p-2 px-3 flex flex-row justify-start items-center w-[500px]'>
                <img src={urlFor(skill.image)} alt="rbc" className='h-[80px] max-w-[100px] object-contain'/>
                <div className='flex flex-col justify-center pl-3'>
                  <h3 className='text-3xl font-bold text-white'>{skill.title}</h3>
                  <p className='text-lg font-bold text-gray-300'>{skill.description}</p>
                </div>
              </div>
            )}
          </div>
        </ScrollText>
        <ScrollText  speed={0.7}>
          <div className='flex flex-row gap-4 my-4'>
            {skills.map((skill, index) => 
              <div className='bg-[#232a35] rounded-xl p-2 px-3 flex flex-row justify-start items-center w-[500px]'>
                <img src={urlFor(skill.image)} alt="rbc" className='h-[80px] max-w-[100px] object-contain'/>
                <div className='flex flex-col justify-center pl-3'>
                  <h3 className='text-3xl font-bold text-white'>{skill.title}</h3>
                  <p className='text-lg font-bold text-gray-300'>{skill.description}</p>
                </div>
              </div>
            )}
          </div>
        </ScrollText>
      </div>
    </div>
  )
}

export default Learning