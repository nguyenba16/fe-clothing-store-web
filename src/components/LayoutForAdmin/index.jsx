import { Outlet } from 'react-router-dom'
import SibarOfAdmin from '../layouts/Admin/SideBarOfAdminPages'
import HeaderOfAdmin from '../layouts/Admin/HeaderofAdmin'

export default function LayoutForAmin() {
  return (
    <div className='flex h-screen'>
      <SibarOfAdmin />
      <main className='flex-1 overflow-y-auto ml-0.5'>
        <HeaderOfAdmin />
        <Outlet />
      </main>
    </div>
  )
}
