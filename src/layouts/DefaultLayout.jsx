import { Outlet } from 'react-router-dom'
import Footer from '../components/layouts/Footer'
import Header from '../components/layouts/Header'
import ChatBox from '../components/layouts/ChatBox'

export default function DefaultLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <ChatBox />
      <Footer />
    </div>
  )
}
