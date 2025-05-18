import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import Home from './pages/Home'
import NewProducts from './pages/NewProduct'
import TryOn from './pages/TryOn'
import SignIn from './pages/Signin'
import SignUp from './pages/SignUp'
import { routes } from './routes'
import LoadingOverlay from 'react-loading-overlay-ts'
import useAuth from './stores/useAuth'
import Profile from './pages/Profile'
import ManageOder from './pages/Admin/ManageOder'
import LayoutForAmin from './components/LayoutForAdmin'
import ManageProduct from './pages/Admin/ManageProduct'
import { useState, useEffect } from 'react'
import DetailProduct from './pages/DetailProduct'
import Products from './pages/Products'
import ManageOrderUser from './pages/ManageOrderUser'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ResetPassword from './pages/ResetPassword'
import ContactUs from './pages/AboutUs'
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
      <Route path={routes.RESETPASSWORD} element={<ResetPassword />} />
      <Route element={<DefaultLayout />}>
        <Route path={routes.HOME} element={<Home />} />
        <Route path={routes.DETAILPRODUCT} element={<DetailProduct />} />
        <Route path={routes.NEWPRODUCTS} element={<NewProducts />} />
        <Route path={routes.TRYON} element={<TryOn />} />
        <Route path={routes.PROFILE} element={<Profile />} />
        <Route path={routes.PRODUCT} element={<Products />} />
        <Route path={routes.ORDERTRACKING} element={<ManageOrderUser />} />
        <Route path={routes.CART} element={<Cart />} />
        <Route path={routes.CHECKOUT} element={<Checkout />} />
        <Route path={routes.CONTACTUS} element={<ContactUs />} />
      </Route>
      <Route element={<LayoutForAmin />}>
        <Route path={routes.MANAGEORDER} element={<ManageOder />} />
        <Route path={routes.MANAGEPRODUCT} element={<ManageProduct />} />
      </Route>
    </Routes>
  )
}

export default App
