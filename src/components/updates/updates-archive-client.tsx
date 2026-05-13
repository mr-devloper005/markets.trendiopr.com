'use client'

import Link from 'next/link'
import { useMemo, useState, useCallback, type FormEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'

function excerpt(text?: string | null) {
  const value = (text || '').trim()
  if (!value) return 'Read the full post for the complete update.'
  return value.length > 220 ? value.slice(0, 217).trimEnd() + '...' : value
}

function compact(value: unknown) {
  if (typeof value !== 'string') return ''
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase()
}

function postMatchesQuery(post: SitePost, q: string) {
  if (!q) return true
  const content = post.content && typeof post.content === 'object' ? post.content : {}
  const category = compact((content as { category?: string }).category)
  const title = compact(post.title)
  const summary = compact(post.summary)
  const tags = Array.isArray(post.tags) ? post.tags.join(' ').toLowerCase() : ''
  return title.includes(q) || summary.includes(q) || category.includes(q) || tags.includes(q)
}

function sortByNewest(a: SitePost, b: SitePost) {
  const ta = new Date(a.publishedAt || a.updatedAt || a.createdAt || 0).getTime()
  const tb = new Date(b.publishedAt || b.updatedAt || b.createdAt || 0).getTime()
  return tb - ta
}

export function UpdatesArchiveClient({ posts }: { posts: SitePost[] }) {
  const [query, setQuery] = useState('')

  const normalized = query.trim().toLowerCase()

  const filtered = useMemo(() => {
    if (!normalized) return posts
    return posts.filter((p) => postMatchesQuery(p, normalized))
  }, [posts, normalized])

  const recent = useMemo(() => [...posts].sort(sortByNewest).slice(0, 5), [posts])

  const onSearchSubmit = useCallback((e: FormEvent) => {
    e.preventDefault()
  }, [])

  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#1a1a1a]/45">Archive</p>
        <h1 className="font-display mt-3 text-3xl font-semibold uppercase tracking-[0.02em] sm:text-4xl">Latest distributions</h1>
        <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-[#1a1a1a]/65">
          Published guest posts and syndication notes—text-first, updated as campaigns ship.
        </p>

        {normalized ? (
          <p className="mt-6 font-sans text-sm text-[#1a1a1a]/65">
            Showing <span className="font-semibold text-[#1a1a1a]">{filtered.length}</span> of {posts.length} placements matching “
            <span className="font-medium text-[#1a1a1a]">{query.trim()}</span>”.
          </p>
        ) : null}

        <div className="mt-14 space-y-12">
          {!posts.length ? (
            <div className="border border-[#1a1a1a]/12 bg-[#e6dacf]/25 px-6 py-12 text-center font-sans text-sm text-[#1a1a1a]/70">
              No placements are published yet. Check back soon.
            </div>
          ) : filtered.length ? (
            filtered.map((post) => (
              <article key={post.id} className="border-b border-[#1a1a1a]/10 pb-12">
                <p className="text-center font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1a1a1a]/45">
                  {String((post.content as { category?: string })?.category || 'Placement')}
                </p>
                <h2 className="mx-auto mt-4 max-w-4xl text-center font-display text-2xl font-semibold uppercase leading-tight tracking-[0.02em] sm:text-3xl">
                  {post.title}
                </h2>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3 font-sans text-sm text-[#1a1a1a]/55">
                  <span className="border border-[#1a1a1a] bg-[#1a1a1a] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#f5f5f0]">
                    {new Date(post.publishedAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span>by {post.authorName || 'Distribution desk'}</span>
                </div>
                <p className="mx-auto mt-8 max-w-3xl text-center font-sans text-lg leading-relaxed text-[#1a1a1a]/75">{excerpt(post.summary)}</p>
                <div className="mt-8 text-center">
                  <Link
                    href={`/updates/${post.slug}`}
                    className="inline-flex items-center gap-2 border border-[#1a1a1a] bg-[#1a1a1a] px-8 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f5f5f0] transition hover:bg-[#2a2a2a]"
                  >
                    Continue reading
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="border border-[#1a1a1a]/12 bg-[#e6dacf]/25 px-6 py-12 text-center">
              <p className="font-sans text-sm text-[#1a1a1a]/75">No placements match your search.</p>
              <button
                type="button"
                onClick={() => setQuery('')}
                className="mt-4 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1a1a1a] underline decoration-[#1a1a1a]/25 underline-offset-2"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>

      <aside className="space-y-6">
        <div className="border border-[#1a1a1a]/12 bg-white p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1a1a1a]/45">Search</p>
          <form onSubmit={onSearchSubmit} className="mt-4 flex items-stretch gap-0 border border-[#1a1a1a]/15" role="search">
            <label htmlFor="placements-search" className="sr-only">
              Search placements
            </label>
            <input
              id="placements-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-12 min-w-0 flex-1 border-0 bg-transparent px-4 font-sans text-sm text-[#1a1a1a] outline-none placeholder:text-[#1a1a1a]/40"
              placeholder="Search placements"
              type="search"
              autoComplete="off"
            />
            <button
              type="submit"
              className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#1a1a1a] text-[#f5f5f0] transition hover:bg-[#2a2a2a]"
              aria-label="Apply filter"
            >
              <ArrowUpRight className="h-4 w-4 text-[#3b82f6]" strokeWidth={2.25} />
            </button>
          </form>
          <p className="mt-3 font-sans text-xs leading-relaxed text-[#1a1a1a]/45">
            Filters this archive by title, summary, category, and tags.{' '}
            <Link href="/search?master=1&task=mediaDistribution" className="font-semibold text-[#1a1a1a] underline decoration-[#1a1a1a]/25 underline-offset-2">
              Open full search
            </Link>
          </p>
        </div>

        <div className="border border-[#1a1a1a]/12 bg-[#e6dacf]/30 p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1a1a1a]/45">Recent</p>
          <div className="mt-5 space-y-0">
            {recent.length ? (
              recent.map((post, i) => (
                <Link
                  key={post.id}
                  href={`/updates/${post.slug}`}
                  className={`block border-b border-[#1a1a1a]/10 py-4 font-sans text-sm leading-snug text-[#1a1a1a]/80 hover:text-[#1a1a1a] ${i === recent.length - 1 ? 'border-b-0 pb-0' : ''}`}
                >
                  {post.title}
                </Link>
              ))
            ) : (
              <p className="font-sans text-sm text-[#1a1a1a]/50">No recent items yet.</p>
            )}
          </div>
        </div>
      </aside>
    </main>
  )
}
