# 📱 CONFIGURACIÓN DE BANNERS SOLO PARA MOBILE

## Problema Identificado:
Los banners NO se ven bien en mobile porque:
1. Algunas páginas todavía tienen código viejo con `backgroundSize: '100%'`
2. Las posiciones mobile no están optimizadas
3. El overlay es muy oscuro en algunas páginas

## ✅ Referencia PERFECTA: /servicios
```tsx
<PageBanner 
  title="Servicios"
  backgroundImage="/images/fachada-monserrat.jpg"
  desktopPosition="center center"
  mobilePosition="center 20%"    // ← ESTA ES LA CLAVE
  overlay={0.2}                    // ← 20% de negro (muy claro)
/>
```

## 📋 CONFIGURACIONES ÓPTIMAS PARA CADA PÁGINA:

### /contacto
- mobilePosition: "center 35%" (imagen oficina)
- overlay: 0.2

### /noticias  
- mobilePosition: "center 25%" (fuente patio)
- overlay: 0.2

### /servicios ✓ (Ya está perfecto)
- mobilePosition: "center 20%" (fachada)
- overlay: 0.2

### /comision-directiva
- mobilePosition: "center 70%" (fuente patio)
- overlay: 0.2

### /carta-fundacional
- mobilePosition: "center 25%" (fuente patio)
- overlay: 0.2

### /mision-vision-valores
- mobilePosition: "center 30%" (patio)
- overlay: 0.2

### /monserratenses-por-el-mundo
- mobilePosition: "center 40%" (imagen mundo)
- overlay: 0.2

## 🔧 El componente PageBanner YA tiene:
- ✓ Detección automática de mobile (< 768px)
- ✓ backgroundSize: 'cover' (cubre todo el área)
- ✓ Posicionamiento diferente para desktop vs mobile
- ✓ Overlay configurable

## ⚠️ PROBLEMA ACTUAL:
Algunos archivos tienen CÓDIGO VIEJO que bloquea PageBanner.
Necesitan ELIMINARSE las secciones viejas con:
- `backgroundSize: '100%'`
- Banners estáticos sin componente PageBanner

## 🎯 PARA PROBAR EN MOBILE:
1. Abre Chrome DevTools (F12)
2. Click en ícono de teléfono (Toggle device toolbar)
3. Selecciona "iPhone SE" o "iPhone 12 Pro"
4. Navega a cada página
5. Verifica que la imagen CUBRA TODO sin gris en bordes

