import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { FontStyle, GlobaStyle } from './styles'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <FontStyle />
    <GlobaStyle />
    <App />
  </Provider>
)

