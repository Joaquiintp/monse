# Sistema de Favicon Dinámico desde Strapi

## Descripción
Sistema para gestionar el favicon del sitio de forma dinámica desde Strapi, permitiendo cambiar el ícono sin necesidad de modificar código o hacer redeploy.

## Problema resuelto
El favicon estaba "trabado" en el código y no se podía cambiar fácilmente. Ahora el sistema le da **prioridad absoluta** al favicon configurado en Strapi.

## Funcionamiento

### Orden de prioridad:
1. ✅ **Favicon desde Strapi** (PRIORIDAD ABSOLUTA)
2. ⚪ Fallback: `/favicon.svg` (solo si no hay nada en Strapi)

### Comportamiento:
- Si hay un favicon cargado en Strapi → Se usa ese
- Si NO hay favicon en Strapi → Se usa el favicon.svg del proyecto
- El cambio es inmediato (no hay cache)

## Configuración en Strapi

### Crear Single Type: `configuracion-sitio`

1. **Ir a**: Content-Type Builder → Create new single type
2. **Nombre**: `configuracion-sitio` (display name: "Configuración del Sitio")
3. **Agregar campos**:

#### Campos:

**favicon** (Media)
- Type: Single media
- Allowed types: Images only
- Required: ✗ (opcional)
- Formatos recomendados:
  - `.ico` (16x16, 32x32, 48x48)
  - `.png` (32x32, 64x64, 128x128)
  - `.svg` (vector, escalable)

**titulo** (Text) - OPCIONAL
- Type: Short text
- Required: ✗
- Uso futuro: Para cambiar el título del sitio dinámicamente
- Ejemplo: "MONSERRATENSES | Asociación Civil"

**descripcion** (Text) - OPCIONAL
- Type: Long text
- Required: ✗
- Uso futuro: Para cambiar la meta descripción dinámicamente
- Ejemplo: "Asociación Civil Monserratenses - Unidos por el Monse"

### Configurar Permisos

1. **Ir a**: Settings → Roles → Public
2. **configuracion-sitio**: Marcar ✓ en `find`
3. **Guardar**

### Configurar el Favicon

1. **Ir a**: Content Manager → Configuración del Sitio (Single Type)
2. **Subir imagen** en el campo `favicon`:
   - Click en "Add new assets"
   - Seleccionar o arrastrar tu archivo favicon
   - Formatos aceptados: .ico, .png, .svg
3. **Save & Publish**

## Recomendaciones de Favicon

### Formato .ICO (más compatible)
```
Tamaños recomendados en un solo archivo .ico:
- 16x16 (navegadores antiguos)
- 32x32 (navegadores modernos)
- 48x48 (sitio guardado en Windows)
```

### Formato .PNG
```
Tamaños recomendados:
- 32x32 (estándar)
- 64x64 (pantallas retina)
- 128x128 (alta resolución)
- 192x192 (Android Chrome)
- 512x512 (iOS y PWA)
```

### Formato .SVG (escalable)
```
Ventajas:
- Escala perfectamente a cualquier tamaño
- Archivo más liviano
- Mejor para logos simples
```

## Herramientas para crear Favicons

### Online:
- **Favicon.io**: https://favicon.io/ (genera múltiples tamaños)
- **RealFaviconGenerator**: https://realfavicongenerator.net/ (muy completo)
- **Favicon Generator**: https://www.favicon-generator.org/

### Desde imagen/logo:
1. Tener logo en alta resolución (preferiblemente cuadrado)
2. Usar Favicon.io o RealFaviconGenerator
3. Descargar el .ico o .png generado
4. Subir a Strapi

## Flujo de Uso

### Para cambiar el favicon:

1. **Preparar el archivo**:
   - Formato: .ico, .png o .svg
   - Tamaño: 32x32 mínimo (o múltiples tamaños en .ico)
   - Nombre: preferiblemente "favicon.ico" o "favicon.png"

2. **Subir a Strapi**:
   - Content Manager → Configuración del Sitio
   - Campo "favicon" → Add new assets
   - Seleccionar archivo
   - Save & Publish

3. **Verificar**:
   - Abrir el sitio en navegador
   - Refrescar (Ctrl+F5 o Cmd+Shift+R para limpiar cache)
   - El nuevo favicon debe aparecer en la pestaña

### Para volver al favicon original del proyecto:

1. **Ir a**: Content Manager → Configuración del Sitio
2. **Eliminar** la imagen del campo `favicon` (click en X)
3. **Save & Publish**
4. El sitio volverá a usar `/favicon.svg`

## Funcionamiento Técnico

### Service (`configuracionSitio.ts`)
```typescript
GET /api/configuracion-sitio?populate=favicon
- Cache: no-store (siempre actualizado)
- Retorna: favicon.url o null
```

### Component (`DynamicFavicon.tsx`)
```typescript
Props: faviconUrl (opcional)
Lógica:
  if (faviconUrl existe) → usar favicon de Strapi
  else → usar /favicon.svg (fallback)
```

### Layout (`layout.tsx`)
```typescript
1. Fetch configuracion desde Strapi
2. Pasar favicon.url a DynamicFavicon
3. Renderizar links dinámicos en <head>
```

## Troubleshooting

### El favicon no cambia después de subirlo a Strapi

**Causa**: Cache del navegador
**Solución**:
1. Hacer hard refresh: `Ctrl+F5` (Windows) o `Cmd+Shift+R` (Mac)
2. Limpiar cache del navegador
3. Abrir en ventana de incógnito

### El favicon se ve pixelado

**Causa**: Tamaño muy pequeño o formato inadecuado
**Solución**:
1. Usar formato .ico con múltiples tamaños
2. O usar .png de al menos 64x64
3. O usar .svg para escalado perfecto

### No se ve el favicon en ninguna pestaña

**Causa**: Permisos no configurados en Strapi
**Solución**:
1. Settings → Roles → Public
2. Marcar `find` en `configuracion-sitio`
3. Save

### Error 404 al cargar el favicon

**Causa**: URL del favicon incorrecta
**Solución**:
1. Verificar que NEXT_PUBLIC_STRAPI_URL esté correctamente configurado
2. Verificar que el archivo se subió correctamente a Strapi
3. Comprobar permisos de lectura en Strapi

## Testing Local

```bash
# 1. Iniciar Strapi
cd webmonse-strapi
npm run develop

# 2. Configurar favicon en Strapi
# - Ir a http://localhost:1337/admin
# - Content Manager → Configuración del Sitio
# - Subir favicon
# - Publish

# 3. Iniciar Next.js
cd ..
npm run dev

# 4. Verificar
# - Abrir http://localhost:3000
# - Ver la pestaña del navegador
# - El favicon de Strapi debe aparecer
```

## Próximas Mejoras

- [ ] Gestionar título y descripción dinámicamente desde Strapi
- [ ] Soporte para múltiples tamaños de favicon (16x16, 32x32, 64x64)
- [ ] Preview del favicon en Strapi antes de publicar
- [ ] Validación de formato y tamaño antes de subir
- [ ] Cache de favicon con revalidación automática

## Notas Importantes

⚠️ **Single Type**: `configuracion-sitio` es un Single Type (no Collection), solo puede haber una configuración.

🔄 **Sin cache**: El favicon se carga sin cache (`no-store`) para reflejar cambios inmediatamente.

📱 **Todos los dispositivos**: El sistema configura favicon para web, iOS y Android automáticamente.

🎨 **Formatos**: Preferir .ico para máxima compatibilidad, o .svg para logos vectoriales simples.

✨ **Fallback inteligente**: Si borras el favicon de Strapi, vuelve automáticamente al original del proyecto.
