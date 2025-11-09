'use client'

import { useEffect, useState } from 'react'

export default function ComisionDirectivaPage() {
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
          backgroundImage: 'url(/images/fuente-patio-menor-monserrat.jpg)',
          backgroundSize: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center 90%',
        }}
      >
        {/* Dark overlay for dramatic effect */}
        <div className="absolute inset-0 bg-black bg-opacity-25"></div>
        
        {/* Content with animation */}
        <div 
          className={`relative z-10 text-center transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Leyenda superior */}
          <p 
            className="text-sm md:text-base font-semibold text-white mb-4 uppercase tracking-wider"
            style={{ 
              fontFamily: 'Barlow, sans-serif',
              textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
              letterSpacing: '3px'
            }}
          >
            Quiénes somos
          </p>

          {/* Título principal */}
          <h1 
            className="text-6xl md:text-7xl font-bold text-white mb-8"
            style={{ 
              fontFamily: 'Lora, Georgia, serif',
              textShadow: '3px 3px 10px rgba(0,0,0,0.8)'
            }}
          >
            Comisión Directiva
          </h1>

          {/* Cápsula Acta Constitutiva */}
          <a
            href="http://localhost:1337/uploads/Acta_Constitutiva_b4140e9e34.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#ebe4d3] text-[#625352] px-8 py-3 rounded-full font-semibold uppercase tracking-wider hover:bg-[#625352] hover:text-[#ebe4d3] transition-all duration-300"
            style={{ 
              fontFamily: 'Oswald, sans-serif', 
              fontSize: '14px', 
              letterSpacing: '2px'
            }}
          >
            Acta Constitutiva
          </a>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-32 bg-[#faf8f3]">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-8">
            {/* Adrián Guillermo Rodríguez */}
            <div className="text-center">
              <h3 
                className="text-2xl md:text-3xl font-bold text-[#5e1415] mb-2"
                style={{ fontFamily: 'Lora, Georgia, serif' }}
              >
                Adrián Guillermo Rodríguez
              </h3>
              <p 
                className="text-sm md:text-base text-gray-600 uppercase tracking-wider"
                style={{ fontFamily: 'Barlow, sans-serif', letterSpacing: '2px' }}
              >
                Presidente
              </p>
            </div>

            {/* Jorge Alberto López */}
            <div className="text-center">
              <h3 
                className="text-2xl md:text-3xl font-bold text-[#5e1415] mb-2"
                style={{ fontFamily: 'Lora, Georgia, serif' }}
              >
                Jorge Alberto López
              </h3>
              <p 
                className="text-sm md:text-base text-gray-600 uppercase tracking-wider"
                style={{ fontFamily: 'Barlow, sans-serif', letterSpacing: '2px' }}
              >
                Secretario
              </p>
            </div>

            {/* Carla López Micieli */}
            <div className="text-center">
              <h3 
                className="text-2xl md:text-3xl font-bold text-[#5e1415] mb-2"
                style={{ fontFamily: 'Lora, Georgia, serif' }}
              >
                Carla López Micieli
              </h3>
              <p 
                className="text-sm md:text-base text-gray-600 uppercase tracking-wider"
                style={{ fontFamily: 'Barlow, sans-serif', letterSpacing: '2px' }}
              >
                Tesorera
              </p>
            </div>

            {/* Jorge Martín Giménez */}
            <div className="text-center">
              <h3 
                className="text-2xl md:text-3xl font-bold text-[#5e1415] mb-2"
                style={{ fontFamily: 'Lora, Georgia, serif' }}
              >
                Jorge Martín Giménez
              </h3>
              <p 
                className="text-sm md:text-base text-gray-600 uppercase tracking-wider"
                style={{ fontFamily: 'Barlow, sans-serif', letterSpacing: '2px' }}
              >
                Vocal Titular
              </p>
            </div>

            {/* Antonio Luis Rodríguez */}
            <div className="text-center">
              <h3 
                className="text-2xl md:text-3xl font-bold text-[#5e1415] mb-2"
                style={{ fontFamily: 'Lora, Georgia, serif' }}
              >
                Antonio Luis Rodríguez
              </h3>
              <p 
                className="text-sm md:text-base text-gray-600 uppercase tracking-wider"
                style={{ fontFamily: 'Barlow, sans-serif', letterSpacing: '2px' }}
              >
                Vocal Suplente
              </p>
            </div>

            {/* Marcelo Rafael González */}
            <div className="text-center">
              <h3 
                className="text-2xl md:text-3xl font-bold text-[#5e1415] mb-2"
                style={{ fontFamily: 'Lora, Georgia, serif' }}
              >
                Marcelo Rafael González
              </h3>
              <p 
                className="text-sm md:text-base text-gray-600 uppercase tracking-wider"
                style={{ fontFamily: 'Barlow, sans-serif', letterSpacing: '2px' }}
              >
                Revisor de Cuentas Titular
              </p>
            </div>

            {/* Diego Blázquez */}
            <div className="text-center">
              <h3 
                className="text-2xl md:text-3xl font-bold text-[#5e1415] mb-2"
                style={{ fontFamily: 'Lora, Georgia, serif' }}
              >
                Diego Blázquez
              </h3>
              <p 
                className="text-sm md:text-base text-gray-600 uppercase tracking-wider"
                style={{ fontFamily: 'Barlow, sans-serif', letterSpacing: '2px' }}
              >
                Revisor de Cuentas Suplente
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
