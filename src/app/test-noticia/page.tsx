import { getNoticiaBySlug } from '@/lib/strapi-news'

export default async function TestPage() {
  const noticia = await getNoticiaBySlug('sede-virtual')
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Debug</h1>
      <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
        {JSON.stringify(noticia, null, 2)}
      </pre>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Campos individuales:</h2>
        <p><strong>titulo:</strong> {noticia?.titulo || 'UNDEFINED'}</p>
        <p><strong>slug:</strong> {noticia?.slug || 'UNDEFINED'}</p>
        <p><strong>parrafo1 length:</strong> {noticia?.parrafo1?.length || 0}</p>
        <p><strong>foto:</strong> {noticia?.foto ? 'SÍ' : 'NO'}</p>
      </div>
    </div>
  )
}
