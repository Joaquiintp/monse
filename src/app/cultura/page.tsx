import Image from 'next/image'
import Link from 'next/link'
import PageBanner from '@/components/PageBanner'

export default function CulturaPage() {
  const culturaServices = [
    {
      title: "Arte",
      description: "Exposiciones, obras y manifestaciones artísticas de la comunidad monserratense.",
      icon: "🎨",
      href: "/cultura/arte",
      image: "/images/aniversario-335.jpg"
    },
    {
      title: "Charlas, conferencias y entrevistas", 
      description: "Espacios de diálogo, reflexión y encuentro intelectual entre egresados y la comunidad.",
      icon: "🎤",
      href: "/cultura/charlas-conferencias",
      image: "/images/aniversario-335.jpg"
    },
    {
      title: "Nuestros pasos",
      description: "Registro y memoria de las actividades, eventos y momentos significativos de nuestra comunidad.",
      icon: "👣",
      href: "/cultura/nuestros-pasos", 
      image: "/images/aniversario-335.jpg"
    }
  ]

  return (
    <>
      <PageBanner 
        title="Cultura"
        subtitle="Espacios de expresión, diálogo y memoria de la comunidad monserratense"
        backgroundImage="/images/aniversario-335.jpg"
      />

      <section className="py-16 md:py-24 bg-[#faf8f3]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-[#5e1415]"
              style={{ fontFamily: 'Lora, Georgia, serif' }}
            >
              Cultura Monserratense
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              La cultura es el alma de nuestra comunidad. A través del arte, el diálogo y la memoria, 
              construimos puentes entre generaciones y mantenemos vivo el espíritu jesuita que nos une.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {culturaServices.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4 text-4xl bg-white/90 rounded-full w-16 h-16 flex items-center justify-center">
                    {service.icon}
                  </div>
                </div>

                <div className="p-6">
                  <h3 
                    className="text-xl font-bold mb-3 text-[#5e1415] group-hover:text-[#7a1a1c] transition-colors"
                    style={{ fontFamily: 'Lora, Georgia, serif' }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center text-[#5e1415] font-medium text-sm">
                    <span>Explorar</span>
                    <svg 
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Sección adicional inspiracional */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
            <h3 
              className="text-2xl md:text-3xl font-bold mb-6 text-[#5e1415]"
              style={{ fontFamily: 'Lora, Georgia, serif' }}
            >
              "La educación es el arma más poderosa que puedes usar para cambiar el mundo"
            </h3>
            <p className="text-gray-600 italic text-lg">
              En cada expresión cultural, en cada encuentro, en cada paso que damos, 
              honramos el legado jesuita y construimos el futuro de nuestra comunidad.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
