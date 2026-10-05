import { useRef } from 'react'
import { Icon } from '@/components/atoms/Icon'

type DateFieldProps = {
  id: string
  label: string
  accessibleLabel: string
  value: string
  minDate: string
  error?: string
  onChange: (value: string) => void
}

function formatDate(value: string) {
  if (!value) return 'Select date'

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00`))
}

export function DateField({
  id,
  label,
  accessibleLabel,
  value,
  minDate,
  error,
  onChange,
}: DateFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const calendarLabel = accessibleLabel.replace(/ date$/i, '').toLowerCase()

  const openCalendar = () => {
    const input = inputRef.current
    if (!input) return

    input.focus()

    if (typeof input.showPicker === 'function') {
      try {
        input.showPicker()
        return
      } catch {
        input.click()
        return
      }
    }

    input.click()
  }

  return (
    <div
      className="relative flex min-h-[82px] min-w-0 flex-col justify-center gap-2 border-b border-savoy-warm-grey px-5 py-4 transition-colors hover:bg-savoy-ivory/50 md:border-b-0 md:px-3 lg:px-5"
    >
      <span className="font-savoy-sans text-[10px] tracking-[0.17em] text-savoy-charcoal/65">
        {label}
      </span>
      <button
        type="button"
        aria-label={`Open ${calendarLabel} calendar`}
        aria-invalid={Boolean(error)}
        onClick={openCalendar}
        className="flex min-h-8 min-w-0 items-center justify-between gap-2 text-left font-savoy-display text-[15px] text-savoy-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-savoy-champagne sm:text-base"
      >
        <span className="truncate">{formatDate(value)}</span>
        <span aria-hidden="true" className="shrink-0 text-savoy-champagne">
          <Icon name="calendar" />
        </span>
      </button>
      <input
        ref={inputRef}
        id={id}
        type="date"
        aria-label={accessibleLabel}
        aria-invalid={Boolean(error)}
        aria-hidden="true"
        tabIndex={-1}
        value={value}
        min={minDate}
        onChange={(event) => onChange(event.currentTarget.value)}
        className="sr-only"
      />
      {error && (
        <p className="font-savoy-sans text-[10px] tracking-[0.08em] text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}