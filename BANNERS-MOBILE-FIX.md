# GUÍA MANUAL: Optimizar Banners para Mobile

## ✅ Archivos que YA están correctos:
- ✓ src/components/PageBanner.tsx (componente base)
- ✓ src/app/carta-fundacional/page.tsx
- ✓ src/app/mision-vision-valores/page.tsx
- ✓ src/app/monserratenses-por-el-mundo/page.tsx

## 📝 PARA VERIFICAR/APLICAR MANUALMENTE:

### 1. Reinicia el servidor:
```bash
# Detén el servidor (Ctrl+C)
# Luego ejecuta:
npm run dev
```

### 2. Limpia caché del navegador:
- Chrome/Edge: Ctrl+Shift+R (Cmd+Shift+R en Mac)
- O abre DevTools (F12) → Network → Disable cache

### 3. Verifica estas páginas tengan PageBanner:

#### /contacto (líneas 1-70):
```tsx
'use client'
import PageBanner from '@/components/PageBanner'

export default function ContactoPage() {
  // ...código del formulario...
  
  return (
    <>
      <PageBanner 
        title="Contactános"
        subtitle="Estamos cerca, queremos escucharte"
        backgroundImage="/images/oficina-asociacion.jpg"
        desktopPosition="center 30%"
        mobilePosition="center 35%"
        overlay={0.2}
      />
      {/* resto del contenido */}
```

#### /noticias (líneas 60-70):
```tsx
<PageBanner 
  title="Noticias"
  backgroundImage="/images/fuente-patio-menor-monserrat.jpg"
  desktopPosition="center 30%"
  mobilePosition="center 25%"
  overlay={0.2}
/>
```

#### /servicios (líneas 10-15):
```tsx
<PageBanner 
  title="Servicios"
  backgroundImage="/images/fachada-monserrat.jpg"
  desktopPosition="center center"
  mobilePosition="center 20%"
  overlay={0.2}
/>
```

#### /comision-directiva (líneas 1-15):
```tsx
'use client'
import PageBanner from '@/components/PageBanner'

export default function ComisionDirectivaPage() {
  return (
    <>
      <PageBanner 
        title="Comisión Directiva"
        subtitle="Quiénes conducen la Asociación"
        backgroundImage="/images/fuente-patio-menor-monserrat.jpg"
        desktopPosition="center 90%"
        mobilePosition="center 70%"
        overlay={0.2}
      />
```

## 🔍 CÓMO VERIFICAR QUE FUNCIONÓ:

1. Abre localhost:3000 en el navegador
2. Presiona F12 para abrir DevTools
3. Click en el ícono de dispositivo móvil (Toggle device toolbar)
4. Selecciona "iPhone SE" o similar
5. Navega a cada página y verifica que:
   - ✓ La imagen cubra TODO el banner (sin gris en los bordes)
   - ✓ El overlay sea claro (20% de negro, no muy oscuro)
   - ✓ El texto del título se vea bien

## ⚠️ SI NO SE APLICAN LOS CAMBIOS:

1. Verifica que el import esté al inicio:
   ```tsx
   import PageBanner from '@/components/PageBanner'
   ```

2. Asegúrate de eliminar el banner viejo (si existe):
   - Busca y elimina bloques que empiecen con:
     ```tsx
     <section className="relative min-h-[60vh]"
       style={{ backgroundImage: 'url(...)'
     ```

3. Guarda todos los archivos (Ctrl+S o Cmd+S)

4. Reinicia el servidor completamente

