import {Provider} from 'react-redux'
import type {AppProps} from 'next/app'

import {store} from 'store'
import {GlobalStyle} from 'theme'

import 'setUpTests'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
