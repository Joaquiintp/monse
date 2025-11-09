#!/bin/bash

echo "🔍 Diagnóstico de Conexión Strapi-Frontend"
echo "=========================================="
echo ""

# 1. Verificar variable de entorno
echo "1️⃣ Variable de entorno NEXT_PUBLIC_STRAPI_URL:"
if [ -z "$NEXT_PUBLIC_STRAPI_URL" ]; then
    echo "   ❌ No está configurada"
else
    echo "   ✅ $NEXT_PUBLIC_STRAPI_URL"
fi
echo ""

# 2. Verificar archivo .env
echo "2️⃣ Archivo .env.local:"
if [ -f .env.local ]; then
    echo "   ✅ Existe"
    grep "NEXT_PUBLIC_STRAPI_URL" .env.local || echo "   ⚠️  Variable no encontrada en .env.local"
else
    echo "   ❌ No existe .env.local"
fi
echo ""

echo "3️⃣ Archivo .env:"
if [ -f .env ]; then
    echo "   ✅ Existe"
    grep "NEXT_PUBLIC_STRAPI_URL" .env || echo "   ⚠️  Variable no encontrada en .env"
else
    echo "   ❌ No existe .env"
fi
echo ""

# 4. Probar conexión a Strapi
echo "4️⃣ Prueba de conexión a Strapi:"
STRAPI_URLS=(
    "http://localhost:1337"
    "http://168.231.99.125:1337"
    "https://strapi.monserratenses.org.ar"
)

for url in "${STRAPI_URLS[@]}"; do
    echo -n "   Probando $url ... "
    if curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$url/_health" | grep -q "200\|204"; then
        echo "✅ Funciona"
    else
        echo "❌ No responde"
    fi
done
echo ""

# 5. Probar endpoint de noticias
echo "5️⃣ Probando endpoint /api/noticias:"
STRAPI_URL="http://168.231.99.125:1337"
response=$(curl -s "$STRAPI_URL/api/noticias?pagination[limit]=1")
if echo "$response" | grep -q "data"; then
    count=$(echo "$response" | grep -o '"id":' | wc -l)
    echo "   ✅ Endpoint funciona - $(echo $count | xargs) noticia(s) encontrada(s)"
else
    echo "   ❌ No se pudo acceder al endpoint"
    echo "   Respuesta: $response"
fi
echo ""

echo "=========================================="
echo "📋 RECOMENDACIÓN:"
echo ""
echo "En el VPS, asegúrate de tener un archivo .env.local con:"
echo "NEXT_PUBLIC_STRAPI_URL=http://168.231.99.125:1337"
echo ""
echo "Luego reinicia el servicio de Next.js:"
echo "pm2 restart monserratenses-web"
