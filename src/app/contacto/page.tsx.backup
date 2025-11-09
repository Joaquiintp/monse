'use client'

import { useEffect, useState } from 'react'

export default function ContactoPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  useEffect(() => {
    // Trigger animation when component mounts
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contactos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 698c3f8d21316205ced63e9512c3cc11b63690b4fc32d46e1b0973245d59012ea68202c3844a8e36d17957e2dfb8e1e35a664e3b8c06f254a3cf8051750803d02b29a712b0962f07733cb2e17a8f5923eea51ccc62ccbda4d23845e98f4363ac0c6f5703809ef29c0ddc9545823cc46e2c03e024c7d530a275107615e5685501`
        },
        body: JSON.stringify({
          data: formData
        })
      })

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: '¡Gracias por tu mensaje! Te responderemos a la brevedad.'
        })
        setFormData({ nombre: '', email: '', mensaje: '' })
      } else {
        throw new Error('Error al enviar el mensaje')
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente o escríbenos directamente a asociacion@monserratenses.com.ar'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Banner Section */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/images/oficina-asociacion.jpg)',
          backgroundSize: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center 30%',
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
            Estamos cerca, queremos escucharte
          </p>

          {/* Título principal */}
          <h1 
            className="text-6xl md:text-7xl font-bold text-white"
            style={{ 
              fontFamily: 'Lora, Georgia, serif',
              textShadow: '3px 3px 10px rgba(0,0,0,0.8)'
            }}
          >
            Contactános
          </h1>
        </div>
      </section>

      {/* Intro Text Section */}
      <section className="py-16 md:py-20 bg-[#faf8f3]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p 
            className="text-lg md:text-xl text-gray-800 leading-relaxed mb-6"
            style={{ fontFamily: 'Lora, Georgia, serif', lineHeight: '1.8' }}
          >
            Si tenés dudas, sugerencias o querés saber más sobre cómo participar, no dudes en escribirnos. Tu mensaje es importante para seguir fortaleciendo esta red de egresados que comparte historia, valores y futuro.
          </p>
          <p 
            className="text-lg md:text-xl text-gray-800 leading-relaxed"
            style={{ fontFamily: 'Lora, Georgia, serif', lineHeight: '1.8' }}
          >
            Completá el formulario o escribinos a <a href="mailto:asociacion@monserratenses.com.ar" className="text-[#5e1415] font-bold hover:underline">asociacion@monserratenses.com.ar</a>.
          </p>
          <p 
            className="text-2xl md:text-3xl text-[#5e1415] font-bold mt-6"
            style={{ fontFamily: 'Lora, Georgia, serif' }}
          >
            ¡Te esperamos!
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulario de Contacto */}
            <div>
              <h2 
                className="text-3xl md:text-4xl font-bold text-[#5e1415] mb-6"
                style={{ fontFamily: 'Lora, Georgia, serif' }}
              >
                Envianos tu Mensaje
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitStatus && (
                  <div 
                    className={`p-4 rounded-md ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-50 text-green-800 border border-green-200' 
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                    style={{ fontFamily: 'Lora, Georgia, serif' }}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <div>
                  <label 
                    htmlFor="nombre" 
                    className="block text-sm font-bold text-gray-700 mb-2"
                    style={{ fontFamily: 'Barlow, sans-serif' }}
                  >
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5e1415] focus:border-transparent transition-all disabled:bg-gray-100"
                    style={{ fontFamily: 'Lora, Georgia, serif' }}
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-bold text-gray-700 mb-2"
                    style={{ fontFamily: 'Barlow, sans-serif' }}
                  >
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5e1415] focus:border-transparent transition-all disabled:bg-gray-100"
                    style={{ fontFamily: 'Lora, Georgia, serif' }}
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="mensaje" 
                    className="block text-sm font-bold text-gray-700 mb-2"
                    style={{ fontFamily: 'Barlow, sans-serif' }}
                  >
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5e1415] focus:border-transparent transition-all resize-none disabled:bg-gray-100"
                    style={{ fontFamily: 'Lora, Georgia, serif' }}
                    placeholder="Escribí tu mensaje aquí..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#5e1415] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#7a1a1c] transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                  style={{ fontFamily: 'Barlow, sans-serif', letterSpacing: '1px' }}
                >
                  {isSubmitting ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
                </button>
              </form>
            </div>

            {/* Mapa */}
            <div>
              <h2 
                className="text-3xl md:text-4xl font-bold text-[#5e1415] mb-6"
                style={{ fontFamily: 'Lora, Georgia, serif' }}
              >
                Ubicación
              </h2>
              
              <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg mb-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d851.1737103867914!2d-64.18999872920865!3d-31.420116597489748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a28c4566edf1%3A0x5f8b4c3e1a2d6c7e!2sObispo%20Trejo%20219%2C%20X5000IYF%20C%C3%B3rdoba!5e1!3m2!1ses!2sar!4v1729177500000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de la Asociación - Obispo Trejo 219"
                ></iframe>
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* Datos de Contacto - Sección Final */}
      <section className="py-16 bg-[#faf8f3]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Teléfono & Email */}
            <div className="text-center">
              <h3 
                className="font-bold text-xl md:text-2xl mb-4 text-[#5e1415]" 
                style={{ fontFamily: 'Barlow, sans-serif', textTransform: 'uppercase', letterSpacing: '2px' }}
              >
                Teléfono & Email
              </h3>
              <p className="text-gray-700 text-lg md:text-xl mb-2" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                <a href="tel:+5493514329890" className="hover:text-[#5e1415] transition-colors">
                  +54 9 351 432-9890
                </a>
              </p>
              <p className="text-gray-700 text-lg md:text-xl" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                <a href="mailto:asociacion@monserratenses.org.ar" className="hover:text-[#5e1415] transition-colors">
                  asociacion@monserratenses.org.ar
                </a>
              </p>
            </div>

            {/* Horario */}
            <div className="text-center">
              <h3 
                className="font-bold text-xl md:text-2xl mb-4 text-[#5e1415]" 
                style={{ fontFamily: 'Barlow, sans-serif', textTransform: 'uppercase', letterSpacing: '2px' }}
              >
                Horario
              </h3>
              <p className="text-gray-700 text-lg md:text-xl mb-2" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                Lunes a viernes
              </p>
              <p className="text-gray-700 text-lg md:text-xl" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                9:00 a 19:00 h
              </p>
            </div>

            {/* Dirección */}
            <div className="text-center">
              <h3 
                className="font-bold text-xl md:text-2xl mb-4 text-[#5e1415]" 
                style={{ fontFamily: 'Barlow, sans-serif', textTransform: 'uppercase', letterSpacing: '2px' }}
              >
                Dirección
              </h3>
              <p className="text-gray-700 text-lg md:text-xl mb-2" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                Obispo Trejo 219 – Piso 1 – Of. 103
              </p>
              <p className="text-gray-700 text-lg md:text-xl" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                Córdoba, Argentina
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
