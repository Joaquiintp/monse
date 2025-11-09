#!/bin/bash

# Script para iniciar Strapi y Next.js en desarrollo
# Uso: ./start-dev.sh

echo "🚀 Iniciando servicios de desarrollo..."
echo ""

# Colores para el output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para manejar Ctrl+C
cleanup() {
    echo ""
    echo -e "${YELLOW}⏹️  Deteniendo servicios...${NC}"
    kill $STRAPI_PID $NEXTJS_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Verificar si existe .env.local
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}⚠️  No se encontró .env.local${NC}"
    echo "Creando .env.local con configuración por defecto..."
    cat > .env.local << EOF
# Strapi Configuration
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
EOF
    echo -e "${GREEN}✅ .env.local creado${NC}"
fi

# Iniciar Strapi en segundo plano
echo -e "${BLUE}📦 Iniciando Strapi en http://localhost:1337...${NC}"
cd webmonse-strapi
npm run develop > ../strapi.log 2>&1 &
STRAPI_PID=$!
cd ..

# Esperar a que Strapi inicie
echo "⏳ Esperando a que Strapi esté listo..."
sleep 10

# Iniciar Next.js en segundo plano
echo -e "${BLUE}⚛️  Iniciando Next.js en http://localhost:3000...${NC}"
npm run dev > nextjs.log 2>&1 &
NEXTJS_PID=$!

echo ""
echo -e "${GREEN}✅ Servicios iniciados:${NC}"
echo -e "   🔧 Strapi Admin: ${BLUE}http://localhost:1337/admin${NC}"
echo -e "   🌐 Next.js App:  ${BLUE}http://localhost:3000${NC}"
echo ""
echo -e "${YELLOW}📝 Logs:${NC}"
echo -e "   Strapi: tail -f strapi.log"
echo -e "   Next.js: tail -f nextjs.log"
echo ""
echo -e "${YELLOW}Presiona Ctrl+C para detener todos los servicios${NC}"
echo ""

# Mostrar logs en tiempo real de ambos servicios
tail -f strapi.log -f nextjs.log
