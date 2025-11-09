// Configuración centralizada de Strapi
export const STRAPI_CONFIG = {
  url: process.env.NEXT_PUBLIC_STRAPI_URL || 'https://strapi.monserratenses.org.ar',
  apiToken: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || '',
}

// Headers comunes para peticiones a Strapi
export function getStrapiHeaders() {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  
  // Deshabilitado temporalmente - todas las APIs son públicas
  // if (STRAPI_CONFIG.apiToken) {
  //   headers['Authorization'] = `Bearer ${STRAPI_CONFIG.apiToken}`
  // }
  
  return headers
}

// Función helper para construir URLs de imágenes
export function getStrapiImageUrl(path: string | null | undefined): string {
  if (!path) return '/images/placeholder.jpg'
  if (path.startsWith('http')) return path
  return `${STRAPI_CONFIG.url}${path}`
}

// Función helper para hacer fetch a Strapi con manejo de errores
export async function fetchFromStrapi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T | null> {
  try {
    const url = `${STRAPI_CONFIG.url}/api/${endpoint}`
    console.log(`🌐 Fetching from Strapi: ${url}`)
    
    const response = await fetch(url, {
      headers: getStrapiHeaders(),
      ...options,
    })

    console.log(`📊 Response status: ${response.status} ${response.statusText}`)

    if (!response.ok) {
      console.error(`❌ Error fetching ${endpoint}:`, response.status, response.statusText)
      const errorText = await response.text()
      console.error(`Error details: ${errorText}`)
      return null
    }

    const data = await response.json()
    console.log(`✅ Data received:`, JSON.stringify(data).substring(0, 200) + '...')
    return data as T
  } catch (error) {
    console.error(`❌ Error fetching ${endpoint}:`, error)
    return null
  }
}
