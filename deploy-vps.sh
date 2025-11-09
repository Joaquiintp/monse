#!/bin/bash

# Script de deployment para VPS
# Ejecutar en el servidor VPS

echo "🚀 Iniciando deployment de Monserratenses Web..."

# Configuración
APP_DIR="/var/www/monserratenses"
BACKUP_DIR="/root/backups"
TAR_FILE="/root/monserratenses-web-20251024-0832.tar.gz"

# Crear directorio de backup si no existe
mkdir -p $BACKUP_DIR

# Backup del sitio actual (si existe)
if [ -d "$APP_DIR" ]; then
    echo "📦 Creando backup del sitio actual..."
    TIMESTAMP=$(date +%Y%m%d-%H%M%S)
    tar -czf "$BACKUP_DIR/monserratenses-backup-$TIMESTAMP.tar.gz" -C "$APP_DIR" . 2>/dev/null || true
    echo "✅ Backup creado: monserratenses-backup-$TIMESTAMP.tar.gz"
fi

# Detener PM2 si está corriendo
echo "🛑 Deteniendo aplicación actual..."
pm2 stop monserratenses-web 2>/dev/null || true
pm2 delete monserratenses-web 2>/dev/null || true

# Crear/limpiar directorio de la aplicación
echo "📁 Preparando directorio de la aplicación..."
mkdir -p $APP_DIR
cd $APP_DIR

# Extraer el nuevo build
echo "📦 Extrayendo archivos..."
tar -xzf $TAR_FILE -C $APP_DIR

# Instalar dependencias de producción
echo "📥 Instalando dependencias..."
npm ci --omit=dev

# Crear archivo .env.production si no existe
if [ ! -f ".env.production" ]; then
    echo "📝 Creando archivo .env.production..."
    cat > .env.production << 'EOF'
NEXT_PUBLIC_STRAPI_URL=https://strapi.monserratenses.org.ar
NODE_ENV=production
PORT=3001
EOF
fi

# Iniciar con PM2
echo "🚀 Iniciando aplicación con PM2..."
pm2 start npm --name "monserratenses-web" -- start
pm2 save

echo ""
echo "✅ ¡Deployment completado!"
echo ""
echo "📊 Estado de la aplicación:"
pm2 status

echo ""
echo "🌐 El sitio debería estar disponible en:"
echo "   http://168.231.99.125:3001"
echo ""
echo "📝 Para ver logs: pm2 logs monserratenses-web"
echo "🔄 Para reiniciar: pm2 restart monserratenses-web"
echo "🛑 Para detener: pm2 stop monserratenses-web"
