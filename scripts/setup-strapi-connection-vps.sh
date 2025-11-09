#!/bin/bash

# Script para configurar la conexión Strapi-Frontend en el VPS
# Copia y pega este contenido completo en el terminal del VPS

echo "🔧 Configurando conexión Frontend → Strapi"
echo "=========================================="
echo ""

# Ir al directorio del frontend
cd /home/user/htdocs/srv1072888.hstgr.cloud/frontend/ || {
    echo "❌ Error: No se pudo acceder al directorio del frontend"
    exit 1
}

echo "📍 Directorio actual: $(pwd)"
echo ""

# Crear archivo .env.local
echo "1️⃣ Creando archivo .env.local..."
cat > .env.local << 'EOF'
# Configuración de Strapi
NEXT_PUBLIC_STRAPI_URL=http://168.231.99.125:1337
EOF

echo "✅ Archivo .env.local creado"
echo ""

# Verificar contenido
echo "2️⃣ Contenido del archivo .env.local:"
cat .env.local
echo ""

# Verificar que Strapi esté corriendo
echo "3️⃣ Verificando que Strapi esté activo..."
if curl -s -f http://localhost:1337/_health > /dev/null; then
    echo "✅ Strapi está corriendo"
else
    echo "⚠️  Strapi no responde. Verificando procesos PM2..."
    pm2 list | grep strapi
fi
echo ""

# Probar endpoint de noticias
echo "4️⃣ Probando endpoint de noticias..."
response=$(curl -s "http://localhost:1337/api/noticias?pagination[limit]=1")
if echo "$response" | grep -q '"data"'; then
    echo "✅ Endpoint de noticias funciona correctamente"
    # Contar noticias
    total=$(curl -s "http://localhost:1337/api/noticias?pagination[limit]=1" | grep -o '"total":[0-9]*' | cut -d':' -f2)
    echo "   Total de noticias en Strapi: $total"
else
    echo "❌ Error al acceder al endpoint de noticias"
    echo "   Respuesta: $response"
fi
echo ""

# Reiniciar servicio de Next.js
echo "5️⃣ Reiniciando servicio de Next.js..."
pm2 restart monserratenses-web
echo ""

# Esperar un poco
echo "⏳ Esperando que el servicio inicie..."
sleep 3
echo ""

# Ver estado de servicios
echo "6️⃣ Estado de servicios PM2:"
pm2 list
echo ""

# Ver logs recientes
echo "7️⃣ Logs recientes de Next.js:"
pm2 logs monserratenses-web --lines 20 --nostream
echo ""

echo "=========================================="
echo "✨ Configuración completada"
echo ""
echo "📋 Próximos pasos:"
echo "1. Abre tu sitio: http://168.231.99.125:3001/noticias"
echo "   (o https://monserratenses.org.ar/noticias)"
echo ""
echo "2. Verifica que las noticias nuevas aparezcan"
echo ""
echo "3. Si no aparecen, verifica los logs:"
echo "   pm2 logs monserratenses-web"
echo ""
echo "4. Para ver logs en tiempo real:"
echo "   pm2 logs monserratenses-web --lines 50"
