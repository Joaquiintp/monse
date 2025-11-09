import Image from 'next/image'
import Link from 'next/link'
import PageBanner from '@/components/PageBanner'

export default function NuestrosPasosPage() {
  return (
    <>
      <PageBanner 
        title="Nuestros pasos"
        subtitle="Registro y memoria de nuestra comunidad"
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
                Nuestros Pasos
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Cada paso que damos como comunidad deja una huella. Aquí documentamos 
                nuestro caminar, nuestros encuentros y los momentos que nos definen.
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
                  En esta sección encontrarás el registro de nuestras actividades, 
                  eventos y momentos significativos. Incluirá:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#5e1415] mr-2">•</span>
                    Crónicas de eventos y encuentros
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#5e1415] mr-2">•</span>
                    Fotografías y videos de actividades
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#5e1415] mr-2">•</span>
                    Testimonios de participantes
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#5e1415] mr-2">•</span>
                    Línea de tiempo de la comunidad
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#5e1415] mr-2">•</span>
                    Archivo histórico digital
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-[#faf8f3] rounded-lg p-6 text-center">
                  <div className="text-4xl mb-3">📸</div>
                  <h4 className="text-lg font-semibold text-[#5e1415] mb-2">
                    Momentos
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Capturas de nuestros encuentros y celebraciones.
                  </p>
                </div>

                <div className="bg-[#faf8f3] rounded-lg p-6 text-center">
                  <div className="text-4xl mb-3">📖</div>
                  <h4 className="text-lg font-semibold text-[#5e1415] mb-2">
                    Historias
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Relatos y testimonios de nuestra comunidad.
                  </p>
                </div>

                <div className="bg-[#faf8f3] rounded-lg p-6 text-center">
                  <div className="text-4xl mb-3">🏛️</div>
                  <h4 className="text-lg font-semibold text-[#5e1415] mb-2">
                    Archivo
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Documentos y registros históricos preservados.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#5e1415] to-[#7a1a1c] rounded-lg p-8 text-white text-center">
                <h4 className="text-xl font-bold mb-4">
                  "Caminar juntos hacia un futuro común"
                </h4>
                <p className="text-white/90 leading-relaxed">
                  Cada paso que damos como comunidad es parte de una historia más grande. 
                  Aquí preservamos esos momentos que nos unen y nos inspiran a seguir adelante 
                  con el espíritu jesuita que nos caracteriza.
                </p>
              </div>

              <div className="bg-[#faf8f3] rounded-lg p-6">
                <h4 className="text-lg font-semibold text-[#5e1415] mb-3">
                  Comparte tus momentos
                </h4>
                <p className="text-gray-600 mb-4">
                  Si tienes fotografías, videos o historias de eventos pasados o recientes 
                  que te gustaría compartir con la comunidad, nos encantaría incluirlos 
                  en nuestro archivo.
                </p>
                <Link 
                  href="/contacto" 
                  className="inline-flex items-center text-[#5e1415] hover:text-[#7a1a1c] font-medium transition-colors"
                >
                  Compartir contenido
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
