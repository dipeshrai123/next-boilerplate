import {Provider} from 'react-redux'
import type {AppProps} from 'next/app'

import {store} from 'store'
import {GlobalStyle} from 'theme'

import 'setUpTests'
import 'react-loading-skeleton/dist/skeleton.css'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
