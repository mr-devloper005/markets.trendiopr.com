import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Bookmark, Building2, Compass, FileText, Globe2, Image as ImageIcon, LayoutGrid, MapPin, ShieldCheck, Tag, User } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchTaskPosts } from '@/lib/task-data'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind, type ProductKind } from '@/design/factory/get-product-kind'
import type { SitePost } from '@/lib/site-connector'
import { getHomeEditorialMockPosts, mergeEditorialPostsForHome } from '@/lib/home-editorial-mock'
import { HOME_PAGE_OVERRIDE_ENABLED, HomePageOverride } from '@/overrides/home-page'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/',
    title: siteContent.home.metadata.title,
    description: siteContent.home.metadata.description,
    openGraphTitle: siteContent.home.metadata.openGraphTitle,
    openGraphDescription: siteContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...siteContent.home.metadata.keywords],
  })
}

type EnabledTask = (typeof SITE_CONFIG.tasks)[number]
type TaskFeedItem = { task: EnabledTask; posts: SitePost[] }

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: Bookmark,
  classified: Tag,
  image: ImageIcon,
  profile: User,
}

function resolveTaskKey(value: unknown, fallback: TaskKey): TaskKey {
  if (
    value === 'listing' ||
    value === 'classified' ||
    value === 'article' ||
    value === 'image' ||
    value === 'profile' ||
    value === 'sbm' ||
    value === 'mediaDistribution'
  )
    return value
  return fallback
}

function getTaskHref(task: TaskKey, slug: string) {
  const route = SITE_CONFIG.tasks.find((item) => item.key === task)?.route || `/${task}`
  return `${route}/${slug}`
}

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage = typeof post?.content === 'object' && post?.content && Array.isArray((post.content as any).images)
    ? (post.content as any).images.find((url: unknown) => typeof url === 'string' && url)
    : null
  const logo = typeof post?.content === 'object' && post?.content && typeof (post.content as any).logo === 'string'
    ? (post.content as any).logo
    : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

function getPostMeta(post?: SitePost | null) {
  if (!post || typeof post.content !== 'object' || !post.content) return { location: '', category: '' }
  const content = post.content as Record<string, unknown>
  return {
    location: typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : '',
    category: typeof content.category === 'string' ? content.category : typeof post.tags?.[0] === 'string' ? post.tags[0] : '',
  }
}

function getDirectoryTone(brandPack: string) {
  if (brandPack === 'market-utility') {
    return {
      shell: 'bg-[#f5f7f1] text-[#1f2617]',
      hero: 'bg-[linear-gradient(180deg,#eef4e4_0%,#f8faf4_100%)]',
      panel: 'border border-[#d5ddc8] bg-white shadow-[0_24px_64px_rgba(64,76,34,0.08)]',
      soft: 'border border-[#d5ddc8] bg-[#eff3e7]',
      muted: 'text-[#5b664c]',
      title: 'text-[#1f2617]',
      badge: 'bg-[#1f2617] text-[#edf5dc]',
      action: 'bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
      actionAlt: 'border border-[#d5ddc8] bg-white text-[#1f2617] hover:bg-[#eef3e7]',
    }
  }
  return {
    shell: 'bg-[#f8fbff] text-slate-950',
    hero: 'bg-[linear-gradient(180deg,#eef6ff_0%,#ffffff_100%)]',
    panel: 'border border-slate-200 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.08)]',
    soft: 'border border-slate-200 bg-slate-50',
    muted: 'text-slate-600',
    title: 'text-slate-950',
    badge: 'bg-slate-950 text-white',
    action: 'bg-slate-950 text-white hover:bg-slate-800',
    actionAlt: 'border border-slate-200 bg-white text-slate-950 hover:bg-slate-100',
  }
}

function getVisualTone() {
  return {
    shell: 'bg-[#07101f] text-white',
    panel: 'border border-white/10 bg-[rgba(11,18,31,0.78)] shadow-[0_28px_80px_rgba(0,0,0,0.35)]',
    soft: 'border border-white/10 bg-white/6',
    muted: 'text-slate-300',
    title: 'text-white',
    badge: 'bg-[#8df0c8] text-[#07111f]',
    action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    actionAlt: 'border border-white/10 bg-white/6 text-white hover:bg-white/10',
  }
}

function getCurationTone() {
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4] shadow-[0_24px_60px_rgba(91,56,37,0.08)]',
    soft: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    title: 'text-[#261811]',
    badge: 'bg-[#5b2b3b] text-[#fff0f5]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    actionAlt: 'border border-[#ddcdbd] bg-transparent text-[#261811] hover:bg-[#efe3d6]',
  }
}

function DirectoryHome({ primaryTask, enabledTasks, listingPosts, classifiedPosts, profilePosts, brandPack }: {
  primaryTask?: EnabledTask
  enabledTasks: EnabledTask[]
  listingPosts: SitePost[]
  classifiedPosts: SitePost[]
  profilePosts: SitePost[]
  brandPack: string
}) {
  const tone = getDirectoryTone(brandPack)
  const featuredListings = (listingPosts.length ? listingPosts : classifiedPosts).slice(0, 3)
  const featuredTaskKey: TaskKey = listingPosts.length ? 'listing' : 'classified'
  const quickRoutes = enabledTasks.slice(0, 4)

  return (
    <main>
      <section className={tone.hero}>
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
                <Compass className="h-3.5 w-3.5" />
                Local discovery product
              </span>
              <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
                Search businesses, compare options, and act fast without digging through generic feeds.
              </h1>
              <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>

              <div className={`mt-8 grid gap-3 rounded-[2rem] p-4 ${tone.panel} md:grid-cols-[1.25fr_0.8fr_auto]`}>
                <div className="rounded-full bg-black/5 px-4 py-3 text-sm">What do you need today?</div>
                <div className="rounded-full bg-black/5 px-4 py-3 text-sm">Choose area or city</div>
                <Link href={primaryTask?.route || '/listings'} className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                  Browse now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  ['Verified businesses', `${featuredListings.length || 3}+ highlighted surfaces`],
                  ['Fast scan rhythm', 'More utility, less filler'],
                  ['Action first', 'Call, visit, shortlist, compare'],
                ].map(([label, value]) => (
                  <div key={label} className={`rounded-[1.4rem] p-4 ${tone.soft}`}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">{label}</p>
                    <p className="mt-2 text-lg font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className={`rounded-[2rem] p-6 ${tone.panel}`}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">Primary lane</p>
                    <h2 className="mt-2 text-3xl font-semibold">{primaryTask?.label || 'Listings'}</h2>
                  </div>
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <p className={`mt-4 text-sm leading-7 ${tone.muted}`}>{primaryTask?.description || 'Structured discovery for services, offers, and business surfaces.'}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {quickRoutes.map((task) => {
                  const Icon = taskIcons[task.key as TaskKey] || LayoutGrid
                  return (
                    <Link key={task.key} href={task.route} className={`rounded-[1.6rem] p-5 ${tone.soft}`}>
                      <Icon className="h-5 w-5" />
                      <h3 className="mt-4 text-lg font-semibold">{task.label}</h3>
                      <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{task.description}</p>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Featured businesses</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Strong listings with clearer trust cues.</h2>
          </div>
          <Link href="/listings" className="text-sm font-semibold text-primary hover:opacity-80">Open listings</Link>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {featuredListings.map((post) => (
            <TaskPostCard key={post.id} post={post} href={getTaskHref(featuredTaskKey, post.slug)} taskKey={featuredTaskKey} />
          ))}
        </div>
      </section>

      <section className={`${tone.shell}`}>
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">What makes this different</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Built like a business directory, not a recolored content site.</h2>
            <ul className={`mt-6 space-y-3 text-sm leading-7 ${tone.muted}`}>
              <li>Search-first hero instead of a magazine headline.</li>
              <li>Action-oriented listing cards with trust metadata.</li>
              <li>Support lanes for offers, businesses, and profiles.</li>
            </ul>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {(profilePosts.length ? profilePosts : classifiedPosts).slice(0, 4).map((post) => {
              const meta = getPostMeta(post)
              const taskKey = resolveTaskKey(post.task, profilePosts.length ? 'profile' : 'classified')
              return (
                <Link key={post.id} href={getTaskHref(taskKey, post.slug)} className={`overflow-hidden rounded-[1.8rem] ${tone.panel}`}>
                  <div className="relative h-44 overflow-hidden">
                    <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] opacity-70">{meta.category || post.task || 'Profile'}</p>
                    <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
                    <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Quick access to local information and related surfaces.'}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

function splitIntoTwoParagraphs(text: string) {
  const t = text.trim()
  if (!t) return ['', '']
  const splitAt = t.search(/\.\s+[A-Z]/)
  if (splitAt > 80) {
    return [t.slice(0, splitAt + 1).trim(), t.slice(splitAt + 1).trim()]
  }
  const half = Math.floor(t.length / 2)
  const space = t.lastIndexOf(' ', half + 40)
  if (space > 40) return [t.slice(0, space).trim(), t.slice(space).trim()]
  return [t, '']
}

function getPostCategoryLabel(post: SitePost): string {
  const content =
    post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const cat = content.category
  if (typeof cat === 'string' && cat.trim()) return cat.trim()
  const tag = post.tags?.find((t) => typeof t === 'string' && t !== 'mediaDistribution' && t !== 'article')
  if (typeof tag === 'string') return tag
  return 'Update'
}

function EditorialHome({
  primaryTask,
  posts,
  supportTasks,
}: {
  primaryTask?: EnabledTask
  posts: SitePost[]
  supportTasks: EnabledTask[]
}) {
  const defaultEditorialTask: TaskKey =
    primaryTask?.key === 'mediaDistribution' || primaryTask?.key === 'article'
      ? primaryTask.key
      : 'article'

  const postHref = (post: SitePost) =>
    getTaskHref(resolveTaskKey((post as { task?: unknown }).task, defaultEditorialTask), post.slug)

  const lead = posts[0]
  const spotlightPosts = posts.slice(1, 4)
  const deckPosts = posts.slice(10, 16)

  const headline = lead?.title || 'Global media distribution'
  const summarySource = lead?.summary || SITE_CONFIG.description
  const [bodyA, bodyB] = splitIntoTwoParagraphs(summarySource)
  const leadTeaser = bodyA || SITE_CONFIG.tagline

  return (
    <main className="bg-[#e6dacf] text-[#1a1a1a]">
      <div className="mx-auto min-h-screen max-w-[1400px] border-x border-[#1a1a1a]/10 bg-[#f5f5f0] shadow-[inset_0_1px_0_rgba(26,26,26,0.06)]">
        <section className="border-b border-[#1a1a1a]/10 px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-10">
            <div className="hidden max-w-xs border-r border-[#1a1a1a]/10 pr-8 pt-2 lg:block">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1a1a1a]/45">Reach</p>
              <p className="mt-4 font-sans text-sm leading-relaxed text-[#1a1a1a]/75">
                Editorial-grade guest posts across trusted publisher surfaces. Campaigns are assembled for authority, fit, and measurable referral traffic—not vanity placements.
              </p>
              <div className="mt-8 h-px w-12 bg-[#1a1a1a]" />
              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1a1a1a]/45">Latest signal</p>
              {lead ? (
                <Link href={postHref(lead)} className="mt-3 block font-display text-lg font-semibold leading-snug text-[#1a1a1a] transition hover:opacity-70">
                  {lead.title}
                </Link>
              ) : (
                <p className="mt-3 text-sm text-[#1a1a1a]/60">Placements publish here as soon as they go live.</p>
              )}
            </div>

            <div className="text-center">
              <span className="inline-block border border-[#1a1a1a]/20 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1a1a1a]/70">
                [ premium guest post ]
              </span>
              <h1 className="font-display mt-8 text-[clamp(2.1rem,5vw,3.75rem)] font-semibold uppercase leading-[1.02] tracking-[0.02em] text-[#1a1a1a]">
                Global media distribution
              </h1>
              <p className="mx-auto mt-6 max-w-xl font-sans text-sm leading-relaxed text-[#1a1a1a]/72 sm:text-base">
                {SITE_CONFIG.tagline}. {leadTeaser}
              </p>

              <div className="mt-12 flex flex-col items-center gap-6">
                <Link
                  href="/contact"
                  className="flex h-36 w-36 items-center justify-center rounded-full border-2 border-[#1a1a1a] bg-[#1a1a1a] text-center font-sans text-[11px] font-semibold uppercase leading-tight tracking-[0.14em] text-[#f5f5f0] shadow-[0_20px_50px_rgba(26,26,26,0.18)] transition hover:bg-[#2a2a2a]"
                >
                  Start
                  <br />
                  campaign
                </Link>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href={primaryTask?.route || '/press-release'}
                    className="inline-flex items-center gap-2 border border-[#1a1a1a] bg-transparent px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1a1a1a] transition hover:bg-[#1a1a1a] hover:text-[#f5f5f0]"
                  >
                    View placements
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1a1a1a]/70 transition hover:text-[#1a1a1a]"
                  >
                    Consult an expert
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="hidden max-w-xs border-l border-[#1a1a1a]/10 pl-8 pt-2 lg:block">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1a1a1a]/45">Process</p>
              <p className="mt-4 font-sans text-sm leading-relaxed text-[#1a1a1a]/75">
                Brief, publisher matching, drafting support, and go-live reporting—without turning your story into a generic press release farm.
              </p>
              {bodyB ? (
                <p className="mt-6 border-t border-[#1a1a1a]/10 pt-6 font-sans text-sm leading-relaxed text-[#1a1a1a]/65">{bodyB}</p>
              ) : null}
            </div>
          </div>

          {headline && headline !== 'Global media distribution' ? (
            <div className="mx-auto mt-16 max-w-3xl border-t border-[#1a1a1a]/10 pt-10 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#1a1a1a]/45">Featured headline</p>
              <p className="font-display mt-3 text-2xl font-medium leading-snug text-[#1a1a1a] sm:text-3xl">{headline}</p>
            </div>
          ) : null}
        </section>

        <section id="distribution" className="border-b border-[#1a1a1a]/10 bg-[#e6dacf]/40 px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
            <div className="flex flex-col justify-between border border-[#1a1a1a]/12 bg-[#f5f5f0] p-6 lg:row-span-2 lg:min-h-[280px]">
              <div>
                <p className="font-display text-5xl font-semibold tabular-nums text-[#1a1a1a]">120+</p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1a1a1a]/45">Publisher relationships</p>
              </div>
              <p className="mt-8 border-t border-[#1a1a1a]/10 pt-6 font-sans text-sm leading-relaxed text-[#1a1a1a]/70">
                Vetted outlets across news, trade, and regional desks—prioritized for category fit and editorial standards.
              </p>
            </div>
            <div className="border border-[#1a1a1a]/12 bg-[#f5f5f0] p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1a1a1a]/45">Tier</p>
              <p className="font-display mt-3 text-2xl font-semibold text-[#1a1a1a]">Authority</p>
              <div className="my-4 h-px bg-[#1a1a1a]/12" />
              <p className="font-sans text-sm leading-relaxed text-[#1a1a1a]/70">High-trust domains with strong topical relevance for competitive categories.</p>
            </div>
            <div className="border border-[#1a1a1a]/12 bg-[#f5f5f0] p-6 lg:col-span-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1a1a1a]/45">Latest distributions</p>
              <p className="font-display mt-3 text-xl font-semibold text-[#1a1a1a]">Campaign desk</p>
              <div className="my-4 h-px bg-[#1a1a1a]/12" />
              <p className="font-sans text-sm leading-relaxed text-[#1a1a1a]/70">
                Live placements and syndication notes surface on the updates index. Use it as a transparent record of what shipped, where, and when.
              </p>
              <Link href="/press-release" className="mt-5 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1a1a1a]">
                Open archive
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="border border-[#1a1a1a]/12 bg-[#f5f5f0] p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1a1a1a]/45">Tier</p>
              <p className="font-display mt-3 text-2xl font-semibold text-[#1a1a1a]">Scale</p>
              <div className="my-4 h-px bg-[#1a1a1a]/12" />
              <p className="font-sans text-sm leading-relaxed text-[#1a1a1a]/70">Multi-outlet bursts for launches, funding news, and category education.</p>
            </div>
            <div className="flex flex-col justify-between border border-[#1a1a1a]/12 bg-[#1a1a1a] p-6 text-[#f5f5f0] lg:col-span-2">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f5f5f0]/55">Consult</p>
                <p className="font-display mt-3 text-2xl font-semibold">Talk to distribution</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-[#f5f5f0] bg-[#f5f5f0] px-4 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1a1a1a] transition hover:bg-transparent hover:text-[#f5f5f0]"
                >
                  Book a call
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link href="/help" className="inline-flex items-center border border-[#f5f5f0]/30 px-4 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[#f5f5f0]/90 transition hover:border-[#f5f5f0]">
                  Help center
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <div className="flex flex-col gap-4 border-b border-[#1a1a1a]/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="font-display text-3xl font-semibold uppercase tracking-[0.02em] text-[#1a1a1a] sm:text-4xl">Our distribution network</h2>
              <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-[#1a1a1a]/65">
                Editorial spotlights and desk notes—text only, built for scanning. Connect your feed and this grid fills from published guest posts automatically.
              </p>
            </div>
            <Link href="/press-release" className="shrink-0 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1a1a1a]/60 transition hover:text-[#1a1a1a]">
              View all →
            </Link>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-12">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1a1a1a]/45">Spotlight</p>
              <div className="mt-5 flex flex-col gap-4">
                {spotlightPosts.length ? (
                  spotlightPosts.map((post, i) => (
                    <Link
                      key={post.id}
                      href={postHref(post)}
                      className="group border border-[#1a1a1a]/10 bg-[#f5f5f0] p-5 transition hover:border-[#1a1a1a]/25"
                    >
                      <span className="font-sans text-[10px] font-semibold tabular-nums text-[#1a1a1a]/40">{String(i + 1).padStart(2, '0')}</span>
                      <p className="mt-1 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1a1a1a]/45">{getPostCategoryLabel(post)}</p>
                      <h3 className="font-display mt-2 text-xl font-semibold leading-snug text-[#1a1a1a] group-hover:opacity-75">{post.title}</h3>
                      {post.summary ? <p className="mt-3 border-l-2 border-[#1a1a1a]/20 pl-3 font-sans text-sm leading-relaxed text-[#1a1a1a]/70">{post.summary}</p> : null}
                    </Link>
                  ))
                ) : (
                  <p className="font-sans text-sm text-[#1a1a1a]/55">More placements will appear here.</p>
                )}
              </div>
            </div>

            <div className="border-t border-[#1a1a1a]/10 pt-10 lg:border-t-0 lg:border-l lg:pl-12 lg:pt-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1a1a1a]/45">From the desk</p>
              {deckPosts.length ? (
                <div className="mt-5 space-y-4">
                  {deckPosts.map((post) => (
                    <Link key={post.id} href={postHref(post)} className="block border-b border-[#1a1a1a]/10 py-4 first:pt-0 transition hover:opacity-75">
                      <span className="inline-block border border-[#1a1a1a]/15 px-2 py-0.5 font-sans text-[9px] font-semibold uppercase tracking-[0.14em] text-[#1a1a1a]/55">
                        {getPostCategoryLabel(post)}
                      </span>
                      <p className="font-display mt-2 text-lg font-semibold leading-snug text-[#1a1a1a]">{post.title}</p>
                      {post.summary ? <p className="mt-2 font-sans text-sm leading-relaxed text-[#1a1a1a]/65">{post.summary}</p> : null}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-4 font-sans text-sm text-[#1a1a1a]/55">Desk notes will list here when additional posts are available.</p>
              )}
            </div>
          </div>

          {supportTasks.length ? (
            <div className="mt-16 grid gap-4 border-t border-[#1a1a1a]/10 pt-12 sm:grid-cols-2 lg:grid-cols-3">
              {supportTasks.slice(0, 3).map((task) => (
                <Link key={task.key} href={task.route} className="border border-[#1a1a1a]/10 bg-[#e6dacf]/30 px-5 py-5 transition hover:bg-[#e6dacf]/50">
                  <h3 className="font-display text-lg font-semibold text-[#1a1a1a]">{task.label}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-[#1a1a1a]/65">{task.description}</p>
                </Link>
              ))}
            </div>
          ) : null}
        </section>

        <div
          className="h-3 w-full"
          style={{
            background:
              'repeating-linear-gradient(90deg, #1a1a1a 0px, #1a1a1a 2px, #f5f5f0 2px, #f5f5f0 4px, #1a1a1a 4px, #1a1a1a 6px, #e6dacf 6px, #e6dacf 8px)',
          }}
          aria-hidden
        />
      </div>
    </main>
  )
}

function VisualHome({ primaryTask, imagePosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; imagePosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const tone = getVisualTone()
  const gallery = imagePosts.length ? imagePosts.slice(0, 5) : articlePosts.slice(0, 5)
  const creators = profilePosts.slice(0, 3)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <ImageIcon className="h-3.5 w-3.5" />
              Visual publishing system
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Image-led discovery with creator profiles and a more gallery-like browsing rhythm.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/images'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Open gallery
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                Meet creators
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.slice(0, 5).map((post, index) => (
              <Link
                key={post.id}
                href={getTaskHref(resolveTaskKey(post.task, 'image'), post.slug)}
                className={index === 0 ? `col-span-2 row-span-2 overflow-hidden rounded-[2.4rem] ${tone.panel}` : `overflow-hidden rounded-[1.8rem] ${tone.soft}`}
              >
                <div className={index === 0 ? 'relative h-[360px]' : 'relative h-[170px]'}>
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Visual notes</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Larger media surfaces, fewer boxes, stronger pacing.</h2>
            <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>This product avoids business-directory density and publication framing. The homepage behaves more like a visual board, with profile surfaces and imagery leading the experience.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {creators.map((post) => (
              <Link key={post.id} href={`/profile/${post.slug}`} className={`rounded-[1.8rem] p-5 ${tone.soft}`}>
                <div className="relative h-40 overflow-hidden rounded-[1.2rem]">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Creator profile and visual identity surface.'}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function CurationHome({ primaryTask, bookmarkPosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; bookmarkPosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const tone = getCurationTone()
  const collections = bookmarkPosts.length ? bookmarkPosts.slice(0, 4) : articlePosts.slice(0, 4)
  const people = profilePosts.slice(0, 3)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <Bookmark className="h-3.5 w-3.5" />
              Curated collections
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Save, organize, and revisit resources through shelves, boards, and curated collections.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/sbm'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Open collections
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                Explore curators
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {collections.map((post) => (
              <Link key={post.id} href={getTaskHref(resolveTaskKey(post.task, 'sbm'), post.slug)} className={`rounded-[1.8rem] p-6 ${tone.panel}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Collection</p>
                <h3 className="mt-3 text-2xl font-semibold">{post.title}</h3>
                <p className={`mt-3 text-sm leading-8 ${tone.muted}`}>{post.summary || 'A calmer bookmark surface with room for context and grouping.'}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Why this feels different</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">More like saved boards and reading shelves than a generic post feed.</h2>
            <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>The structure is calmer, the cards are less noisy, and the page encourages collecting and returning instead of forcing everything into a fast-scrolling list.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {people.map((post) => (
              <Link key={post.id} href={`/profile/${post.slug}`} className={`rounded-[1.8rem] p-5 ${tone.soft}`}>
                <div className="relative h-32 overflow-hidden rounded-[1.2rem]">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>Curator profile, saved resources, and collection notes.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default async function HomePage() {
  if (HOME_PAGE_OVERRIDE_ENABLED) {
    return <HomePageOverride />
  }

  const enabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const taskFeed: TaskFeedItem[] = (
    await Promise.all(
      enabledTasks.map(async (task) => ({
        task,
        posts: await fetchTaskPosts(task.key, 6, { allowMockFallback: false, fresh: false, revalidate: 120 }),
      }))
    )
  ).filter(({ posts }) => posts.length)

  const primaryTask = enabledTasks.find((task) => task.key === recipe.primaryTask) || enabledTasks[0]
  const supportTasks = enabledTasks.filter((task) => task.key !== primaryTask?.key)
  const listingPosts = taskFeed.find(({ task }) => task.key === 'listing')?.posts || []
  const classifiedPosts = taskFeed.find(({ task }) => task.key === 'classified')?.posts || []
  const articlePosts = taskFeed.find(({ task }) => task.key === 'article')?.posts || []
  const mediaDistributionPosts =
    taskFeed.find(({ task }) => task.key === 'mediaDistribution')?.posts || []
  const editorialRaw = articlePosts.length ? articlePosts : mediaDistributionPosts
  const editorialPosts =
    editorialRaw.length > 0
      ? editorialRaw.slice(0, 16)
      : mergeEditorialPostsForHome(editorialRaw, getHomeEditorialMockPosts(), 16)
  const imagePosts = taskFeed.find(({ task }) => task.key === 'image')?.posts || []
  const profilePosts = taskFeed.find(({ task }) => task.key === 'profile')?.posts || []
  const bookmarkPosts = taskFeed.find(({ task }) => task.key === 'sbm')?.posts || []

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />
      {productKind === 'directory' ? (
        <DirectoryHome
          primaryTask={primaryTask}
          enabledTasks={enabledTasks}
          listingPosts={listingPosts}
          classifiedPosts={classifiedPosts}
          profilePosts={profilePosts}
          brandPack={recipe.brandPack}
        />
      ) : null}
      {productKind === 'editorial' ? (
        <EditorialHome primaryTask={primaryTask} posts={editorialPosts} supportTasks={supportTasks} />
      ) : null}
      {productKind === 'visual' ? (
        <VisualHome primaryTask={primaryTask} imagePosts={imagePosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      {productKind === 'curation' ? (
        <CurationHome primaryTask={primaryTask} bookmarkPosts={bookmarkPosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      <Footer />
    </div>
  )
}
