import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DefaultLayout from './components/DefaultLayout'
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
