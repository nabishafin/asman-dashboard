import { PageHeader } from '../components/ui.jsx'

export default function Settings() {
  return (
    <>
      <PageHeader title="Settings" subtitle="Platform configuration" />
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-800/40">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Global settings for the Asman platform will live here (billing,
          integrations, roles &amp; permissions).
        </p>
      </div>
    </>
  )
}
