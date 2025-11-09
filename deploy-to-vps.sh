#!/bin/bash

# Script de Deployment Automático para VPS
# Monserratenses - Frontend Next.js

set -e  # Detener si hay errores

echo "🚀 ============================================"
echo "   DEPLOYMENT MONSERRATENSES FRONTEND"
echo "============================================"
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Configuración
FRONTEND_DIR="/home/user/htdocs/monserratenses-frontend"
STRAPI_DIR="/home/user/htdocs/srv1072888.hstgr.cloud"
DOMAIN="monserratenses.org.ar"

echo -e "${GREEN}📋 Configuración:${NC}"
echo "Frontend: $FRONTEND_DIR"
echo "Strapi: $STRAPI_DIR"
echo "Dominio: $DOMAIN"
echo ""

# Paso 1: Crear directorio para el frontend
echo -e "${YELLOW}📁 Paso 1: Creando directorio para el frontend...${NC}"
mkdir -p $FRONTEND_DIR
cd $FRONTEND_DIR
echo -e "${GREEN}✅ Directorio creado${NC}"
echo ""

# Paso 2: Subir archivos
echo -e "${YELLOW}📦 Paso 2: Esperando archivos...${NC}"
echo ""
echo "Desde tu Mac, ejecuta este comando:"
echo -e "${GREEN}cd /Users/joaquinrodriguez/Desktop/webmonse${NC}"
echo -e "${GREEN}tar -czf monserratenses-web.tar.gz .next package.json package-lock.json next.config.js public src${NC}"
echo -e "${GREEN}scp monserratenses-web.tar.gz root@168.231.99.125:$FRONTEND_DIR/${NC}"
echo ""
read -p "Presiona Enter cuando hayas subido el archivo..."

# Paso 3: Descomprimir archivos
if [ -f "monserratenses-web.tar.gz" ]; then
    echo -e "${YELLOW}📦 Paso 3: Descomprimiendo archivos...${NC}"
    tar -xzf monserratenses-web.tar.gz
    rm monserratenses-web.tar.gz
    echo -e "${GREEN}✅ Archivos descomprimidos${NC}"
else
    echo -e "${RED}❌ Error: No se encontró el archivo monserratenses-web.tar.gz${NC}"
    echo "Asegúrate de subirlo a: $FRONTEND_DIR/"
    exit 1
fi
echo ""

# Paso 4: Crear archivo .env.production
echo -e "${YELLOW}🔐 Paso 4: Creando variables de entorno...${NC}"
cat > .env.production << EOF
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NODE_ENV=production
EOF
echo -e "${GREEN}✅ Variables de entorno configuradas${NC}"
echo ""

# Paso 5: Instalar dependencias
echo -e "${YELLOW}📚 Paso 5: Instalando dependencias...${NC}"
npm install --production
echo -e "${GREEN}✅ Dependencias instaladas${NC}"
echo ""

# Paso 6: Iniciar con PM2
echo -e "${YELLOW}🚀 Paso 6: Iniciando aplicación con PM2...${NC}"

# Detener si ya existe
pm2 delete monserratenses-web 2>/dev/null || true

# Iniciar nueva instancia
pm2 start npm --name "monserratenses-web" -- start

# Guardar configuración PM2
pm2 save

echo -e "${GREEN}✅ Aplicación iniciada en PM2${NC}"
echo ""

# Paso 7: Configurar Nginx
echo -e "${YELLOW}🌐 Paso 7: Configurando Nginx...${NC}"

# Backup de configuración anterior si existe
if [ -f "/etc/nginx/sites-available/monserratenses" ]; then
    cp /etc/nginx/sites-available/monserratenses /etc/nginx/sites-available/monserratenses.backup
fi

# Crear configuración de Nginx
cat > /etc/nginx/sites-available/monserratenses << 'NGINXCONF'
server {
    listen 80;
    server_name monserratenses.org.ar www.monserratenses.org.ar;

    # Logs
    access_log /var/log/nginx/monserratenses-access.log;
    error_log /var/log/nginx/monserratenses-error.log;

    # Next.js Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts
        proxy_connect_timeout 600;
        proxy_send_timeout 600;
        proxy_read_timeout 600;
        send_timeout 600;
    }

    # Static files de Next.js
    location /_next/static {
        proxy_pass http://localhost:3000/_next/static;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Public files
    location /images {
        proxy_pass http://localhost:3000/images;
        expires 1y;
        add_header Cache-Control "public";
    }
}
NGINXCONF

# Activar sitio
ln -sf /etc/nginx/sites-available/monserratenses /etc/nginx/sites-enabled/

# Verificar configuración
if nginx -t; then
    echo -e "${GREEN}✅ Configuración de Nginx válida${NC}"
    systemctl reload nginx
    echo -e "${GREEN}✅ Nginx recargado${NC}"
else
    echo -e "${RED}❌ Error en configuración de Nginx${NC}"
    exit 1
fi
echo ""

# Paso 8: Verificar que todo funciona
echo -e "${YELLOW}🔍 Paso 8: Verificando servicios...${NC}"
echo ""

echo "PM2 Status:"
pm2 status
echo ""

echo "Nginx Status:"
systemctl status nginx --no-pager | head -5
echo ""

echo "Puerto 3000 (Next.js):"
netstat -tulpn | grep :3000
echo ""

echo "Puerto 1337 (Strapi):"
netstat -tulpn | grep :1337
echo ""

# Resumen final
echo -e "${GREEN}🎉 ============================================${NC}"
echo -e "${GREEN}   DEPLOYMENT COMPLETADO${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""
echo -e "${YELLOW}📋 Próximos pasos:${NC}"
echo ""
echo "1️⃣  Configurar DNS en Hostinger:"
echo "   - Tipo: A"
echo "   - Nombre: @"
echo "   - Apunta a: 168.231.99.125"
echo "   - TTL: 3600"
echo ""
echo "   - Tipo: A"
echo "   - Nombre: www"
echo "   - Apunta a: 168.231.99.125"
echo "   - TTL: 3600"
echo ""
echo "2️⃣  Instalar SSL (HTTPS):"
echo "   sudo apt install certbot python3-certbot-nginx -y"
echo "   sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo ""
echo "3️⃣  Verificar funcionamiento:"
echo "   - Local: curl http://localhost:3000"
echo "   - Remoto (después de DNS): http://$DOMAIN"
echo ""
echo -e "${GREEN}✅ Tu sitio estará funcionando en:${NC}"
echo "   http://$DOMAIN (después de configurar DNS)"
echo ""
echo -e "${YELLOW}📊 Comandos útiles:${NC}"
echo "   pm2 logs monserratenses-web    # Ver logs"
echo "   pm2 restart monserratenses-web # Reiniciar"
echo "   pm2 status                     # Ver estado"
echo ""
