import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import GlobalStyle from './components/Globalstyle/index'
import { AuthProvider } from './stores/useAuth.jsx'
import { ToastContainer } from 'react-toastify'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <GlobalStyle>
      <Router>
        <AuthProvider>
          <ToastContainer autoClose={1000} />
            <App />
        </AuthProvider>
      </Router>
    </GlobalStyle>
  </React.StrictMode>,
)
