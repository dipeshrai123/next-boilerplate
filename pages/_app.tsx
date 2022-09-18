import '../styles/globals.css'
import type {AppProps} from 'next/app'

function MyApp({Component, pageProps}: AppProps) {
  console.log(process.env.NEXT_PUBLIC_DEV_URL)

  return <Component {...pageProps} />
}

export default MyApp
