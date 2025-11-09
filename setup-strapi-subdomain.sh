#!/bin/bash

# Script para configurar el subdominio strapi.monserratenses.org.ar
echo "🚀 Configurando subdominio strapi.monserratenses.org.ar..."

# Variables
DOMAIN="strapi.monserratenses.org.ar"
STRAPI_PORT="1337"
NGINX_CONFIG="/etc/nginx/sites-available/$DOMAIN"
EMAIL="admin@monserratenses.org.ar"  # Cambia esto por tu email real

# Verificar si Nginx está instalado
if ! command -v nginx &> /dev/null; then
    echo "❌ Nginx no está instalado. Instalando..."
    apt update
    apt install -y nginx
fi

# Verificar si certbot está instalado
if ! command -v certbot &> /dev/null; then
    echo "📦 Instalando Certbot para SSL..."
    apt install -y certbot python3-certbot-nginx
fi

# Crear configuración de Nginx para el subdominio
echo "📝 Creando configuración de Nginx..."
cat > $NGINX_CONFIG << 'EOF'
server {
    listen 80;
    server_name strapi.monserratenses.org.ar;

    # Logs
    access_log /var/log/nginx/strapi.access.log;
    error_log /var/log/nginx/strapi.error.log;

    # Proxy a Strapi
    location / {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Aumentar timeouts para uploads grandes
        proxy_read_timeout 600s;
        proxy_connect_timeout 600s;
        proxy_send_timeout 600s;
        
        # Aumentar tamaño máximo de subida
        client_max_body_size 100M;
    }
}
EOF

# Crear symlink en sites-enabled
echo "🔗 Habilitando sitio..."
ln -sf $NGINX_CONFIG /etc/nginx/sites-enabled/

# Verificar configuración de Nginx
echo "✅ Verificando configuración de Nginx..."
nginx -t

if [ $? -ne 0 ]; then
    echo "❌ Error en la configuración de Nginx. Revisa los logs."
    exit 1
fi

# Recargar Nginx
echo "🔄 Recargando Nginx..."
systemctl reload nginx

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Configuración inicial completada!"
echo ""
echo "🔍 Verifica que el DNS esté propagado:"
echo "   ping strapi.monserratenses.org.ar"
echo ""
echo "Una vez que el DNS responda, ejecuta:"
echo "   certbot --nginx -d strapi.monserratenses.org.ar --email $EMAIL --agree-tos --no-eff-email"
echo ""
echo "Esto instalará el certificado SSL (HTTPS) automáticamente."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
