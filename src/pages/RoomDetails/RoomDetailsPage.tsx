import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PriceDisplay } from '@/components/atoms/PriceDisplay'
import { DateField } from '@/components/molecules/DateField'
import { GuestSelector } from '@/components/molecules/GuestSelector'
import { Header } from '@/components/organisms/Header'
import { RoomMeta } from '@/components/molecules/RoomMeta'
import { rooms } from '@/data/rooms'
import type { BookingSearchCriteria } from '@/types/bookingSearch'

type AvailabilityErrors = {
  checkIn?: string
  checkOut?: string
  guests?: string
}

function toInputDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function RoomDetailsPage() {
  const { slug } = useParams<{ slug: string }>()
  const room = rooms.find((item) => item.slug === slug)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [errors, setErrors] = useState<AvailabilityErrors>({})
  const [submissionMessage, setSubmissionMessage] = useState('')

  const today = useMemo(() => toInputDate(new Date()), [])

  if (!room) {
    return (
      <main className="min-h-screen bg-savoy-ivory px-6 py-16 text-savoy-charcoal sm:px-8">
        <div className="mx-auto max-w-md text-center">
          <p className="font-savoy-sans text-[10px] tracking-[0.2em] uppercase text-savoy-charcoal/60">
            Room details
          </p>
          <h1 className="mt-4 font-savoy-display text-3xl">Room not found</h1>
          <p className="mt-3 font-savoy-sans text-sm text-savoy-charcoal/70">
            The requested room could not be found.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex border-b border-savoy-champagne py-2 font-savoy-sans text-[10px] tracking-[0.16em] text-savoy-charcoal transition-colors hover:text-savoy-champagne focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-savoy-champagne"
          >
            Return home
          </Link>
        </div>
      </main>
    )
  }

  const handleCheckInChange = (value: string) => {
    setCheckIn(value)
    setErrors((current) => ({
      ...current,
      checkIn: undefined,
    }))

    if (checkOut && value && checkOut <= value) {
      setCheckOut('')
      setErrors((current) => ({
        ...current,
        checkOut: 'Check-out must be after check-in.',
      }))
    }
  }

  const handleCheckOutChange = (value: string) => {
    setCheckOut(value)
    setErrors((current) => ({
      ...current,
      checkOut: undefined,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: AvailabilityErrors = {}

    if (!checkIn) {
      nextErrors.checkIn = 'Check-in is required.'
    }

    if (!checkOut) {
      nextErrors.checkOut = 'Check-out is required.'
    }

    if (checkIn && checkOut && checkOut <= checkIn) {
      nextErrors.checkOut = 'Check-out must be after check-in.'
    }

    if (adults < 1) {
      nextErrors.guests = 'At least 1 adult is required.'
    }

    if (adults > room.maxAdults || children > room.maxChildren) {
      nextErrors.guests = `Guests must fit within the room capacity of ${room.maxAdults} adults and ${room.maxChildren} children.`
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setSubmissionMessage('')
      return
    }

    const nextSearchCriteria: BookingSearchCriteria = {
      roomSlug: room.slug,
      checkIn,
      checkOut,
      adults,
      children,
    }

    if (
      !nextSearchCriteria.roomSlug ||
      !nextSearchCriteria.checkIn ||
      !nextSearchCriteria.checkOut
    ) {
      setSubmissionMessage('')
      return
    }

    setSubmissionMessage('Your stay details are ready to check.')
  }

  return (
    <main className="min-h-screen bg-savoy-ivory text-savoy-charcoal">
      <Header />

      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-8 sm:px-8 xl:px-14">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-savoy-sans text-[10px] tracking-[0.16em] text-savoy-charcoal/70 transition-colors hover:text-savoy-champagne focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-savoy-champagne"
          >
            <span aria-hidden="true">←</span>
            Back to rooms
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.95fr)] lg:items-start">
          <div className="overflow-hidden border border-neutral-200 bg-white">
            <img
              src={room.image}
              alt={`${room.name} interior`}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <div className="space-y-3">
              <p className="font-savoy-sans text-[10px] tracking-[0.18em] text-savoy-charcoal/60">
                {room.category.toUpperCase()}
              </p>
              <h1 className="font-savoy-display text-4xl leading-tight text-savoy-charcoal sm:text-5xl">
                {room.name}
              </h1>
            </div>

            <p className="mt-5 max-w-xl font-savoy-sans text-base leading-relaxed text-savoy-charcoal/75">
              {room.shortDescription}
            </p>

            <div className="mt-6">
              <RoomMeta
                maxAdults={room.maxAdults}
                maxChildren={room.maxChildren}
                bedConfiguration={room.bedConfiguration}
                approximateSize={room.approximateSize}
                breakfastIncluded={room.breakfastIncluded}
              />
            </div>

            <div className="mt-6 border-t border-savoy-warm-grey/70 pt-6">
              <section aria-labelledby="room-features-heading">
                <h2
                  id="room-features-heading"
                  className="font-savoy-sans text-[10px] tracking-[0.18em] text-savoy-charcoal/60"
                >
                  FEATURES
                </h2>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {room.features.map((feature) => (
                    <li
                      key={feature}
                      className="font-savoy-sans text-sm leading-relaxed text-savoy-charcoal/75"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="mt-6 w-full border border-neutral-200 bg-white p-5 sm:p-6">
              <div className="flex items-end justify-between gap-4">
                <PriceDisplay price={room.pricePerNight} currency={room.currency} />
              </div>

              {room.breakfastIncluded && (
                <p className="mt-4 font-savoy-sans text-xs leading-relaxed text-savoy-charcoal/70">
                  Breakfast included
                </p>
              )}

              <form
                className="mt-6 space-y-4"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <DateField
                    id="check-in"
                    label="CHECK IN"
                    accessibleLabel="Check-in date"
                    value={checkIn}
                    minDate={today}
                    error={errors.checkIn}
                    onChange={handleCheckInChange}
                  />
                  <DateField
                    id="check-out"
                    label="CHECK OUT"
                    accessibleLabel="Check-out date"
                    value={checkOut}
                    minDate={checkIn || today}
                    error={errors.checkOut}
                    onChange={handleCheckOutChange}
                  />
                </div>

                <div>
                  <GuestSelector
                    adults={adults}
                    children={children}
                    setAdults={setAdults}
                    setChildren={setChildren}
                    maxAdults={room.maxAdults}
                    maxChildren={room.maxChildren}
                    error={errors.guests}
                  />
                </div>

                {submissionMessage && (
                  <p className="font-savoy-sans text-[10px] tracking-[0.08em] text-savoy-charcoal/70">
                    {submissionMessage}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full border border-savoy-charcoal bg-savoy-charcoal px-4 py-3 font-savoy-sans text-[10px] tracking-[0.16em] text-savoy-ivory transition-colors duration-200 hover:border-savoy-champagne hover:bg-savoy-champagne hover:text-savoy-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-savoy-champagne"
                >
                  Check Availability
                </button>
              </form>
            </aside>
          </div>
        </div>
      </div>
    </main>
  )
}
