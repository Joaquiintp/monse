const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://strapi.monserratenses.org.ar';

export interface ConfiguracionSitio {
  id: number
  documentId: string
  favicon?: {
    url: string
    name: string
    alternativeText?: string
  }
  titulo?: string
  descripcion?: string
}

export async function getConfiguracionSitio(): Promise<ConfiguracionSitio | null> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/configuracion-sitio?populate=favicon`,
      {
        cache: 'no-store', // Siempre traer la configuración más reciente
      }
    )

    if (!response.ok) {
      // Silenciosamente retornar null si no existe (404) o no hay permisos (401/403)
      return null
    }

    const data = await response.json()
    
    if (!data.data) {
      return null
    }

    const configData = data.data
    
    return {
      id: configData.id,
      documentId: configData.documentId,
      favicon: configData.favicon ? {
        url: configData.favicon.url,
        name: configData.favicon.name,
        alternativeText: configData.favicon.alternativeText || 'Favicon'
      } : undefined,
      titulo: configData.titulo || configData.Titulo,
      descripcion: configData.descripcion || configData.Descripcion
    }
  } catch (error) {
    console.error('Error in getConfiguracionSitio:', error)
    return null
  }
}
