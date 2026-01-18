'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Home,
    LayoutDashboard,
    FolderKanban,
    FileText,
    Settings,
    Phone,
    Briefcase,
    User,
    Search
} from 'lucide-react'

const commands = [
    { name: 'الرئيسية', href: '/', icon: Home, group: 'التنقل' },
    { name: 'لوحة التحكم', href: '/dashboard', icon: LayoutDashboard, group: 'التنقل' },
    { name: 'المشاريع', href: '/dashboard/projects', icon: FolderKanban, group: 'لوحة التحكم' },
    { name: 'الفواتير', href: '/dashboard/invoices', icon: FileText, group: 'لوحة التحكم' },
    { name: 'الإعدادات', href: '/dashboard/settings', icon: Settings, group: 'لوحة التحكم' },
    { name: 'خدماتنا', href: '/services', icon: Briefcase, group: 'الصفحات' },
    { name: 'أعمالنا', href: '/portfolio', icon: FolderKanban, group: 'الصفحات' },
    { name: 'من نحن', href: '/about', icon: User, group: 'الصفحات' },
    { name: 'اتصل بنا', href: '/contact', icon: Phone, group: 'الصفحات' },
]

export function CommandPalette() {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    const router = useRouter()

    // Toggle with CMD+K or CTRL+K
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((o) => !o)
            }
            // ESC to close
            if (e.key === 'Escape') {
                setOpen(false)
            }
        }
        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [])

    const handleSelect = useCallback((href: string) => {
        setOpen(false)
        setSearch('')
        router.push(href)
    }, [router])

    const filteredCommands = commands.filter((cmd) =>
        cmd.name.toLowerCase().includes(search.toLowerCase())
    )

    const groups = [...new Set(filteredCommands.map((c) => c.group))]

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
                    />

                    {/* Command Dialog */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.15 }}
                        className="fixed inset-x-4 top-[20vh] mx-auto max-w-lg z-[201]"
                    >
                        <Command
                            className="bg-[var(--wat-surface)] border border-[var(--wat-glass-border)] rounded-xl shadow-2xl overflow-hidden"
                            loop
                        >
                            {/* Search Input */}
                            <div className="flex items-center gap-3 px-4 border-b border-[var(--wat-glass-border)]">
                                <Search size={18} className="text-[var(--wat-text-muted)]" />
                                <Command.Input
                                    value={search}
                                    onValueChange={setSearch}
                                    placeholder="ابحث أو انتقل..."
                                    className="w-full py-4 bg-transparent text-white outline-none placeholder:text-[var(--wat-text-muted)]"
                                />
                                <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-[var(--wat-glass-border)] bg-[var(--wat-surface)] px-1.5 font-mono text-[10px] text-[var(--wat-text-muted)]">
                                    ESC
                                </kbd>
                            </div>

                            {/* Results */}
                            <Command.List className="max-h-80 overflow-y-auto p-2">
                                <Command.Empty className="py-6 text-center text-sm text-[var(--wat-text-muted)]">
                                    لا توجد نتائج
                                </Command.Empty>

                                {groups.map((group) => (
                                    <Command.Group key={group} heading={group} className="mb-2">
                                        <div className="px-2 py-1.5 text-xs font-semibold text-[var(--wat-text-muted)]">
                                            {group}
                                        </div>
                                        {filteredCommands
                                            .filter((cmd) => cmd.group === group)
                                            .map((cmd) => (
                                                <Command.Item
                                                    key={cmd.href}
                                                    value={cmd.name}
                                                    onSelect={() => handleSelect(cmd.href)}
                                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-white hover:bg-white/10 data-[selected=true]:bg-[var(--wat-primary)]/20 data-[selected=true]:text-[var(--wat-primary)]"
                                                >
                                                    <cmd.icon size={18} />
                                                    <span>{cmd.name}</span>
                                                </Command.Item>
                                            ))}
                                    </Command.Group>
                                ))}
                            </Command.List>

                            {/* Footer */}
                            <div className="flex items-center justify-between border-t border-[var(--wat-glass-border)] px-4 py-2 text-xs text-[var(--wat-text-muted)]">
                                <span>اضغط ↵ للانتقال</span>
                                <span className="flex items-center gap-2">
                                    <kbd className="px-1.5 py-0.5 rounded bg-[var(--wat-surface)] border border-[var(--wat-glass-border)]">↑↓</kbd>
                                    للتنقل
                                </span>
                            </div>
                        </Command>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
