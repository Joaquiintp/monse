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
