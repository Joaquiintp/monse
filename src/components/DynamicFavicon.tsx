interface DynamicFaviconProps {
  faviconUrl?: string
}

export default function DynamicFavicon({ faviconUrl }: DynamicFaviconProps) {
  // Si hay favicon desde Strapi, usarlo con prioridad absoluta
  if (faviconUrl) {
    const fullUrl = faviconUrl.startsWith('http') 
      ? faviconUrl 
      : `${process.env.NEXT_PUBLIC_STRAPI_URL || 'https://strapi.monserratenses.org.ar'}${faviconUrl}`
    
    return (
      <>
        <link rel="icon" type="image/x-icon" href={fullUrl} />
        <link rel="shortcut icon" type="image/x-icon" href={fullUrl} />
        <link rel="apple-touch-icon" href={fullUrl} />
      </>
    )
  }
  
  // Fallback al favicon por defecto del proyecto
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" type="image/svg+xml" href="/icon.svg" />
      <link rel="apple-touch-icon" href="/favicon.svg" />
    </>
  )
}
