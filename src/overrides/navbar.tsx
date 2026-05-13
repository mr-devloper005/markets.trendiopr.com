'use client'

import Link from 'next/link'
import { ArrowUpRight, Search } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

export const NAVBAR_OVERRIDE_ENABLED = true

const navLinks = [
  { label: 'Publishers', href: '/updates' },
  { label: 'Services', href: '/contact' },
  { label: 'Distribution', href: '/#distribution' },
  { label: 'Community', href: '/community' },
]

const utilityLinks = [
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Contact', href: '/contact' },
]

const SITE_LOGO = '/favicon.png?v=20260423'

export function NavbarOverride() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#1a1a1a]/12 bg-[#f5f5f0]/95 text-[#1a1a1a] backdrop-blur-md">
      <div className="border-b border-[#1a1a1a]/10 bg-[#e6dacf]/80">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-end gap-x-5 gap-y-1 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#1a1a1a]/70 sm:px-8">
          {utilityLinks.map((item) => (
            <Link key={item.label} href={item.href} className="transition hover:text-[#1a1a1a]">
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-5 sm:px-8 lg:py-6">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="relative flex h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-[#1a1a1a]/15 bg-black shadow-sm">
            <img src={SITE_LOGO} alt={`${SITE_CONFIG.name} logo`} width={44} height={44} className="h-full w-full object-contain p-0.5" />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-lg font-semibold tracking-tight text-[#1a1a1a]">{SITE_CONFIG.name}</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#1a1a1a]/55">Guest post distribution</span>
          </span>
        </Link>

        <div className="hidden items-center justify-center gap-8 lg:flex xl:gap-10">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1a1a1a]/75 transition hover:text-[#1a1a1a]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/search"
            className="hidden h-10 w-10 items-center justify-center border border-[#1a1a1a]/20 text-[#1a1a1a] transition hover:border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f5f5f0] sm:flex"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-[#1a1a1a] bg-[#1a1a1a] px-4 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f5f5f0] transition hover:bg-[#2a2a2a]"
          >
            Submit post
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </nav>

      <div className="border-t border-[#1a1a1a]/10 lg:hidden">
        <div className="mx-auto flex max-w-[1400px] flex-wrap justify-center gap-x-5 gap-y-2 px-4 py-3 sm:px-8">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1a1a1a]/80">
              {item.label}
            </Link>
          ))}
          <Link href="/search" className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1a1a1a]/80">
            Search
          </Link>
        </div>
      </div>
    </header>
  )
}
