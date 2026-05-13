import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    id: 'overview',
    title: 'Overview',
    paragraphs: [
      `${SITE_CONFIG.name} operates a guest post and media distribution desk. This Privacy Policy explains what information we handle when you browse the site, contact us, or work with us on campaigns.`,
      'We design data practices around minimal collection, clear purposes, and straightforward choices. This document is written for transparency; it is not a substitute for legal advice in your jurisdiction.',
    ],
  },
  {
    id: 'collect',
    title: 'Information we collect',
    paragraphs: [
      'Contact details you provide voluntarily—such as name, work email, company, and message content—when you email the desk or use a contact form.',
      'Technical data typical of websites: approximate region, browser type, device category, and pages viewed, used to secure the service and understand aggregate traffic.',
      'Campaign-related materials you share for distribution (drafts, briefs, anchor text, target URLs) are processed to deliver the service you requested.',
    ],
  },
  {
    id: 'use',
    title: 'How we use information',
    paragraphs: [
      'To respond to enquiries, prepare publisher recommendations, and operate active distribution campaigns.',
      'To maintain security, detect abuse, and protect the integrity of publisher relationships.',
      'To comply with law or enforceable requests where required, and to document consent or instructions you have given us.',
    ],
  },
  {
    id: 'sharing',
    title: 'Sharing & processors',
    paragraphs: [
      'We do not sell personal information. We share information with publishers or partners only when necessary to fulfil a campaign you have authorized, or when you ask us to make an introduction.',
      'We may use trusted subprocessors (for example email, hosting, or analytics) who process data on our instructions and under appropriate agreements.',
    ],
  },
  {
    id: 'retention',
    title: 'Retention',
    paragraphs: [
      'Contact and campaign records are kept for as long as needed to provide the service, manage disputes, and meet legal or accounting obligations. Retention periods vary by record type.',
      'You may request deletion of contact messages where no ongoing obligation requires us to retain them.',
    ],
  },
  {
    id: 'rights',
    title: 'Your choices & rights',
    paragraphs: [
      'Depending on where you live, you may have rights to access, correct, delete, or restrict certain processing of your personal data, or to object to processing or port your data.',
      'To exercise a request, contact us using the details on the Contact page. We may need to verify your identity before acting.',
    ],
  },
  {
    id: 'international',
    title: 'International transfers',
    paragraphs: [
      'If data is processed across borders, we use appropriate safeguards—such as standard contractual clauses or equivalent measures—where required by applicable law.',
    ],
  },
  {
    id: 'updates',
    title: 'Updates to this policy',
    paragraphs: [
      'We may revise this page when our practices or the law change. The “Last updated” date below reflects the latest substantive revision.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#e6dacf] text-[#1a1a1a]">
      <NavbarShell />

      <section className="border-b border-[#1a1a1a]/10 bg-[#1a1a1a] py-14 text-[#f5f5f0] sm:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f5f5f0]/45">Legal</p>
          <h1 className="font-display mt-4 text-3xl font-semibold uppercase tracking-[0.02em] sm:text-4xl lg:text-5xl">Privacy Policy</h1>
          <p className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-[#f5f5f0]/72 sm:text-base">
            How {SITE_CONFIG.name} collects, uses, and protects information in connection with guest post distribution, publisher coordination, and this website.
          </p>
          <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.16em] text-[#f5f5f0]/50">Last updated: April 23, 2026</p>
        </div>
      </section>

      <main className="mx-auto max-w-[1400px] px-4 py-12 sm:px-8 lg:flex lg:gap-12 lg:px-12 lg:py-16">
        <aside className="mb-10 hidden w-56 shrink-0 lg:block">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1a1a1a]/45">On this page</p>
          <nav className="mt-4 space-y-2 border-l border-[#1a1a1a]/15 pl-4">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="block font-sans text-sm text-[#1a1a1a]/70 transition hover:text-[#1a1a1a]">
                {s.title}
              </a>
            ))}
          </nav>
          <div className="mt-10 border border-[#1a1a1a]/10 bg-[#f5f5f0] p-5">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1a1a1a]/45">Questions</p>
            <p className="mt-2 font-sans text-sm leading-relaxed text-[#1a1a1a]/70">For privacy-specific requests, reach the desk via the contact page.</p>
            <Link
              href="/contact"
              className="mt-4 inline-flex font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1a1a1a] underline decoration-[#1a1a1a]/25 underline-offset-2"
            >
              Contact →
            </Link>
          </div>
        </aside>

        <div className="min-w-0 flex-1 border border-[#1a1a1a]/10 bg-[#f5f5f0] p-6 sm:p-10 lg:p-12">
          <div className="mb-10 border-b border-[#1a1a1a]/10 pb-8 lg:hidden">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1a1a1a]/45">Jump to</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="border border-[#1a1a1a]/12 bg-[#e6dacf]/40 px-3 py-1.5 font-sans text-xs text-[#1a1a1a]/80"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-14">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="font-display text-2xl font-semibold uppercase tracking-[0.02em] text-[#1a1a1a]">{section.title}</h2>
                <div className="mt-4 space-y-4 border-t border-[#1a1a1a]/10 pt-6">
                  {section.paragraphs.map((p, i) => (
                    <p key={i} className="font-sans text-sm leading-relaxed text-[#1a1a1a]/75 sm:text-[15px]">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-14 border-t border-[#1a1a1a]/10 pt-10">
            <p className="font-sans text-sm leading-relaxed text-[#1a1a1a]/65">
              Related:{' '}
              <Link href="/terms" className="font-semibold text-[#1a1a1a] underline decoration-[#1a1a1a]/25 underline-offset-2">
                Terms of Service
              </Link>
              {' · '}
              <Link href="/help" className="font-semibold text-[#1a1a1a] underline decoration-[#1a1a1a]/25 underline-offset-2">
                Help center
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
