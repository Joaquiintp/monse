#!/bin/bash

# Script para iniciar Strapi en modo DESARROLLO
# Úsalo solo cuando necesites desarrollar

echo "🛠️  Iniciando Strapi en modo DESARROLLO..."

ssh root@168.231.99.125 << 'ENDSSH'
cd /home/user/htdocs/srv1072888.hstgr.cloud/strapi-backend

# Detener producción
pm2 delete strapi 2>/dev/null

# Crear vite.config.mjs para desarrollo
cat > vite.config.mjs << 'EOF'
import { mergeConfig, defineConfig } from 'vite';

export default defineConfig((config) => {
  return mergeConfig(config, {
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: false,
      hmr: {
        protocol: 'wss',
        clientPort: 443,
        host: 'strapi.monserratenses.org.ar',
      },
    },
  });
});
EOF

# Iniciar en desarrollo
NODE_ENV=development pm2 start npm --name strapi -- run develop
pm2 save
pm2 logs strapi --lines 20

ENDSSH

echo ""
echo "✅ Strapi iniciado en modo DESARROLLO"
echo "📝 Accede a: https://strapi.monserratenses.org.ar/admin"
echo "⚠️  Nota: En desarrollo Vite puede tardar más en cargar"
