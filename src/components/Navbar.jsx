import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { motion, AnimatePresence } from "framer-motion"
import Lottie from "lottie-react";
import linkedin from "public/lotti/linkedin.json";
import github from "public/lotti/gitcat.json";
import { urlFor, client } from '../lib/sanity.client.ts';
const generateLink = (i) => {
  switch (i) {
    case 0: return '/';
    case 1: return '/projects';
    case 2: return '/contact';
    default: return '/';
  }
};

const checkActive = (active, setActive, router) => {
  switch (router.pathname) {
    case '/':
      if (active !== '.about()') setActive('.about()');
      break;
    case '/projects':
      if (active !== '.projects()') setActive('.projects()');
      break;
    case '/contact':
      if (active !== '.contact()') setActive('.contact()');
      break;
    default:
      setActive('.err(404)');
  }
};

const Navbar = () => {
  const router = useRouter();
  const [active, setActive] = useState('.about()');
  const [isOpen, setIsOpen] = useState(false);
  const { rive, RiveComponent } = useRive({
    src: "/rive/menu_button.riv",
    stateMachines: "switch",
    autoplay: true,
  });
  const bumpInput = useStateMachineInput(rive, "switch", "toggleX");
  useEffect(() => {
    checkActive(active, setActive, router);
  }, [router.pathname]);
  const { rive:rive4, RiveComponent:About } = useRive({
    src: "/rive/electrified_button.riv",
    artboard:"about",
    stateMachines: "button",
    autoplay: true,
  });
  const { rive:rive1, RiveComponent:Project } = useRive({
    src: "/rive/electrified_button.riv",
    artboard:"project",
    stateMachines: "button",
    autoplay: true,
  });
  const { rive:rive2, RiveComponent:Contact } = useRive({
    src: "/rive/electrified_button.riv",
    artboard:"contact",
    stateMachines: "button",
    autoplay: true,
  }); 

  const [links, setLinks] = useState([])
  useEffect(() => {
    const query  = "*[_type == 'link']"
    client.fetch(query).then((data) => {
      setLinks(data);
    });
  }, [])
  
  const MenuItems = ({}) => {
    const colors = ["#00ade1", "#ff6493", "#dc00d4"]
    return (
      <div className='w-full h-full'>
        <ul className={`list-none justify-center flex flex-col h-full relative navStyle left-[25%]`}>
          {['.about()', '.projects()', '.contact()'].map((item, i) => (
            <motion.li key={i} style={{'--colour': colors[i], cursor:'pointer'}} onClick={() => {setActive(item);setIsOpen(false);bumpInput.value = !bumpInput.value}}
              className="relative">
              <a href={generateLink(i)} data-text="&nbsp;" data-text2={item}>&nbsp;{item}&nbsp;</a>
            </motion.li>
          ))}
        </ul>
        <div className='absolute flex flex-col left-2 bottom-3'>
          <motion.div whileHover={{scale:1.2}} className='flex items-center justify-center w-16 h-16 m-4 bg-white rounded-lg pointer-events-auto'>
            <a href={links.length == 1 ? links[0].linkedin : ""} target="_blank" rel="noopener noreferrer"><Lottie animationData={linkedin} loop={true} onClick={()=>{}} className='w-12 h-12'/></a>
          </motion.div>
          <motion.div whileHover={{scale:1.1}} className='m-4 pointer-events-auto '>
            <a href={links.length == 1 ? links[0].github : ""} target="_blank" rel="noopener noreferrer"><Lottie animationData={github} loop={true} onClick={()=>{}} className='w-16 h-16'/></a>
          </motion.div>
        </div >
      </div>
    );
  };


  return (
    /* for the nagivation bar */
    <nav className="fixed z-50 w-full h-12 bg-black bg-opacity-70 flexCenter md:justify-end ">
      <div className='flex flex-row w-2/3 md:hidden flexBetween'>
        <div className="flex flex-row justify-start flex-1">
          <div className="flexCenter ">
            <p className="ml-1 text-2xl font-bold text-purple-700">{active}</p>
          </div>
        </div>
        {/* this is the div for the large screen  */}
        <div className="flex flex-row items-center justify-end flex-initial">
          <div className="flex">
            <motion.li className='w-24 h-12'>
              <Link className='flex w-24 h-12' href={generateLink(0)}><div className='w-24 h-12'><About /></div ></Link>
            </motion.li>
            <motion.li className='w-24 h-12'>
              <Link className='flex w-24 h-12' href={generateLink(1)}><div className='w-24 h-12'><Project /></div ></Link>
            </motion.li>
            <motion.li  className='w-24 h-12'>
              <Link className='flex w-24 h-12' href={generateLink(2)}><div className='w-24 h-12'><Contact /></div ></Link>
            </motion.li>
          </div>
          
          <motion.div whileHover={{scale:1.2}} className='flex items-center justify-center w-8 h-8 m-4 bg-white rounded-lg pointer-events-auto'>
            <a href={links.length == 1 ? links[0].linkedin : ""} target="_blank" rel="noopener noreferrer"><Lottie animationData={linkedin} loop={true} onClick={()=>{}} className='w-6 h-6'/></a>
          </motion.div>
          <motion.div whileHover={{scale:1.1}} className='m-4 pointer-events-auto '>
            <a href={links.length == 1 ? links[0].github : ""} target="_blank" rel="noopener noreferrer"><Lottie animationData={github} loop={true} onClick={()=>{}} className='w-8 h-8'/></a>
          </motion.div>
        </div>

      </div>
      {/* right side manu for the mobile device */}
      <div className="items-center hidden h-20 pr-3 ml-3 md:flex">
        <RiveComponent style={{width: 50, cursor:'pointer'}} onClick={()=>{
          setIsOpen((preState) => !preState)
          bumpInput.value=!bumpInput.value
          }} />
        <AnimatePresence>
          {isOpen && (
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-10 flex flex-col justify-between bg-black top-65 nav-h">
              <div className={`flex-1 p-4 ${active}`}>
                {/* isMobile默认为true */}
                <MenuItems />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </nav>
  );
};

export default Navbar;
