#!/bin/bash

# Script para preparar el deployment en Hostinger
# Nota: Este script prepara los archivos, pero Hostinger necesita Node.js para servir Next.js
# Se recomienda usar un servicio como Railway o Vercel para despliegue automático

echo "🚀 Preparando deployment para Hostinger..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar que existe el build
if [ ! -d ".next" ]; then
    echo -e "${RED}❌ Error: No existe el directorio .next${NC}"
    echo -e "${YELLOW}Por favor ejecuta 'npm run build' primero${NC}"
    exit 1
fi

# Crear directorio de deployment
echo "📁 Creando directorio de deployment..."
rm -rf deploy-hostinger
mkdir -p deploy-hostinger

# Copiar archivos necesarios para Next.js standalone
echo "📦 Copiando archivos de build..."

# Copiar .next completo
cp -r .next deploy-hostinger/

# Copiar archivos estáticos públicos
echo "🖼️  Copiando archivos públicos..."
cp -r public deploy-hostinger/

# Copiar package.json y package-lock.json
cp package.json deploy-hostinger/
cp package-lock.json deploy-hostinger/

# Copiar next.config.js
cp next.config.js deploy-hostinger/

# Copiar archivo de variables de entorno (si existe)
if [ -f ".env.local" ]; then
    cp .env.local deploy-hostinger/.env.production
    echo "🔐 Variables de entorno copiadas"
fi

# Copiar favicon al root
if [ -f "src/app/icon.svg" ]; then
    cp src/app/icon.svg deploy-hostinger/favicon.svg
    echo "✅ Favicon copiado"
fi

# Crear archivo README para deployment
cat > deploy-hostinger/README-DEPLOYMENT.md << 'EOF'
# Deployment en Hostinger

## ⚠️ IMPORTANTE: Next.js requiere Node.js

Este es un build de Next.js que **requiere un servidor Node.js** para funcionar.

Hostinger tradicional (hosting compartido) **NO soporta Node.js**.

## Opciones de Deployment:

### Opción 1: Railway (Recomendado) ✅
1. Sube el código a GitHub
2. Conecta Railway a tu repositorio
3. Railway detectará automáticamente Next.js
4. Configurar variables de entorno en Railway

### Opción 2: Vercel (Gratis para proyectos personales) ✅
1. `npm install -g vercel`
2. `vercel login`
3. `vercel` (desde la raíz del proyecto)

### Opción 3: Hostinger VPS ⚠️
Si tienes un VPS en Hostinger (no hosting compartido):

1. Conectarse al VPS por SSH
2. Instalar Node.js 18+
3. Subir estos archivos al VPS
4. Ejecutar:
   ```bash
   npm install --production
   npm start
   ```
5. Configurar PM2 para mantener el proceso activo:
   ```bash
   npm install -g pm2
   pm2 start npm --name "monserratenses" -- start
   pm2 save
   pm2 startup
   ```

### Opción 4: Exportar como HTML estático ⚠️
Si realmente necesitas HTML estático (sin funcionalidades dinámicas):
1. Modificar `next.config.js`: agregar `output: 'export'`
2. Ejecutar `npm run build`
3. Los archivos estarán en la carpeta `out/`
4. **LIMITACIÓN**: No funcionarán las rutas dinámicas con datos de Strapi en tiempo real

## Variables de Entorno Necesarias:

```env
NEXT_PUBLIC_STRAPI_URL=http://168.231.99.125:1337
```

## Comandos de Deployment:

### Para desarrollo local:
```bash
npm run dev
```

### Para producción:
```bash
npm install --production
npm start
```

### Para ver los logs (con PM2):
```bash
pm2 logs monserratenses
```
EOF

# Crear archivo de instrucciones rápidas
cat > deploy-hostinger/QUICK-START.txt << 'EOF'
=== DEPLOYMENT RÁPIDO ===

HOSTINGER TRADICIONAL NO SOPORTA NEXT.JS

Usa una de estas alternativas:

1. RAILWAY (Gratis, automático)
   - Ve a railway.app
   - Conecta tu repositorio de GitHub
   - Deploy automático

2. VERCEL (Gratis)
   - npm install -g vercel
   - vercel login
   - vercel

3. HOSTINGER VPS (Requiere VPS, no hosting compartido)
   - npm install --production
   - npm start
   - Configurar PM2 para mantener activo

El sitio incluye:
✅ Integración con Strapi
✅ WhatsApp redirect en tienda
✅ Noticias dinámicas
✅ Responsive design
✅ Mobile menu con cartas
EOF

echo ""
echo -e "${GREEN}✅ Deployment preparado en: deploy-hostinger/${NC}"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANTE:${NC}"
echo -e "${YELLOW}Este sitio Next.js requiere Node.js para funcionar.${NC}"
echo -e "${YELLOW}Hostinger tradicional NO soporta Node.js.${NC}"
echo ""
echo -e "${GREEN}Opciones recomendadas:${NC}"
echo "1. Railway (railway.app) - Gratis y automático"
echo "2. Vercel (vercel.com) - Gratis para proyectos personales"
echo "3. Hostinger VPS - Si tienes VPS (no hosting compartido)"
echo ""
echo -e "Lee ${GREEN}deploy-hostinger/README-DEPLOYMENT.md${NC} para instrucciones detalladas"
echo ""

# Crear ZIP para subir
echo "📦 Creando archivo ZIP..."
cd deploy-hostinger
zip -r ../monserratenses-web.zip . > /dev/null 2>&1
cd ..

echo -e "${GREEN}✅ ZIP creado: monserratenses-web.zip${NC}"
echo ""
echo "🎉 Listo para deployment!"
