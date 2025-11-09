#!/bin/bash

# Script de deployment definitivo
# Strapi ya está en /home/user/htdocs/srv1072888.hstgr.cloud/
# El frontend irá en un subdirectorio separado

set -e

echo "🚀 Iniciando deployment corregido..."
echo ""

BASE_DIR="/home/user/htdocs/srv1072888.hstgr.cloud"
FRONTEND_DIR="$BASE_DIR/frontend"

# ============================================
# 1. CONFIGURAR STRAPI (ya está en BASE_DIR)
# ============================================
echo "📦 Configurando STRAPI (Backend)..."

# Detener y eliminar proceso anterior de Strapi
pm2 stop strapi 2>/dev/null || true
pm2 delete strapi 2>/dev/null || true

# Ir al directorio de Strapi
cd "$BASE_DIR"

# Verificar que existe package.json
if [ ! -f "package.json" ]; then
    echo "❌ ERROR: No se encontró package.json en $BASE_DIR"
    exit 1
fi

# Asegurar que tenemos las dependencias
echo "📥 Verificando dependencias de Strapi..."
npm ci --omit=dev 2>/dev/null || npm install --omit=dev

# Build de Strapi
echo "🔨 Haciendo build de Strapi..."
NODE_ENV=production npm run build

# Configurar variables de entorno para producción
echo "📝 Configurando .env de producción..."
cat > .env.production << 'EOF'
HOST=0.0.0.0
PORT=1337
NODE_ENV=production
APP_KEYS=$(openssl rand -base64 32)
API_TOKEN_SALT=$(openssl rand -base64 32)
ADMIN_JWT_SECRET=$(openssl rand -base64 32)
TRANSFER_TOKEN_SALT=$(openssl rand -base64 32)
JWT_SECRET=$(openssl rand -base64 32)
DATABASE_CLIENT=better-sqlite3
DATABASE_FILENAME=.tmp/data.db
EOF

# Iniciar Strapi en modo producción
echo "🚀 Iniciando Strapi en modo PRODUCCIÓN..."
cd "$BASE_DIR"
pm2 start npm --name "strapi" -- run start
pm2 save

echo "✅ Strapi configurado"
echo ""

# ============================================
# 2. CONFIGURAR NEXT.JS FRONTEND
# ============================================
echo "📦 Configurando NEXT.JS (Frontend)..."

# Detener y eliminar proceso anterior del frontend
pm2 stop monserratenses-web 2>/dev/null || true
pm2 delete monserratenses-web 2>/dev/null || true

# Crear directorio para el frontend si no existe
mkdir -p "$FRONTEND_DIR"

# Extraer el tar.gz
echo "📦 Extrayendo frontend..."
cd "$FRONTEND_DIR"
tar -xzf /root/monserratenses-web-20251024-0832.tar.gz --strip-components=0 2>/dev/null || \
tar -xzf /root/monserratenses-web-20251024-0832.tar.gz

# Instalar dependencias de producción
echo "📥 Instalando dependencias del frontend..."
npm ci --omit=dev 2>/dev/null || npm install --omit=dev

# Configurar variables de entorno
echo "📝 Configurando variables de entorno del frontend..."
cat > .env.production << 'EOF'
NEXT_PUBLIC_STRAPI_URL=https://strapi.monserratenses.org.ar
NODE_ENV=production
PORT=3001
EOF

# Iniciar Next.js
echo "🚀 Iniciando Next.js..."
cd "$FRONTEND_DIR"
pm2 start npm --name "monserratenses-web" -- start
pm2 save

echo "✅ Frontend configurado"
echo ""

# ============================================
# 3. VERIFICACIÓN
# ============================================
echo "⏳ Esperando 10 segundos para que los servicios inicien..."
sleep 10

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
STRAPI_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:1337/admin || echo "000")
if [ "$STRAPI_STATUS" = "200" ] || [ "$STRAPI_STATUS" = "302" ]; then
    echo "   ✅ Strapi: OK (código: $STRAPI_STATUS)"
else
    echo "   ⚠️  Strapi: NO RESPONDE (código: $STRAPI_STATUS)"
    echo "   Ver logs: pm2 logs strapi"
fi

# Verificar Next.js
echo "🔍 Verificando Next.js..."
NEXTJS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001 || echo "000")
if [ "$NEXTJS_STATUS" = "200" ] || [ "$NEXTJS_STATUS" = "304" ]; then
    echo "   ✅ Next.js: OK (código: $NEXTJS_STATUS)"
else
    echo "   ⚠️  Next.js: NO RESPONDE (código: $NEXTJS_STATUS)"
    echo "   Ver logs: pm2 logs monserratenses-web"
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
