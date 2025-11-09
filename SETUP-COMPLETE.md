# ✅ Configuración de Strapi Completada

## 🎉 ¡Todo Listo!

Strapi ha sido configurado correctamente y está corriendo en:
**http://localhost:1337**

---

## 📋 Qué se Configuró

### 1. Schema de Contacto ✅
- ✅ Cambiado de `singleType` a `collectionType`
- ✅ Campos actualizados: `nombre`, `email`, `mensaje`
- ✅ Todos los campos marcados como requeridos
- ✅ Draft/Publish deshabilitado

### 2. Variables de Entorno ✅
- ✅ Archivo `.env.local` creado con `NEXT_PUBLIC_STRAPI_URL`
- ✅ Configuración lista para desarrollo local

### 3. Formularios Actualizados ✅
- ✅ `/src/app/contacto/page.tsx` - Página de contacto
- ✅ `/src/components/ContactSection.tsx` - Sección de contacto en home

### 4. Scripts y Documentación ✅
- ✅ `start-dev.sh` - Script para iniciar ambos servicios
- ✅ `STRAPI-SETUP.md` - Documentación completa
- ✅ `QUICK-START-STRAPI.md` - Inicio rápido
- ✅ `.gitignore` - Actualizado para Next.js y Strapi

---

## 🚀 Próximos Pasos

### 1. Configurar Permisos en Strapi (IMPORTANTE)

Abre el admin de Strapi en tu navegador:
👉 **http://localhost:1337/admin**

Luego sigue estos pasos:

1. **Si es la primera vez:**
   - Crea tu usuario administrador
   - Completa el registro

2. **Configurar permisos públicos:**
   - Ve a: **Settings** (⚙️) → **Users & Permissions Plugin** → **Roles**
   - Selecciona **Public**
   - Busca la sección **Contacto**
   - Marca: ✅ `create`
   - Haz clic en **Save** (💾)

### 2. Iniciar Next.js

En una **nueva terminal**, ejecuta:

```bash
cd /Users/joaquinrodriguez/Desktop/webmonse
npm run dev
```

O usa el script automático (en lugar de los pasos 1 y 2):
```bash
./start-dev.sh
```

### 3. Probar el Formulario

1. Abre: `http://localhost:3000/contacto`
2. Completa el formulario con tus datos
3. Haz clic en **ENVIAR MENSAJE**
4. Deberías ser redirigido a `/exito`

### 4. Verificar en Strapi

1. Ve al admin: `http://localhost:1337/admin`
2. Navega a: **Content Manager** → **Contacto**
3. ¡Deberías ver tu mensaje! 📬

---

## 🔍 Verificación Rápida

### Estado Actual:
- ✅ Strapi corriendo en puerto 1337
- ⏳ Next.js pendiente de iniciar
- ⏳ Permisos de Strapi pendientes de configurar

### Checklist:
- [ ] Configurar permisos en Strapi admin
- [ ] Iniciar Next.js
- [ ] Probar formulario de contacto
- [ ] Verificar mensaje en Strapi

---

## 📝 URLs Importantes

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **Strapi Admin** | http://localhost:1337/admin | Panel de administración |
| **Strapi API** | http://localhost:1337/api | API REST |
| **Next.js** | http://localhost:3000 | Sitio web |
| **Formulario** | http://localhost:3000/contacto | Página de contacto |

---

## ❓ Si algo no funciona

### Error: "Network request failed"
→ Verifica que Strapi esté corriendo en puerto 1337

### Error: "Forbidden" o 403
→ Configura los permisos de Public en Strapi (paso 1 arriba)

### Los mensajes no aparecen
→ Ve a Content Manager → **Contacto** (singular, no Contactos)

### Puerto 1337 ya está en uso
```bash
lsof -ti:1337 | xargs kill -9
```

---

## 🎯 ¿Todo Listo?

Si completaste todos los pasos arriba, tu formulario de contacto debería estar funcionando perfectamente!

Para más detalles técnicos, consulta: `STRAPI-SETUP.md`

---

**Último paso realizado:** ✅ Strapi iniciado y corriendo
**Siguiente paso:** 👉 Configurar permisos en http://localhost:1337/admin
