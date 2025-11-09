import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getNoticiaBySlug, getNoticiaImageUrl, type Noticia } from '@/lib/strapi-news'
import { getStrapiImageUrl } from '@/lib/strapi-config'

// Permitir rutas dinámicas sin pre-generar
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0

export default async function NoticiaDetailPage({
  params
}: {
  params: { slug: string }
}) {
  const noticia = await getNoticiaBySlug(params.slug)

  if (!noticia) {
    notFound()
  }

  const titulo = noticia.titulo || 'Sin título'
  const parrafo1 = noticia.parrafo1 || ''
  const parrafo2 = noticia.parrafo2
  const videoUrl = noticia.url
  
  const imageUrl = getNoticiaImageUrl(noticia)
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-AR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  // Convertir URL de YouTube a embed
  const getYouTubeEmbedUrl = (url: string | undefined) => {
    if (!url) return null
    
    // Diferentes formatos de URL de YouTube
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`
    }
    
    return null
  }
  
  const youtubeEmbedUrl = getYouTubeEmbedUrl(videoUrl)

  return (
    <>
      {/* Banner with image */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src={imageUrl}
          alt={titulo}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            style={{ 
              fontFamily: 'Lora, Georgia, serif',
              textShadow: '3px 3px 10px rgba(0,0,0,0.8)'
            }}
          >
            {titulo}
          </h1>
          <p className="text-white text-lg" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
            {formatDate(noticia.publishedAt)}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-[#faf8f3]">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back button */}
          <Link 
            href="/noticias" 
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
            Volver a Noticias
          </Link>

          {/* Article content */}
          <article className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {/* Si NO hay Parrafo2 ni URL de video: Mostrar imagen arriba solo si NO hay fotos en galería */}
            {!parrafo2 && !videoUrl && (
              <div className="mb-8">
                {(!noticia.fotos || noticia.fotos.length === 0) && noticia.foto && (
                  <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={titulo}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Primer párrafo */}
            <div 
              className="prose prose-lg max-w-none mb-8"
              style={{ 
                fontFamily: 'Lora, Georgia, serif',
                lineHeight: '1.8',
                color: '#333'
              }}
            >
              {parrafo1.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                )
              ))}
            </div>

            {/* Si NO hay Parrafo2: Mostrar video después del párrafo 1 */}
            {!parrafo2 && videoUrl && getYouTubeEmbedUrl(videoUrl) && (
              <div className="my-10">
                <div className="relative w-full rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={getYouTubeEmbedUrl(videoUrl)!}
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* Si hay Parrafo2: Video en el medio (si hay URL) o Imagen en el medio (si NO hay fotos galería ni URL) */}
            {parrafo2 && (
              <>
                <div className="my-10">
                  {videoUrl && getYouTubeEmbedUrl(videoUrl) ? (
                    // Video de YouTube (la foto será solo para portada)
                    <div className="relative w-full rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        src={getYouTubeEmbedUrl(videoUrl)!}
                        className="absolute top-0 left-0 w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    // Imagen principal solo si NO hay fotos en galería
                    (!noticia.fotos || noticia.fotos.length === 0) && noticia.foto && (
                      <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={titulo}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )
                  )}
                </div>

                {/* Segundo párrafo */}
                <div 
                  className="prose prose-lg max-w-none"
                  style={{ 
                    fontFamily: 'Lora, Georgia, serif',
                    lineHeight: '1.8',
                    color: '#333'
                  }}
                >
                  {parrafo2 && parrafo2.split('\n').map((paragraph: string, index: number) => (
                    paragraph.trim() && (
                      <p key={index} className="mb-6">
                        {paragraph}
                      </p>
                    )
                  ))}
                </div>
              </>
            )}

            {/* Galería de fotos adicionales (fotos) */}
            {noticia.fotos && noticia.fotos.length > 0 && (
              <div className="mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {noticia.fotos.map((image: any, index: number) => (
                    <div key={index} className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                      <Image
                        src={getStrapiImageUrl(image.url)}
                        alt={image.alternativeText || `Imagen ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Back button bottom */}
          <div className="mt-12 text-center">
            <Link 
              href="/noticias" 
              className="inline-block bg-[#5e1415] text-white px-8 py-3 rounded-full font-semibold uppercase tracking-wider hover:bg-[#7a1a1c] transition-colors"
            >
              ← Volver a Noticias
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
