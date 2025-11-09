'use client'

import PageBanner from '@/components/PageBanner'

export default function MonserratensesPorElMundoPage() {
  return (
    <>
      <PageBanner 
        title="Monserratenses por el mundo"
        backgroundImage="/images/monserratenses-por-el-mundo-2.jpg"
        desktopPosition="center center"
        mobilePosition="center 40%"
        overlay={0.2}
      />

      {/* Content Section */}
      <section className="py-16 px-6" style={{ backgroundColor: '#faf8f3' }}>
        <div className="max-w-5xl mx-auto">
          
          {/* Contenido placeholder - aquí irá el contenido específico */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <p 
              className="text-lg md:text-xl leading-relaxed text-center"
              style={{ 
                fontFamily: 'Lora, Georgia, serif',
                color: '#625352',
                lineHeight: '1.8'
              }}
            >
              Contenido en desarrollo...
            </p>
          </div>

        </div>
      </section>
    </>
  )
}
