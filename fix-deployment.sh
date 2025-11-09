#!/bin/bash

# Script de corrección para deployment en /home
# Ejecutar en el servidor VPS

echo "🔧 Corrigiendo ubicación del deployment..."

# Configuración
NEW_APP_DIR="/home/monserratenses-web"
TAR_FILE="/root/monserratenses-web-20251024-0832.tar.gz"

# Crear usuario monserrat si no existe (opcional, para mejor seguridad)
# useradd -m -s /bin/bash monserrat || true

# Crear directorio en /home
echo "📁 Creando directorio en /home..."
mkdir -p $NEW_APP_DIR
cd $NEW_APP_DIR

# Extraer archivos
echo "📦 Extrayendo archivos..."
tar -xzf $TAR_FILE -C $NEW_APP_DIR

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

# Verificar que Strapi está corriendo
echo ""
echo "🔍 Verificando Strapi..."
curl -s https://strapi.monserratenses.org.ar/api/noticias?pagination[limit]=1 > /dev/null
if [ $? -eq 0 ]; then
    echo "✅ Strapi está respondiendo correctamente"
else
    echo "⚠️  Advertencia: Strapi no responde en https://strapi.monserratenses.org.ar"
    echo "   Verifica que Strapi esté corriendo con: pm2 status"
fi

# Detener y eliminar instancia anterior
echo ""
echo "🛑 Deteniendo instancia anterior..."
pm2 stop monserratenses-web 2>/dev/null || true
pm2 delete monserratenses-web 2>/dev/null || true

# Iniciar con PM2 desde el nuevo directorio
echo "🚀 Iniciando aplicación..."
cd $NEW_APP_DIR
pm2 start npm --name "monserratenses-web" -- start
pm2 save

echo ""
echo "✅ ¡Deployment corregido!"
echo ""
echo "📊 Estado actual:"
pm2 list

echo ""
echo "🌐 URLs:"
echo "   Frontend: http://168.231.99.125:3001"
echo "   Strapi:   https://strapi.monserratenses.org.ar"
echo ""
echo "📝 Comandos útiles:"
echo "   Ver logs frontend: pm2 logs monserratenses-web"
echo "   Ver logs Strapi:   pm2 logs strapi"
echo "   Reiniciar todo:    pm2 restart all"
