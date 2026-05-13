import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

export const FOOTER_OVERRIDE_ENABLED = true

const SITE_LOGO = '/favicon.png?v=20260423'

const columns = {
  services: [
    { label: 'Guest posting', href: '/contact' },
    { label: 'Publisher outreach', href: '/contact' },
    { label: 'Content syndication', href: '/updates' },
  ],
  resources: [
    { label: 'Help center', href: '/help' },
    { label: 'Latest placements', href: '/updates' },
    { label: 'Community', href: '/community' },
  ],
  support: [
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
} as const

export function FooterOverride() {
  return (
    <footer className="border-t border-white/10 bg-[#1a1a1a] text-[#f5f5f0]">
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr_1fr_1fr_minmax(0,220px)] lg:gap-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-[#f5f5f0]/20 bg-black">
                <img src={SITE_LOGO} alt={`${SITE_CONFIG.name} logo`} width={48} height={48} className="h-full w-full object-contain p-0.5" />
              </span>
              <div>
                <p className="font-display text-xl font-semibold tracking-tight">{SITE_CONFIG.name}</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.26em] text-[#f5f5f0]/50">Media distribution</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#f5f5f0]/65">{SITE_CONFIG.description}</p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 border border-[#f5f5f0] bg-[#f5f5f0] px-5 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1a1a1a] transition hover:bg-transparent hover:text-[#f5f5f0]"
            >
              Start a campaign
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f5f5f0]/45">Services</h3>
            <ul className="mt-5 space-y-3 text-sm text-[#f5f5f0]/85">
              {columns.services.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f5f5f0]/45">Resources</h3>
            <ul className="mt-5 space-y-3 text-sm text-[#f5f5f0]/85">
              {columns.resources.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f5f5f0]/45">Support</h3>
            <ul className="mt-5 space-y-3 text-sm text-[#f5f5f0]/85">
              {columns.support.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-white/10 pt-8 lg:border-t-0 lg:border-l lg:border-white/10 lg:pl-8 lg:pt-0">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f5f5f0]/45">Studio</h3>
            <p className="mt-5 text-sm leading-relaxed text-[#f5f5f0]/70">
              Editorial desk hours: weekdays, 9am–6pm GMT. For campaign briefs and publisher lists, email through the contact form.
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-10">
          <p className="font-display text-center text-[clamp(1.75rem,5vw,3.25rem)] font-semibold uppercase leading-[1.05] tracking-[0.02em] text-[#f5f5f0]/92">
            Distribute wide. Publish smart.
          </p>
        </div>

        <p className="mt-10 text-center text-xs text-[#f5f5f0]/45">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
