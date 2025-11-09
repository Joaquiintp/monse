#!/bin/bash

# Script completo para deployment en PRODUCCIÓN
echo "🚀 Iniciando deployment completo en PRODUCCIÓN..."

BASE_DIR="/home/user/htdocs/srv1072888.hstgr.cloud"

# ==========================================
# PARTE 1: STRAPI (Backend)
# ==========================================
echo ""
echo "📦 Configurando STRAPI (Backend)..."
cd $BASE_DIR/webmonse-strapi

# Crear .env para Strapi
echo "📝 Configurando variables de entorno de Strapi..."
cat > .env << 'EOF'
HOST=0.0.0.0
PORT=1337
APP_KEYS=toBeModified1,toBeModified2
API_TOKEN_SALT=toBeModified
ADMIN_JWT_SECRET=toBeModified
TRANSFER_TOKEN_SALT=toBeModified
JWT_SECRET=toBeModified
NODE_ENV=production
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
EOF

# Build de Strapi
echo "🔨 Haciendo build de Strapi..."
NODE_ENV=production npm run build

# Detener Strapi actual
pm2 stop strapi 2>/dev/null || true
pm2 delete strapi 2>/dev/null || true

# Iniciar Strapi en producción
echo "🚀 Iniciando Strapi en modo PRODUCCIÓN..."
cd $BASE_DIR/webmonse-strapi
NODE_ENV=production pm2 start npm --name "strapi" -- run start

# ==========================================
# PARTE 2: NEXT.JS (Frontend)
# ==========================================
echo ""
echo "📦 Configurando NEXT.JS (Frontend)..."
cd $BASE_DIR

# Crear .env.production
echo "📝 Configurando variables de entorno de Next.js..."
cat > .env.production << 'EOF'
NEXT_PUBLIC_STRAPI_URL=https://strapi.monserratenses.org.ar
NODE_ENV=production
PORT=3001
EOF

# Detener frontend actual
pm2 stop monserratenses-web 2>/dev/null || true
pm2 delete monserratenses-web 2>/dev/null || true

# Iniciar Next.js
echo "🚀 Iniciando Next.js..."
cd $BASE_DIR
pm2 start npm --name "monserratenses-web" -- start

# Guardar configuración de PM2
pm2 save

# ==========================================
# VERIFICACIÓN
# ==========================================
echo ""
echo "⏳ Esperando 5 segundos para que los servicios inicien..."
sleep 5

echo ""
echo "✅ ¡Deployment completado!"
echo ""
echo "📊 Estado de las aplicaciones:"
pm2 list

echo ""
echo "🧪 Verificando servicios..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Verificar Strapi
echo "🔍 Verificando Strapi..."
STRAPI_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:1337/api/noticias?pagination[limit]=1)
if [ "$STRAPI_STATUS" = "200" ]; then
    echo "   ✅ Strapi: FUNCIONANDO (puerto 1337)"
else
    echo "   ⚠️  Strapi: NO RESPONDE (código: $STRAPI_STATUS)"
fi

# Verificar Next.js
echo "🔍 Verificando Next.js..."
NEXTJS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001)
if [ "$NEXTJS_STATUS" = "200" ]; then
    echo "   ✅ Next.js: FUNCIONANDO (puerto 3001)"
else
    echo "   ⚠️  Next.js: NO RESPONDE (código: $NEXTJS_STATUS)"
fi

echo ""
echo "🌐 URLs de acceso:"
echo "   Frontend: http://168.231.99.125:3001"
echo "   Frontend: https://monserratenses.org.ar"
echo "   Strapi Admin: https://strapi.monserratenses.org.ar/admin"
echo ""
echo "📝 Comandos útiles:"
echo "   Ver logs Strapi:   pm2 logs strapi"
echo "   Ver logs Frontend: pm2 logs monserratenses-web"
echo "   Reiniciar todo:    pm2 restart all"
echo "   Estado:            pm2 status"
