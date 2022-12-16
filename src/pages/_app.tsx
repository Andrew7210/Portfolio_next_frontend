import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import '../styles/HolwsCastle.scss'
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
