'use client'

import { useState } from 'react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)

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
        message: 'Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contacto"
      className="py-20 md:py-32 relative"
      style={{
        backgroundImage: 'linear-gradient(180deg, #5e1415 25%, rgba(94,20,21,0) 100%), url(/images/techo-monserrat.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundColor: '#915c4f',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center" style={{ fontFamily: 'Lora, Georgia, serif' }}>
            Contacto
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {submitStatus && (
              <div 
                className={`p-4 rounded-lg ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                    : 'bg-red-100 text-red-800 border-2 border-red-300'
                }`}
                style={{ fontFamily: 'Lora, Georgia, serif' }}
              >
                {submitStatus.message}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nombre" className="block text-white mb-2" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  placeholder="Nombre"
                  className="w-full px-4 py-3 rounded-lg bg-white text-[#625352] placeholder-[#625352] focus:outline-none focus:ring-2 focus:ring-[#ebe4d3] disabled:bg-gray-200"
                  style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '16px' }}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white mb-2" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  placeholder="Correo electrónico"
                  className="w-full px-4 py-3 rounded-lg bg-white text-[#625352] placeholder-[#625352] focus:outline-none focus:ring-2 focus:ring-[#ebe4d3] disabled:bg-gray-200"
                  style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '16px' }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="mensaje" className="block text-white mb-2" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                placeholder="Mensaje"
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-white text-[#625352] placeholder-[#625352] focus:outline-none focus:ring-2 focus:ring-[#ebe4d3] resize-vertical disabled:bg-gray-200"
                style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '16px' }}
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#625352] text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-[#ebe4d3] hover:text-[#625352] border-2 border-[#625352] hover:border-[#625352] transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:border-gray-400"
                style={{ fontFamily: 'Abel, sans-serif', fontSize: '18px' }}
              >
                {isSubmitting ? 'ENVIANDO...' : 'ENVIAR'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
