'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Menu items para MOBILE - Orden actualizado
  const mobileMenuItems = [
    { href: '/', label: 'Inicio' },
    { href: '/noticias', label: 'Noticias' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/tienda', label: 'Tienda del Duende' },
    { href: '/libered#tarjeta', label: 'Tarjeta de beneficios' },
    { href: '/monserratenses-por-el-mundo', label: 'Monserratenses por el mundo' },
    { href: '/carta-abierta-a-los-egresados', label: 'Carta Abierta a los Egresados' },
    { href: '/mision-vision-valores', label: 'Misión, visión, valores' },
    { href: '/comision-directiva', label: 'Comisión Directiva' },
    { href: '/contacto', label: 'Contacto' },
  ]

  // Menu items para DESKTOP - Orden simplificado
  const desktopMenuItems = [
    { href: '/', label: 'Inicio' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/monserratenses-por-el-mundo', label: 'Monserratenses por el mundo' },
    { href: '/noticias', label: 'Noticias' },
    { href: '/tienda', label: 'Tienda del Duende' },
    { href: '/comision-directiva', label: 'Comisión Directiva' },
    { href: '/contacto', label: 'Contacto' },
  ]

  return (
    <header className="et-l et-l--header bg-white shadow-md sticky top-0 z-50 overflow-visible">
      <div className="flex items-center justify-between px-4 overflow-visible" style={{ width: '90%', maxWidth: '1920px', margin: '0 auto', minHeight: '90px', padding: '10px 0' }}>
            {/* Logo Asociación */}
            <div className="et_pb_column flex items-start justify-start" style={{ width: '30%', marginRight: '2%' }}>
              <div className="et_pb_module et_pb_image flex-shrink-0">
                <Link href="/">
                  <span className="et_pb_image_wrap block">
                    <Image 
                      src="/images/logo-asociacion-civil-duarte-y-quiros-1.svg"
                      alt="Asociación Civil Duarte y Quirós"
                      width={355}
                      height={164}
                      className="h-auto"
                      style={{ height: '70px', width: 'auto' }}
                      priority
                    />
                  </span>
                </Link>
              </div>
            </div>

            {/* Logo LibeRed en el medio */}
            <div className="hidden lg:flex items-center justify-start" style={{ width: '18%', paddingLeft: '0', marginLeft: '-300px', marginTop: '6px' }}>
              <Link href="/libered#tarjeta" className="group">
                <Image
                  src="/images/redliber.svg"
                  alt="LibeRed"
                  width={250}
                  height={88}
                  className="w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-110"
                  style={{ maxHeight: '80px' }}
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="et_pb_column hidden lg:block" style={{ width: '53%' }}>
              <nav className="et_pb_menu text-right">
                <ul className="et-menu nav inline-flex justify-end items-center gap-x-3" style={{ maxWidth: '100%', flexWrap: 'wrap' }}>
                  {desktopMenuItems.map((item) => (
                    <li key={item.href} className="inline-block">
                      <Link 
                        href={item.href}
                        className="block text-sm text-gray-600 hover:opacity-70 transition-all duration-400 whitespace-nowrap"
                        style={{ 
                          fontFamily: 'Barlow, Helvetica, Arial, sans-serif',
                          fontSize: '15px',
                          textTransform: 'uppercase',
                          color: 'rgba(0,0,0,0.6)',
                          lineHeight: '1.8'
                        }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5"
              aria-label="Toggle menu"
            >
              <span className={`block w-7 h-0.5 bg-[#5e1415] transition-all duration-300 pointer-events-none ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-7 h-0.5 bg-[#5e1415] transition-all duration-300 pointer-events-none ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-7 h-0.5 bg-[#5e1415] transition-all duration-300 pointer-events-none ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg fixed w-full left-0 top-[90px] z-50">
          <nav className="px-4 py-4">
            <ul className="space-y-2">
              {mobileMenuItems.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    style={{ 
                      fontFamily: 'Barlow, Helvetica, Arial, sans-serif',
                      fontSize: '15px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {item.href === '/libered#tarjeta' ? (
                      <div className="flex items-center gap-3">
                        <Image
                          src="/images/redliber.svg"
                          alt="Red LibeR"
                          width={100}
                          height={35}
                          className="w-auto h-auto object-contain"
                          style={{ maxHeight: '35px' }}
                        />
                        <span>Tarjeta de beneficios</span>
                      </div>
                    ) : (
                      item.label
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
