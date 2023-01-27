import React, { useState, useEffect, useRef } from 'react'
import { random } from '@/lib/utils'
import {Howl, Howler} from 'howler'
import AudioFinish from '../Characters/SuperMario/assets/smw_power-up.ogg'
import SuperMarioBlock from '../Characters/SuperMario/Block'
import {motion, useAnimationControls, useScroll, useTransform, useInView} from 'framer-motion'

const SuperMarioScene = ({showRest}) => {
  const closeControl = useAnimationControls()
  const marioControl = useAnimationControls()
  const [foundCoins, setFoundCoins] = useState(0)
  const [marioState, setMarioState] = useState("")
  const [hasFoundAllCoins, setHasFoundAllCoins] = useState(false)
  const [jumped, setJumped] = useState("")
  const [randomBlock, setrandomBlock] = useState(0)
  const audioFinish = new Howl({src:[AudioFinish]})
  const marioref = useRef()
  useEffect(() => {
    setrandomBlock(random(1,3))
  }, [])
  
  useEffect(() => {
    if (jumped) {
      const rect = document.getElementById(jumped).getBoundingClientRect()
      const blockCenter = Math.floor(rect.x + rect.width / 2)
      const blockBottom = rect.bottom
      
      jumpMario(blockCenter, blockBottom)
    }
    return () => {
      setJumped("")
    }
  }, [jumped])
  
  const jumpMario = async (blockCenter, blockBottom) => {
    const mario = marioref.current
    const marioRect = mario.getBoundingClientRect()
    const isJumpingLeft = marioRect.x > blockCenter
    const marioFloor = window.innerHeight - marioRect.height
    setMarioState("up")
    await marioControl.start({
      rotateY: (isJumpingLeft ? 180 : 0),
      transition: {
        duration: 0.001,
      }
    })
    await marioControl.start({
      left: blockCenter - (marioRect.width)/2,
      top: blockBottom,
      transition: {
        left: {
          ease: 'easeIn',
          duration: 0.1
        },
        top: {
          ease: 'easeOut',
          duration: 0.1
        }
      }
    })
    setMarioState('down')
    await marioControl.start({
      left: (isJumpingLeft ? blockCenter - (marioRect.width)/2 - 128 : blockCenter - (marioRect.width)/2 + 128),
      top: marioFloor,
      transition: {
        left: {
          ease: 'easeOut',
          duration: 0.1
        },
        top: {
          ease: 'easeIn',
          duration: 0.1
        }
      }
    })
    setMarioState(hasFoundAllCoins ? 'celebrate' : '')
  }
  useEffect(() => {
    if (foundCoins != 0) {
      document.getElementById("marioscreen").classList.add("bg-[#0497d1]")
      document.getElementById("marioscreen").classList.add("dropshadow")
      showRest(true)
    }
  }, [foundCoins])
  
  useEffect(() => {
    if (hasFoundAllCoins) {
      setMarioState('celebrate')
      onOpenMessage()
    }
  }, [hasFoundAllCoins])
  
  const onOpenMessage = async () => {
    audioFinish.play()
    await closeControl.set ({
      opacity: 0,
      scale: 1
    })
    closeControl.start ({
      opacity: 1,
      transition: {
        duration:0.2
      }
    })
  }
  const onCloseMessage = () => {

    closeControl.start ({
      opacity: 0,
      zIndex:100,
      transition: {
        duration:1
      }
    })
  }

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0,1,0]);
  const [show, setShow] = useState(false)
  const isInView = useInView(ref, {margin: "-10px 0px -10px 0px"})
  useEffect(() => {
    if (isInView) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [isInView])
  return (
    <div ref={ref} id="marioscreen" className='w-screen h-screen snap-center'>
      <div className={`${show ? "": "hidden"}`}>
        <motion.div style={{opacity}} class='mariocontainer fixed top-0 left-0 z-40 w-screen h-screen' id="Mario" role="img" aria-labelledby="marioDesc">
          <container>
            <div class="blocks">
              {[...Array(3)].map((_ , i) => (<SuperMarioBlock key={i} thisId = {`block${i}`}
              setJumped={setJumped} 
              setHasFoundAllCoins={setHasFoundAllCoins} 
              FindCoins = {foundCoins}
              setFindCoins={setFoundCoins} 
              hasCoins={randomBlock === i + 1}  />))}
            </div>
    
            {/* mario avatar */}
            <div class="mario-container" ><motion.div ref={marioref}  animate={marioControl} class={`mario ${marioState}`}/></div>
            <div class={`mario-coin-counter ${foundCoins ? '':'hidden'}`}>
              {`${foundCoins}`}
            </div>
    
            <motion.div animate={closeControl} class={` ${hasFoundAllCoins ? '':'hidden'}`}>
              <div class="mario-msg-overlay"></div>
              <div class="mario-msg">
                Wow! Thanks for jumping so many times. <br />
                <span class="-purple">You found all 16 coins!</span>
                <br />&nbsp;<br />
                Keep scrolling, you're near the end!
                <div class="later">
                  (￣Д￣)ﾉ
                  <button class="mario-msg-close" type="button" title="Close message"
                    onClick={onCloseMessage}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </motion.div>
          </container>
        </motion.div>
      </div>
    </div>
  )
}

export default SuperMarioScene