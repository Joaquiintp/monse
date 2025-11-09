#!/bin/bash

# Script para mover frontend a la ubicación correcta
echo "🚀 Moviendo frontend a /home/user/htdocs/srv1072888.hstgr.cloud..."

# Ir al directorio correcto
cd /home/user/htdocs/srv1072888.hstgr.cloud

# Copiar el tar.gz desde /root
echo "📦 Copiando archivo..."
cp /root/monserratenses-web-20251024-0832.tar.gz .

# Extraer
echo "📂 Extrayendo archivos..."
tar -xzf monserratenses-web-20251024-0832.tar.gz

# Instalar dependencias
echo "📥 Instalando dependencias..."
npm ci --omit=dev

# Crear .env.production
echo "📝 Creando .env.production..."
cat > .env.production << 'EOF'
NEXT_PUBLIC_STRAPI_URL=https://strapi.monserratenses.org.ar
NODE_ENV=production
PORT=3001
EOF

# Detener el frontend actual
echo "🛑 Deteniendo frontend actual..."
pm2 stop monserratenses-web 2>/dev/null || true
pm2 delete monserratenses-web 2>/dev/null || true

# Iniciar desde la nueva ubicación
echo "🚀 Iniciando frontend..."
pm2 start npm --name "monserratenses-web" -- start
pm2 save

echo ""
echo "✅ ¡Completado!"
echo ""
echo "📊 Estado de las aplicaciones:"
pm2 list

echo ""
echo "🌐 Accede a: http://168.231.99.125:3001"
echo "📝 Ver logs: pm2 logs monserratenses-web"
