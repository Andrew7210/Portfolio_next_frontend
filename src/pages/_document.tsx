import { Html, Head, Main, NextScript } from 'next/document'
import riveWASMResource from '@rive-app/canvas/rive.wasm';
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preload" href={riveWASMResource} as="fetch" crossOrigin="anonymous" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
