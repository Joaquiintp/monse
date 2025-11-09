'use client'

import { useEffect, useState } from 'react'
import PageBanner from '@/components/PageBanner'

export default function ComisionDirectivaPage() {
  const [mounted, setMounted] = useState(false)
  const [actaUrl, setActaUrl] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    
    // Fetch acta from Strapi
    const fetchActa = async () => {
      try {
        const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://strapi.monserratenses.org.ar'
        const endpoint = `${STRAPI_URL}/api/acta?populate=archivo`
        
        console.log('📡 Fetching:', endpoint)
        
        const response = await fetch(endpoint)
        
        console.log('📊 Response status:', response.status)
        
        if (!response.ok) {
          console.error('❌ Error HTTP:', response.status, response.statusText)
          setLoading(false)
          return
        }
        
        const data = await response.json()
        console.log('📦 JSON completo:', data)
        
        if (data && data.data) {
          const actaData = data.data
          console.log('📄 Datos de acta:', actaData)
          
          // El archivo está directamente en data.data.archivo
          if (actaData.archivo && actaData.archivo.url) {
            const fullUrl = `${STRAPI_URL}${actaData.archivo.url}`
            console.log('✅ URL del PDF:', fullUrl)
            setActaUrl(fullUrl)
          } else {
            console.warn('⚠️ No se encontró URL del archivo')
            console.log('Estructura del archivo:', actaData.archivo)
          }
        } else {
          console.warn('⚠️ No hay datos de acta en Strapi')
        }
      } catch (error) {
        console.error('❌ Error al obtener acta:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchActa()
  }, [])

  return (
    <>
      <PageBanner 
        title="Comisión Directiva"
        subtitle="Quiénes conducen la Asociación"
        backgroundImage="/images/fuente-patio-menor-monserrat.jpg"
        desktopPosition="center 90%"
        mobilePosition="center 70%"
        overlay={0.2}
        showButton={mounted && !loading}
        buttonText={loading ? "Cargando..." : "Acta Constitutiva"}
        buttonHref={actaUrl}
        buttonDisabled={loading || !actaUrl}
      />

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
                Secretario
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
                Tesorero
              </p>
            </div>

            {/* Jorge Victor Manfredi */}
            <div className="text-center">
              <h3 
                className="text-2xl md:text-3xl font-bold text-[#5e1415] mb-2"
                style={{ fontFamily: 'Lora, Georgia, serif' }}
              >
                Jorge Victor Manfredi
              </h3>
              <p 
                className="text-sm md:text-base text-gray-600 uppercase tracking-wider"
                style={{ fontFamily: 'Barlow, sans-serif', letterSpacing: '2px' }}
              >
                Vocal Titular
              </p>
            </div>

            {/* Diego Javier Lion */}
            <div className="text-center">
              <h3 
                className="text-2xl md:text-3xl font-bold text-[#5e1415] mb-2"
                style={{ fontFamily: 'Lora, Georgia, serif' }}
              >
                Diego Javier Lion
              </h3>
              <p 
                className="text-sm md:text-base text-gray-600 uppercase tracking-wider"
                style={{ fontFamily: 'Barlow, sans-serif', letterSpacing: '2px' }}
              >
                Vocal Suplente
              </p>
            </div>

            {/* Jose Tomas Amaya */}
            <div className="text-center">
              <h3 
                className="text-2xl md:text-3xl font-bold text-[#5e1415] mb-2"
                style={{ fontFamily: 'Lora, Georgia, serif' }}
              >
                Jose Tomas Amaya
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
