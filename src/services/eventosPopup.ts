import { fetchFromStrapi, getStrapiImageUrl } from '@/lib/strapi-config'

export interface EventoPopup {
  id: number
  documentId: string
  titulo: string
  descripcion: string
  fecha: string
  link?: string
  activo: boolean
  imagen?: {
    url: string
    alternativeText?: string
  }
}

interface StrapiResponse {
  data: any[]
  meta: any
}

export async function getActiveEvent(): Promise<EventoPopup | null> {
  try {
    console.log('🎉 Buscando evento activo...')
    const response = await fetchFromStrapi<StrapiResponse>(
      'eventos-popups?filters[activo][$eq]=true&populate=imagen&sort=fecha:desc',
      { cache: 'no-store' }
    )

    console.log('📋 Response recibida:', response)
    
    if (!response || !response.data || response.data.length === 0) {
      console.log('❌ No hay eventos activos o response vacía')
      return null
    }

    // Tomar el primer evento activo (más reciente por fecha)
    const eventoData = response.data[0]
    
    console.log('✅ Evento activo encontrado:', eventoData.titulo || eventoData.Titulo)
    
    const evento = {
      id: eventoData.id,
      documentId: eventoData.documentId,
      titulo: eventoData.titulo || eventoData.Titulo || '',
      descripcion: eventoData.descripcion || eventoData.Descripcion || '',
      fecha: eventoData.fecha || eventoData.Fecha || new Date().toISOString(),
      link: eventoData.link || eventoData.Link || undefined,
      activo: eventoData.activo !== undefined ? eventoData.activo : true,
      imagen: eventoData.imagen ? {
        url: getStrapiImageUrl(eventoData.imagen.url),
        alternativeText: eventoData.imagen.alternativeText || eventoData.imagen.name
      } : undefined
    }
    
    return evento
  } catch (error) {
    console.error('❌ Error al cargar evento activo:', error)
    return null
  }
}
