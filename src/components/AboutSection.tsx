export default function AboutSection() {
  return (
    <>
      {/* Título Siempre Monserratenses */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#5e1415]" style={{ fontFamily: 'Lora, Georgia, serif' }}>
              Siempre Monserratenses
            </h2>
          </div>
        </div>
      </section>

      {/* Sección Sobre Nosotros con fondo */}
      <section 
        className="relative py-20 md:py-15"
        style={{
          backgroundImage: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0) 100%), url(/images/fachada-monserrat.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        {/* Divider decorativo ondulado */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ lineHeight: 0 }}>
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            style={{ 
              width: '100%', 
              height: '80px',
              transform: 'scaleX(-1)'
            }}
          >
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'rgba(94, 20, 21, 0)', stopOpacity: 0 }} />
                <stop offset="50%" style={{ stopColor: 'rgba(94, 20, 21, 0.3)', stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: 'rgba(94, 20, 21, 1)', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <path 
              d="M0,0 C150,60 350,0 600,40 C850,80 1050,20 1200,60 L1200,120 L0,120 Z" 
              fill="url(#waveGradient)"
            />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-xl max-w-lg">
              <p className="text-xl md:text-2xl leading-loose mb-4" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Somos una Asociación formada por ex estudiantes del Colegio Nacional de Monserrat con el propósito de darle una visibilidad institucional al estamento y trabajar en la extensión de su legado humanista.
              </p>
              <p className="text-xl md:text-2xl leading-loose mb-4" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Nuestro compromiso es acompañar y brindar respuestas concretas a las necesidades de los compañeros fortaleciendo los lazos que nos unen. Todo lo que hacemos es posible gracias al apoyo y a la colaboración activa de los egresados.
              </p>
              <p className="text-xl md:text-2xl leading-loose mb-6" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Los invitamos a sumarse a este proyecto colectivo que nos convoca a trabajar juntos con entusiasmo y solidaridad por un futuro compartido.
              </p>
              
              <div className="flex flex-col gap-3">
                <a
                  href="/carta-fundacional"
                  className="block bg-[#ebe4d3] text-[#625352] px-8 py-4 rounded-lg font-semibold uppercase tracking-wider hover:bg-[#625352] hover:text-[#ebe4d3] transition-all duration-300 text-center"
                  style={{ fontFamily: 'Oswald, sans-serif', fontSize: '14px', letterSpacing: '2px' }}
                >
                  Carta Fundacional
                </a>
                <a
                  href="/carta-abierta-a-los-egresados"
                  className="block bg-[#ebe4d3] text-[#625352] px-8 py-4 rounded-lg font-semibold uppercase tracking-wider hover:bg-[#625352] hover:text-[#ebe4d3] transition-all duration-300 text-center"
                  style={{ fontFamily: 'Oswald, sans-serif', fontSize: '14px', letterSpacing: '2px' }}
                >
                  Carta Abierta a los Egresados
                </a>
              </div>
            </div>
            
            <div className="hidden md:block">
              {/* Espacio para imagen o decoración */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
