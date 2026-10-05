import { useEffect, useRef, useState } from 'react'

type GuestSelectorProps = {
  adults: number
  children: number
  setAdults: React.Dispatch<React.SetStateAction<number>>
  setChildren: React.Dispatch<React.SetStateAction<number>>
  maxAdults?: number
  maxChildren?: number
  error?: string
}

export function GuestSelector({
  adults,
  children,
  setAdults,
  setChildren,
  maxAdults = 99,
  maxChildren = 99,
  error,
}: GuestSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectorRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !selectorRef.current?.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const guestSummary = [
    `${adults} ${adults === 1 ? 'Adult' : 'Adults'}`,
    ...(children > 0
      ? [`${children} ${children === 1 ? 'Child' : 'Children'}`]
      : []),
  ].join(', ')

  const maxTotalGuests = maxAdults + maxChildren

  const guestCounts = [
    {
      label: 'Adults',
      description: 'Age 18+',
      count: adults,
      minimum: 1,
      maximum: maxAdults,
      update: setAdults,
    },
    {
      label: 'Children',
      description: 'Under 18',
      count: children,
      minimum: 0,
      maximum: maxChildren,
      update: setChildren,
    },
  ]

  return (
    <div
      ref={selectorRef}
      className="relative min-w-0 border-b border-savoy-warm-grey md:border-b-0"
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="guest-selector-panel"
        onClick={() => setIsOpen((open) => !open)}
        className="flex min-h-[82px] w-full min-w-0 flex-col items-start justify-center gap-2 px-5 py-4 text-left transition-colors hover:bg-savoy-ivory/50 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-savoy-champagne md:px-3 lg:px-5"
      >
        <span className="font-savoy-sans text-[10px] tracking-[0.17em] text-savoy-charcoal/65">
          GUESTS
        </span>
        <span className="flex w-full min-w-0 items-center justify-between gap-2 font-savoy-sans text-sm text-savoy-charcoal">
          <span className="truncate">{guestSummary}</span>
          <span
            aria-hidden="true"
            className={`mr-1 h-2 w-2 shrink-0 border-b border-r border-savoy-champagne transition-transform duration-200 motion-reduce:transition-none ${isOpen ? '-rotate-[135deg]' : 'rotate-45'}`}
          />
        </span>
      </button>

      {isOpen && (
        <div
          id="guest-selector-panel"
          role="dialog"
          aria-labelledby="guest-selector-title"
          className="absolute left-1/2 top-full z-50 mt-3 w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 border border-savoy-warm-grey bg-savoy-ivory p-5 shadow-[0_16px_40px_rgba(17,17,17,0.12)] sm:p-6"
        >
          <h2
            id="guest-selector-title"
            className="mb-2 font-savoy-display text-xl text-savoy-charcoal"
          >
            Guests
          </h2>
          <div className="divide-y divide-savoy-warm-grey">
            {guestCounts.map((guest) => (
              <div
                key={guest.label}
                className="flex min-h-[76px] items-center justify-between gap-4 py-3"
              >
                <div>
                  <p className="font-savoy-sans text-sm text-savoy-charcoal">
                    {guest.label}
                  </p>
                  <p className="mt-1 font-savoy-sans text-xs text-savoy-charcoal/60">
                    {guest.description}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <button
                    type="button"
                    aria-label={`Decrease ${guest.label.toLowerCase()}`}
                    disabled={guest.count <= guest.minimum}
                    onClick={() => guest.update((count) => count - 1)}
                    className="flex h-11 w-11 items-center justify-center border border-savoy-warm-grey text-lg text-savoy-charcoal transition-colors hover:border-savoy-champagne hover:text-savoy-champagne focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-savoy-champagne disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-savoy-warm-grey disabled:hover:text-savoy-charcoal"
                  >
                    −
                  </button>
                  <output
                    aria-live="polite"
                    className="min-w-6 text-center font-savoy-sans text-sm tabular-nums text-savoy-charcoal"
                  >
                    {guest.count}
                  </output>
                  <button
                    type="button"
                    aria-label={`Increase ${guest.label.toLowerCase()}`}
                    disabled={
                      guest.count >= guest.maximum ||
                      adults + children >= maxTotalGuests
                    }
                    onClick={() => guest.update((count) => count + 1)}
                    className="flex h-11 w-11 items-center justify-center border border-savoy-warm-grey text-lg text-savoy-charcoal transition-colors hover:border-savoy-champagne hover:text-savoy-champagne focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-savoy-champagne disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-savoy-warm-grey disabled:hover:text-savoy-charcoal"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          {error && (
            <p className="mt-4 font-savoy-sans text-[10px] tracking-[0.08em] text-red-700">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  )
}