import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Clock, Mail, MessageSquare, Radio } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

const lanes = [
  {
    title: 'Guest post campaigns',
    body: 'Share your URL, niche, risk tolerance, and deadline. We respond with a publisher shortlist, content angle, and realistic go-live window—before contracts or invoices.',
  },
  {
    title: 'Live placement fixes',
    body: 'Wrong byline, broken link, category mismatch, or syndication lag? Send the placement URL and what should change; we coordinate with the desk on your behalf.',
  },
  {
    title: 'Partnerships & bundles',
    body: 'Agencies and in-house teams: ask about volume retainers, white-label reporting, and recurring distribution calendars.',
  },
]

export function ContactPageOverride() {
  return (
    <div className="min-h-screen bg-[#e6dacf] text-[#1a1a1a]">
      <NavbarShell />

      <section className="border-b border-[#1a1a1a]/10 bg-[#1a1a1a] py-14 text-[#f5f5f0] sm:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f5f5f0]/45">Contact</p>
          <h1 className="font-display mt-4 max-w-4xl text-3xl font-semibold uppercase leading-[1.05] tracking-[0.02em] sm:text-4xl lg:text-5xl">
            Distribution desk — {SITE_CONFIG.name}
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-sm leading-relaxed text-[#f5f5f0]/72 sm:text-base">
            One channel for campaign briefs, publisher questions, and post-live corrections. We route every message to the right operator so you are not bounced between generic inboxes.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/updates"
              className="inline-flex items-center gap-2 border border-[#f5f5f0]/25 px-4 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f5f5f0] transition hover:border-[#f5f5f0]"
            >
              Latest placements
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/help"
              className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f5f5f0]/65 transition hover:text-[#f5f5f0]"
            >
              Help center
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1400px] px-4 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="grid gap-12 border border-[#1a1a1a]/10 bg-[#f5f5f0] p-6 sm:p-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:p-12">
          <div>
            <h2 className="font-display text-2xl font-semibold uppercase tracking-[0.02em] text-[#1a1a1a]">What to send</h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-[#1a1a1a]/70">
              Clear subject lines get faster answers. Include your company name, target markets, and whether the piece is drafted or still in outline form.
            </p>

            <ul className="mt-10 space-y-8">
              {lanes.map((lane) => (
                <li key={lane.title} className="border-t border-[#1a1a1a]/10 pt-8 first:border-t-0 first:pt-0">
                  <div className="flex gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-[#1a1a1a]/15 bg-[#e6dacf]/40">
                      <MessageSquare className="h-4 w-4 text-[#1a1a1a]/70" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-[#1a1a1a]">{lane.title}</h3>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-[#1a1a1a]/68">{lane.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              <div className="flex gap-3 border border-[#1a1a1a]/10 bg-[#e6dacf]/35 p-5">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#1a1a1a]/55" strokeWidth={1.75} />
                <div>
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1a1a1a]/45">Response window</p>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-[#1a1a1a]/75">
                    Weekdays, most briefs receive a first reply within one business day. Complex syndication maps may need two.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 border border-[#1a1a1a]/10 bg-white p-5">
                <Radio className="mt-0.5 h-5 w-5 shrink-0 text-[#1a1a1a]/55" strokeWidth={1.75} />
                <div>
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1a1a1a]/45">Escalations</p>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-[#1a1a1a]/75">
                    If a placement is time-sensitive, put <span className="font-semibold text-[#1a1a1a]">URGENT</span> in the subject and include the go-live date in the first line.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-[#1a1a1a]/12 bg-white p-6 sm:p-8">
            <div className="flex items-start gap-3 border-b border-[#1a1a1a]/10 pb-6">
              <Mail className="h-5 w-5 shrink-0 text-[#1a1a1a]/55" strokeWidth={1.75} />
              <div>
                <h2 className="font-display text-xl font-semibold uppercase tracking-[0.02em] text-[#1a1a1a]">Write to us</h2>
                <p className="mt-2 font-sans text-sm text-[#1a1a1a]/65">Use the form for structured requests, or email directly using the addresses below.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="border border-[#1a1a1a]/10 bg-[#f5f5f0] p-5">
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1a1a1a]/45">Editorial & campaigns</p>
                <p className="mt-3 font-display text-lg font-semibold text-[#1a1a1a]">editor@example.com</p>
              </div>
              <div className="border border-[#1a1a1a]/10 bg-[#e6dacf]/40 p-5">
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1a1a1a]/45">Partnerships</p>
                <p className="mt-3 font-display text-lg font-semibold text-[#1a1a1a]">contact@example.com</p>
              </div>
            </div>

            <form className="mt-8 grid gap-4" aria-label="Contact form">
              <input
                className="h-12 border border-[#1a1a1a]/15 bg-[#f5f5f0] px-4 font-sans text-sm text-[#1a1a1a] outline-none transition placeholder:text-[#1a1a1a]/40 focus:border-[#1a1a1a]/35"
                placeholder="Your name"
                type="text"
                autoComplete="name"
              />
              <input
                className="h-12 border border-[#1a1a1a]/15 bg-[#f5f5f0] px-4 font-sans text-sm text-[#1a1a1a] outline-none transition placeholder:text-[#1a1a1a]/40 focus:border-[#1a1a1a]/35"
                placeholder="Work email"
                type="email"
                autoComplete="email"
              />
              <input
                className="h-12 border border-[#1a1a1a]/15 bg-[#f5f5f0] px-4 font-sans text-sm text-[#1a1a1a] outline-none transition placeholder:text-[#1a1a1a]/40 focus:border-[#1a1a1a]/35"
                placeholder="Subject (e.g. Guest post — finance — March)"
                type="text"
              />
              <textarea
                className="min-h-[160px] resize-y border border-[#1a1a1a]/15 bg-[#f5f5f0] px-4 py-3 font-sans text-sm leading-relaxed text-[#1a1a1a] outline-none transition placeholder:text-[#1a1a1a]/40 focus:border-[#1a1a1a]/35"
                placeholder="Context: URLs, target regions, draft status, and any publisher tiers you want to avoid or prioritize."
              />
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center border border-[#1a1a1a] bg-[#1a1a1a] font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f5f5f0] transition hover:bg-[#2a2a2a]"
              >
                Send message
              </button>
              <p className="font-sans text-xs leading-relaxed text-[#1a1a1a]/50">
                This form is a UI preview only—wire it to your backend or form provider when ready. For privacy practices, see the{' '}
                <Link href="/privacy" className="underline decoration-[#1a1a1a]/30 underline-offset-2 hover:decoration-[#1a1a1a]">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border border-[#1a1a1a]/10 bg-[#e6dacf]/30 px-6 py-5 sm:px-8">
          <p className="font-sans text-sm text-[#1a1a1a]/70">
            Policies and definitions for using {SITE_CONFIG.name} are summarized in{' '}
            <Link href="/terms" className="font-semibold text-[#1a1a1a] underline decoration-[#1a1a1a]/25 underline-offset-2">
              Terms of Service
            </Link>
            .
          </p>
          <Link
            href="/privacy"
            className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1a1a1a] transition hover:opacity-70"
          >
            Data & privacy
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
