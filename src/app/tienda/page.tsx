import Image from 'next/image';
import { getProducts } from '@/lib/strapi-products';
import ProductImageCarousel from '@/components/ProductImageCarousel';

// Forzar rendering dinámico para obtener datos frescos de Strapi
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function TiendaPage() {
  // Obtener productos desde Strapi
  const productsFromStrapi = await getProducts();
  
  // Separar vinos y productos por categoría
  const vinos = productsFromStrapi.filter(p => p.category === 'wine');
  const productos = productsFromStrapi.filter(p => p.category === 'model');
  
  // Número de WhatsApp de la asociación
  const whatsappNumber = '5493516367773';
  
  return (
    <>
      {/* Banner */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/segundo-piso-monserrat.jpg"
            alt="Tienda del Duende"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-6 inline-block">
            <span className="text-6xl md:text-8xl">🧙</span>
          </div>
          <h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            style={{ 
              fontFamily: 'Lora, Georgia, serif',
              textShadow: '3px 3px 12px rgba(0,0,0,0.8)',
              lineHeight: '1.2'
            }}
          >
            La Tienda del Duende
          </h1>
          <p 
            className="text-xl md:text-2xl text-white mb-4"
            style={{ 
              fontFamily: 'Lora, Georgia, serif',
              textShadow: '2px 2px 8px rgba(0,0,0,0.7)'
            }}
          >
            Asociación Civil de Ex Alumnos del Colegio Monserrat
          </p>
          <p 
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            style={{ 
              fontFamily: 'Lora, Georgia, serif',
              textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
              lineHeight: '1.6'
            }}
          >
            Con tu apoyo, ayudas a sostener los proyectos que tenemos para la comunidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#vinos" 
              className="bg-white text-[#5e1415] px-8 py-4 rounded-full font-semibold hover:bg-[#faf8f3] transition-all transform hover:scale-105 shadow-xl"
            >
              Ver Colección de Vinos
            </a>
            <a 
              href="#productos" 
              className="bg-white text-[#5e1415] px-8 py-4 rounded-full font-semibold hover:bg-[#faf8f3] transition-all transform hover:scale-105 shadow-xl"
            >
              Explorar Productos
            </a>
          </div>
        </div>

        {/* Decorative wave at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(248 250 252)"/>
          </svg>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Vinos Section */}
          {vinos && vinos.length > 0 && (
            <div id="vinos" className="mb-16">
              <h2 className="text-4xl font-bold text-center mb-12 text-[#5e1415]" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                Colección de Vinos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {vinos.map((vino) => (
                  <div key={vino.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <ProductImageCarousel images={vino.images || []} alt={vino.name} />
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2 text-[#5e1415]" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                        {vino.name}
                      </h3>
                      {vino.description && (
                        <p className="text-gray-700 mb-4 line-clamp-3">
                          {vino.description}
                        </p>
                      )}
                      {vino.price && (
                        <p className="text-2xl font-bold text-[#5e1415] mb-4">
                          ${vino.price}
                        </p>
                      )}
                      <a
                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hola! Me interesa consultar sobre el vino ${vino.name}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-[#25D366] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#128C7E] transition-colors"
                      >
                        Consultar por WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Productos Section */}
          {productos && productos.length > 0 && (
            <div id="productos">
              <h2 className="text-4xl font-bold text-center mb-12 text-[#5e1415]" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                Productos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {productos.map((producto) => (
                  <div key={producto.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <ProductImageCarousel images={producto.images || []} alt={producto.name} />
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2 text-[#5e1415]" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                        {producto.name}
                      </h3>
                      {producto.description && (
                        <p className="text-gray-700 mb-4 line-clamp-3">
                          {producto.description}
                        </p>
                      )}
                      {producto.price && (
                        <p className="text-2xl font-bold text-[#5e1415] mb-4">
                          ${producto.price}
                        </p>
                      )}
                      <a
                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hola! Me interesa consultar sobre ${producto.name}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-[#25D366] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#128C7E] transition-colors"
                      >
                        Consultar por WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
