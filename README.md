# MONSERRATENSES - Sitio Web Oficial

Sitio web de la Asociación Civil Monserratenses construido con Next.js 14 y Strapi.

## 🚀 Stack Tecnológico

- **Frontend**: Next.js 14 (App Router)
- **Backend**: Strapi (Headless CMS)
- **Estilos**: Tailwind CSS + CSS personalizado
- **Lenguaje**: TypeScript
- **Deploy**: Hostinger VPS
- **Process Manager**: PM2
- **Servidor Web**: Nginx

## 📁 Estructura del Proyecto

```
webmonse/
├── src/
│   ├── app/                 # App Router de Next.js
│   │   ├── page.tsx        # Página principal
│   │   ├── noticias/       # Sección de noticias
│   │   ├── servicios/      # Sección de servicios
│   │   ├── cultura/        # Sección de cultura
│   │   ├── nosotros/       # Página institucional
│   │   └── contacto/       # Formulario de contacto
│   ├── components/         # Componentes reutilizables
│   ├── services/           # Servicios para conectar con Strapi
│   └── utils/              # Utilidades y helpers
├── public/                 # Archivos estáticos
├── scripts/                # Scripts de utilidad
└── docs/                   # Documentación adicional
```

## 🎨 Características Principales

### ✅ Sistemas Dinámicos desde Strapi

1. **Noticias** - Sistema de noticias con slug dinámico
2. **Servicios** - Gestión de servicios (Funeraria, Salud, Turismo)
3. **Tienda** - Productos y vinos artesanales
4. **Pop-up de Eventos** - Anuncios importantes con versión minimizada
5. **Favicon Dinámico** - Cambio de favicon sin modificar código

### 📱 Responsive Design

- Diseño adaptativo mobile-first
- Menú hamburguesa en móvil
- Versiones optimizadas de componentes según dispositivo

### 🎯 Características Especiales

- **Pop-up inteligente**: 
  - Versión completa al cargar
  - Se minimiza en desktop (esquina inferior derecha)
  - Desaparece en mobile (ahorro de espacio)
  - No vuelve a aparecer hasta el día siguiente

- **Favicon configurable**:
  - Prioridad absoluta a favicon de Strapi
  - Fallback automático al favicon del proyecto
  - Sin necesidad de rebuild

## 🛠️ Instalación y Desarrollo

### Requisitos previos

- Node.js 18+ 
- npm o yarn
- Strapi corriendo en puerto 1337

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Joaquiintp/webmonse.git
cd webmonse

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tu configuración

# Iniciar en desarrollo
npm run dev
```

### Variables de Entorno

```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
# o en producción:
NEXT_PUBLIC_STRAPI_URL=https://strapi.monserratenses.org.ar
```

## 📚 Documentación de Sistemas

### Pop-up de Eventos
Ver documentación completa: [`POPUP-EVENTOS.md`](./POPUP-EVENTOS.md)

**Content Type en Strapi**: `eventos-popup`
- Gestión de anuncios importantes
- Versión desktop minimizada
- Versión mobile desaparece al cerrar

### Favicon Dinámico
Ver documentación completa: [`FAVICON-DINAMICO.md`](./FAVICON-DINAMICO.md)

**Content Type en Strapi**: `configuracion-sitio` (Single Type)
- Cambio de favicon sin código
- Prioridad absoluta desde Strapi
- Fallback inteligente

### Verificar Configuración

```bash
# Verificar favicon dinámico
node scripts/check-favicon.js
```

## 🚀 Deployment

### Build de Producción

```bash
npm run build
npm run start
```

### Deploy en VPS (Hostinger)

```bash
# 1. Build local
npm run build

# 2. Comprimir
tar -czf build.tar.gz .next package.json package-lock.json

# 3. Subir al servidor
scp build.tar.gz root@168.231.99.125:/home/user/htdocs/srv1072888.hstgr.cloud/frontend/

# 4. En el servidor
cd /home/user/htdocs/srv1072888.hstgr.cloud/frontend/
tar -xzf build.tar.gz
npm install --production
pm2 restart monserratenses-web
```

### PM2 Configuration

```bash
# Iniciar servicio
pm2 start npm --name "monserratenses-web" -- start

# Ver logs
pm2 logs monserratenses-web

# Reiniciar
pm2 restart monserratenses-web

# Estado
pm2 status
```

## 🔧 Scripts Disponibles

```bash
npm run dev          # Desarrollo (localhost:3000)
npm run build        # Build de producción
npm run start        # Iniciar servidor de producción
npm run lint         # Linter
npm run type-check   # Verificar tipos TypeScript
```

## 🎨 Guía de Estilos

### Colores Principales

```css
--primary: #5e1415;     /* Bordo institucional */
--secondary: #1d0d6f;   /* Azul secundario */
```

### Tipografía

- **Títulos**: Lora (serif)
- **Cuerpo**: Open Sans (sans-serif)

## 📖 Strapi Content Types

### Collection Types

1. **noticias**
   - titulo, parrafo, imagen, fecha, slug
   
2. **servicios**
   - nombre, descripcion, icono, slug

3. **eventos-popup**
   - titulo, descripcion, fecha, imagen, link, activo

4. **productos**
   - nombre, precio, descripcion, imagen

5. **vinos**
   - nombre, tipo, precio, descripcion, imagen

### Single Types

1. **configuracion-sitio**
   - favicon, titulo, descripcion

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Changelog

### [2025-10-30]
- ✨ Agregada sección Cultura con 3 subsecciones
- ✨ Sistema de pop-up de eventos desde Strapi
- ✨ Sistema de favicon dinámico desde Strapi
- 🐛 Fix: Convertidas noticias a dynamic rendering
- 📝 Documentación completa de nuevos sistemas

### [Anterior]
- ✅ Sistema de noticias dinámico
- ✅ Sección de servicios (Funeraria, Salud, Turismo)
- ✅ Tienda online básica
- ✅ Deploy en VPS Hostinger

## 📧 Contacto

Asociación Civil Monserratenses
- Web: https://monserratenses.org.ar
- Email: contacto@monserratenses.org.ar

## 📄 Licencia

Este proyecto es privado y pertenece a la Asociación Civil Monserratenses.

---

**Desarrollado con ❤️ para la comunidad Monserratense**
