import Image from 'next/image'
import Link from 'next/link'
import PageBanner from '@/components/PageBanner'

export default function CharlasConferenciasPage() {
  return (
    <>
      <PageBanner 
        title="Charlas, conferencias y entrevistas"
        subtitle="Espacios de diálogo y encuentro intelectual"
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
                Charlas, Conferencias y Entrevistas
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Espacios de reflexión y diálogo donde la comunidad monserratense comparte 
                conocimientos, experiencias y visiones del mundo.
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
                  Esta sección contendrá registros de las actividades de diálogo e intercambio 
                  intelectual de nuestra comunidad. Aquí encontrarás:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#5e1415] mr-2">•</span>
                    Videos y audios de conferencias magistrales
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#5e1415] mr-2">•</span>
                    Entrevistas a egresados destacados
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#5e1415] mr-2">•</span>
                    Charlas sobre diversos temas de actualidad
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#5e1415] mr-2">•</span>
                    Mesas redondas y debates
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#5e1415] mr-2">•</span>
                    Presentaciones de libros y proyectos
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#faf8f3] rounded-lg p-6">
                  <div className="text-3xl mb-3">🎤</div>
                  <h4 className="text-lg font-semibold text-[#5e1415] mb-3">
                    Conferencias
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Presentaciones magistrales de expertos en diversas áreas del conocimiento, 
                    abordando temas de relevancia académica y social.
                  </p>
                </div>

                <div className="bg-[#faf8f3] rounded-lg p-6">
                  <div className="text-3xl mb-3">💬</div>
                  <h4 className="text-lg font-semibold text-[#5e1415] mb-3">
                    Entrevistas
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Conversaciones íntimas con egresados que han destacado en sus respectivas 
                    profesiones y han contribuido al desarrollo de la sociedad.
                  </p>
                </div>
              </div>

              <div className="bg-[#faf8f3] rounded-lg p-6">
                <h4 className="text-lg font-semibold text-[#5e1415] mb-3">
                  ¿Tienes una propuesta?
                </h4>
                <p className="text-gray-600 mb-4">
                  Si tienes una idea para una charla, conferencia o te gustaría participar 
                  en nuestros espacios de diálogo, nos encantaría conocer tu propuesta.
                </p>
                <Link 
                  href="/contacto" 
                  className="inline-flex items-center text-[#5e1415] hover:text-[#7a1a1c] font-medium transition-colors"
                >
                  Enviar propuesta
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
