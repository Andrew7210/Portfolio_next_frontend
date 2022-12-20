import React, { useState, useEffect, useRef } from 'react'
import { random } from '@/lib/utils'
import {Howl, Howler} from 'howler'
import AudioFinish from '../Characters/SuperMario/assets/smw_power-up.ogg'
import SuperMarioBlock from '../Characters/SuperMario/Block'
import SuperMarioMario from '../Characters/SuperMario/Mario'
import SceneSection from '../SceneSection'
import {motion, useAnimationControls} from 'framer-motion'

const SuperMarioScene = () => {
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
    console.log(hasFoundAllCoins)
  }
  useEffect(() => {
    if (foundCoins != 0) {
      document.body.classList.remove('is-playing-mario')
      document.body.classList.add('has-played-mario')
      document.body.classList.add('blue-background')
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
    console.log('close')
    closeControl.start ({
      scale: 0,
      zIndex:100,
      transition: {
        duration:1
      }
    })
    
  }
  return (
    <div class='container' id="Mario" role="img" aria-labelledby="marioDesc">
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
            <span class="-purple">You found all the coins!</span>
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
    </div>
  )
}

export default SuperMarioScene