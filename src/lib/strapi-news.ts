import { fetchFromStrapi, getStrapiImageUrl } from './strapi-config'

export interface Noticia {
  id: number
  documentId: string
  titulo: string
  slug: string | null
  parrafo1: string
  parrafo2?: string | null
  url?: string | null
  foto?: {
    url: string
    alternativeText?: string
  }
  fotos?: Array<{
    url: string
    alternativeText?: string
  }>
  publishedAt: string
  createdAt: string
  updatedAt: string
}

interface StrapiResponse<T> {
  data: T[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export async function getNoticias(limit?: number): Promise<Noticia[]> {
  try {
    const endpoint = limit 
      ? `noticias?populate=*&sort=publishedAt:desc&pagination[limit]=${limit}`
      : `noticias?populate=*&sort=publishedAt:desc`
    
    const response = await fetchFromStrapi<StrapiResponse<Noticia>>(endpoint, {
    })

    if (!response || !response.data) {
      console.error('No se pudieron cargar las noticias')
      return []
    }

    console.log(`Noticias cargadas desde Strapi: ${response.data.length}`)
    return response.data
  } catch (error) {
    console.error('Error loading noticias from Strapi:', error)
    return []
  }
}

export async function getNoticiaBySlug(slug: string): Promise<Noticia | null> {
  try {
    let response = await fetchFromStrapi<StrapiResponse<Noticia>>(
      `noticias?filters[slug][$eq]=${slug}&populate=*`,
    )

    if (response && response.data && response.data.length > 0) {
      return response.data[0]
    }

    response = await fetchFromStrapi<StrapiResponse<Noticia>>(
      `noticias?filters[documentId][$eq]=${slug}&populate=*`,
    )

    if (response && response.data && response.data.length > 0) {
      return response.data[0]
    }

    return null
  } catch (error) {
    console.error('Error loading noticia from Strapi:', error)
    return null
  }
}

export function getNoticiaImageUrl(noticia: Noticia): string {
  if (noticia.fotos && noticia.fotos.length > 0) {
    return getStrapiImageUrl(noticia.fotos[0].url)
  }
  if (noticia.foto?.url) {
    return getStrapiImageUrl(noticia.foto.url)
  }
  return '/images/aniversario-335.jpg'
}

export function getNoticiaExcerpt(parrafo: string, maxLength: number = 150): string {
  if (!parrafo) return ''
  const cleanText = parrafo.replace(/[#*_~`]/g, '').substring(0, maxLength)
  return cleanText + (parrafo.length > maxLength ? '...' : '')
}
