import { ParticleBackground } from '../components/layout/ParticleBackground.tsx'
import { Navbar } from '../components/layout/Navbar.tsx'
import { Footer } from '../components/layout/Footer.tsx'
import { HeroSection } from '../components/home/HeroSection.tsx'
import { AboutSection } from '../components/home/AboutSection.tsx'
import { FeaturesSection } from '../components/home/FeaturesSection.tsx'
import { StatsSection } from '../components/home/StatsSection.tsx'
import { RecruitmentSection } from '../components/home/RecruitmentSection.tsx'

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-astra-bg">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <FeaturesSection />
        <RecruitmentSection />
      </main>
      <Footer />
    </div>
  )
}
