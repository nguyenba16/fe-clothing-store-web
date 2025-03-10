import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import GlobalStyle from './components/Globalstyle/index'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <GlobalStyle>
      <Router>
        <App />
      </Router>
    </GlobalStyle>
  </React.StrictMode>,
)
