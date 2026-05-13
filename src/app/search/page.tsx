import Link from 'next/link'
import { ArrowUpRight, Search } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'

export const revalidate = 3

const matchText = (value: string, query: string) => value.toLowerCase().includes(query)

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')

const compactText = (value: unknown) => {
  if (typeof value !== 'string') return ''
  return stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase()
}

function excerptFromPost(post: SitePost, max = 160) {
  const raw = (post.summary || '').trim()
  const plain = stripHtml(raw).replace(/\s+/g, ' ').trim()
  if (!plain) return 'Open the placement for the full story and context.'
  if (plain.length <= max) return plain
  return `${plain.slice(0, max - 1).trimEnd()}…`
}

function formatTaskLabel(taskKey: string) {
  if (taskKey === 'mediadistribution' || taskKey === 'mediaDistribution') return 'Media distribution'
  return taskKey.replace(/-/g, ' ') || 'All types'
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>
}) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined
  )
  const posts =
    feed?.posts?.length
      ? feed.posts
      : useMaster
        ? []
        : SITE_CONFIG.tasks.flatMap((t) => getMockPostsForTask(t.key))

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === 'object' ? post.content : {}
    const typeText = compactText((content as { type?: string }).type)
    if (typeText === 'comment') return false
    const description = compactText((content as { description?: string }).description)
    const body = compactText((content as { body?: string }).body)
    const excerpt = compactText((content as { excerpt?: string }).excerpt)
    const categoryText = compactText((content as { category?: string }).category)
    const tags = Array.isArray(post.tags) ? post.tags.join(' ') : ''
    const tagsText = compactText(tags)
    const derivedCategory = categoryText || tagsText
    if (category && !derivedCategory.includes(category)) return false
    if (task && typeText && typeText !== task) return false
    if (!normalized.length) return true
    return (
      matchText(compactText(post.title || ''), normalized) ||
      matchText(compactText(post.summary || ''), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    )
  })

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24)
  const hasActiveFilters = Boolean(category || task)
  const clearFiltersHref = `/search?master=${useMaster ? '1' : '0'}${query ? `&q=${encodeURIComponent(query)}` : ''}`

  return (
    <div className="min-h-screen bg-[#e6dacf] text-[#1a1a1a]">
      <NavbarShell />

      <section className="border-b border-[#1a1a1a]/10 bg-[#1a1a1a] py-12 text-[#f5f5f0] sm:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f5f5f0]/45">Discover</p>
          <h1 className="font-display mt-4 text-3xl font-semibold uppercase tracking-[0.02em] sm:text-4xl lg:text-5xl">Search placements</h1>
          <p className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-[#f5f5f0]/72 sm:text-base">
            {query
              ? `Results for “${query}” across the ${SITE_CONFIG.name} index.`
              : 'Browse the latest indexed posts. Add a keyword to narrow by headline, body, tags, or category.'}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 font-sans text-[11px] uppercase tracking-[0.14em] text-[#f5f5f0]/55">
            <span>
              {results.length} {results.length === 1 ? 'result' : 'results'}
            </span>
            {useMaster ? <span className="text-[#f5f5f0]/40">·</span> : null}
            {useMaster ? <span>Master index</span> : <span>Local preview</span>}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1400px] px-4 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="border border-[#1a1a1a]/10 bg-[#f5f5f0] p-6 sm:p-8 lg:p-10">
          <form action="/search" method="get" className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0 flex-1">
              <label htmlFor="site-search-q" className="block font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1a1a1a]/45">
                Query
              </label>
              <div className="mt-3 flex max-w-2xl items-stretch gap-0 border border-[#1a1a1a]/15">
                <input type="hidden" name="master" value={useMaster ? '1' : '0'} />
                {category ? <input type="hidden" name="category" value={resolved.category} /> : null}
                {task ? <input type="hidden" name="task" value={resolved.task} /> : null}
                <div className="relative min-w-0 flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1a1a1a]/35" strokeWidth={2} />
                  <input
                    id="site-search-q"
                    name="q"
                    type="search"
                    defaultValue={query}
                    placeholder="Headline, topic, outlet, or keyword…"
                    autoComplete="off"
                    className="h-12 w-full border-0 bg-transparent py-3 pl-10 pr-4 font-sans text-sm text-[#1a1a1a] outline-none placeholder:text-[#1a1a1a]/40"
                  />
                </div>
                <button
                  type="submit"
                  className="flex h-12 w-14 shrink-0 items-center justify-center bg-[#1a1a1a] font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[#f5f5f0] transition hover:bg-[#2a2a2a]"
                  aria-label="Run search"
                >
                  <ArrowUpRight className="h-4 w-4 text-[#3b82f6]" strokeWidth={2.25} />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/updates"
                className="inline-flex items-center border border-[#1a1a1a]/15 bg-[#e6dacf]/40 px-4 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1a1a1a] transition hover:border-[#1a1a1a]/30"
              >
                Updates archive
              </Link>
              {hasActiveFilters ? (
                <Link
                  href={clearFiltersHref}
                  className="inline-flex items-center font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1a1a1a]/65 underline decoration-[#1a1a1a]/25 underline-offset-2 hover:text-[#1a1a1a]"
                >
                  Clear type filters
                </Link>
              ) : null}
            </div>
          </form>

          {hasActiveFilters ? (
            <div className="mt-6 flex flex-wrap gap-2 border-t border-[#1a1a1a]/10 pt-6">
              {task ? (
                <span className="inline-flex items-center border border-[#1a1a1a]/15 bg-[#e6dacf]/50 px-3 py-1.5 font-sans text-[11px] font-medium text-[#1a1a1a]/85">
                  Type: {formatTaskLabel(task)}
                </span>
              ) : null}
              {category ? (
                <span className="inline-flex items-center border border-[#1a1a1a]/15 bg-white px-3 py-1.5 font-sans text-[11px] font-medium text-[#1a1a1a]/85">
                  Category: {resolved.category}
                </span>
              ) : null}
            </div>
          ) : null}

          <p className="mt-6 max-w-3xl font-sans text-xs leading-relaxed text-[#1a1a1a]/50">
            Text-only results—no thumbnails. Links respect each post&apos;s task route (e.g. media distribution updates open under{' '}
            <Link href="/updates" className="font-semibold text-[#1a1a1a] underline decoration-[#1a1a1a]/25 underline-offset-2">
              /updates
            </Link>
            ).
          </p>
        </div>

        <div className="mt-10">
          {results.length ? (
            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((post) => {
                const taskKey = getPostTaskKey(post)
                const href = taskKey ? buildPostUrl(taskKey, post.slug) : `/posts/${post.slug}`
                const content = post.content && typeof post.content === 'object' ? post.content : {}
                const cat = typeof (content as { category?: string }).category === 'string' ? (content as { category: string }).category : null
                const label = cat || (Array.isArray(post.tags) ? post.tags.find((t) => typeof t === 'string') : null) || 'Placement'

                return (
                  <li key={post.id}>
                    <Link
                      href={href}
                      className="group flex h-full flex-col border border-[#1a1a1a]/10 bg-[#f5f5f0] p-6 transition hover:border-[#1a1a1a]/25 hover:bg-white"
                    >
                      <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1a1a1a]/45">{String(label)}</span>
                      <h2 className="font-display mt-3 text-lg font-semibold leading-snug text-[#1a1a1a] group-hover:opacity-80 sm:text-xl">{post.title}</h2>
                      <p className="mt-3 grow font-sans text-sm leading-relaxed text-[#1a1a1a]/68">{excerptFromPost(post)}</p>
                      <div className="mt-5 flex items-center justify-between border-t border-[#1a1a1a]/10 pt-4 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1a1a1a]/45">
                        <time dateTime={post.publishedAt || post.updatedAt || undefined}>
                          {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                            : 'Date TBC'}
                        </time>
                        <span className="inline-flex items-center gap-1 text-[#1a1a1a]/55 transition group-hover:text-[#1a1a1a]">
                          View
                          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                        </span>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : (
            <div className="border border-dashed border-[#1a1a1a]/20 bg-[#f5f5f0]/80 px-8 py-16 text-center">
              <p className="font-display text-xl font-semibold text-[#1a1a1a]">No matching placements</p>
              <p className="mx-auto mt-3 max-w-md font-sans text-sm leading-relaxed text-[#1a1a1a]/65">
                Try a shorter keyword, remove filters, or browse the archive for the newest posts.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/search?master=1"
                  className="inline-flex border border-[#1a1a1a] bg-[#1a1a1a] px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[#f5f5f0] transition hover:bg-[#2a2a2a]"
                >
                  Reset search
                </Link>
                <Link
                  href="/updates"
                  className="inline-flex border border-[#1a1a1a]/20 bg-[#e6dacf]/40 px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1a1a1a] transition hover:border-[#1a1a1a]/35"
                >
                  Open updates
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
