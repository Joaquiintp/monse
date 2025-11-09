'use client'

import { useEffect, useState } from 'react'

export default function MisionVisionValoresPage() {
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
          backgroundImage: 'url(/images/patio-monserrat.jpg)',
          backgroundSize: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
      >
        {/* Dark overlay for dramatic effect */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white px-6"
            style={{ 
              fontFamily: 'Lora, Georgia, serif',
              textShadow: '3px 3px 12px rgba(0,0,0,0.8)',
              lineHeight: '1.2'
            }}
          >
            Misión, Visión y Valores
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6" style={{ backgroundColor: '#faf8f3' }}>
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Misión */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 transform transition-all duration-300 hover:shadow-xl">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-center"
              style={{ 
                fontFamily: 'Lora, Georgia, serif',
                color: '#5e1415'
              }}
            >
              Misión
            </h2>
            <div 
              className="text-lg md:text-xl leading-relaxed space-y-4"
              style={{ 
                fontFamily: 'Lora, Georgia, serif',
                color: '#625352',
                lineHeight: '1.8'
              }}
            >
              <p>
                Nuestra misión es generar un espacio de participación e integración y cumplir con los objetivos para los que la asociación fue creada.
              </p>
              <p>
                Nos proponemos trabajar en conjunto con todas las promociones que así lo deseen.
              </p>
            </div>
          </div>

          {/* Visión */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 transform transition-all duration-300 hover:shadow-xl">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-center"
              style={{ 
                fontFamily: 'Lora, Georgia, serif',
                color: '#5e1415'
              }}
            >
              Visión
            </h2>
            <div 
              className="text-lg md:text-xl leading-relaxed space-y-4"
              style={{ 
                fontFamily: 'Lora, Georgia, serif',
                color: '#625352',
                lineHeight: '1.8'
              }}
            >
              <p>
                Buscamos consolidarnos como una asociación que refleje el pensamiento de todas las promociones consustanciadas con el legado recibido del colegio en nuestra juventud.
              </p>
              <p>
                Pretendemos llevar adelante una gestión transparente que genere la confianza y la credibilidad en nuestras acciones e intenciones.
              </p>
            </div>
          </div>

          {/* Valores */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 transform transition-all duration-300 hover:shadow-xl">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-center"
              style={{ 
                fontFamily: 'Lora, Georgia, serif',
                color: '#5e1415'
              }}
            >
              Valores
            </h2>
            <p 
              className="text-lg md:text-xl leading-relaxed"
              style={{ 
                fontFamily: 'Lora, Georgia, serif',
                color: '#625352',
                lineHeight: '1.8'
              }}
            >
              Son nuestros valores: El compromiso secular con la comunidad monserratense; el ser una entidad autónoma que cumple su misión sin distinción de sexo, raza o religión; la coherencia de nuestras acciones con nuestros fines; la transparencia, el esfuerzo y la ética de la gestión; la búsqueda permanente y continua del bien común para nuestros integrantes. La confidencialidad y protección de la información y de los datos de nuestros asociados.
            </p>
          </div>

        </div>
      </section>
    </>
  )
}
