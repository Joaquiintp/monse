export default function JoinSection() {
  return (
    <section id="sumate" className="py-20 md:py-32 bg-[#625352]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8" style={{ fontFamily: 'Lora, Georgia, serif' }}>
            Sumá tu apoyo<br className="md:hidden" /> a la comunidad
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Asociarse */}
          <div className="text-white">
            <h3 className="text-base md:text-lg font-semibold mb-4 uppercase text-white" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Asociate y seguí siendo parte<br className="hidden md:block" /> de esta historia
            </h3>
            <p className="text-lg md:text-xl mb-6" style={{ fontFamily: 'Lora, Georgia, serif', lineHeight: '2' }}>
              Formar parte de la Asociación Civil Duarte y Quirós es una manera de seguir conectado con el espíritu monserratense. Al asociarte, contribuís al fortalecimiento de una red de egresados que impulsa proyectos educativos, culturales y solidarios. Tu participación hace la diferencia y mantiene viva la comunidad que nos formó.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScWcriNJQKvQON40YrnZlr3qpcoRb3WooJwWInKyDtM2ktGvA/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#ebe4d3] text-[#625352] px-8 py-3 rounded-full font-semibold uppercase tracking-wider hover:bg-[#625352] hover:text-[#ebe4d3] hover:border-[#ebe4d3] border-2 border-transparent transition-all duration-300"
              style={{ fontFamily: 'Oswald, sans-serif', fontSize: '16px', letterSpacing: '3px' }}
            >
              Asociáte
            </a>
          </div>

          {/* Donar */}
          <div className="text-white">
            <h3 className="text-base md:text-lg font-semibold mb-4 uppercase text-white" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Hacé una donación<br className="md:hidden" /> y sumá tu apoyo
            </h3>
            <p className="text-lg md:text-xl mb-6" style={{ fontFamily: 'Lora, Georgia, serif', lineHeight: '2' }}>
              Cada aporte, por más pequeño que sea, nos permite seguir desarrollando iniciativas que beneficien a estudiantes, egresados y a la comunidad en general.<br />
              Tu donación voluntaria es una forma concreta de retribuir lo recibido en el colegio y de proyectar juntos más oportunidades para todos.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSf7wq_CL0n0TqcP6r4wt6VaKZJHYr8fGjzpKkm6P7tmAXX4Cg/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#ebe4d3] text-[#625352] px-8 py-3 rounded-full font-semibold uppercase tracking-wider hover:bg-[#625352] hover:text-[#ebe4d3] hover:border-[#ebe4d3] border-2 border-transparent transition-all duration-300"
              style={{ fontFamily: 'Oswald, sans-serif', fontSize: '16px', letterSpacing: '3px' }}
            >
              Donar libremente
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
