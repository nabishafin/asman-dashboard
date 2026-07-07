import { PageHeader } from '../components/ui.jsx'

export default function AllDrivers() {
  return (
    <>
      <PageHeader title="Drivers" subtitle="All drivers across every fleet on the platform" />
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-800/40">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Platform-wide driver oversight will live here.
        </p>
      </div>
    </>
  )
}
