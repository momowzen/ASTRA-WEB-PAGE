import { motion } from 'framer-motion'
import { Users, Sparkles, Search, Shield } from 'lucide-react'
import { ParticleBackground } from '../components/layout/ParticleBackground.tsx'
import { Navbar } from '../components/layout/Navbar.tsx'
import { Footer } from '../components/layout/Footer.tsx'
import { GlassCard } from '../components/ui/GlassCard.tsx'
import { Avatar } from '../components/ui/Avatar.tsx'
import { LoadingSpinner } from '../components/ui/LoadingSpinner.tsx'
import { useUsers } from '../hooks/useUsers.ts'
import { useDebounce } from '../hooks/useDebounce.ts'
import { useState } from 'react'
import { formatNumber } from '../utils/helpers.ts'

export const MembersPage = () => {
  const { members, loading, error } = useUsers()
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  const filtered = members.filter((m) =>
    !debouncedSearch ||
    m.ign.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    m.discordName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    m.class?.toLowerCase().includes(debouncedSearch.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-astra-bg">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <div className="inline-flex items-center gap-2 text-astra-primary mb-4">
              <Users className="w-4 h-4" />
              <span className="text-xs uppercase tracking-[0.3em] font-semibold">Guild Roster</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-astra-text font-display mb-4">
              The Celestial Roster
            </h1>
            <p className="text-astra-muted max-w-2xl mx-auto">
              Meet the warriors who make ASTRA a force to be reckoned with.
            </p>
          </motion.div>

          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-astra-muted" />
              <input
                type="text"
                placeholder="Search members..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-astra-bg/60 border border-astra-primary/20 rounded-xl text-astra-text placeholder:text-astra-muted/60 focus:border-astra-primary/60 focus:ring-2 focus:ring-astra-primary/20 transition-all outline-none pl-12 pr-4 py-4"
              />
            </div>
          </div>

          {loading ? (
            <LoadingSpinner message="Loading roster..." />
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-400">Failed to load members. Please try again.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((member, index) => (
                <GlassCard key={member.uid} delay={index * 0.05} className="group">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar src={member.avatar} name={member.ign} size="md" glow />
                    <div>
                      <h3 className="text-lg font-semibold text-astra-text font-display group-hover:text-astra-primary transition-colors">
                        {member.ign}
                      </h3>
                      <p className="text-xs text-astra-muted">{member.discordName}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-astra-muted uppercase tracking-wider">Combat Power</span>
                      <span className="text-astra-primary font-bold font-display">{formatNumber(member.combatPower || 0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-astra-muted uppercase tracking-wider">Level</span>
                      <span className="text-astra-text">{member.level || 1}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-astra-muted uppercase tracking-wider">Class</span>
                      <span className="text-astra-text">{member.class || '—'}</span>
                    </div>
                    {member.mainWeapon && (
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-astra-muted uppercase tracking-wider">Main Weapon</span>
                        <span className="text-astra-accent text-sm truncate max-w-[120px]">{member.mainWeapon}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-astra-primary/10">
                    <div className="flex items-center gap-1 text-xs text-astra-muted">
                      {member.role === 'admin' ? (
                        <span className="flex items-center gap-1 text-astra-accent">
                          <Shield className="w-3 h-3" /> Admin
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-astra-primary">
                          <Sparkles className="w-3 h-3" /> Member
                        </span>
                      )}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-astra-muted">No members found matching your search.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
