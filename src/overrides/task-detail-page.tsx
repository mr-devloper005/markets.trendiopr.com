import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { formatRichHtml, RichContent } from '@/components/shared/rich-content'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

export async function TaskDetailPageOverride({ slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug('mediaDistribution', slug)
  if (!post) notFound()
  const recent = (await fetchTaskPosts('mediaDistribution', 8, { fresh: true })).filter((item) => item.slug !== slug).slice(0, 5)
  const content = (post.content || {}) as Record<string, unknown>
  const html = formatRichHtml((content.body as string) || post.summary || '', 'Post body will appear here.')

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#1a1a1a]">
      <NavbarShell />
      <section className="border-b border-[#1a1a1a]/10 bg-[#1a1a1a] py-16 text-[#f5f5f0]">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-8">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.26em] text-[#f5f5f0]/45">Placement</p>
          <h1 className="font-display mt-6 text-3xl font-semibold uppercase leading-tight tracking-[0.02em] sm:text-4xl lg:text-5xl">{post.title}</h1>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 font-sans text-sm text-[#f5f5f0]/65">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span aria-hidden>·</span>
            <Link href="/updates" className="transition hover:text-white">
              Archive
            </Link>
          </div>
        </div>
      </section>
      <main className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article>
          <div className="border border-[#1a1a1a]/12 bg-[#e6dacf]/35 px-6 py-4 font-sans text-sm text-[#1a1a1a]/75">
            <span className="mr-3 inline-block border border-[#1a1a1a] bg-[#1a1a1a] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#f5f5f0]">
              {new Date(post.publishedAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span>by {post.authorName || 'Distribution desk'}</span>
          </div>
          <div className="prose prose-lg prose-neutral mt-10 max-w-none font-sans prose-headings:font-display prose-headings:tracking-tight prose-a:text-[#1a1a1a]">
            <RichContent html={html} />
          </div>
          <div className="mt-12 grid gap-0 border border-[#1a1a1a]/12 md:grid-cols-2">
            {recent.slice(0, 2).map((item, index) => (
              <Link
                key={item.id}
                href={`/updates/${item.slug}`}
                className="border-[#1a1a1a]/10 p-6 transition first:border-b hover:bg-[#e6dacf]/25 md:first:border-b-0 md:first:border-r md:first:border-b-0"
              >
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1a1a1a]/45">{index === 0 ? 'Previous' : 'Next'}</p>
                <p className="mt-3 font-display text-lg font-semibold leading-snug text-[#1a1a1a]">{item.title}</p>
              </Link>
            ))}
          </div>
        </article>
        <aside className="space-y-6">
          <div className="border border-[#1a1a1a]/12 bg-white p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1a1a1a]/45">Search</p>
            <form action="/search" method="get" className="mt-4 flex items-stretch gap-0 border border-[#1a1a1a]/15" role="search">
              <input type="hidden" name="master" value="1" />
              <input type="hidden" name="task" value="mediaDistribution" />
              <label htmlFor="placement-search-detail" className="sr-only">
                Search placements
              </label>
              <input
                id="placement-search-detail"
                name="q"
                className="h-12 min-w-0 flex-1 border-0 bg-transparent px-4 font-sans text-sm text-[#1a1a1a] outline-none placeholder:text-[#1a1a1a]/40"
                placeholder="Search placements"
                type="search"
                autoComplete="off"
              />
              <button
                type="submit"
                className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#1a1a1a] text-[#f5f5f0] transition hover:bg-[#2a2a2a]"
                aria-label="Search placements"
              >
                <ArrowUpRight className="h-4 w-4 text-[#3b82f6]" strokeWidth={2.25} />
              </button>
            </form>
            <p className="mt-3 font-sans text-xs leading-relaxed text-[#1a1a1a]/45">
              Searches all placements (master feed), scoped to media distribution posts. Results open on the search page.
            </p>
          </div>
          <div className="border border-[#1a1a1a]/12 bg-[#e6dacf]/30 p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1a1a1a]/45">Related</p>
            <div className="mt-5 space-y-4">
              {recent.map((item) => (
                <Link key={item.id} href={`/updates/${item.slug}`} className="block border-b border-[#1a1a1a]/10 pb-4 font-sans text-sm leading-snug text-[#1a1a1a]/80 last:border-0 last:pb-0 hover:text-[#1a1a1a]">
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  )
}
