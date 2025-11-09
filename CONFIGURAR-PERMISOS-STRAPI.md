# 🔧 Configurar Permisos en Strapi - URGENTE

## ⚠️ IMPORTANTE: Sin esto, las noticias no se mostrarán

Sigue estos pasos **AHORA** para que las noticias funcionen:

### 1. Abre el Admin de Strapi

👉 http://localhost:1337/admin

### 2. Configura Permisos Públicos

1. En el menú lateral, ve a: **Settings** (⚙️ Configuración)
2. En la sección **USERS & PERMISSIONS PLUGIN**, haz clic en **Roles**
3. Haz clic en **Public** (el rol público)
4. Desplázate hasta encontrar las secciones:

#### Para CONTACTO:
- ✅ Marca: `create`

#### Para NOTICIA:
- ✅ Marca: `find` (ver lista)
- ✅ Marca: `findOne` (ver detalle)

5. **IMPORTANTE:** Haz clic en el botón **Save** (💾 Guardar) en la esquina superior derecha

### 3. Verifica que haya Noticias

1. En el menú lateral, ve a: **Content Manager**
2. Haz clic en **Noticia** (bajo Collection Types)
3. Verifica que haya noticias publicadas
4. Si no hay, crea una noticia de prueba:
   - Clic en **Create new entry**
   - Completa: Titulo, Slug, parrafo
   - Sube una foto
   - Clic en **Save** y luego **Publish**

### 4. Prueba

1. Refresca la página: http://localhost:3002/noticias
2. ¡Deberías ver las noticias! 🎉

---

## ❓ Troubleshooting

### Sigo viendo "No hay noticias disponibles"

✅ **Verifica permisos:**
- Settings → Roles → Public → Noticia → `find` y `findOne` marcados

✅ **Verifica que haya noticias:**
- Content Manager → Noticia → Debe haber al menos 1 noticia publicada

✅ **Verifica la consola:**
- Abre las DevTools del navegador (F12)
- Ve a la pestaña Console
- Busca errores en rojo

✅ **Reinicia Next.js:**
```bash
# Detén Next.js (Ctrl+C en la terminal)
# Luego inicia de nuevo:
npm run dev
```

### Error 403 Forbidden

→ **Los permisos no están configurados correctamente**
- Repite el paso 2 asegurándote de hacer clic en **Save**

### Las noticias no tienen imágenes

→ **Verifica que las fotos estén subidas en Strapi**
- Content Manager → Noticia → Edita la noticia → Sube foto

---

## ✅ Checklist Rápido

- [ ] Strapi corriendo en puerto 1337
- [ ] Next.js corriendo en puerto 3002
- [ ] Permisos públicos configurados (Noticia: find + findOne)
- [ ] Permisos públicos configurados (Contacto: create)
- [ ] Al menos 1 noticia publicada en Strapi
- [ ] Página de noticias muestra las noticias

---

**Una vez completado esto, todo debería funcionar perfectamente!** ✨
