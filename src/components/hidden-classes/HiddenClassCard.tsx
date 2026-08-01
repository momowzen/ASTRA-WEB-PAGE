import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import type { HiddenClass, Language } from '../../data/astraViewer.ts'
import { translate, SKILL_TYPE_COLORS } from '../../data/astraViewer.ts'

interface HiddenClassCardProps {
  hiddenClass: HiddenClass
  lang: Language
  index: number
}

export const HiddenClassCard = ({ hiddenClass, lang, index }: HiddenClassCardProps) => {
  const skillTypes = new Set<string>()
  hiddenClass.pairs.forEach((pair) =>
    pair.skills.forEach((skill) => skillTypes.add(skill.type))
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass rounded-2xl overflow-hidden gradient-border group hover:border-astra-primary/30 transition-all duration-300 flex flex-col"
    >
      {/* Header */}
      <div className="p-5 border-b border-astra-primary/10 bg-gradient-to-r from-astra-primary/5 to-astra-secondary/5">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-astra-accent/20 to-astra-primary/20 border border-astra-primary/20 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(251,191,36,0.2)] flex-shrink-0">
            <Sparkles className="w-7 h-7 text-astra-accent" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xl font-bold text-astra-text font-display text-glow-gold truncate">
              {translate(hiddenClass.className, lang)}
            </h3>
            <p className="text-sm text-astra-primary font-medium">
              {translate(hiddenClass.skillName, lang)}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {Array.from(skillTypes).map((type) => (
            <span
              key={type}
              className={[
                'px-2.5 py-1 rounded-full text-xs font-bold border uppercase tracking-wider',
                SKILL_TYPE_COLORS[type] || 'bg-astra-primary/10 text-astra-primary border-astra-primary/30',
              ].join(' ')}
            >
              {translate(type, lang)}
            </span>
          ))}
        </div>
      </div>

      {/* Skill description */}
      <div className="p-5 border-b border-astra-primary/10">
        <p className="text-astra-muted text-sm leading-relaxed">
          {translate(hiddenClass.skill, lang)}
        </p>
      </div>

      {/* Skill pairs */}
      <div className="p-5 border-b border-astra-primary/10">
        <h4 className="text-xs font-bold text-astra-muted uppercase tracking-wider mb-3">Required Skill Pairs</h4>
        <div className="space-y-3">
          {hiddenClass.pairs.map((pair, pairIndex) => (
            <div
              key={pairIndex}
              className="flex items-center gap-2 flex-wrap"
            >
              {pair.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className={[
                    'px-3 py-1.5 rounded-lg text-xs font-medium border',
                    skillIndex === 0 ? 'bg-astra-primary/10 text-astra-primary border-astra-primary/30' : 'bg-astra-secondary/10 text-astra-secondary border-astra-secondary/30',
                  ].join(' ')}
                >
                  {translate(skill.name, lang)}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="p-5 mt-auto">
        <h4 className="text-xs font-bold text-astra-muted uppercase tracking-wider mb-3">Milestones</h4>
        <div className="grid grid-cols-2 gap-2">
          {hiddenClass.milestones.map((milestone) => (
            <div
              key={milestone.lvl}
              className="rounded-lg bg-astra-surface/50 border border-astra-primary/10 p-2.5"
            >
              <span className="text-xs font-bold text-astra-accent">Lv.{milestone.lvl}</span>
              <p className="text-xs text-astra-text mt-1 leading-snug">{translate(milestone.desc, lang)}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
