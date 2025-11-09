export default function MissionSection() {
  return (
    <section
      id="mision"
      className="py-20 md:py-32 relative"
      style={{
        backgroundImage: 'linear-gradient(180deg, #5e1415 19%, #ffffff 19%)',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="bg-[#ebe4d3] rounded-lg p-8 md:p-16 shadow-2xl max-w-4xl mx-auto">
          {/* Misión */}
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#625352] mb-6" style={{ fontFamily: 'Lora, Georgia, serif' }}>
              Misión
            </h2>
            <p className="text-xl md:text-2xl text-[#625352]" style={{ fontFamily: 'Lora, Georgia, serif', lineHeight: '2' }}>
              Nuestra misión es generar un espacio de participación e integración y cumplir con los objetivos para los que la asociación fue creada.<br />
              Nos proponemos trabajar en conjunto con todas las promociones que así lo deseen.
            </p>
          </div>

          {/* Visión */}
          <div className="mb-12 text-center mt-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#625352] mb-6" style={{ fontFamily: 'Lora, Georgia, serif' }}>
              Visión
            </h2>
            <p className="text-xl md:text-2xl text-[#625352]" style={{ fontFamily: 'Lora, Georgia, serif', lineHeight: '2' }}>
              Buscamos consolidarnos como una asociación que refleje el pensamiento de todas las promociones consustanciadas con el legado recibido del colegio en nuestra juventud.<br />
              Pretendemos llevar adelante una gestión transparente que genere la confianza y la credibilidad en nuestras acciones e intenciones.
            </p>
          </div>

          {/* Valores */}
          <div className="text-center mt-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#625352] mb-6" style={{ fontFamily: 'Lora, Georgia, serif' }}>
              Valores
            </h2>
            <p className="text-xl md:text-2xl text-[#625352]" style={{ fontFamily: 'Lora, Georgia, serif', lineHeight: '2' }}>
              Son nuestros valores: El compromiso secular con la comunidad monserratense; el ser una entidad autónoma que cumple su misión sin distinción de sexo, raza o religión; la coherencia de nuestras acciones con nuestros fines; la transparencia, el esfuerzo y la ética de la gestión; la búsqueda permanente y continua del bien común para nuestros integrantes. La confidencialidad y protección de la información y de los datos de nuestros asociados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
