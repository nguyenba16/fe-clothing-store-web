import Header from '../layouts/Header'
import Footer from '../layouts/Footer'
import { Outlet } from 'react-router-dom'

export default function DefaultLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
