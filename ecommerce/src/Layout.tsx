
import React, { useContext } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import CartContext from './CartContext'

const Layout = () => {
  const {cart,setCart} = useContext(CartContext);
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#080b18] text-white">

      {/* Background Glow Effects */}
      <div className="fixed top-[-150px] left-[-100px] w-[400px] h-[400px] bg-purple-600/30 rounded-full blur-[130px] pointer-events-none" />
      <div className="fixed bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-blue-600/30 rounded-full blur-[130px] pointer-events-none" />

      {/* Navbar */}
      <header className="relative z-50 px-5 pt-6">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4
          rounded-2xl border border-white/15
          bg-white/[0.07] backdrop-blur-2xl
          shadow-[0_8px_40px_rgba(0,0,0,0.3)]">

          {/* Logo */}
          <div className="text-2xl font-bold tracking-wide">
            <span className="text-white">Glass</span>
            <span className="text-purple-400">Store.</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 sm:gap-4">

            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                ${isActive
                  ? 'bg-white/15 text-purple-300 shadow-inner'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                ${isActive
                  ? 'bg-white/15 text-purple-300 shadow-inner'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'}`
              }
            >
              About
            </NavLink>

          </div>

          {/* Cart */}
          <Link className="group flex items-center gap-2 px-5 py-2.5
            rounded-xl border border-purple-400/30
            bg-gradient-to-r from-purple-500/20 to-blue-500/20
            hover:from-purple-500/40 hover:to-blue-500/40
            backdrop-blur-xl transition-all duration-300
            hover:scale-105" to={"/cart"}>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-300"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>

            <span className="text-sm font-semibold">Cart</span>

            <span className="flex items-center justify-center w-5 h-5
              rounded-full bg-purple-500 text-white text-xs">
              {cart.length}
            </span>
          </Link>

        </nav>
      </header>

      {/* Page Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-5 py-10">
        <Outlet />
      </main>

    </div>
  )
}

export default Layout
