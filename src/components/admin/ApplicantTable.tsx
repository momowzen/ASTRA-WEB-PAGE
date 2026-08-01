import { motion } from 'framer-motion'
import { Check, X, UserPlus, MessageCircle, Sword, Globe, Server, Gauge, BarChart3 } from 'lucide-react'
import { Avatar } from '../ui/Avatar.tsx'
import { GlowButton } from '../ui/GlowButton.tsx'
import { formatNumber } from '../../utils/helpers.ts'
import { getCountryFlag } from '../../types/index.ts'
import type { MemberProfile } from '../../types/index.ts'

interface ApplicantTableProps {
  applicants: MemberProfile[]
  onApprove: (applicant: MemberProfile) => void
  onReject: (applicant: MemberProfile) => void
  onEdit: (applicant: MemberProfile) => void
}

export const ApplicantTable = ({ applicants, onApprove, onReject, onEdit }: ApplicantTableProps) => {
  if (applicants.length === 0) {
    return (
      <div className="text-center py-16 text-astra-muted">
        <p>No pending applications.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px]">
        <thead className="bg-astra-bg/80 sticky top-0 z-10">
          <tr>
            <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-astra-muted">Applicant</th>
            <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-astra-muted">Level</th>
            <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-astra-muted">CP</th>
            <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-astra-muted">Weapon</th>
            <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-astra-muted">Nationality</th>
            <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-astra-muted">Server</th>
            <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-wider text-astra-muted">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-astra-primary/10">
          {applicants.map((applicant, index) => (
            <motion.tr
              key={applicant.uid}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="group hover:bg-astra-primary/5 transition-colors"
            >
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <Avatar src={applicant.avatar} name={applicant.ign} size="sm" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-astra-text truncate max-w-[160px]">{applicant.ign}</span>
                      <span className="px-2 py-0.5 rounded bg-astra-primary/10 text-astra-primary text-[10px] uppercase tracking-wider flex items-center gap-1 whitespace-nowrap">
                        <UserPlus className="w-3 h-3" /> Applicant
                      </span>
                    </div>
                    <p className="text-xs text-astra-muted flex items-center gap-1 truncate max-w-[200px]">
                      <MessageCircle className="w-3 h-3 flex-shrink-0" /> {applicant.discordName}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-astra-text whitespace-nowrap">
                <span className="flex items-center gap-1 text-sm">
                  <BarChart3 className="w-3 h-3 text-astra-muted" /> {applicant.level}
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <span className="text-astra-primary font-semibold font-display text-sm flex items-center gap-1">
                  <Gauge className="w-3 h-3 text-astra-muted" /> {formatNumber(applicant.combatPower || 0)}
                </span>
              </td>
              <td className="px-4 py-4 text-sm text-astra-muted">
                <span className="flex items-center gap-1 truncate max-w-[120px] block">
                  <Sword className="w-3 h-3 text-astra-muted flex-shrink-0" /> {applicant.mainWeapon || '—'}
                </span>
              </td>
              <td className="px-4 py-4 text-sm text-astra-muted">
                <span className="flex items-center gap-1 truncate max-w-[140px] block">
                  <Globe className="w-3 h-3 text-astra-muted flex-shrink-0" /> {applicant.nationality ? `${getCountryFlag(applicant.nationality)} ${applicant.nationality}` : '—'}
                </span>
              </td>
              <td className="px-4 py-4 text-sm text-astra-muted">
                <span className="flex items-center gap-1 truncate max-w-[120px] block">
                  <Server className="w-3 h-3 text-astra-muted flex-shrink-0" /> {applicant.server || '—'}
                </span>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center justify-end gap-2 flex-wrap">
                  <GlowButton
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(applicant)}
                  >
                    Review
                  </GlowButton>
                  <GlowButton
                    size="sm"
                    onClick={() => onApprove(applicant)}
                    icon={<Check className="w-3.5 h-3.5" />}
                  >
                    Approve
                  </GlowButton>
                  <GlowButton
                    variant="danger"
                    size="sm"
                    onClick={() => onReject(applicant)}
                    icon={<X className="w-3.5 h-3.5" />}
                  >
                    Reject
                  </GlowButton>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
