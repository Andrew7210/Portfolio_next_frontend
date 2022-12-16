import React from 'react'
import {motion} from 'framer-motion'
const HolwsCastle = () => {
  return (
    <div>
    <div class="castle-container" role="img" aria-labelledby="castleDesc">
      <div class="castle">
        <div class="top">
          <motion.div class="top-tower" style={{transformOrigin: '50% 100%'}}
          animate={{rotate:-15}}
          transition={{type: 'spring',bounce:0.5, repeat:Infinity, duration: 4, repeatType:'mirror'}}
          ></motion.div>
          <div class="top-clothes"></div>
          <div class="top-top"></div>
        </div>
        <motion.div class="bucket" style={{transformOrigin: '50% 0%'}}
        animate={{rotateZ: -25, rotateX: -45}}
        transition={{ease: 'easeInOut', repeat:Infinity, duration: 0.6, repeatType:'mirror'}}
        ></motion.div>
        <div class="mouth">
          <motion.div class="back-lip" style={{transformOrigin: '100% 0%'}}
           animate={{rotate:-15, x:5}}
           transition={{type: 'spring',bounce:0.5, repeat:Infinity, duration: 2.6, repeatType:'mirror'}}></motion.div>
          <motion.div class="front-lip" style={{transformOrigin: '100% 0%'}}
           animate={{rotate:-15, x:5}}
           transition={{type: 'spring',bounce:0.5, repeat:Infinity, duration: 2.6, repeatType:'mirror'}}></motion.div>
        </div>
        <motion.div class="l-leg" style={{transformOrigin: '0% 0%'}}
         animate={{rotate:-15}}
        transition={{ease: 'easeInOut', repeat:Infinity, duration: 2, repeatType:'reverse'}}></motion.div>
        <motion.div class="r-leg" style={{transformOrigin: '0% 0%'}}
         animate={{rotate:-15}}
        transition={{ease: 'easeInOut', repeat:Infinity, duration: 2.2, repeatType:'mirror'}}></motion.div>
        <motion.div class="l-arm" style={{transformOrigin: '0% 0%'}}
         animate={{rotate:15}}
        transition={{ease: 'easeInOut', repeat:Infinity, duration: 2, repeatType:'reverse'}}></motion.div>
        <div class="body"></div>
        <div class="fans">
          <div class="fan2"></div>
          <div class="fan1"></div>
          <div class="fix-tail"></div>
        </div>
        <div class="r-arm-holder">
          <motion.div class="r-arm" style={{transformOrigin: '0% 0%'}}
           animate={{rotate:15}}
        transition={{ease: 'easeInOut', repeat:Infinity, duration: 1.8, repeatType:'reverse'}}></motion.div>
          <div class="fix-shoulder"></div>
        </div>
        <motion.div class="ear" style={{transformOrigin: '25% 50%'}}
         animate={{rotate:-25}}
         transition={{ease: 'easeInOut', repeat:Infinity, duration: 2, repeatType:'reverse'}}></motion.div>
        <div class="lower-foliage">
          <div class="foliage2"></div>
          <div class="foliage1"></div>
          <div class="fix-balcony"></div>
        </div>
        <div class="wing"></div>
        <div class="higher-foliage">
          <motion.div class="foliage3" style={{transformOrigin: '50% 100%'}}
           animate={{skewX:6}}
        transition={{ease: 'easeInOut', repeat:Infinity, duration: 0.5, repeatType:'reverse'}}></motion.div>
          <motion.div class="foliage2" style={{transformOrigin: '50% 100%'}}
           animate={{skewX:-8}}
        transition={{ease: 'easeInOut', repeat:Infinity, duration: 0.6, repeatType:'reverse'}}></motion.div>
          <motion.div class="foliage1" style={{transformOrigin: '50% 100%'}}
           animate={{skewX:10}}
        transition={{ease: 'easeInOut', repeat:Infinity, duration: 0.7, repeatType:'reverse'}}></motion.div>
          <div class="fix-roof"></div>
        </div>
        <div class="flag"></div>
      </div>
    </div>
  </div>
  )
}

export default HolwsCastle