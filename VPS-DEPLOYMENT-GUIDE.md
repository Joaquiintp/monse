# Guía de Deployment en VPS - Monserratenses

## 📦 Requisitos

- VPS con Ubuntu/Debian (recomendado)
- Node.js 18+ instalado
- PM2 para gestión de procesos
- Nginx como proxy reverso
- Acceso SSH al VPS

## 🎯 Arquitectura Final

```
Dominio (monserratenses.org.ar)
    ↓
VPS (168.231.99.125):
├── Nginx (puerto 80/443)
│   ├── monserratenses.org.ar → Next.js (puerto 3000)
│   └── monserratenses.org.ar/strapi → Strapi (puerto 1337)
├── Next.js Frontend (puerto 3000)
└── Strapi Backend (puerto 1337) ← Ya instalado
```

## 📋 Paso 1: Conectarse al VPS

```bash
ssh usuario@168.231.99.125
```

## 📋 Paso 2: Instalar dependencias (si no están instaladas)

### Instalar Node.js 18+
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version  # Verificar instalación
```

### Instalar PM2 globalmente
```bash
sudo npm install -g pm2
pm2 --version  # Verificar instalación
```

### Instalar Nginx (si no está instalado)
```bash
sudo apt update
sudo apt install nginx -y
sudo systemctl status nginx  # Verificar que esté corriendo
```

## 📋 Paso 3: Subir el proyecto Next.js al VPS

### Opción A: Usando Git (Recomendado)
```bash
# En el VPS
cd /var/www  # o donde prefieras alojar el proyecto
sudo mkdir -p monserratenses-frontend
sudo chown $USER:$USER monserratenses-frontend
cd monserratenses-frontend

# Clonar desde GitHub (primero debes subir el código a GitHub)
git clone https://github.com/Joaquiintp/webmonse.git .
```

### Opción B: Usando SCP/SFTP
```bash
# Desde tu Mac, comprimir el proyecto
cd /Users/joaquinrodriguez/Desktop/webmonse
tar -czf monserratenses-web.tar.gz .next package.json package-lock.json next.config.js public src .env.local

# Subir al VPS
scp monserratenses-web.tar.gz usuario@168.231.99.125:/var/www/monserratenses-frontend/

# En el VPS, descomprimir
cd /var/www/monserratenses-frontend
tar -xzf monserratenses-web.tar.gz
```

## 📋 Paso 4: Configurar el proyecto en el VPS

```bash
# En el VPS
cd /var/www/monserratenses-frontend

# Instalar dependencias
npm install --production

# Verificar que el build funciona
npm run build

# Probar que funciona localmente
npm start  # Debería correr en puerto 3000
# Ctrl+C para detener
```

## 📋 Paso 5: Configurar PM2 para mantener el proceso activo

```bash
# En el VPS
cd /var/www/monserratenses-frontend

# Iniciar con PM2
pm2 start npm --name "monserratenses-web" -- start

# Verificar que está corriendo
pm2 status

# Ver logs en tiempo real
pm2 logs monserratenses-web

# Guardar la configuración de PM2
pm2 save

# Configurar PM2 para iniciar al reiniciar el VPS
pm2 startup
# Ejecuta el comando que te muestre PM2
```

## 📋 Paso 6: Configurar Nginx como Proxy Reverso

### Crear archivo de configuración de Nginx

```bash
sudo nano /etc/nginx/sites-available/monserratenses
```

### Agregar esta configuración:

```nginx
# Frontend Next.js
server {
    listen 80;
    server_name monserratenses.org.ar www.monserratenses.org.ar;

    # Logs
    access_log /var/log/nginx/monserratenses-access.log;
    error_log /var/log/nginx/monserratenses-error.log;

    # Next.js
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
    }

    # Static files de Next.js
    location /_next/static {
        proxy_pass http://localhost:3000/_next/static;
        proxy_cache_bypass $http_upgrade;
    }
}

# Backend Strapi (opcional, si quieres acceso directo)
server {
    listen 80;
    server_name api.monserratenses.org.ar;

    location / {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Activar el sitio

```bash
# Crear enlace simbólico
sudo ln -s /etc/nginx/sites-available/monserratenses /etc/nginx/sites-enabled/

# Verificar configuración de Nginx
sudo nginx -t

# Si no hay errores, reiniciar Nginx
sudo systemctl restart nginx

# Verificar que Nginx está corriendo
sudo systemctl status nginx
```

## 📋 Paso 7: Configurar DNS en Hostinger

1. Entra a Hostinger → Panel de control → Dominios
2. Selecciona tu dominio → Administrar DNS
3. Modifica los registros A:

```
Tipo: A
Nombre: @
Apunta a: 168.231.99.125
TTL: 3600

Tipo: A
Nombre: www
Apunta a: 168.231.99.125
TTL: 3600
```

4. Espera 30 minutos a 2 horas para propagación DNS

## 📋 Paso 8: Configurar SSL (HTTPS) con Let's Encrypt

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtener certificado SSL
sudo certbot --nginx -d monserratenses.org.ar -d www.monserratenses.org.ar

# Certbot configurará automáticamente Nginx para HTTPS
# Seguir las instrucciones en pantalla

# Verificar renovación automática
sudo certbot renew --dry-run
```

## 📋 Paso 9: Variables de Entorno

Asegúrate de que el archivo `.env.local` o `.env.production` esté en el servidor:

```bash
# En el VPS
cd /var/www/monserratenses-frontend
nano .env.production
```

Agregar:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NODE_ENV=production
```

Guardar y reiniciar PM2:
```bash
pm2 restart monserratenses-web
```

## 🔄 Comandos útiles de PM2

```bash
# Ver estado de las aplicaciones
pm2 status

# Ver logs en tiempo real
pm2 logs monserratenses-web

# Reiniciar la aplicación
pm2 restart monserratenses-web

# Detener la aplicación
pm2 stop monserratenses-web

# Eliminar la aplicación de PM2
pm2 delete monserratenses-web

# Ver uso de recursos
pm2 monit
```

## 🔍 Troubleshooting

### El sitio no carga
```bash
# Verificar que Next.js está corriendo
pm2 status
curl http://localhost:3000

# Verificar logs de PM2
pm2 logs monserratenses-web

# Verificar logs de Nginx
sudo tail -f /var/log/nginx/monserratenses-error.log
```

### Error de permisos
```bash
# Dar permisos correctos
sudo chown -R $USER:$USER /var/www/monserratenses-frontend
chmod -R 755 /var/www/monserratenses-frontend
```

### Strapi no conecta
```bash
# Verificar que Strapi está corriendo
pm2 status
curl http://localhost:1337

# Verificar la URL en .env.production
cat .env.production
```

## ✅ Checklist Final

- [ ] Node.js 18+ instalado
- [ ] PM2 instalado
- [ ] Nginx instalado y configurado
- [ ] Proyecto Next.js subido al VPS
- [ ] `npm install` ejecutado
- [ ] PM2 corriendo el proyecto
- [ ] Nginx proxy configurado
- [ ] DNS apuntando al VPS
- [ ] SSL/HTTPS configurado
- [ ] Variables de entorno configuradas
- [ ] Sitio accesible desde el dominio

## 🎉 ¡Listo!

Tu sitio debería estar funcionando en:
- https://monserratenses.org.ar (Frontend Next.js)
- https://api.monserratenses.org.ar (Backend Strapi, opcional)

Las noticias se actualizarán automáticamente cuando las modifiques en Strapi.
