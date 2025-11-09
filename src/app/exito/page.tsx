import Image from 'next/image';
import Link from 'next/link';

export default function ExitoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Banner */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <Image
          src="/images/techo-monserrat-vista-cenital.jpg"
          alt="Colegio Monserrat"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Contenido */}
      <div className="flex-1 flex items-center justify-center px-4 py-16 bg-white">
        <div className="max-w-2xl w-full text-center">
          {/* Icono de éxito */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <svg 
                className="w-12 h-12 text-green-600" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>

          {/* Mensaje */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#2c3e50] mb-6">
            El formulario ha sido enviado con éxito.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12">
            Pronto nos pondremos en contacto.
          </p>

          {/* Botón de volver */}
          <Link
            href="/"
            className="inline-block bg-[#5e1415] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#4a1011] transition-all shadow-lg text-lg"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
