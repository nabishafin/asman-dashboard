import { useState } from 'react'
import { Button } from './Button.jsx'

export function FilterSelect({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false)
  
  return (
    <div className="relative">
      <Button 
        variant="outline" 
        className="bg-white shadow-sm hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800"
        rightIcon="chevronDown"
        onClick={() => setOpen(!open)}
      >
        {value || label}
      </Button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full mt-1 z-20 w-40 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-800">
            <button 
              onClick={() => { onChange(''); setOpen(false) }}
              className="w-full text-left px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              All
            </button>
            {options.map(opt => (
              <button 
                key={opt}
                onClick={() => { onChange(opt); setOpen(false) }}
                className="w-full text-left px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
