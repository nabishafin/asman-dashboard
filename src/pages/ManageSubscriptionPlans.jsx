import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import TierCard from '../components/SubscriptionTierCard.jsx'
import { TIERS } from '../data/subscriptionTiers.js'

const fieldLabel = 'block text-xs font-medium text-zinc-500 dark:text-zinc-400'
const fieldInput =
  'mt-1.5 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50'

const BASE_PLAN = {
  visible: true,
  mapLayers: 'Up to 15 layers',
  sosContacts: 10,
  languages: ['English', 'Russian', 'Spanish'],
  supportLevel: 'priority',
}

function planFromTier(tier) {
  return {
    ...BASE_PLAN,
    name: tier.name,
    description: tier.description,
    price: tier.price,
    minDrivers: tier.minDrivers,
    maxDrivers: tier.maxDrivers,
  }
}

const EXTRA_LANGUAGES = ['French', 'Arabic', 'Mandarin', 'Portuguese']

function SegmentedControl({ options, value, onChange, tone = 'neutral' }) {
  return (
    <div className="flex rounded-lg bg-zinc-100 p-1 text-xs dark:bg-zinc-800">
      {options.map((opt) => {
        const isActive = value === opt.value
        const activeClass =
          tone === 'brand'
            ? 'bg-brand text-white shadow-sm'
            : 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-50'
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={
              'rounded-md px-3 py-1.5 font-semibold transition ' +
              (isActive
                ? activeClass
                : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300')
            }
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={
        'relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ' +
        (checked ? 'bg-brand' : 'bg-zinc-300 dark:bg-zinc-700')
      }
    >
      <span
        className={
          'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ' +
          (checked ? 'translate-x-5' : 'translate-x-0.5')
        }
      />
    </button>
  )
}

function SectionCard({ icon, title, children }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center gap-2">
        <Icon name={icon} size={16} className="text-brand dark:text-brand-dark" />
        <h3 className="font-bold text-zinc-900 dark:text-zinc-50">{title}</h3>
      </div>
      {children}
    </div>
  )
}

export default function ManageSubscriptionPlans() {
  const [tiers, setTiers] = useState(TIERS)
  const [selectedTierId, setSelectedTierId] = useState(
    TIERS.find((t) => t.current)?.id ?? TIERS[0].id
  )
  const selectedTier = tiers.find((t) => t.id === selectedTierId)
  const [billing, setBilling] = useState('monthly')
  const [plan, setPlan] = useState(planFromTier(selectedTier))
  const [savedMsg, setSavedMsg] = useState('')

  const editTier = (tier) => {
    setSelectedTierId(tier.id)
    setPlan(planFromTier(tier))
    setSavedMsg('')
  }

  const setField = (key) => (e) => setPlan((p) => ({ ...p, [key]: e.target.value }))
  const setNumberField = (key) => (e) =>
    setPlan((p) => ({ ...p, [key]: e.target.value === '' ? null : Number(e.target.value) }))

  const removeLanguage = (lang) =>
    setPlan((p) => ({ ...p, languages: p.languages.filter((l) => l !== lang) }))

  const addLanguage = () => {
    const next = EXTRA_LANGUAGES.find((l) => !plan.languages.includes(l))
    if (next) setPlan((p) => ({ ...p, languages: [...p.languages, next] }))
  }

  const handleDiscard = () => {
    setPlan(planFromTier(selectedTier))
    setBilling('monthly')
    setSavedMsg('')
  }

  const handleSave = () => {
    const groupSize = plan.maxDrivers
      ? `${plan.minDrivers} – ${plan.maxDrivers} Drivers`
      : `${plan.minDrivers}+ Drivers`

    setTiers((prev) =>
      prev.map((t) =>
        t.id === selectedTierId
          ? {
              ...t,
              name: plan.name,
              description: plan.description,
              price: plan.price,
              minDrivers: plan.minDrivers,
              maxDrivers: plan.maxDrivers,
              groupSize,
            }
          : t
      )
    )
    setSavedMsg('Changes saved.')
    setTimeout(() => setSavedMsg(''), 2500)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {tiers.map((tier) => (
          <TierCard
            key={tier.id}
            tier={tier}
            selected={tier.id === selectedTierId}
            onEdit={() => editTier(tier)}
          />
        ))}
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              Plan Configuration
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Editing &quot;{plan.name}&quot; Subscription Tier
            </p>
          </div>
          <SegmentedControl
            value={billing}
            onChange={setBilling}
            options={[
              { value: 'monthly', label: 'Monthly' },
              { value: 'annual', label: 'Annual (-15%)' },
            ]}
          />
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <SectionCard icon="info" title="Core Details">
            <div>
              <label className={fieldLabel}>Plan Name</label>
              <input value={plan.name} onChange={setField('name')} className={fieldInput} />
            </div>
            <div className="mt-4">
              <label className={fieldLabel}>Public Description</label>
              <textarea
                rows={3}
                value={plan.description}
                onChange={setField('description')}
                className={fieldInput + ' resize-none'}
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
              <div>
                <label className={fieldLabel}>Monthly Price ($)</label>
                <input
                  type="number"
                  min="0"
                  value={plan.price ?? ''}
                  onChange={setNumberField('price')}
                  className={fieldInput}
                />
              </div>
              <div>
                <label className={fieldLabel}>Min Drivers</label>
                <input
                  type="number"
                  min="0"
                  value={plan.minDrivers ?? ''}
                  onChange={setNumberField('minDrivers')}
                  className={fieldInput}
                />
              </div>
              <div>
                <label className={fieldLabel}>Max Drivers</label>
                <input
                  type="number"
                  min="0"
                  placeholder="No limit"
                  value={plan.maxDrivers ?? ''}
                  onChange={setNumberField('maxDrivers')}
                  className={fieldInput}
                />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
              <div>
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                  Visibility Status
                </p>
                <p className="text-xs text-zinc-400">Visible in public marketplace</p>
              </div>
              <ToggleSwitch
                checked={plan.visible}
                onChange={(v) => setPlan((p) => ({ ...p, visible: v }))}
              />
            </div>
          </SectionCard>

          <SectionCard icon="layers" title="Feature Layers">
            <div className="flex items-center justify-between gap-3">
              <span className={fieldLabel}>Route Intelligence Map layers</span>
              <button className="flex flex-shrink-0 items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                {plan.mapLayers}
                <Icon name="chevronDown" size={12} />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <span className={fieldLabel}>SOS Button Contacts</span>
              <input
                type="number"
                min="0"
                value={plan.sosContacts}
                onChange={(e) => setPlan((p) => ({ ...p, sosContacts: e.target.value }))}
                className="w-16 flex-shrink-0 rounded-lg border border-zinc-200 bg-white px-2 py-1 text-center text-sm text-zinc-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
              />
            </div>

            <div className="mt-4">
              <p className={fieldLabel}>Interface Languages</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                {plan.languages.map((lang) => (
                  <span
                    key={lang}
                    className="flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand dark:text-brand-dark"
                  >
                    {lang}
                    <button
                      type="button"
                      onClick={() => removeLanguage(lang)}
                      className="text-brand/70 hover:text-brand"
                    >
                      <Icon name="close" size={11} />
                    </button>
                  </span>
                ))}
                <button
                  type="button"
                  onClick={addLanguage}
                  className="rounded-full border border-dashed border-zinc-300 px-2.5 py-1 text-xs font-semibold text-zinc-500 transition hover:border-brand/40 hover:text-brand dark:border-zinc-700 dark:text-zinc-400"
                >
                  + Add
                </button>
              </div>
            </div>

            <div className="mt-4">
              <p className={fieldLabel}>Support Level</p>
              <div className="mt-1.5">
                <SegmentedControl
                  tone="brand"
                  value={plan.supportLevel}
                  onChange={(v) => setPlan((p) => ({ ...p, supportLevel: v }))}
                  options={[
                    { value: 'ticket', label: 'Ticket' },
                    { value: 'priority', label: 'Priority' },
                    { value: 'dedicated', label: '24/7 Dedicated' },
                  ]}
                />
              </div>
            </div>
          </SectionCard>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
        {savedMsg && (
          <span className="text-xs font-semibold text-green-600 dark:text-green-400">
            {savedMsg}
          </span>
        )}
        <button
          type="button"
          onClick={handleDiscard}
          className="text-sm font-semibold text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          Discard Draft
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black dark:bg-zinc-100 dark:text-zinc-900"
        >
          <Icon name="save" size={15} />
          Save Subscription Changes
        </button>
      </div>
    </div>
  )
}
