#!/bin/bash
# Script para detectar configuración del VPS
# Ejecuta esto en tu VPS para ver qué tienes instalado

echo "🔍 DETECTANDO CONFIGURACIÓN DEL VPS"
echo "=================================="
echo ""

# Sistema operativo
echo "📌 Sistema Operativo:"
cat /etc/os-release | grep PRETTY_NAME
echo ""

# Node.js
echo "📌 Node.js:"
if command -v node &> /dev/null; then
    echo "✅ Node.js instalado: $(node --version)"
else
    echo "❌ Node.js NO instalado"
fi
echo ""

# NPM
echo "📌 NPM:"
if command -v npm &> /dev/null; then
    echo "✅ NPM instalado: $(npm --version)"
else
    echo "❌ NPM NO instalado"
fi
echo ""

# PM2
echo "📌 PM2:"
if command -v pm2 &> /dev/null; then
    echo "✅ PM2 instalado: $(pm2 --version)"
    echo "📊 Procesos PM2 activos:"
    pm2 list
else
    echo "❌ PM2 NO instalado"
fi
echo ""

# Nginx
echo "📌 Nginx:"
if command -v nginx &> /dev/null; then
    echo "✅ Nginx instalado: $(nginx -v 2>&1)"
    echo "📊 Estado de Nginx:"
    sudo systemctl status nginx --no-pager | head -5
else
    echo "❌ Nginx NO instalado"
fi
echo ""

# Buscar Strapi
echo "📌 Buscando instalaciones de Strapi:"
echo "Buscando en directorios comunes..."
find /home -name "strapi" -type d 2>/dev/null | head -5
find /var/www -name "strapi" -type d 2>/dev/null | head -5
find /opt -name "strapi" -type d 2>/dev/null | head -5
find /root -name "strapi" -type d 2>/dev/null | head -5
echo ""

# Procesos corriendo en puerto 1337
echo "📌 ¿Algo corriendo en puerto 1337? (Strapi)"
sudo lsof -i :1337 2>/dev/null || echo "Nada en puerto 1337"
echo ""

# Procesos corriendo en puerto 3000
echo "📌 ¿Algo corriendo en puerto 3000? (Next.js)"
sudo lsof -i :3000 2>/dev/null || echo "Nada en puerto 3000"
echo ""

# Espacio en disco
echo "📌 Espacio en disco:"
df -h / | tail -1
echo ""

# Memoria
echo "📌 Memoria disponible:"
free -h | grep Mem
echo ""

echo "=================================="
echo "✅ DETECCIÓN COMPLETADA"
echo ""
echo "📋 Copia este output y envíamelo"
