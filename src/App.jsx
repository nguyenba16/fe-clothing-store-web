import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import Home from './pages/Home'
import NewProducts from './pages/NewProduct'
import TryOn from './pages/TryOn'
function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/new-products' element={<NewProducts/>} />
        <Route path='/try-on' element={<TryOn/>} />
      </Route>
    </Routes>
  )
}

export default App
