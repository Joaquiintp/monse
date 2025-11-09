import { fetchFromStrapi, getStrapiImageUrl } from './strapi-config'

export interface Vino {
  id: number
  documentId: string
  producto: string
  drescripcion: string
  precio: number
  slug: string | null
  fotos?: Array<{
    url: string
    alternativeText?: string
  }>
  publishedAt: string
}

export interface Producto {
  id: number
  documentId: string
  producto: string
  descripcion: string
  precio: number
  slug: string | null
  fotos?: Array<{
    url: string
    alternativeText?: string
  }>
  publishedAt: string
}

export interface ProductoUnificado {
  id: string | number
  category: 'wine' | 'model'
  name: string
  description: string
  price: number | null
  images: string[]
  slug?: string
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

// Función para obtener vinos desde Strapi
async function getVinos(): Promise<ProductoUnificado[]> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<Vino>>(
      'vinos?populate=*&sort=publishedAt:desc',
      {
      }
    )

    if (!response || !response.data) {
      console.error('No se pudieron cargar los vinos')
      return []
    }

    console.log(`✅ ${response.data.length} vinos cargados desde Strapi`)

    return response.data.map((item) => {
      const images = item.fotos?.map((img) => {
        const imageUrl = getStrapiImageUrl(img.url)
        console.log('🖼️ Imagen vino:', imageUrl)
        return imageUrl
      }) || []

      return {
        category: 'wine' as const,
        id: 'vino-' + item.id,
        name: item.producto,
        description: item.drescripcion,
        price: item.precio,
        images,
        slug: item.slug || undefined,
      }
    })
  } catch (error) {
    console.error('Error al cargar vinos:', error)
    return []
  }
}

async function getOtrosProductos(): Promise<ProductoUnificado[]> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<Producto>>(
      'productos?populate=*&sort=publishedAt:desc',
      {
      }
    )

    if (!response || !response.data) {
      console.error('No se pudieron cargar los productos')
      return []
    }

    console.log(`✅ ${response.data.length} productos cargados desde Strapi`)

    return response.data
      .filter((item) => item.producto && item.descripcion) // Solo filtrar si no tienen campos básicos
      .map((item) => {
        const images = item.fotos?.map((img) => {
          const imageUrl = getStrapiImageUrl(img.url)
          console.log('🖼️ Imagen producto:', imageUrl)
          return imageUrl
        }) || []

        return {
          id: 'producto-' + item.id,
          category: 'model' as const,
          name: item.producto || 'Sin nombre',
          description: item.descripcion || 'Sin descripción',
          price: item.precio || null,
          images: images.length > 0 ? images : ['/images/placeholder-product.jpg'],
          slug: item.slug || undefined,
        }
    })
  } catch (error) {
    console.error('Error al cargar productos:', error)
    return []
  }
}

export async function getProducts(): Promise<ProductoUnificado[]> {
  console.log('🛒 Iniciando carga de productos...')
  const [vinos, otrosProductos] = await Promise.all([
    getVinos(),
    getOtrosProductos()
  ])
  
  console.log(`📦 Total productos combinados: ${vinos.length + otrosProductos.length} (${vinos.length} vinos + ${otrosProductos.length} productos)`)
  return [...vinos, ...otrosProductos]
}

export async function getProductBySlug(slug: string): Promise<ProductoUnificado | null> {
  try {
    const [vinosResponse, productosResponse] = await Promise.all([
      fetchFromStrapi<StrapiResponse<Vino>>(
        `vinos?filters[slug][$eq]=${slug}&populate=*`
      ),
      fetchFromStrapi<StrapiResponse<Producto>>(
        `productos?filters[slug][$eq]=${slug}&populate=*`
      )
    ])

    const vino = vinosResponse?.data?.[0]
    if (vino) {
      return {
        id: 'vino-' + vino.id,
        category: 'wine' as const,
        name: vino.producto,
        description: vino.drescripcion,
        price: vino.precio,
        images: vino.fotos?.map((img) => getStrapiImageUrl(img.url)) || [],
        slug: vino.slug || undefined,
      }
    }

    const producto = productosResponse?.data?.[0]
    if (producto) {
      return {
        id: 'producto-' + producto.id,
        category: 'model' as const,
        name: producto.producto,
        description: producto.descripcion,
        price: producto.precio,
        images: producto.fotos?.map((img) => getStrapiImageUrl(img.url)) || [],
        slug: producto.slug || undefined,
      }
    }

    return null
  } catch (error) {
    console.error('Error al cargar producto por slug:', error)
    return null
  }
}
