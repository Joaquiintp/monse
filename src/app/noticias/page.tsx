import Link from 'next/link'
import Image from 'next/image'
import PageBanner from '@/components/PageBanner'
import { getNoticias, getNoticiaImageUrl, getNoticiaExcerpt } from '@/lib/strapi-news'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function NoticiasPage() {
  const news = await getNoticias()

  return (
    <>
      <PageBanner 
        title="Noticias"
        backgroundImage="/images/fuente-patio-menor-monserrat.jpg"
        desktopPosition="center 30%"
        mobilePosition="center 25%"
        overlay={0.2}
      />

      {/* Content Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => {
              const imageUrl = getNoticiaImageUrl(item)
              const excerpt = getNoticiaExcerpt(item.parrafo1 || '')
              
              return (
                <Link 
                  key={item.id} 
                  href={`/noticias/${item.slug || item.documentId}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={item.titulo}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-[#5e1415] group-hover:text-[#7a1a1c] transition-colors">
                        {item.titulo}
                      </h3>
                      <p className="text-gray-600 mb-4" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                        {excerpt}
                      </p>
                      <span className="text-[#5e1415] font-semibold uppercase text-sm tracking-wider">
                        Leer más →
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
