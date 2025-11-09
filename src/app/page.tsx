import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'
import MissionSection from '@/components/MissionSection'
import JoinSection from '@/components/JoinSection'
import NewsSection from '@/components/NewsSection'
import ContactSection from '@/components/ContactSection'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function Home() {
  return (
    <div id="main-content">
      <article className="page">
        <div className="entry-content">
          <Hero />
          <AboutSection />
          <MissionSection />
          <JoinSection />
          <NewsSection />
          <ContactSection />
        </div>
      </article>
    </div>
  )
}
