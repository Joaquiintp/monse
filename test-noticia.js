// Script de test para verificar qué devuelve la API de Strapi
const STRAPI_URL = 'http://168.231.99.125:1337';

async function testNoticia() {
  const url = `${STRAPI_URL}/api/noticias?filters[slug][$eq]=sede-virtual&populate=*`;
  console.log('🔍 Fetching:', url);
  
  const response = await fetch(url);
  const data = await response.json();
  
  console.log('\n📊 Respuesta completa:');
  console.log(JSON.stringify(data, null, 2));
  
  if (data.data && data.data.length > 0) {
    const noticia = data.data[0];
    console.log('\n✅ Primera noticia:');
    console.log('- ID:', noticia.id);
    console.log('- titulo:', noticia.titulo);
    console.log('- slug:', noticia.slug);
    console.log('- parrafo1 length:', noticia.parrafo1?.length);
    console.log('- foto:', noticia.foto ? 'SÍ' : 'NO');
  }
}

testNoticia().catch(console.error);
