# 🔧 Solución: Conectar Frontend con Strapi en el VPS

## Problema Detectado

El frontend en el VPS no puede conectarse a Strapi porque falta la variable de entorno `NEXT_PUBLIC_STRAPI_URL`.

## ¿Por qué no funcionaba?

1. **Client Component**: La página `/noticias` es un client component que hace fetch desde el navegador del usuario
2. **Variable faltante**: Sin `NEXT_PUBLIC_STRAPI_URL`, el código intenta URLs incorrectas
3. **Strapi expuesto**: Strapi está en `http://168.231.99.125:1337` pero el frontend no lo sabe

## Solución Rápida

### Opción A: Subir archivo .env.local completo

```bash
# 1. Desde tu máquina local, subir el archivo
scp .env.vps root@168.231.99.125:/home/user/htdocs/srv1072888.hstgr.cloud/frontend/.env.local

# 2. Reiniciar el servicio de Next.js
ssh root@168.231.99.125
pm2 restart monserratenses-web
pm2 logs monserratenses-web --lines 50
```

### Opción B: Crear el archivo directamente en el VPS

```bash
# 1. Conectar al VPS
ssh root@168.231.99.125

# 2. Ir al directorio del frontend
cd /home/user/htdocs/srv1072888.hstgr.cloud/frontend/

# 3. Crear el archivo .env.local
cat > .env.local << 'EOF'
NEXT_PUBLIC_STRAPI_URL=http://168.231.99.125:1337
EOF

# 4. Verificar que se creó correctamente
cat .env.local

# 5. Reiniciar el servicio
pm2 restart monserratenses-web

# 6. Ver los logs para confirmar
pm2 logs monserratenses-web --lines 50
```

## Verificación

Una vez reiniciado el servicio, deberías ver:

1. **En los logs de PM2**: 
   ```
   ✓ Ready in Xms
   ○ Compiling / ...
   ✓ Compiled / in Xms
   ```

2. **En el navegador**: 
   - Ve a `http://168.231.99.125:3001/noticias` (o tu dominio)
   - Las noticias nuevas deberían aparecer
   - Abre la consola del navegador (F12) y verifica que no haya errores de conexión

3. **Para verificar la variable**:
   ```bash
   ssh root@168.231.99.125
   cd /home/user/htdocs/srv1072888.hstgr.cloud/frontend/
   cat .env.local
   # Debe mostrar: NEXT_PUBLIC_STRAPI_URL=http://168.231.99.125:1337
   ```

## ⚠️ Importante: HTTPS y Seguridad

### Problema Actual
Strapi está usando HTTP (no HTTPS), lo cual puede causar problemas:
- Si tu sitio principal usa HTTPS, los navegadores bloquearán el contenido "inseguro" de HTTP
- Error típico: "Mixed Content: The page was loaded over HTTPS, but requested an insecure resource"

### Solución Recomendada: Configurar Nginx para Strapi

```nginx
# Agregar al archivo de configuración de Nginx
# /etc/nginx/sites-available/monserratenses

# Bloque para Strapi API
server {
    listen 80;
    server_name strapi.monserratenses.org.ar;  # O el subdominio que prefieras

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
    }
}
```

Luego:
```bash
# 1. Configurar SSL con Certbot
certbot --nginx -d strapi.monserratenses.org.ar

# 2. Cambiar .env.local para usar el dominio con HTTPS
NEXT_PUBLIC_STRAPI_URL=https://strapi.monserratenses.org.ar

# 3. Reiniciar servicios
systemctl reload nginx
pm2 restart monserratenses-web
```

## Debugging

Si sigue sin funcionar después de seguir los pasos:

### 1. Verificar que Strapi esté corriendo
```bash
curl http://localhost:1337/_health
# Debe responder: OK o código 200/204
```

### 2. Verificar que el puerto 1337 esté escuchando
```bash
netstat -tulpn | grep 1337
# Debe mostrar: tcp ... LISTEN ... node
```

### 3. Verificar permisos públicos en Strapi
- Ir a: http://168.231.99.125:1337/admin
- Settings → Roles → Public
- Noticias: Marcar ✓ find y findOne
- Guardar

### 4. Probar el endpoint directamente
```bash
curl "http://168.231.99.125:1337/api/noticias?pagination[limit]=1"
# Debe devolver JSON con noticias
```

### 5. Ver logs de Next.js
```bash
pm2 logs monserratenses-web --lines 100
```

### 6. Ver logs de Strapi
```bash
pm2 logs strapi --lines 100
```

## Checklist Final

- [ ] Archivo `.env.local` creado en el VPS con `NEXT_PUBLIC_STRAPI_URL=http://168.231.99.125:1337`
- [ ] Servicio Next.js reiniciado: `pm2 restart monserratenses-web`
- [ ] Strapi está corriendo: `pm2 list` muestra `strapi` online
- [ ] Endpoint de noticias responde: `curl http://168.231.99.125:1337/api/noticias`
- [ ] Permisos públicos configurados en Strapi Admin
- [ ] Nueva noticia aparece en el sitio web

## Próximo Paso Recomendado

Una vez que funcione con HTTP, configura HTTPS para Strapi usando Nginx + Certbot. Esto es importante para:
- Seguridad
- Evitar problemas de "Mixed Content" si tu sitio usa HTTPS
- Mejor SEO y confianza del usuario
