import { useState } from 'react'
import { DateField } from '@/components/molecules/DateField'
import { GuestSelector } from '@/components/molecules/GuestSelector'

function toInputDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function nextDate(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  return toInputDate(new Date(year, month - 1, day + 1))
}

export function BookingBar() {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const today = toInputDate(new Date())
  const checkOutMin = checkIn ? nextDate(checkIn) : today

  const updateCheckIn = (value: string) => {
    if (value && value < today) return

    setCheckIn(value)
    if (checkOut && value && checkOut <= value) setCheckOut('')
  }

  const updateCheckOut = (value: string) => {
    if (value && value < checkOutMin) return
    setCheckOut(value)
  }

  return (
    <section
      aria-label="Booking"
      className="bg-savoy-ivory py-6 sm:py-8"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 xl:px-14">
        <div className="grid overflow-visible border border-savoy-warm-grey bg-savoy-white md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.92fr)_minmax(190px,1.16fr)]">
          <DateField
            id="booking-check-in"
            label="CHECK IN"
            accessibleLabel="Check-in date"
            value={checkIn}
            minDate={today}
            onChange={updateCheckIn}
          />
          <DateField
            id="booking-check-out"
            label="CHECK OUT"
            accessibleLabel="Check-out date"
            value={checkOut}
            minDate={checkOutMin}
            onChange={updateCheckOut}
          />
          <GuestSelector
            adults={adults}
            children={children}
            setAdults={setAdults}
            setChildren={setChildren}
          />
          <div className="p-3 md:p-2">
            <button
              type="button"
              className="min-h-[58px] w-full border border-savoy-charcoal bg-savoy-charcoal px-4 font-savoy-sans text-[10px] tracking-[0.16em] text-savoy-ivory transition-colors duration-200 hover:border-savoy-champagne hover:bg-savoy-champagne hover:text-savoy-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-savoy-champagne motion-reduce:transition-none"
            >
              CHECK AVAILABILITY
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}