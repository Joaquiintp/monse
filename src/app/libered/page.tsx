'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function LibeRedPage() {
  const [activeTab, setActiveTab] = useState('todos');
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [heroTransform, setHeroTransform] = useState(0);
  const [cardRotation, setCardRotation] = useState({ x: 0, y: 0 });
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const heroHeight = window.innerHeight;
      
      const opacity = Math.max(0, 1 - (scrollTop / (heroHeight * 0.7)));
      setHeroOpacity(opacity);
      
      const parallaxOffset = scrollTop * 0.3;
      setHeroTransform(parallaxOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFlipCard = () => {
    setIsCardFlipped(!isCardFlipped);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        window.location.href = '/exito';
      } else {
        alert('Hubo un error al enviar el formulario. Por favor, intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al enviar el formulario. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero - Primera tarjeta - Oculta en mobile */}
      <section 
        className="hidden md:block fixed top-0 left-0 w-full h-screen items-center justify-center bg-white overflow-hidden z-0"
        style={{ 
          opacity: heroOpacity,
          transform: `translateY(${heroTransform}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyYzNlNTAiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDE0YzYuNjI3IDAgMTIgNS4zNzMgMTIgMTJzLTUuMzczIDEyLTEyIDEyLTEyLTUuMzczLTEyLTEyIDUuMzczLTEyIDEyLTEyem0tMTItMjRjNi42MjcgMCAxMiA1LjM3MyAxMiAxMnMtNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTIgNS4zNzMtMTIgMTItMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')]" />
        </div>
        
        <div className="container mx-auto px-4 py-20 max-w-7xl relative z-10 flex items-center h-full">
          <div className="grid md:grid-cols-2 gap-12 items-center w-full">
            <div className="text-[#2c3e50]">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ marginTop: '40px' }}>
                <span className="text-[#2c3e50]">Tu tarjeta, </span>
                <span 
                  style={{
                    background: 'linear-gradient(90deg, #4a5568 0%, #8B1538 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  nuestra
                </span>
                <span className="text-[#4a5568]"> tarjeta.</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-light mb-6 text-gray-700">
                Diseñada por y para monserratenses
              </h2>
              <p className="text-lg md:text-xl mb-8 text-gray-600 leading-relaxed">
                Esta credencial fue creada para darle un espacio a la comunidad de la que somos parte, porque allí construimos los cimientos que hoy sostienen nuestras vidas. Te invitamos a conocer todos los beneficios y prestaciones que tenemos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#tarjeta"
                  className="bg-[#8B1538] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#6B0E2A] transition-all text-center shadow-lg"
                >
                  Más detalles
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative animate-[fadeInUp_0.8s_ease-out]">
                <button 
                  onClick={handleFlipCard}
                  className="absolute -top-2 -right-2 md:-top-4 md:-right-4 z-20 bg-[#8B1538] text-white px-4 py-2 md:px-6 rounded-full shadow-xl animate-[pulse_2s_ease-in-out_infinite] hover:scale-110 transition-transform cursor-pointer flex items-center gap-2 text-sm md:text-base"
                >
                  <span className="font-semibold text-sm">Mirá el dorso</span>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="animate-[spin_3s_linear_infinite]"
                  >
                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                  </svg>
                </button>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200 hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:-rotate-1">
                  <div className="relative aspect-[1.586/1] rounded-2xl overflow-hidden shadow-xl">
                    <div 
                      className="absolute inset-0 transition-opacity duration-700"
                      style={{ opacity: isCardFlipped ? 0 : 1 }}
                    >
                      <Image
                        src="/images/Frente.png"
                        alt="Tarjeta LibeRed Frente"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    
                    <div 
                      className="absolute inset-0 transition-opacity duration-700"
                      style={{ opacity: isCardFlipped ? 1 : 0 }}
                    >
                      <Image
                        src="/images/dorso1.png"
                        alt="Tarjeta LibeRed Dorso"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ajuste de margen para desktop y mobile */}
      <div className="relative z-10 md:mt-[100vh]">
        <div className="bg-white md:rounded-t-3xl md:shadow-2xl">
          
          <section id="tarjeta" className="py-12 md:py-20 px-4 bg-white">
            <div className="container mx-auto max-w-7xl">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-[#2c3e50] mb-4">
                  Tarjeta de Beneficios Monserratenses
                </h2>
                <p className="text-lg md:text-xl text-gray-600">
                  Descuentos exclusivos y prestaciones profesionales para nuestra comunidad
                </p>
              </div>

              {/* Tarjeta SOLO en mobile - justo después del título */}
              <div className="md:hidden mb-8 max-w-lg mx-auto">
                <div 
                  className="relative aspect-[1.586/1] rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src="/images/Frente.png"
                    alt="Tarjeta LibeRed - Frente"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Contenido */}
                <div className="order-1 md:order-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#2c3e50] mb-4">
                    Beneficios que nos unen
                  </h3>
                  <p className="text-base md:text-lg text-gray-600 mb-6">
                    Accedé a descuentos en comercios, prestaciones profesionales y beneficios exclusivos para asociados.
                  </p>
                  <ul className="space-y-4 mb-8">
                    {[
                      'Descuentos en comercios locales',
                      'Prestaciones profesionales',
                      'Beneficios educativos',
                      'Eventos culturales'
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-[#8B1538] text-2xl">✓</span>
                        <span className="text-base md:text-lg text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="https://wa.me/5493516367773?text=Hola!%20Quiero%20solicitar%20mi%20tarjeta%20LibeRed"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#8B1538] text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-[#6B0E2A] transition-all text-center text-sm md:text-base"
                    >
                      SOLICITAR TARJETA
                    </a>
                    <a
                      href="#beneficios"
                      className="bg-gray-200 text-[#2c3e50] px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-gray-300 transition-all text-center text-sm md:text-base"
                    >
                      VER BENEFICIOS
                    </a>
                  </div>
                </div>

                {/* Tarjeta con efecto 3D - SOLO desktop */}
                <div className="hidden md:block relative animate-[fadeInLeft_1s_ease-out] order-2">
                  <div 
                    className="relative aspect-[1.586/1] max-w-lg mx-auto perspective-1000"
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      const centerX = rect.width / 2;
                      const centerY = rect.height / 2;
                      const rotateX = ((y - centerY) / centerY) * -10;
                      const rotateY = ((x - centerX) / centerX) * 10;
                      setCardRotation({ x: rotateX, y: rotateY });
                    }}
                    onMouseLeave={() => {
                      setCardRotation({ x: 0, y: 0 });
                    }}
                  >
                    <div 
                      className="absolute inset-0 transform scale-95 opacity-60 transition-all duration-300 hidden md:block"
                      style={{
                        transform: `perspective(1000px) rotateX(${cardRotation.x * 0.5}deg) rotateY(${cardRotation.y * 0.5}deg) translateZ(-30px) scale(0.95)`,
                      }}
                    >
                      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src="/images/dorso1.png"
                          alt="Tarjeta LibeRed Dorso"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div 
                      className="relative w-full h-full z-10 transition-all duration-300"
                      style={{
                        transform: `perspective(1000px) rotateX(${cardRotation.x}deg) rotateY(${cardRotation.y}deg) translateZ(20px)`,
                      }}
                    >
                      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(139,21,56,0.7)]">
                        <Image
                          src="/images/Frente.png"
                          alt="Tarjeta LibeRed Frente"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="beneficios" className="py-20 px-4 bg-gray-50">
            <div className="container mx-auto max-w-7xl">
              <h2 className="text-4xl md:text-5xl font-bold text-center text-[#2c3e50] mb-12">
                Beneficios Disponibles
              </h2>

              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {[
                  { id: 'todos', label: 'Todos' },
                  { id: 'comercios', label: 'Comercios' },
                  { id: 'profesionales', label: 'Profesionales' },
                  { id: 'educacion', label: 'Educación' },
                  { id: 'salud', label: 'Salud' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all ${
                      activeTab === tab.id
                        ? 'bg-[#8B1538] text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {(activeTab === 'todos' || activeTab === 'comercios') && (
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-5xl mb-4">🛍️</div>
                    <h4 className="text-xl font-bold text-[#2c3e50] mb-2">Comercios Locales</h4>
                    <p className="text-2xl font-bold text-[#8B1538] mb-3">15% OFF</p>
                    <p className="text-gray-600">Amplia red de comercios adheridos en Córdoba y alrededores</p>
                  </div>
                )}

                {(activeTab === 'todos' || activeTab === 'profesionales') && (
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-5xl mb-4">⚖️</div>
                    <h4 className="text-xl font-bold text-[#2c3e50] mb-2">Servicios Jurídicos</h4>
                    <p className="text-2xl font-bold text-[#8B1538] mb-3">20% OFF</p>
                    <p className="text-gray-600">Asesoramiento legal por egresados especializados</p>
                  </div>
                )}

                {(activeTab === 'todos' || activeTab === 'educacion') && (
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-5xl mb-4">📚</div>
                    <h4 className="text-xl font-bold text-[#2c3e50] mb-2">Cursos y Capacitaciones</h4>
                    <p className="text-2xl font-bold text-[#8B1538] mb-3">15-30% OFF</p>
                    <p className="text-gray-600">Capacitaciones profesionales y talleres especializados</p>
                  </div>
                )}

                {(activeTab === 'todos' || activeTab === 'salud') && (
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-5xl mb-4">🏥</div>
                    <h4 className="text-xl font-bold text-[#2c3e50] mb-2">Servicios Médicos</h4>
                    <p className="text-2xl font-bold text-[#8B1538] mb-3">15-25% OFF</p>
                    <p className="text-gray-600">Consultas y tratamientos con profesionales egresados</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section id="contacto" className="py-20 px-4 bg-gray-50">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-4xl md:text-5xl font-bold text-center text-[#2c3e50] mb-12">
                Contacto
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-[#2c3e50] mb-4">Información de Contacto</h3>
                  <p className="text-gray-600 mb-6">
                    Para más información sobre la Tarjeta de Beneficios o cualquier consulta:
                  </p>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-[#2c3e50]">Email:</p>
                      <a href="mailto:asociacion@monserratenses.org.ar" className="text-[#8B1538] hover:underline">
                        asociacion@monserratenses.org.ar
                      </a>
                    </div>
                    <div>
                      <p className="font-semibold text-[#2c3e50]">Teléfono:</p>
                      <a href="tel:+5493516367773" className="text-[#8B1538] hover:underline">
                        +54 9 3516 36-7773
                      </a>
                    </div>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg space-y-4">
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#8B1538] focus:ring-2 focus:ring-[#8B1538]/20 outline-none transition-all"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#8B1538] focus:ring-2 focus:ring-[#8B1538]/20 outline-none transition-all"
                  />
                  <textarea
                    name="mensaje"
                    placeholder="Mensaje"
                    rows={5}
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#8B1538] focus:ring-2 focus:ring-[#8B1538]/20 outline-none transition-all resize-none"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#8B1538] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#6B0E2A] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'ENVIANDO...' : 'ENVIAR'}
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
