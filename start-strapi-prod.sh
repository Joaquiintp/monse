#!/bin/bash

# Script para iniciar Strapi en modo PRODUCCIÓN (normal)
echo "🚀 Iniciando Strapi en modo PRODUCCIÓN..."

ssh root@168.231.99.125 << 'ENDSSH'
cd /home/user/htdocs/srv1072888.hstgr.cloud/strapi-backend

# Detener desarrollo si está corriendo
pm2 delete strapi 2>/dev/null

# Eliminar vite.config.mjs si existe
rm -f vite.config.mjs vite.config.js

# Rebuild para producción
NODE_ENV=production npm run build

# Iniciar en producción
NODE_ENV=production pm2 start npm --name strapi -- run start
pm2 save
pm2 list

ENDSSH

echo ""
echo "✅ Strapi iniciado en modo PRODUCCIÓN"
echo "📝 Accede a: https://strapi.monserratenses.org.ar/admin"
