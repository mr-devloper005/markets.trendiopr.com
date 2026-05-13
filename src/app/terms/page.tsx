import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    id: 'agreement',
    title: 'Agreement to terms',
    paragraphs: [
      `By accessing ${SITE_CONFIG.name} (“we”, “us”, “our”) or using our guest post and distribution services, you agree to these Terms of Service. If you do not agree, do not use the site or submit materials for distribution.`,
    ],
  },
  {
    id: 'services',
    title: 'Services',
    paragraphs: [
      'We provide media distribution and guest posting coordination, including publisher matching, editorial guidance as agreed, and publication logistics. Specific deliverables are defined per campaign or statement of work—not solely by marketing copy on this site.',
      'Publisher availability, editorial calendars, and third-party decisions are outside our full control; timelines and placements may shift when outlets change their policies or capacity.',
    ],
  },
  {
    id: 'content',
    title: 'Your content & representations',
    paragraphs: [
      'You represent that you have the rights to submit drafts, links, images (if any), and trademarks you provide, and that the content does not infringe third-party rights or violate applicable law.',
      'You grant us the license reasonably necessary to review, edit as agreed, submit to publishers, and display excerpts or results as part of reporting or marketing of our own services.',
      'You are responsible for factual claims, disclosures, and compliance with advertising or industry rules in your sector.',
    ],
  },
  {
    id: 'acceptable',
    title: 'Acceptable use',
    paragraphs: [
      'No use of the service for deceptive SEO schemes solely intended to manipulate search rankings without editorial value, illegal products, harassment, malware, or spam.',
      'No attempts to interfere with the security or integrity of the site, reverse engineer non-public systems, or scrape the site in a way that degrades service for others.',
    ],
  },
  {
    id: 'fees',
    title: 'Fees & payment',
    paragraphs: [
      'Fees, deposits, and invoicing terms are agreed per engagement. Unless otherwise stated, quotes exclude taxes and third-party publisher fees that pass through transparently.',
      'Refunds or credits, if any, follow the cancellation policy in your order or contract.',
    ],
  },
  {
    id: 'liability',
    title: 'Disclaimer & limitation',
    paragraphs: [
      'The site and materials are provided on an “as is” basis to the maximum extent permitted by law. We disclaim implied warranties where allowable.',
      'To the extent permitted by law, our aggregate liability arising from these terms or the services will be limited to the fees paid by you for the specific campaign giving rise to the claim during the six (6) months preceding the claim—or a higher amount only if mandated by law.',
    ],
  },
  {
    id: 'indemnity',
    title: 'Indemnity',
    paragraphs: [
      'You will defend and indemnify us against claims arising from your content, your breach of these terms, or your misuse of the services, subject to procedures and exceptions under applicable law.',
    ],
  },
  {
    id: 'law',
    title: 'Governing law & disputes',
    paragraphs: [
      'These terms are governed by the laws chosen in your master services agreement, or otherwise by the laws applicable to our principal place of business, excluding conflict-of-law rules that would point elsewhere.',
      'Dispute resolution (courts vs arbitration) follows what you have signed in writing with us; in the absence of such a clause, disputes may be brought in competent courts as permitted by law.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes',
    paragraphs: [
      'We may update these terms from time to time. Continued use of the site after the “Last updated” date constitutes acceptance of the revised terms for use of the site; signed contracts may supersede for governed engagements.',
    ],
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#e6dacf] text-[#1a1a1a]">
      <NavbarShell />

      <section className="border-b border-[#1a1a1a]/10 bg-[#1a1a1a] py-14 text-[#f5f5f0] sm:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f5f5f0]/45">Legal</p>
          <h1 className="font-display mt-4 text-3xl font-semibold uppercase tracking-[0.02em] sm:text-4xl lg:text-5xl">Terms of Service</h1>
          <p className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-[#f5f5f0]/72 sm:text-base">
            Rules and expectations for using {SITE_CONFIG.name}, including guest post distribution, submissions, and working with our desk.
          </p>
          <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.16em] text-[#f5f5f0]/50">Last updated: April 23, 2026</p>
        </div>
      </section>

      <main className="mx-auto max-w-[1400px] px-4 py-12 sm:px-8 lg:flex lg:gap-12 lg:px-12 lg:py-16">
        <aside className="mb-10 hidden w-56 shrink-0 lg:block">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1a1a1a]/45">Sections</p>
          <nav className="mt-4 space-y-2 border-l border-[#1a1a1a]/15 pl-4">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="block font-sans text-sm text-[#1a1a1a]/70 transition hover:text-[#1a1a1a]">
                {s.title}
              </a>
            ))}
          </nav>
          <div className="mt-10 border border-[#1a1a1a]/10 bg-[#f5f5f0] p-5">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1a1a1a]/45">Contracting</p>
            <p className="mt-2 font-sans text-sm leading-relaxed text-[#1a1a1a]/70">Signed statements of work or orders take precedence over general website terms where they conflict.</p>
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
              <Link href="/privacy" className="font-semibold text-[#1a1a1a] underline decoration-[#1a1a1a]/25 underline-offset-2">
                Privacy Policy
              </Link>
              {' · '}
              <Link href="/contact" className="font-semibold text-[#1a1a1a] underline decoration-[#1a1a1a]/25 underline-offset-2">
                Contact
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
