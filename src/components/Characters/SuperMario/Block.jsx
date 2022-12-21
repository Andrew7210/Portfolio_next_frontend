import React, {useRef, useState} from 'react'
import AudioStomp from './assets/smw_stomp.ogg'
import AudioAppears from './assets/smw_power-up_appears.ogg'
import AudioNoDamage from './assets/smw_stomp_no_damage.ogg'
import { random } from '@/lib/utils'
import {motion, useAnimationControls} from 'framer-motion'

const Block = ({hasCoins, setHasFoundAllCoins,FindCoins, setFindCoins, setJumped, thisId}) => {
  const controls = useAnimationControls()
  const controlsCoin = useAnimationControls()
  const coinsToBeFound = 16
  const [hasTouched, setHasTouched] = useState(false)
  const audioStomp = new Howl({src:[AudioStomp]})
  const audioAppears = new Howl({src:[AudioAppears]})
  const audioNoDamage = new Howl({src:[AudioNoDamage]})
  
  const hasFoundAllCoins = () => {
    return FindCoins === coinsToBeFound
  }
  const animateCoin = async ()=>{
    const xCoords = random(-150, 150)
    await controlsCoin.set({
      x:0,
      y:0,
      display: ""
    })
    await controlsCoin.start({
      y:-150,
      x:xCoords*1.5,
      transition: {
        x: {
          ease: 'easeIn',
          duration: 0.1
        },
        y: {
          ease: 'easeOut',
          duration: 0.1
        }
      }
    })
    await controlsCoin.start({
      x: [xCoords*1.5,xCoords*2.5],
      y: [-150,1000],
      transition : {
        x: {
          ease: 'easeOut',
          duration: 0.2
        },
        y: {
          ease: 'easeIn',
          duration: 0.2
        }
      }
    })
    await controlsCoin.start({
      display: 'none',

    })
    setFindCoins((preState) => preState + 1)
    audioAppears.play()
  }

  const animateBlock = async () => {
    setJumped(thisId)
    await controls.set({
      y:0
    })
    await controls.start({
      y: -40,
      transition : {
        ease: 'easeInOut',
        duration: 0.1,
        delay:0.1,
        repeat: 1,
        repeatType: "reverse",
      }
    })
  }
  const onTouchBlock = () => {
    setHasTouched(true) 
    animateBlock()
    if (hasFoundAllCoins()) {
      setHasFoundAllCoins(true)
      audioNoDamage.play()
      return
    }

    if (hasCoins) {
      audioStomp.play()
      animateCoin()
    } else {
      audioNoDamage.play()
    }
  }




  return (
    <div id={thisId}>
      <motion.div  animate={controls} class= {`mario-box ${hasTouched? '-jumped' : ''} ${hasCoins? '-full' : ''} ${hasFoundAllCoins()? '-off' : ''} ${FindCoins}`}
      onClick={onTouchBlock}>
        <div class="in"></div>
        {
          hasCoins && (<motion.div animate={controlsCoin} class={`mario-coin`} />)
        }
        
      </motion.div>
    </div>
  )
}

export default Block