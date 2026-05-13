import Link from 'next/link'
import { ArrowUpRight, BookOpen, FileText, LineChart, Shield } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const topics = [
  {
    icon: FileText,
    title: 'Briefs & drafts',
    body: 'Send a one-page brief: audience, geography, competitors to avoid, and whether the article is drafted or needs outlining. Attach a style guide if the voice must match an existing brand.',
  },
  {
    icon: Shield,
    title: 'Publisher fit',
    body: 'We classify outlets by category strength, editorial bar, and disclosure norms. Ask for “authority-first” or “volume-supported” mixes—we will explain the trade-offs in plain language.',
  },
  {
    icon: LineChart,
    title: 'Reporting',
    body: 'After go-live you receive live URLs, publication dates, and any syndication notes. If your team uses a tracker, we can align fields to your template.',
  },
  {
    icon: BookOpen,
    title: 'Policies',
    body: 'Review the Privacy Policy for data handling and the Terms of Service for acceptable use and contractual basics before starting a campaign.',
  },
]

const faqs = [
  {
    id: 'faq-1',
    question: 'How long does a guest post campaign usually take?',
    answer:
      'Timelines depend on publisher cadence and revision rounds. Many single-placement campaigns move from approved brief to live link within two to four weeks; multi-outlet bursts may run on a rolling schedule. Your desk contact will confirm dates after the shortlist is approved.',
  },
  {
    id: 'faq-2',
    question: 'Do you guarantee specific publishers or metrics?',
    answer:
      'We guarantee diligent matching and transparent reporting—not fixed metrics we do not control (such as search rankings or third-party traffic). Guarantees on publisher names belong in your written order or statement of work.',
  },
  {
    id: 'faq-3',
    question: 'What if a link breaks or a correction is needed?',
    answer:
      'Email the distribution desk with the live URL and the change. We reopen the thread with the publisher where possible. Some outlets charge or decline late edits; we will advise before proceeding.',
  },
  {
    id: 'faq-4',
    question: 'Can you work with our legal or PR review?',
    answer:
      'Yes. Build review windows into the timeline and name approvers up front. Heavy legal cycles may extend go-live dates; we recommend parallel review where feasible.',
  },
  {
    id: 'faq-5',
    question: 'Where do I see past placements?',
    answer: (
      <>
        Published work is listed on the{' '}
        <Link href="/updates" className="font-semibold text-[#1a1a1a] underline decoration-[#1a1a1a]/25 underline-offset-2">
          updates
        </Link>{' '}
        archive. Use it as a living record of what shipped and when.
      </>
    ),
  },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#e6dacf] text-[#1a1a1a]">
      <NavbarShell />

      <section className="border-b border-[#1a1a1a]/10 bg-[#1a1a1a] py-14 text-[#f5f5f0] sm:py-16">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-4 sm:flex-row sm:items-end sm:justify-between sm:px-8 lg:px-12">
          <div>
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f5f5f0]/45">Support</p>
            <h1 className="font-display mt-4 text-3xl font-semibold uppercase tracking-[0.02em] sm:text-4xl lg:text-5xl">Help center</h1>
            <p className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-[#f5f5f0]/72 sm:text-base">
              Practical guidance for working with {SITE_CONFIG.name} on guest posts, publisher outreach, and distribution reporting—aligned with how the desk actually operates.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 self-start border border-[#f5f5f0] bg-[#f5f5f0] px-5 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1a1a1a] transition hover:bg-transparent hover:text-[#f5f5f0] sm:self-auto"
          >
            Contact desk
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <main className="mx-auto max-w-[1400px] px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          <div>
            <h2 className="font-display text-2xl font-semibold uppercase tracking-[0.02em] text-[#1a1a1a]">Guides</h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-[#1a1a1a]/70">Short explainers—read in order if you are new to the process.</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {topics.map((topic) => (
                <div key={topic.title} className="border border-[#1a1a1a]/10 bg-[#f5f5f0] p-6 transition hover:border-[#1a1a1a]/20">
                  <topic.icon className="h-5 w-5 text-[#1a1a1a]/55" strokeWidth={1.75} />
                  <h3 className="font-display mt-4 text-lg font-semibold text-[#1a1a1a]">{topic.title}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-[#1a1a1a]/68">{topic.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 border border-[#1a1a1a]/10 bg-[#e6dacf]/40 p-6">
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1a1a1a]/45">Still stuck?</p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-[#1a1a1a]/75">
                If your question is not covered here, use the contact form with the subject line <span className="font-semibold text-[#1a1a1a]">HELP — [topic]</span> so it is triaged correctly.
              </p>
            </div>
          </div>

          <div className="border border-[#1a1a1a]/10 bg-[#f5f5f0] p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold uppercase tracking-[0.02em] text-[#1a1a1a]">Frequently asked</h2>
            <p className="mt-2 font-sans text-sm text-[#1a1a1a]/65">Answers reflect typical desk practice; your contract may define different terms.</p>

            <Accordion type="single" collapsible className="mt-6 w-full border-t border-[#1a1a1a]/10">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-b border-[#1a1a1a]/10">
                  <AccordionTrigger className="py-4 font-sans text-left text-sm font-semibold text-[#1a1a1a] hover:no-underline [&[data-state=open]]:text-[#1a1a1a]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 font-sans text-sm leading-relaxed text-[#1a1a1a]/72">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-8 flex flex-wrap gap-4 border-t border-[#1a1a1a]/10 pt-8">
              <Link href="/privacy" className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1a1a1a]/70 underline decoration-[#1a1a1a]/20 underline-offset-2 hover:text-[#1a1a1a]">
                Privacy
              </Link>
              <Link href="/terms" className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1a1a1a]/70 underline decoration-[#1a1a1a]/20 underline-offset-2 hover:text-[#1a1a1a]">
                Terms
              </Link>
              <Link href="/updates" className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1a1a1a]/70 underline decoration-[#1a1a1a]/20 underline-offset-2 hover:text-[#1a1a1a]">
                Placements archive
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
