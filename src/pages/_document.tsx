import { Html, Head, Main, NextScript } from 'next/document'
// @ts-ignore 
import riveWASMResource from '@rive-app/canvas/rive.wasm';
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="preload" href={riveWASMResource} as="fetch" crossOrigin="anonymous" />
        <title>Andrew's Portfolio</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
