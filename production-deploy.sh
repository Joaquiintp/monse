#!/bin/bash

echo "🚀 Configurando TODO en modo PRODUCCIÓN..."
echo "================================================"

# Directorio base
BASE_DIR="/home/user/htdocs/srv1072888.hstgr.cloud"
cd $BASE_DIR

echo ""
echo "📍 Trabajando en: $BASE_DIR"
echo ""

# ============================================
# PARTE 1: STRAPI EN PRODUCCIÓN
# ============================================
echo "🔧 CONFIGURANDO STRAPI..."

cd $BASE_DIR/webmonse-strapi

# Crear archivo .env para producción
echo "📝 Creando .env de Strapi..."
cat > .env << 'EOF'
HOST=0.0.0.0
PORT=1337
APP_KEYS=toBeModified1,toBeModified2
API_TOKEN_SALT=toBeModified
ADMIN_JWT_SECRET=toBeModified
TRANSFER_TOKEN_SALT=toBeModified
JWT_SECRET=toBeModified
NODE_ENV=production
DATABASE_CLIENT=better-sqlite3
DATABASE_FILENAME=.tmp/data.db
EOF

# Build de Strapi
echo "🏗️  Haciendo build de Strapi..."
npm run build

# Detener Strapi anterior
echo "🛑 Deteniendo Strapi anterior..."
pm2 stop strapi 2>/dev/null || true
pm2 delete strapi 2>/dev/null || true

# Iniciar Strapi en PRODUCCIÓN
echo "🚀 Iniciando Strapi en modo PRODUCCIÓN..."
cd $BASE_DIR/webmonse-strapi
NODE_ENV=production pm2 start npm --name "strapi" -- run start
pm2 save

echo "✅ Strapi configurado"
sleep 3

# ============================================
# PARTE 2: FRONTEND EN PRODUCCIÓN
# ============================================
echo ""
echo "🔧 CONFIGURANDO FRONTEND..."

cd $BASE_DIR

# Crear .env.production para Next.js
echo "📝 Creando .env.production..."
cat > .env.production << 'EOF'
NEXT_PUBLIC_STRAPI_URL=https://strapi.monserratenses.org.ar
NODE_ENV=production
PORT=3001
EOF

# Detener frontend anterior
echo "🛑 Deteniendo frontend anterior..."
pm2 stop monserratenses-web 2>/dev/null || true
pm2 delete monserratenses-web 2>/dev/null || true

# Iniciar frontend en PRODUCCIÓN
echo "🚀 Iniciando frontend en modo PRODUCCIÓN..."
cd $BASE_DIR
NODE_ENV=production pm2 start npm --name "monserratenses-web" -- start
pm2 save

echo "✅ Frontend configurado"

# ============================================
# VERIFICACIÓN
# ============================================
echo ""
echo "================================================"
echo "🧪 VERIFICANDO CONFIGURACIÓN..."
echo ""

# Esperar que todo inicie
sleep 5

# Ver estado de PM2
echo "📊 Estado de las aplicaciones:"
pm2 list

echo ""
echo "🔍 Verificando Strapi..."
STRAPI_CHECK=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:1337/api/noticias?pagination[limit]=1)
if [ "$STRAPI_CHECK" = "200" ]; then
    echo "✅ Strapi respondiendo correctamente (HTTP 200)"
else
    echo "⚠️  Strapi responde con código: $STRAPI_CHECK"
fi

echo ""
echo "🔍 Verificando Frontend..."
FRONTEND_CHECK=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001)
if [ "$FRONTEND_CHECK" = "200" ]; then
    echo "✅ Frontend respondiendo correctamente (HTTP 200)"
else
    echo "⚠️  Frontend responde con código: $FRONTEND_CHECK"
fi

echo ""
echo "================================================"
echo "✅ ¡DEPLOYMENT COMPLETADO!"
echo ""
echo "🌐 URLs:"
echo "   Frontend: http://168.231.99.125:3001"
echo "   Frontend: https://monserratenses.org.ar"
echo "   Strapi API: https://strapi.monserratenses.org.ar"
echo "   Strapi Admin: https://strapi.monserratenses.org.ar/admin"
echo ""
echo "📝 Comandos útiles:"
echo "   Ver logs Strapi:    pm2 logs strapi --lines 50"
echo "   Ver logs Frontend:  pm2 logs monserratenses-web --lines 50"
echo "   Reiniciar todo:     pm2 restart all"
echo "   Ver estado:         pm2 status"
echo ""
