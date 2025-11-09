'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Image from 'next/image'

interface EventPopupProps {
  event: {
    id: number
    titulo: string
    descripcion: string
    fecha: string
    imagen?: {
      url: string
      alternativeText?: string
    }
    link?: string
    activo: boolean
  } | null
}

export default function EventPopup({ event }: EventPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    console.log('📋 EventPopup recibió evento:', event)
    // Detectar si es móvil
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Verificar si el popup ya fue cerrado hoy
    if (event && event.activo) {
      const closedDate = localStorage.getItem(`popup-closed-${event.id}`)
      const today = new Date().toDateString()
      
      if (closedDate !== today) {
        // Mostrar popup después de 1 segundo
        const timer = setTimeout(() => {
          setIsOpen(true)
        }, 1000)
        
        return () => {
          clearTimeout(timer)
          window.removeEventListener('resize', checkMobile)
        }
      }
    }

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [event])

  const handleClose = () => {
    if (event) {
      // Guardar que se cerró hoy
      localStorage.setItem(`popup-closed-${event.id}`, new Date().toDateString())
    }
    
    setIsOpen(false)
    
    // En desktop, minimizar a la esquina
    if (!isMobile) {
      setTimeout(() => {
        setIsMinimized(true)
      }, 300)
    }
  }

  const handleMinimizedClick = () => {
    setIsMinimized(false)
    setIsOpen(true)
  }

  const handleMinimizedClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMinimized(false)
  }

  if (!event || !event.activo) return null

  // Formato de fecha corto
  const formatShortDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleDateString('es-AR', { month: 'short' })
    return `${day} ${month}`
  }

  // Versión minimizada (solo desktop)
  if (isMinimized && !isMobile) {
    return (
      <div
        className="fixed bottom-6 right-6 z-50 cursor-pointer group"
        onClick={handleMinimizedClick}
      >
        <div className="bg-primary text-white rounded-lg shadow-2xl p-4 pr-12 hover:scale-105 transition-transform relative max-w-xs">
          <button
            onClick={handleMinimizedClose}
            className="absolute top-2 right-2 text-white/70 hover:text-white transition-colors"
            aria-label="Cerrar recordatorio"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-full p-2">
              <span className="text-2xl">📅</span>
            </div>
            <div>
              <p className="font-bold text-sm">{event.titulo}</p>
              <p className="text-xs text-white/90">{formatShortDate(event.fecha)}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Modal completo
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scaleIn">
            {/* Botón cerrar */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-colors shadow-lg"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>

            {/* Contenido */}
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Imagen */}
              {event.imagen && (
                <div className="relative w-full h-64 md:h-80 bg-gray-100">
                  <Image
                    src={event.imagen.url}
                    alt={event.imagen.alternativeText || event.titulo}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Información */}
              <div className="p-6 md:p-8">
                {/* Fecha destacada */}
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                  <span className="text-xl">📅</span>
                  <span className="font-bold">
                    {new Date(event.fecha).toLocaleDateString('es-AR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                {/* Título */}
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                  {event.titulo}
                </h2>

                {/* Descripción */}
                <div className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                  {event.descripcion}
                </div>

                {/* Botón de acción */}
                {event.link && (
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 rounded-lg transition-colors"
                  >
                    Más información
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
