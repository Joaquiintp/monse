NEXT_PUBLIC_STRAPI_URL=http://168.231.99.125:1337# 🚀 Inicio Rápido - Strapi + Next.js

## Opción 1: Script Automático (Recomendado)

```bash
./start-dev.sh
```

Este script iniciará automáticamente:
- ✅ Strapi en `http://localhost:1337`
- ✅ Next.js en `http://localhost:3000`

Presiona `Ctrl+C` para detener ambos servicios.

---

## Opción 2: Manual (2 terminales)

### Terminal 1 - Strapi:
```bash
cd webmonse-strapi
npm install
npm run develop
```

### Terminal 2 - Next.js:
```bash
npm install
npm run dev
```

---

## 📝 Primera Configuración de Strapi

### 1. Crear cuenta de Admin
1. Abre `http://localhost:1337/admin`
2. Crea tu usuario administrador (primera vez)

### 2. Configurar Permisos
1. Ve a **Settings** → **Users & Permissions Plugin** → **Roles**
2. Selecciona **Public**
3. En la sección **Contacto**, marca:
   - ✅ `create`
4. Clic en **Save**

### 3. Probar el Formulario
1. Abre `http://localhost:3000/contacto`
2. Completa y envía el formulario
3. Verifica en Strapi: **Content Manager** → **Contacto**

---

## 📁 Variables de Entorno

Ya están configuradas en `.env.local`:
```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

---

## ❓ Problemas Comunes

### "Network request failed"
→ Verifica que Strapi esté corriendo en el puerto 1337

### "Forbidden"
→ Configura los permisos de Public en Strapi (paso 2)

### No aparecen los mensajes
→ Ve a Content Manager → Contacto (singular)

---

## 📚 Documentación Completa

Para más detalles, consulta: `STRAPI-SETUP.md`
