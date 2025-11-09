#!/bin/bash

# Script para configurar CORS en Strapi
# Ejecutar en el servidor VPS

echo "🔧 Configurando CORS en Strapi..."

STRAPI_DIR="/home/strapi/webmonse-strapi"

if [ ! -d "$STRAPI_DIR" ]; then
    echo "❌ No se encuentra el directorio de Strapi en $STRAPI_DIR"
    exit 1
fi

cd $STRAPI_DIR

# Backup del archivo de configuración
echo "📦 Creando backup de la configuración..."
cp config/middlewares.js config/middlewares.js.backup-$(date +%Y%m%d-%H%M) 2>/dev/null || true

# Crear/actualizar configuración de middlewares con CORS
echo "📝 Actualizando configuración de CORS..."
cat > config/middlewares.js << 'EOF'
module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'strapi.monserratenses.org.ar',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'strapi.monserratenses.org.ar',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        'http://localhost:3001',
        'http://localhost:3000',
        'http://168.231.99.125:3001',
        'https://monserratenses.org.ar',
        'http://monserratenses.org.ar',
        'https://www.monserratenses.org.ar',
        'http://www.monserratenses.org.ar',
        'https://strapi.monserratenses.org.ar',
      ],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
EOF

echo "✅ Configuración de CORS actualizada"

# Reiniciar Strapi
echo "🔄 Reiniciando Strapi..."
pm2 restart strapi

echo ""
echo "⏳ Esperando que Strapi se reinicie..."
sleep 5

# Verificar que Strapi esté corriendo
echo "🔍 Verificando estado de Strapi..."
pm2 list | grep strapi

echo ""
echo "✅ ¡Configuración completada!"
echo ""
echo "🧪 Prueba desde el navegador:"
echo "   1. Abre: https://monserratenses.org.ar"
echo "   2. Abre la consola del navegador (F12)"
echo "   3. Las noticias deberían cargar sin errores de CORS"
echo ""
echo "📝 Para ver los logs de Strapi:"
echo "   pm2 logs strapi --lines 100"
