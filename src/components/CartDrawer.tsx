'use client';

import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { useEffect } from 'react';

export default function CartDrawer() {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    totalItems, 
    totalPrice, 
    isCartOpen, 
    setIsCartOpen 
  } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    // Aquí integraremos Mercado Pago
    alert('Próximamente: Integración con Mercado Pago para procesar el pago');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[480px] bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-[#5e1415]" size={24} />
            <h2 className="text-2xl font-bold text-slate-900">
              Carrito {totalItems > 0 && `(${totalItems})`}
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Cerrar carrito"
          >
            <X size={24} className="text-slate-700" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag size={48} className="text-slate-400" />
              </div>
              <p className="text-lg font-medium text-slate-900 mb-2">
                Tu carrito está vacío
              </p>
              <p className="text-slate-600">
                Agrega productos para comenzar tu compra
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-4 bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors"
                >
                  <div className="relative w-24 h-24 flex-shrink-0 bg-white rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                      sizes="96px"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 mb-1 truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-slate-600 mb-3">
                      ${item.price.toLocaleString('es-AR')} c/u
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white hover:bg-[#faf8f3] border border-slate-300 rounded-lg transition-colors"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus size={16} className="text-slate-700" />
                        </button>
                        <span className="w-8 text-center font-semibold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white hover:bg-[#faf8f3] border border-slate-300 rounded-lg transition-colors"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus size={16} className="text-slate-700" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                        aria-label="Eliminar del carrito"
                      >
                        <Trash2 size={18} className="text-slate-400 group-hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end justify-between">
                    <p className="font-bold text-lg text-slate-900">
                      ${(item.price * item.quantity).toLocaleString('es-AR')}
                    </p>
                  </div>
                </div>
              ))}

              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Vaciar carrito
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-slate-200 p-6 space-y-4 bg-slate-50">
            <div className="space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>${totalPrice.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Envío</span>
                <span className="text-sm">A calcular</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-slate-900 pt-2 border-t border-slate-300">
                <span>Total</span>
                <span>${totalPrice.toLocaleString('es-AR')}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-[#5e1415] hover:bg-[#4a1011] text-white font-semibold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              Finalizar Compra con Mercado Pago
            </button>

            <p className="text-xs text-center text-slate-500">
              Procesaremos tu pago de forma segura a través de Mercado Pago
            </p>
          </div>
        )}
      </div>
    </>
  );
}
