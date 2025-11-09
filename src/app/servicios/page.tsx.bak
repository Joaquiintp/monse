'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function ServiciosPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation when component mounts
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  return (
    <>
      {/* Banner Section */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/images/fachada-monserrat.jpg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
      >
        {/* Dark overlay for dramatic effect */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        {/* Content with animation */}
        <div 
          className={`relative z-10 text-center transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Título principal */}
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white px-6"
            style={{ 
              fontFamily: 'Lora, Georgia, serif',
              textShadow: '3px 3px 12px rgba(0,0,0,0.8)',
              lineHeight: '1.2'
            }}
          >
            Servicios
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6" style={{ backgroundColor: '#faf8f3' }}>
        <div className="max-w-6xl mx-auto">
          
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-center"
              style={{ 
                fontFamily: 'Lora, Georgia, serif',
                color: '#5e1415'
              }}
            >
              Nuestros Servicios
            </h2>
            <p 
              className="text-lg md:text-xl leading-relaxed text-center mb-8"
              style={{ 
                fontFamily: 'Lora, Georgia, serif',
                color: '#625352',
                lineHeight: '1.8'
              }}
            >
              La Asociación Civil Duarte y Quirós ofrece diversos servicios para los egresados del Colegio Nacional de Monserrat.
            </p>
          </div>

          {/* Grid de servicios */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Servicio 1 - LibeRed */}
            <a href="/libered" className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer block">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#5e1415] mb-4 mx-auto text-3xl">
                💳
              </div>
              <p 
                className="text-center"
                style={{ fontFamily: 'Lora, Georgia, serif', color: '#625352', lineHeight: '1.6' }}
              >
                Tarjeta de beneficios con descuentos en más de 50 comercios.
              </p>
            </a>

            {/* Servicio 2 */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#5e1415] text-white mb-4 mx-auto">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 
                className="text-xl font-bold text-center mb-3"
                style={{ fontFamily: 'Lora, Georgia, serif', color: '#5e1415' }}
              >
                Eventos
              </h3>
              <p 
                className="text-center"
                style={{ fontFamily: 'Lora, Georgia, serif', color: '#625352', lineHeight: '1.6' }}
              >
                Organización de encuentros y actividades para egresados.
              </p>
            </div>

            {/* Servicio 3 - Tienda del Duende */}
            <a href="/tienda" className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer block">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#5e1415] text-white mb-4 mx-auto">
                <span className="text-3xl">🧙</span>
              </div>
              <h3 
                className="text-xl font-bold text-center mb-3"
                style={{ fontFamily: 'Lora, Georgia, serif', color: '#5e1415' }}
              >
                Tienda del Duende
              </h3>
              <p 
                className="text-center"
                style={{ fontFamily: 'Lora, Georgia, serif', color: '#625352', lineHeight: '1.6' }}
              >
                Vinos exclusivos y productos de la Asociación.
              </p>
            </a>

            {/* Servicio 4 */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#5e1415] text-white mb-4 mx-auto">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 
                className="text-xl font-bold text-center mb-3"
                style={{ fontFamily: 'Lora, Georgia, serif', color: '#5e1415' }}
              >
                Publicaciones
              </h3>
              <p 
                className="text-center"
                style={{ fontFamily: 'Lora, Georgia, serif', color: '#625352', lineHeight: '1.6' }}
              >
                Boletines y material informativo para la comunidad.
              </p>
            </div>

            {/* Servicio 5 */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#5e1415] text-white mb-4 mx-auto">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 
                className="text-xl font-bold text-center mb-3"
                style={{ fontFamily: 'Lora, Georgia, serif', color: '#5e1415' }}
              >
                Red de Contactos
              </h3>
              <p 
                className="text-center"
                style={{ fontFamily: 'Lora, Georgia, serif', color: '#625352', lineHeight: '1.6' }}
              >
                Conectamos egresados de todas las generaciones.
              </p>
            </div>

            {/* Servicio 6 - Biblioteca */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#5e1415] text-white mb-4 mx-auto">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 
                className="text-xl font-bold text-center mb-3"
                style={{ fontFamily: 'Lora, Georgia, serif', color: '#5e1415' }}
              >
                Biblioteca
              </h3>
              <p 
                className="text-center"
                style={{ fontFamily: 'Lora, Georgia, serif', color: '#625352', lineHeight: '1.6' }}
              >
                Acceso a material histórico y académico del Monserrat.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
