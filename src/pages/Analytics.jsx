import { PageHeader } from '../components/ui.jsx'

export default function Analytics() {
  return (
    <>
      <PageHeader title="Analytics" subtitle="Platform-wide performance and usage insights" />
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-800/40">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Analytics and reporting will live here.
        </p>
      </div>
    </>
  )
}
