import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import Script from 'next/script';
import '../styles/HolwsCastle.scss'
import '../styles/Mario.scss'
import '../styles/SceneSection.scss'
import Navbar from '../components/Navbar'
import { Crimson_Pro } from '@next/font/google';
import { motion, AnimatePresence } from "framer-motion"

const crimsonPro = Crimson_Pro({subsets: ['latin']})

const App = ({ Component, pageProps }: AppProps) => (
  <AnimatePresence>
    <div className={crimsonPro.className}>
      <motion.div>
        <Navbar />
        <motion.div className="flex w-screen pt-20 overflow-hidden">
          <Component {...pageProps} />
        </motion.div>
      </motion.div>
      <Script src="https://kit.fontawesome.com/b32c0febbc.js" crossOrigin="anonymous" />
    </div>
  </AnimatePresence>
)

export default App;