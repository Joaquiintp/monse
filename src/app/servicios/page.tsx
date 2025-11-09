'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import PageBanner from '@/components/PageBanner'

export default function ServiciosPage() {
  return (
    <>
      <PageBanner 
        title="Servicios"
        backgroundImage="/images/fachada-monserrat.jpg"
        desktopPosition="center center"
        mobilePosition="center 20%"
        overlay={0.2}
      />

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
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Red LibeRed */}
            <a href="/libered" className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer block">
              <div className="flex items-center justify-center mb-6 mx-auto">
                <Image
                  src="/images/redliber.svg"
                  alt="Red LibeRed"
                  width={250}
                  height={80}
                  className="max-w-full h-auto"
                />
              </div>
              <h3 
                className="text-2xl font-bold text-center mb-4"
                style={{ fontFamily: 'Lora, Georgia, serif', color: '#5e1415' }}
              >
                Red LibeRed
              </h3>
              <p 
                className="text-center text-lg"
                style={{ fontFamily: 'Lora, Georgia, serif', color: '#625352', lineHeight: '1.8' }}
              >
                Tarjeta de beneficios con descuentos en más de 50 comercios. Accedé a promociones exclusivas para asociados.
              </p>
            </a>

            {/* Tienda del Duende */}
            <a href="/tienda" className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer block">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#5e1415] text-white mb-6 mx-auto">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 
                className="text-2xl font-bold text-center mb-4"
                style={{ fontFamily: 'Lora, Georgia, serif', color: '#5e1415' }}
              >
                Tienda del Duende
              </h3>
              <p 
                className="text-center text-lg"
                style={{ fontFamily: 'Lora, Georgia, serif', color: '#625352', lineHeight: '1.8' }}
              >
                Productos exclusivos del Monserrat: vinos, merchandising y más. Llevá un pedacito del cole con vos.
              </p>
            </a>
          </div>

        </div>
      </section>
    </>
  )
}
