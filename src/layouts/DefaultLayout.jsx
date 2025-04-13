import { Outlet } from 'react-router-dom'
import Footer from '../components/layouts/Footer'
import Header from '../components/layouts/Header'

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
