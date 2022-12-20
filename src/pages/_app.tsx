import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import '../styles/HolwsCastle.scss'
import '../styles/Mario.scss'
import '../styles/SceneSection.scss'
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
