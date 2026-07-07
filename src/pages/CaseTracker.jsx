import { PageHeader } from '../components/ui.jsx'

export default function CaseTracker() {
  return (
    <>
      <PageHeader title="Case Tracker" subtitle="Track legal and compliance cases across the network" />
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-800/40">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Case tracking tools will live here.
        </p>
      </div>
    </>
  )
}
