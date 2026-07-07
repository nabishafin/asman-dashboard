import { PageHeader } from '../components/ui.jsx'

export default function SosIncidents() {
  return (
    <>
      <PageHeader title="SOS Incidents" subtitle="Live emergency alerts and incident response" />
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-800/40">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          SOS incident monitoring will live here.
        </p>
      </div>
    </>
  )
}
