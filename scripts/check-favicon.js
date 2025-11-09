#!/usr/bin/env node

/**
 * Script para verificar la configuración del favicon dinámico
 * 
 * Uso:
 *   node scripts/check-favicon.js
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

async function checkFavicon() {
  console.log('🔍 Verificando configuración del favicon...\n')
  console.log(`📍 Strapi URL: ${STRAPI_URL}\n`)

  try {
    // 1. Verificar que Strapi esté corriendo
    console.log('1️⃣ Verificando que Strapi esté activo...')
    const healthCheck = await fetch(`${STRAPI_URL}/_health`, {
      method: 'HEAD',
    }).catch(() => null)

    if (!healthCheck || !healthCheck.ok) {
      console.log('❌ Strapi no está respondiendo')
      console.log('   Asegúrate de que Strapi esté corriendo en', STRAPI_URL)
      process.exit(1)
    }
    console.log('✅ Strapi está activo\n')

    // 2. Verificar endpoint de configuración
    console.log('2️⃣ Consultando configuración del sitio...')
    const response = await fetch(
      `${STRAPI_URL}/api/configuracion-sitio?populate=favicon`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      if (response.status === 403) {
        console.log('❌ Error 403: Permisos no configurados')
        console.log('   Configura los permisos en Strapi:')
        console.log('   Settings → Roles → Public → configuracion-sitio → find ✓')
        process.exit(1)
      } else if (response.status === 404) {
        console.log('❌ Error 404: El Content Type no existe')
        console.log('   Crea el Single Type "configuracion-sitio" en Strapi')
        console.log('   Ver instrucciones en FAVICON-DINAMICO.md')
        process.exit(1)
      } else {
        console.log(`❌ Error ${response.status}: ${response.statusText}`)
        process.exit(1)
      }
    }

    const data = await response.json()
    console.log('✅ Endpoint respondiendo correctamente\n')

    // 3. Verificar contenido
    console.log('3️⃣ Analizando configuración...')
    
    if (!data.data) {
      console.log('⚠️  No hay configuración creada todavía')
      console.log('   Ve a Content Manager → Configuración del Sitio y crea una entrada')
      process.exit(0)
    }

    const config = data.data
    console.log('✅ Configuración encontrada\n')

    // 4. Verificar favicon
    console.log('4️⃣ Verificando favicon...')
    
    if (!config.favicon) {
      console.log('⚠️  No hay favicon configurado')
      console.log('   Sube un favicon en Content Manager → Configuración del Sitio')
      console.log('   Formatos recomendados: .ico, .png, .svg')
      console.log('\n💡 Mientras tanto, se usará el favicon por defecto (/favicon.svg)')
      process.exit(0)
    }

    console.log('✅ Favicon configurado:')
    console.log(`   📄 Nombre: ${config.favicon.name}`)
    console.log(`   🔗 URL: ${config.favicon.url}`)
    if (config.favicon.alternativeText) {
      console.log(`   📝 Alt text: ${config.favicon.alternativeText}`)
    }
    
    const faviconUrl = config.favicon.url.startsWith('http') 
      ? config.favicon.url 
      : `${STRAPI_URL}${config.favicon.url}`
    
    console.log(`   🌐 URL completa: ${faviconUrl}`)

    // 5. Verificar que el archivo sea accesible
    console.log('\n5️⃣ Verificando acceso al archivo...')
    const faviconCheck = await fetch(faviconUrl, { method: 'HEAD' })
    
    if (!faviconCheck.ok) {
      console.log('❌ El archivo del favicon no es accesible')
      console.log(`   Status: ${faviconCheck.status}`)
      process.exit(1)
    }
    
    console.log('✅ Archivo accesible')
    console.log(`   Tipo: ${faviconCheck.headers.get('content-type')}`)
    console.log(`   Tamaño: ${formatBytes(parseInt(faviconCheck.headers.get('content-length') || '0'))}`)

    // 6. Resumen final
    console.log('\n' + '='.repeat(60))
    console.log('✨ Todo configurado correctamente')
    console.log('='.repeat(60))
    console.log('\n📌 Resumen:')
    console.log(`   • Strapi: ${STRAPI_URL}`)
    console.log(`   • Favicon: ${config.favicon.name}`)
    console.log(`   • URL: ${faviconUrl}`)
    console.log('\n🚀 El favicon dinámico está funcionando correctamente')
    console.log('   Cualquier cambio en Strapi se reflejará automáticamente\n')

  } catch (error) {
    console.log('\n❌ Error inesperado:', error.message)
    process.exit(1)
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

// Ejecutar
checkFavicon()
