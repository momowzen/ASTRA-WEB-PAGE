import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronUp, ChevronDown, Edit, Trash2, MoreHorizontal, Shield, User, UserPlus } from 'lucide-react'
import { Avatar } from '../ui/Avatar.tsx'
import { GlowButton } from '../ui/GlowButton.tsx'
import { useDebounce } from '../../hooks/useDebounce.ts'
import { formatNumber, formatDate } from '../../utils/helpers.ts'
import { getCountryFlag } from '../../types/index.ts'
import type { MemberProfile, MemberSortField, SortDirection, UserRole } from '../../types/index.ts'

interface MemberTableProps {
  members: MemberProfile[]
  onEdit: (member: MemberProfile) => void
  onDelete: (member: MemberProfile) => void
  currentUserId: string
  isAdmin: boolean
}

export const MemberTable = ({ members, onEdit, onDelete, currentUserId, isAdmin }: MemberTableProps) => {
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState<'all' | UserRole>('all')
  const [sortField, setSortField] = useState<MemberSortField>('combatPower')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const debouncedSearch = useDebounce(search, 300)

  const handleSort = (field: MemberSortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
    setCurrentPage(1)
  }

  const filtered = useMemo(() => {
    let result = members.filter((m) => {
      const matchesSearch =
        !debouncedSearch ||
        m.ign.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        m.discordName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        m.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        m.nationality?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        m.server?.toLowerCase().includes(debouncedSearch.toLowerCase())

      const matchesRole = filterRole === 'all' || m.role === filterRole

      return matchesSearch && matchesRole
    })

    result = [...result].sort((a, b) => {
      let aValue: number | string = ''
      let bValue: number | string = ''

      switch (sortField) {
        case 'ign':
          aValue = a.ign.toLowerCase()
          bValue = b.ign.toLowerCase()
          break
        case 'combatPower':
          aValue = a.combatPower || 0
          bValue = b.combatPower || 0
          break
        case 'level':
          aValue = a.level || 0
          bValue = b.level || 0
          break
        case 'mainWeapon':
          aValue = a.mainWeapon || ''
          bValue = b.mainWeapon || ''
          break
        case 'nationality':
          aValue = a.nationality || ''
          bValue = b.nationality || ''
          break
        case 'updatedAt':
          aValue = a.updatedAt || ''
          bValue = b.updatedAt || ''
          break
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
      }

      return sortDirection === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue))
    })

    return result
  }, [members, debouncedSearch, filterRole, sortField, sortDirection])

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage))
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const SortIcon = ({ field }: { field: MemberSortField }) => {
    if (sortField !== field) return <MoreHorizontal className="w-4 h-4 text-astra-muted/40" />
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4 text-astra-primary" />
    ) : (
      <ChevronDown className="w-4 h-4 text-astra-primary" />
    )
  }

  const roleBadge = (role: UserRole) => {
    if (role === 'admin') {
      return (
        <span className="px-2 py-0.5 rounded bg-astra-accent/10 text-astra-accent text-[10px] uppercase tracking-wider flex items-center gap-1">
          <Shield className="w-3 h-3" /> Admin
        </span>
      )
    }
    if (role === 'applicant') {
      return (
        <span className="px-2 py-0.5 rounded bg-astra-primary/10 text-astra-primary text-[10px] uppercase tracking-wider flex items-center gap-1">
          <UserPlus className="w-3 h-3" /> Applicant
        </span>
      )
    }
    return (
      <span className="px-2 py-0.5 rounded bg-astra-secondary/10 text-astra-secondary text-[10px] uppercase tracking-wider flex items-center gap-1">
        <User className="w-3 h-3" /> Member
      </span>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-astra-muted" />
          <input
            type="text"
            placeholder="Search by IGN, Discord, nationality, server..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full bg-astra-bg/60 border border-astra-primary/20 rounded-lg text-astra-text placeholder:text-astra-muted/60 focus:border-astra-primary/60 focus:ring-2 focus:ring-astra-primary/20 transition-all outline-none pl-10 pr-4 py-3"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'admin', 'member', 'applicant'] as const).map((role) => (
            <button
              key={role}
              onClick={() => {
                setFilterRole(role)
                setCurrentPage(1)
              }}
              className={[
                'px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize',
                filterRole === role
                  ? 'bg-astra-primary/10 text-astra-primary border border-astra-primary/30'
                  : 'bg-astra-bg/60 text-astra-muted border border-astra-primary/10 hover:border-astra-primary/30',
              ].join(' ')}
            >
              {role === 'all' ? 'All' : role}
            </button>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden border border-astra-primary/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-astra-bg/80 sticky top-0">
              <tr>
                {[
                  { field: 'ign' as MemberSortField, label: 'Member', wide: true },
                  { field: 'combatPower' as MemberSortField, label: 'CP', wide: false },
                  { field: 'level' as MemberSortField, label: 'Lvl', wide: false },
                  { field: 'mainWeapon' as MemberSortField, label: 'Main Weapon', wide: false },
                  { field: 'nationality' as MemberSortField, label: 'Nationality', wide: false },
                  { field: 'updatedAt' as MemberSortField, label: 'Updated', wide: false },
                ].map((col) => (
                  <th
                    key={col.field}
                    onClick={() => handleSort(col.field)}
                    className={[
                      'px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-astra-muted cursor-pointer hover:text-astra-primary transition-colors select-none',
                      col.wide ? 'min-w-[240px]' : '',
                    ].join(' ')}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      <SortIcon field={col.field} />
                    </div>
                  </th>
                ))}
                <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-wider text-astra-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-astra-primary/10">
              <AnimatePresence mode="popLayout">
                {paginated.map((member, index) => (
                  <motion.tr
                    key={member.uid}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    className="group hover:bg-astra-primary/5 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar src={member.avatar} name={member.ign} size="sm" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-astra-text">{member.ign}</span>
                            {roleBadge(member.role)}
                          </div>
                          <p className="text-xs text-astra-muted">{member.discordName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-astra-primary font-semibold font-display">{formatNumber(member.combatPower || 0)}</span>
                    </td>
                    <td className="px-4 py-4 text-astra-text">{member.level || 1}</td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-astra-muted">{member.mainWeapon || '—'}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-astra-muted">{member.nationality ? `${getCountryFlag(member.nationality)} ${member.nationality}` : '—'}</span>
                    </td>
                    <td className="px-4 py-4 text-sm text-astra-muted">{formatDate(member.updatedAt)}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <GlowButton
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(member)}
                          icon={<Edit className="w-3.5 h-3.5" />}
                        >
                          Edit
                        </GlowButton>
                        {isAdmin && member.uid !== currentUserId && (
                          <GlowButton
                            variant="danger"
                            size="sm"
                            onClick={() => onDelete(member)}
                            icon={<Trash2 className="w-3.5 h-3.5" />}
                          >
                            Delete
                          </GlowButton>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {paginated.length === 0 && (
          <div className="text-center py-16 text-astra-muted">
            <p>No members found matching your filters.</p>
          </div>
        )}

        <div className="flex items-center justify-between px-4 py-4 border-t border-astra-primary/10 bg-astra-bg/40">
          <p className="text-sm text-astra-muted">
            Showing {filtered.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
            {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} members
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg bg-astra-bg/60 border border-astra-primary/10 text-sm text-astra-muted hover:text-astra-text disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-astra-muted px-2">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg bg-astra-bg/60 border border-astra-primary/10 text-sm text-astra-muted hover:text-astra-text disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
