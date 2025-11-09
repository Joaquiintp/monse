'use client';

import { Wine, Building2, ShoppingCart, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import ImageGalleryModal from '@/components/ImageGalleryModal';
import { useCart } from '@/contexts/CartContext';
import { ProductoUnificado } from '@/lib/strapi-products';

interface TiendaProductSectionProps {
  products: ProductoUnificado[];
}

export default function TiendaProductSection({ products }: TiendaProductSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'todos' | 'wine' | 'model'>('todos');
  const [selectedProduct, setSelectedProduct] = useState<ProductoUnificado | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem } = useCart();

  // Filtrar productos por categoría
  const filteredProducts = selectedCategory === 'todos' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: ProductoUnificado) => {
    addItem({
      id: typeof product.id === 'string' ? parseInt(product.id.replace(/\D/g, '')) : product.id,
      name: product.name,
      price: product.price || 0,
      image: product.images?.[0] || '/images/placeholder-product.jpg',
      category: product.category === 'wine' ? 'Vino' : 'Producto',
    });
  };

  const openModal = (product: ProductoUnificado) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  const nextImage = () => {
    if (selectedProduct && selectedProduct.images) {
      setCurrentImageIndex((prev) => 
        prev === selectedProduct.images!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProduct && selectedProduct.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProduct.images!.length - 1 : prev - 1
      );
    }
  };

  return (
    <>
      <section className="py-16 px-4" style={{ backgroundColor: '#faf8f3' }}>
        <div className="container mx-auto max-w-7xl">
          
          {/* Category Filter */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setSelectedCategory('todos')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === 'todos'
                  ? 'bg-[#5e1415] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Todos los Productos
            </button>
            <button
              onClick={() => setSelectedCategory('wine')}
              className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                selectedCategory === 'wine'
                  ? 'bg-[#5e1415] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Wine size={20} />
              Vinos
            </button>
            <button
              onClick={() => setSelectedCategory('model')}
              className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                selectedCategory === 'model'
                  ? 'bg-[#5e1415] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Building2 size={20} />
              Productos
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                {/* Product Image */}
                <div className="relative h-80 bg-gray-100 overflow-hidden group">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      {product.category === 'wine' ? (
                        <Wine size={64} className="text-gray-300" />
                      ) : (
                        <Building2 size={64} className="text-gray-300" />
                      )}
                    </div>
                  )}
                  
                  {/* Quick View Button */}
                  {product.images && product.images.length > 1 && (
                    <button
                      onClick={() => openModal(product)}
                      className="absolute top-4 right-4 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Eye size={20} className="text-[#5e1415]" />
                    </button>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.category === 'wine' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-blue-600 text-white'
                    }`}>
                      {product.category === 'wine' ? 'Vino' : 'Producto'}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 
                    className="text-2xl font-bold mb-2"
                    style={{ fontFamily: 'Lora, Georgia, serif', color: '#5e1415' }}
                  >
                    {product.name}
                  </h3>
                  
                  {product.description && (
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    <div>
                      {product.price ? (
                        <p className="text-3xl font-bold text-[#5e1415]">
                          ${product.price.toLocaleString('es-AR')}
                        </p>
                      ) : (
                        <p className="text-lg text-gray-500 italic">Consultar precio</p>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-[#5e1415] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#7a1a1c] transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      <ShoppingCart size={20} />
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">
                No hay productos disponibles en esta categoría.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Image Gallery Modal */}
      {isModalOpen && selectedProduct && selectedProduct.images && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-4xl font-light"
            >
              ×
            </button>

            {/* Image */}
            <div className="relative h-[70vh] bg-gray-900 rounded-lg overflow-hidden">
              <Image
                src={selectedProduct.images[currentImageIndex]}
                alt={`${selectedProduct.name} - Imagen ${currentImageIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            {/* Navigation Buttons */}
            {selectedProduct.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                >
                  <ChevronLeft size={24} className="text-[#5e1415]" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                >
                  <ChevronRight size={24} className="text-[#5e1415]" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full">
                  {currentImageIndex + 1} / {selectedProduct.images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
