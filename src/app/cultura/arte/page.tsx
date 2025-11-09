import Image from 'next/image'
import Link from 'next/link'
import PageBanner from '@/components/PageBanner'

export default function ArtePage() {
  return (
    <>
      <PageBanner 
        title="Arte"
        subtitle="Expresiones artísticas de la comunidad monserratense"
        backgroundImage="/images/aniversario-335.jpg"
      />

      <section className="py-16 md:py-24 bg-[#faf8f3]">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back button */}
          <Link 
            href="/cultura" 
            className="inline-flex items-center text-[#5e1415] hover:text-[#7a1a1c] mb-8 transition-colors"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
            Volver a Cultura
          </Link>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 
                className="text-3xl md:text-4xl font-bold mb-6 text-[#5e1415]"
                style={{ fontFamily: 'Lora, Georgia, serif' }}
              >
                Arte Monserratense
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                El arte como expresión del espíritu jesuita. Aquí encontrarás las obras, 
                exposiciones y manifestaciones artísticas de nuestra comunidad.
              </p>
            </div>

            {/* Contenido temporal - placeholder para futuras conexiones con Strapi */}
            <div className="space-y-8">
              <div className="border-l-4 border-[#5e1415] pl-6">
                <h3 
                  className="text-xl font-bold mb-3 text-[#5e1415]"
                  style={{ fontFamily: 'Lora, Georgia, serif' }}
                >
                  Próximamente
                </h3>
                <p className="text-gray-600">
                  Esta sección estará próximamente disponible con exposiciones, galerías de arte 
                  y obras de la comunidad monserratense. Aquí podrás encontrar:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#5e1415] mr-2">•</span>
                    Exposiciones de arte realizadas por egresados
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#5e1415] mr-2">•</span>
                    Galerías de fotografías de eventos culturales
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#5e1415] mr-2">•</span>
                    Obras literarias y poéticas
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#5e1415] mr-2">•</span>
                    Manifestaciones artísticas diversas
                  </li>
                </ul>
              </div>

              <div className="bg-[#faf8f3] rounded-lg p-6">
                <h4 className="text-lg font-semibold text-[#5e1415] mb-3">
                  ¿Eres artista monserratense?
                </h4>
                <p className="text-gray-600 mb-4">
                  Si eres egresado del Colegio Nacional de Monserrat y tienes obras que te gustaría 
                  compartir con la comunidad, no dudes en contactarnos.
                </p>
                <Link 
                  href="/contacto" 
                  className="inline-flex items-center text-[#5e1415] hover:text-[#7a1a1c] font-medium transition-colors"
                >
                  Contáctanos
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
