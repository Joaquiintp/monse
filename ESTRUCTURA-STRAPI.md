# 📋 Estructura de Strapi - Monserratenses

## ✅ Collection Types Configurados

### 1. **Noticias** (`noticia`)
- **Campos:**
  - `Titulo` (string)
  - `Slug` (uid, auto-generado desde Titulo)
  - `parrafo` (text) - Contenido principal
  - `Parrafo2` (text) - Contenido adicional opcional
  - `URL` (string) - URL de video YouTube opcional
  - `foto` (media, single) - Imagen principal
  - `fotos` (media, multiple) - Galería de imágenes
- **Draft & Publish:** Habilitado
- **API Endpoint:** `/api/noticias`

### 2. **Vinos** (`vino`)
- **Campos:**
  - `titulo` (string)
  - `slug` (uid, auto-generado desde titulo)
  - `descripcion` (text)
  - `precio` (decimal)
  - `fotoproducto` (media, multiple) - Imágenes del producto
- **Draft & Publish:** Habilitado
- **API Endpoint:** `/api/vinos`

### 3. **Productos** (`producto`)
- **Campos:**
  - `titulo` (string)
  - `slug` (uid, auto-generado desde titulo)
  - `descripcion` (text)
  - `precio` (decimal)
  - `fotoproduct` (media, multiple) - Imágenes del producto
- **Draft & Publish:** Habilitado
- **API Endpoint:** `/api/productos`

### 4. **Contacto** (`contacto`)
- **Campos:**
  - `nombre` (string, required)
  - `email` (email, required)
  - `mensaje` (text, required)
- **Draft & Publish:** Deshabilitado
- **API Endpoint:** `/api/contactos`

### 5. **Monserratenses por el Mundo** (`monsexmundo`)
- **API Endpoint:** `/api/monsexmundos`

### 6. **User** (Sistema)
- Usuarios de Strapi

## 🔒 Permisos Requeridos (Public Role)

Para que el sitio funcione correctamente, configura estos permisos en:
`Settings → Users & Permissions → Roles → Public`

### ✅ Noticias:
- ☑️ `find` - Listar noticias
- ☑️ `findOne` - Ver detalle de noticia

### ✅ Vinos:
- ☑️ `find` - Listar vinos
- ☑️ `findOne` - Ver detalle de vino

### ✅ Productos:
- ☑️ `find` - Listar productos
- ☑️ `findOne` - Ver detalle de producto

### ✅ Contacto:
- ☑️ `create` - Enviar mensaje de contacto

## 📁 Archivos del Proyecto

### Configuración:
- `/src/lib/strapi-config.ts` - Configuración centralizada
- `/.env.local` - Variables de entorno

### Servicios:
- `/src/lib/strapi-news.ts` - Funciones para noticias
- `/src/lib/strapi-products.ts` - Funciones para productos y vinos

### Páginas:
- `/src/app/noticias/page.tsx` - Lista de noticias
- `/src/app/noticias/[slug]/page.tsx` - Detalle de noticia
- `/src/app/tienda/page.tsx` - Tienda (productos + vinos)
- `/src/app/contacto/page.tsx` - Formulario de contacto

## 🔑 Variables de Entorno

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=tu-token-aqui
```

## 📝 Checklist Pre-Build

- [ ] Token de Strapi configurado en `.env.local`
- [ ] Permisos públicos configurados en Strapi
- [ ] Al menos 1 noticia publicada
- [ ] Al menos 1 producto o vino publicado
- [ ] Formulario de contacto probado
- [ ] Imágenes subidas correctamente
- [ ] Slugs generados automáticamente

## 🚀 Para Producción

1. **Generar Token de Producción:**
   - Settings → API Tokens → Create new API Token
   - Nombre: "Production Token"
   - Duration: Unlimited
   - Token Type: Full access o Custom

2. **Actualizar Variables de Entorno:**
   ```env
   NEXT_PUBLIC_STRAPI_URL=https://tu-strapi-produccion.com
   NEXT_PUBLIC_STRAPI_API_TOKEN=token-de-produccion
   ```

3. **Cambiar cache en código:**
   - En `strapi-news.ts` y `strapi-products.ts`
   - Descomentar: `next: { revalidate: 60 }`
   - Comentar: `cache: 'no-store'`

---

**¡Todo listo para el build!** 🎉
