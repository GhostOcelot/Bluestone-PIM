import { Outlet } from "react-router"
import { ToastContainer } from "react-toastify"

const Layout = () => (
  <main className="m-4">
    <Outlet />
    <ToastContainer position="bottom-center" />
  </main>
)

export default Layout
