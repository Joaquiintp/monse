import { getNoticias, getNoticiaImageUrl, getNoticiaExcerpt } from '@/lib/strapi-news'

export default async function NewsSection() {
  let news = []
  let allNews = []
  let error = null

  try {
    allNews = await getNoticias()
    // Obtener solo las primeras 6 noticias (se filtrará en el cliente por responsive)
    news = allNews.slice(0, 6)
  } catch (err) {
    console.error('Error fetching news:', err)
    error = err instanceof Error ? err.message : 'Error desconocido'
  }

  if (error) {
    return (
      <section id="noticias" className="py-20 md:py-32 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#5e1415]" style={{ fontFamily: 'Lora, Georgia, serif' }}>
              Noticias y novedades
            </h2>
          </div>
          <div className="text-center text-red-600">Error al cargar noticias: {error}</div>
        </div>
      </section>
    )
  }

  return (
    <section id="noticias" className="py-20 md:py-32 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#5e1415]" style={{ fontFamily: 'Lora, Georgia, serif' }}>
            Noticias y novedades
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((noticia, index) => {
            const imageUrl = getNoticiaImageUrl(noticia)
            const title = noticia.titulo || 'Sin título'
            const slug = noticia.slug || noticia.documentId
            const parrafo = noticia.parrafo1 || noticia.parrafo2 || ''
            const excerpt = getNoticiaExcerpt(parrafo)
            
            return (
              <article key={noticia.id} className={`group ${index >= 3 ? 'hidden md:block' : ''}`}>
                <a href={`/noticias/${slug}`} className="block">
                  <div className="mb-4 overflow-hidden rounded-2xl h-48 md:h-56">
                    <img
                      src={imageUrl}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold mb-3 group-hover:text-[#5e1415] transition-colors" style={{ fontFamily: 'Barlow, sans-serif' }}>
                    {title}
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base line-clamp-3">
                    {excerpt}
                  </p>
                </a>
              </article>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href="/noticias"
            className="inline-block bg-[#ebe4d3] text-[#625352] px-8 py-3 rounded-full font-semibold uppercase tracking-wider hover:bg-[#625352] hover:text-[#ebe4d3] transition-all duration-300"
            style={{ fontFamily: 'Oswald, sans-serif', fontSize: '16px', letterSpacing: '3px' }}
          >
            Ver más
          </a>
        </div>
      </div>
      
      {/* Divisor de ola */}
      <div className="absolute bottom-0 left-0 right-0" style={{ lineHeight: 0 }}>
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          style={{ 
            width: '100%', 
            height: '100px',
            display: 'block'
          }}
        >
          <path 
            d="M0,10 C200,10 300,70 600,85 C900,100 1000,120 1200,120 L1200,120 L0,120 Z" 
            fill="#5e1415"
          />
        </svg>
      </div>
    </section>
  );
}
