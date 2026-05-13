import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { UpdatesArchiveClient } from '@/components/updates/updates-archive-client'
import { fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

export async function TaskListPageOverride(_: { task: TaskKey; category?: string }) {
  const posts = await fetchTaskPosts('mediaDistribution', 24, { fresh: true })

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#1a1a1a]">
      <NavbarShell />
      <UpdatesArchiveClient posts={posts} />
      <Footer />
    </div>
  )
}
