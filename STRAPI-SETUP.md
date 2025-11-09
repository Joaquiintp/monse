# Configuración de Strapi para Formulario de Contacto

## 📋 Pasos para configurar Strapi

### 1. Iniciar Strapi (Terminal 1)

```bash
cd webmonse-strapi
npm install
npm run develop
```

Esto iniciará Strapi en `http://localhost:1337`

### 2. Configurar el Admin de Strapi

1. Abre tu navegador en: `http://localhost:1337/admin`
2. Si es la primera vez:
   - Crea tu cuenta de administrador
   - Completa los datos requeridos

### 3. Configurar Permisos del API

1. En el panel de Strapi, ve a: **Settings** (Configuración) → **Users & Permissions Plugin** → **Roles**
2. Selecciona **Public**
3. Busca la sección **Contacto**
4. Marca las siguientes opciones:
   - ✅ `create` (crear)
   - ✅ `find` (buscar) - opcional, solo si quieres listar mensajes
   - ✅ `findOne` (buscar uno) - opcional
5. Haz clic en **Save** (Guardar)

### 4. Generar API Token (Opcional - Para mayor seguridad)

Si quieres usar un token de autenticación:

1. Ve a: **Settings** → **API Tokens**
2. Haz clic en **Create new API Token**
3. Completa:
   - **Name**: `Frontend Token`
   - **Description**: `Token para el formulario de contacto`
   - **Token duration**: `Unlimited` (ilimitado)
   - **Token type**: `Full access` o personalizado con permisos de `contacto`
4. Copia el token generado
5. Pégalo en `.env.local`:
   ```
   STRAPI_API_TOKEN=tu-token-aqui
   ```

### 5. Iniciar Next.js (Terminal 2)

```bash
# Desde la raíz del proyecto webmonse
npm run dev
```

Esto iniciará el sitio en `http://localhost:3000`

## 🧪 Probar el Formulario

1. Abre `http://localhost:3000/contacto`
2. Completa el formulario
3. Haz clic en "ENVIAR MENSAJE"
4. Deberías ser redirigido a `/exito`
5. En el admin de Strapi (`http://localhost:1337/admin`):
   - Ve a **Content Manager** → **Contacto**
   - Verás el mensaje enviado

## 📁 Estructura del Proyecto

```
webmonse/
├── src/
│   └── app/
│       └── contacto/
│           └── page.tsx          # Formulario de contacto
│
└── webmonse-strapi/
    └── src/
        └── api/
            └── contacto/
                ├── content-types/
                │   └── contacto/
                │       └── schema.json  # Schema actualizado
                ├── controllers/
                ├── routes/
                └── services/
```

## 🔧 Variables de Entorno

### `.env.local` (Next.js - raíz del proyecto)

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token-here  # Opcional
```

### `.env` (Strapi - carpeta webmonse-strapi)

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS="toBeModified1,toBeModified2"
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
JWT_SECRET=tobemodified
```

## 🚀 Deployment (Producción)

### Para Railway, Vercel, o similar:

1. **Strapi** (Backend):
   - Deploy en Railway/Heroku
   - Configura las variables de entorno
   - URL ejemplo: `https://tu-strapi.railway.app`

2. **Next.js** (Frontend):
   - Deploy en Vercel/Netlify
   - Configura la variable de entorno:
     ```
     NEXT_PUBLIC_STRAPI_URL=https://tu-strapi.railway.app
     ```

## ❓ Troubleshooting

### Error: "Network request failed"
- ✅ Verifica que Strapi esté corriendo en `http://localhost:1337`
- ✅ Verifica que `.env.local` tenga la URL correcta

### Error: "Forbidden"
- ✅ Verifica los permisos en Strapi (Public role debe tener `create` en Contacto)

### Los mensajes no aparecen en Strapi
- ✅ Ve a Content Manager → Contacto (no Contactos)
- ✅ Verifica que el schema sea `collectionType` (no `singleType`)

### El formulario no redirige a /exito
- ✅ Verifica que la respuesta del servidor sea exitosa (código 200)
- ✅ Revisa la consola del navegador para ver errores

## 📝 Campos del Formulario

El formulario envía:
- `nombre` (string, requerido)
- `email` (email, requerido)
- `mensaje` (text, requerido)

## 🔄 Cambios Realizados

1. ✅ Cambiado schema de `singleType` a `collectionType`
2. ✅ Cambiados nombres de campos a minúsculas (nombre, email, mensaje)
3. ✅ Marcados campos como requeridos
4. ✅ Deshabilitado draft/publish (los mensajes se guardan directamente)
5. ✅ Actualizado formulario de Next.js para conectar con Strapi

---

**¡Listo para usar! 🎉**
