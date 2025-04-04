import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DefaultLayout from './components/DefaultLayout'
import NewProducts from './pages/NewProduct'
import TryOn from './pages/TryOn'
import SignIn from './pages/Signin'
import SignUp from './pages/SignUp'
import { routes } from './routes'
import LoadingOverlay from 'react-loading-overlay-ts'
import useAuth from './stores/useAuth'
import { useState, useEffect } from 'react'

function App() {
  const { loading } = useAuth()
  const [isActive, setActive] = useState(loading)
  useEffect(() => {
    setActive(loading)
  }, [loading])

  if (isActive) {
    return <LoadingOverlay active={isActive} spinner text='Loading your content...' />
  }

  return (
    <Routes>
      <Route path={routes.SIGNIN} element={<SignIn />} />
      <Route path={routes.SIGNUP} element={<SignUp />} />
      <Route element={<DefaultLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/new-products' element={<NewProducts />} />
        <Route path='/try-on' element={<TryOn />} />
      </Route>
    </Routes>
  )
}

export default App
