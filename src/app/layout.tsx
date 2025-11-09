import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SocialFloat from '@/components/SocialFloat'
import EventPopup from '@/components/EventPopup'
import DynamicFavicon from '@/components/DynamicFavicon'
import { getActiveEvent } from '@/services/eventosPopup'
import { getConfiguracionSitio } from '@/services/configuracionSitio'

const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MONSERRATENSES | Asociación Civil',
  description: 'Asociación Civil Monserratenses - Unidos por el Monse',
  manifest: '/manifest.json',
  // El favicon se maneja dinámicamente en el componente DynamicFavicon
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const activeEvent = await getActiveEvent()
  const configuracion = await getConfiguracionSitio()
  
  return (
    <html lang="es">
      <head>
        <DynamicFavicon faviconUrl={configuracion?.favicon?.url} />
      </head>
      <body className={openSans.className}>
        <SocialFloat />
        <EventPopup event={activeEvent} />
        <div id="page-container">
          <Header />
          <main id="et-main-area">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
