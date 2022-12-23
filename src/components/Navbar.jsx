import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { motion, AnimatePresence } from "framer-motion"

const MenuItems = ({ isMobile, active, setActive, setIsOpen, inputs}) => {
  const generateLink = (i) => {
    switch (i) {
      case 0: return '/';
      case 1: return '/projects';
      case 2: return '/contact';
      default: return '/';
    }
  };
  return (
    <ul className={`list-none flexCenter flex-row  ${isMobile && 'flex-col h-full'}`}>
      {/* for the map i is the index */}
      {['.about()', '.projects()', '.contact()'].map((item, i) => (
        <motion.li
          key={i}
          onClick={() => {
            setActive(item);
            setIsOpen(false);
            inputs.value = !inputs.value
          }}
          className={`flex flex-row w-[2.6] items-center font-poppins font-semibold text-gray-500 hover:text-white mx-3
          ${active === item
            ? 'text-white '
            : 'text-nft-gray-3'}`}
        >
          <Link className={`${isMobile && 'text-3xl p-4'}`} href={generateLink(i)}>{item}</Link>
        </motion.li>
      ))}
    </ul>
  );
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
    src: "rive/menu_button.riv",
    stateMachines: "switch",
    autoplay: true,
  });
  const bumpInput = useStateMachineInput(rive, "switch", "toggleX");
  useEffect(() => {
    checkActive(active, setActive, router);
  }, [router.pathname]);
  return (
    /* for the nagivation bar */
    <nav className="fixed z-10 flexCenter md:justify-end w-full h-16 bg-black ">
      <div className='md:hidden w-2/3 flex flex-row flexBetween'>
        <div className="flex flex-row justify-start flex-1">
          <div className="cursor-pointer flexCenter ">
            <p className="ml-1 text-4xl font-bold text-purple-700">{active}</p>
          </div>
        </div>
  
        {/* this is the div for the large screen  */}
        <div className="flex flex-row justify-end flex-initial">
          <div className="flex">
            <MenuItems active={active} setActive={setActive} setIsOpen={setIsOpen} inputs={bumpInput} />
          </div>
        </div>

      </div>
      {/* right side manu for the mobile device */}
      <div className="hidden ml-3 pr-3 h-20 cursor-pointer items-center md:flex">
        <RiveComponent style={{width: 50}} onClick={()=>{
          setIsOpen((preState) => !preState)
          bumpInput.value=!bumpInput.value
          }} />
        <AnimatePresence>
          {isOpen && (
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-10 flex flex-col justify-between top-65 bg-black nav-h">
              <div className={`flex-1 p-4 ${active}`}>
                {/* isMobile默认为true */}
                <MenuItems active={active} setActive={setActive} isMobile setIsOpen={setIsOpen} inputs={bumpInput} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </nav>
  );
};

export default Navbar;
