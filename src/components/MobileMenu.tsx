'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { href: '/', label: 'Inicio' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/contacto', label: 'Contacto' },
    { href: '/mision-vision-valores', label: 'Misión, visión, valores' },
    { href: '/carta-abierta-a-los-egresados', label: 'Carta Abierta a los Egresados' },
    { href: '/carta-fundacional', label: 'Carta Fundacional' },
    { href: '/monserratenses-por-el-mundo', label: 'Monserratenses por el Mundo' },
    { href: '/noticias', label: 'Noticias' },
    { href: '/comision-directiva', label: 'Comisión Directiva' },
    { href: '/libered', label: 'Tarjeta de Beneficios', icon: '🎴' },
  ]

  return (
    <>
      {/* Hamburger Button */}
      <button
        id="open-button"
        className={`hamburger menu-button fixed top-5 right-5 z-[99999] lg:hidden bg-secondary rounded-full w-[60px] h-[60px] shadow-lg transition-all ${
          isOpen ? 'is-active' : ''
        }`}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span className="hamburger-box flex items-center justify-center">
          <span className="hamburger-inner relative block w-[27px] h-[3px] bg-white rounded-[4px] transition-all">
            <span 
              className={`absolute left-0 w-full h-full bg-white rounded-[4px] transition-all ${
                isOpen ? 'rotate-45 top-0' : '-top-[8px]'
              }`}
            ></span>
            <span 
              className={`absolute left-0 w-full h-full bg-white rounded-[4px] transition-all ${
                isOpen ? '-rotate-45 bottom-0' : '-bottom-[8px]'
              }`}
            ></span>
          </span>
        </span>
      </button>

      {/* Menu Overlay */}
      <div
        id="dm_nav"
        className={`menu-wrap fixed top-0 right-0 h-screen bg-black z-[9999] transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0 w-[300px]' : 'translate-x-full w-0'
        }`}
      >
        <div className="menu-wrap__inner pt-20 px-6 overflow-y-auto h-full">
          <nav className="menu-side">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li 
                  key={item.href}
                  className="border-b border-white/20 pb-3 mb-3 last:border-b-0"
                >
                  <Link
                    href={item.href}
                    className="block text-white text-sm py-3 hover:text-gray-300 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[9998] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
