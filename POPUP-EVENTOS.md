# Sistema de Pop-up de Eventos

## Descripción
Sistema de pop-up dinámico para mostrar eventos importantes (como la cena de juntada de promociones). El pop-up se muestra al cargar la página y se adapta según el dispositivo.

## Comportamiento

### Desktop 🖥️
1. **Al cargar**: Pop-up completo con imagen, título, descripción y fecha
2. **Al cerrar**: Se minimiza a una esquina inferior derecha mostrando solo título y fecha
3. **Versión minimizada**: Se puede hacer clic para volver a abrir el modal completo
4. **Persistencia**: No vuelve a aparecer hasta el día siguiente

### Mobile 📱
1. **Al cargar**: Pop-up completo adaptado a pantalla móvil
2. **Al cerrar**: Desaparece completamente (por limitaciones de espacio)
3. **Persistencia**: No vuelve a aparecer hasta el día siguiente

## Configuración en Strapi

### Crear Collection Type: `eventos-popup`

1. **Ir a**: Content-Type Builder → Create new collection type
2. **Nombre**: `eventos-popup` (singular: `evento-popup`)
3. **Agregar campos**:

#### Campos básicos:
- **titulo** (Text)
  - Type: Short text
  - Required: ✓
  - Ejemplo: "Cena del Junte de Promociones"

- **descripcion** (Text)
  - Type: Long text
  - Required: ✓
  - Ejemplo: "¡Te esperamos en la cena anual donde se reúnen todas las promociones del Monse! Será una noche inolvidable..."

- **fecha** (Date)
  - Type: Date
  - Required: ✓
  - Format: Date & Time
  - Ejemplo: 2025-11-15T20:00:00

- **link** (Text)
  - Type: Short text
  - Required: ✗ (opcional)
  - Ejemplo: "https://forms.google.com/inscripcion"
  - Nota: Link para más información o inscripciones

- **activo** (Boolean)
  - Type: Boolean
  - Required: ✓
  - Default: false
  - Nota: Solo eventos con `activo = true` se mostrarán

#### Campo de media:
- **imagen** (Media)
  - Type: Single media
  - Allowed types: Images only
  - Required: ✗ (recomendado)
  - Formato recomendado: 1200x800px o 16:9 ratio

### Configurar Permisos

1. **Ir a**: Settings → Roles → Public
2. **eventos-popup**: Marcar ✓ en `find` y `findOne`
3. **Guardar**

### Crear Evento de Ejemplo

```json
{
  "titulo": "Cena del Junte de Promociones 2025",
  "descripcion": "¡Llegó el momento más esperado del año! La tradicional Cena del Junte de Promociones vuelve para reunir a todas las generaciones de Monserratenses.\n\nFecha: Viernes 15 de Noviembre\nHora: 20:00 hs\nLugar: Salón de la Asociación\n\n¡No te lo pierdas! Es una noche para compartir, recordar y celebrar juntos nuestra historia.",
  "fecha": "2025-11-15T20:00:00.000Z",
  "link": "https://forms.google.com/inscripcion-cena",
  "activo": true,
  "imagen": [subir imagen del evento]
}
```

## Funcionamiento Técnico

### Frontend (`EventPopup.tsx`)
- **Estado local**: Maneja apertura/cierre y minimización
- **localStorage**: Guarda `popup-closed-{id}` con la fecha de cierre
- **Responsive**: Detecta ancho de pantalla para comportamiento mobile/desktop
- **Animaciones**: FadeIn y ScaleIn suaves

### Service (`eventosPopup.ts`)
- **Endpoint**: `GET /api/eventos-popup?filters[activo][$eq]=true&populate=imagen&sort=fecha:desc`
- **Lógica**: Trae solo el evento activo más reciente (ordenado por fecha descendente)
- **Cache**: `no-store` para siempre tener datos actualizados

### Layout (`layout.tsx`)
- **Server Component**: Hace fetch del evento activo en el servidor
- **Props**: Pasa el evento al componente client `EventPopup`
- **Ubicación**: Se renderiza antes del contenido principal

## Flujo de Uso

### Para agregar un nuevo evento:

1. **Ir a Strapi**: Content Manager → Eventos Popup
2. **Create new entry**
3. **Completar campos**:
   - Título del evento
   - Descripción completa (usa saltos de línea para mejor lectura)
   - Fecha y hora del evento
   - (Opcional) Link para inscripciones/más info
   - Subir imagen representativa
   - ✓ Marcar como **activo**
4. **Publish**

### Para desactivar el pop-up actual:

1. **Ir al evento activo en Strapi**
2. **Desmarcar** el campo `activo`
3. **Save & Publish**

### Para cambiar de evento:

1. **Desactivar** el evento anterior (`activo = false`)
2. **Activar** el nuevo evento (`activo = true`)
3. Los usuarios verán el nuevo pop-up automáticamente

## Notas Importantes

⚠️ **Solo un evento activo a la vez**: Aunque se pueden tener múltiples eventos con `activo = true`, solo se mostrará el más reciente por fecha.

💾 **Persistencia por día**: El pop-up se guarda como "cerrado" por evento y por día. Si cambias a otro evento, volverá a aparecer.

📱 **UX Mobile**: En mobile el pop-up no se minimiza, desaparece completamente para no ocupar espacio permanente.

🖼️ **Imágenes**: Recomendado usar imágenes de alta calidad en formato 16:9 (1200x800px mínimo).

🔄 **Actualización**: Los cambios en Strapi se reflejan inmediatamente (no hay cache en el fetch).

## Testing Local

```bash
# Iniciar Strapi
cd webmonse-strapi
npm run develop

# Iniciar Next.js
cd ..
npm run dev

# Crear un evento de prueba en Strapi
# Abrir http://localhost:3000 para ver el pop-up
```

## Próximas Mejoras

- [ ] Sistema de múltiples eventos (cola/carrusel)
- [ ] Filtros por tipo de evento (cenas, charlas, deportes)
- [ ] Analytics de visualizaciones/clics
- [ ] Personalización de colores/estilos por evento
- [ ] Temporizador countdown para eventos próximos
