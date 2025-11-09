'use client'

import PageBanner from '@/components/PageBanner'

export default function MisionVisionValoresPage() {
  return (
    <>
      <PageBanner 
        title="Misión, Visión y Valores"
        subtitle="Quiénes somos"
        backgroundImage="/images/patio-monserrat.jpg"
        desktopPosition="center center"
        mobilePosition="center 30%"
        overlay={0.2}
      />

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
