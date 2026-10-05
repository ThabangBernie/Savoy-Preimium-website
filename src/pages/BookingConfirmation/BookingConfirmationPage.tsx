import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/organisms/Header'
import { PriceDisplay } from '@/components/atoms/PriceDisplay'
import { rooms } from '@/data/rooms'
import type { GuestDetails } from '@/types/guestDetails'
import type { Room } from '@/types/room'

const millisecondsPerDay = 24 * 60 * 60 * 1000

function getNumberOfNights(checkIn: string, checkOut: string) {
  return Math.round(
    (Date.parse(checkOut) - Date.parse(checkIn)) / millisecondsPerDay,
  )
}

function formatStayDate(value: string) {
  return new Intl.DateTimeFormat('en-ZA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`))
}

type PreviewConfirmation = {
  room: Room
  checkIn: string
  checkOut: string
  adults: number
  children: number
  primaryGuest: GuestDetails
}

export function BookingConfirmationPage() {
  const navigate = useNavigate()
  const room = rooms.find((item) => item.slug === 'savoy-presidential-suite')

  if (!room) {
    return (
      <main className="min-h-screen bg-savoy-ivory text-savoy-charcoal">
        <Header />
        <p className="mx-auto max-w-[1440px] px-5 py-12 font-savoy-sans text-sm sm:px-8 xl:px-14">
          The preview room could not be found.
        </p>
      </main>
    )
  }

  // This is temporary frontend preview data only. It must be replaced by verified backend booking data after payment and reservation confirmation.
  const previewConfirmation: PreviewConfirmation = {
    room,
    checkIn: '2026-10-10',
    checkOut: '2026-10-12',
    adults: 2,
    children: 1,
    primaryGuest: {
      firstName: 'Thabang',
      lastName: 'Morena',
      email: 'joxicraft@joxiboysngirl.co.za',
      phone: '0712345678',
      specialRequests: 'None',
    },
  }

  const numberOfNights = getNumberOfNights(
    previewConfirmation.checkIn,
    previewConfirmation.checkOut,
  )
  const estimatedAccommodationTotal =
    previewConfirmation.room.pricePerNight * numberOfNights
  const guestSummary = `${previewConfirmation.adults} ${previewConfirmation.adults === 1 ? 'Adult' : 'Adults'}${previewConfirmation.children ? `, ${previewConfirmation.children} ${previewConfirmation.children === 1 ? 'Child' : 'Children'}` : ''}`
  const labelClassName =
    'font-savoy-sans text-[10px] tracking-[0.12em] text-savoy-charcoal/60'
  const valueClassName =
    'min-w-0 break-words text-right font-savoy-sans text-sm leading-relaxed text-savoy-charcoal'

  return (
    <main className="min-h-screen bg-savoy-ivory text-savoy-charcoal">
      <Header />

      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-8 sm:px-8 xl:px-14">
        <div className="mb-8 max-w-2xl">
          <div className="inline-block border border-savoy-warm-grey bg-white px-3 py-2 font-savoy-sans text-[9px] tracking-[0.18em] text-savoy-charcoal/70">
            Confirmation preview
          </div>
          <p className="mt-5 font-savoy-sans text-[10px] tracking-[0.18em] text-savoy-charcoal/60">
            BOOKING CONFIRMATION
          </p>
          <h1 className="mt-3 font-savoy-display text-4xl leading-tight text-savoy-charcoal sm:text-5xl">
            Your stay details
          </h1>
          <p className="mt-4 max-w-xl font-savoy-sans text-sm leading-relaxed text-savoy-charcoal/75">
            Review the details that will appear here once your reservation has been confirmed.
          </p>
          <p className="mt-2 font-savoy-sans text-sm leading-relaxed text-savoy-charcoal/70">
            This page is a frontend preview. No reservation or payment has been created.
          </p>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(300px,0.85fr)] lg:gap-7">
          <div className="space-y-5">
            <section
              aria-labelledby="stay-details-heading"
              className="border border-savoy-warm-grey bg-white px-5 py-4 sm:px-7 sm:py-6"
            >
              <h2
                id="stay-details-heading"
                className="font-savoy-sans text-[10px] tracking-[0.18em] text-savoy-charcoal/60"
              >
                STAY DETAILS
              </h2>
              <dl className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-x-5 gap-y-3 sm:max-w-2xl">
                <dt className={labelClassName}>ROOM</dt>
                <dd className={valueClassName}>{previewConfirmation.room.name}</dd>
                <dt className={labelClassName}>ROOM CATEGORY</dt>
                <dd className={valueClassName}>{previewConfirmation.room.category}</dd>
                <dt className={labelClassName}>CHECK-IN</dt>
                <dd className={valueClassName}>
                  {formatStayDate(previewConfirmation.checkIn)}
                </dd>
                <dt className={labelClassName}>CHECK-OUT</dt>
                <dd className={valueClassName}>
                  {formatStayDate(previewConfirmation.checkOut)}
                </dd>
                <dt className={labelClassName}>NUMBER OF NIGHTS</dt>
                <dd className={valueClassName}>
                  {numberOfNights} {numberOfNights === 1 ? 'night' : 'nights'}
                </dd>
                <dt className={labelClassName}>GUESTS</dt>
                <dd className={valueClassName}>{guestSummary}</dd>
              </dl>
            </section>

            <section
              aria-labelledby="guest-details-heading"
              className="border border-savoy-warm-grey bg-white px-5 py-4 sm:px-7 sm:py-6"
            >
              <h2
                id="guest-details-heading"
                className="font-savoy-sans text-[10px] tracking-[0.18em] text-savoy-charcoal/60"
              >
                GUEST DETAILS
              </h2>
              <dl className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-x-5 gap-y-3 sm:max-w-2xl">
                <dt className={labelClassName}>PRIMARY GUEST</dt>
                <dd className={valueClassName}>
                  {previewConfirmation.primaryGuest.firstName}{' '}
                  {previewConfirmation.primaryGuest.lastName}
                </dd>
                <dt className={labelClassName}>EMAIL</dt>
                <dd className={valueClassName}>
                  {previewConfirmation.primaryGuest.email}
                </dd>
                <dt className={labelClassName}>PHONE</dt>
                <dd className={valueClassName}>
                  {previewConfirmation.primaryGuest.phone}
                </dd>
                <dt className={labelClassName}>SPECIAL REQUESTS</dt>
                <dd className={valueClassName}>
                  {previewConfirmation.primaryGuest.specialRequests || 'None'}
                </dd>
              </dl>
            </section>
          </div>

          <aside className="space-y-5 border border-savoy-warm-grey bg-white p-5 sm:p-7">
            <section aria-labelledby="booking-reference-heading">
              <h2
                id="booking-reference-heading"
                className="font-savoy-sans text-[10px] tracking-[0.18em] text-savoy-charcoal/60"
              >
                BOOKING REFERENCE
              </h2>
              <p className="mt-4 font-savoy-sans text-sm text-savoy-charcoal">
                Provided after confirmation
              </p>
            </section>

            <section aria-labelledby="stay-summary-heading">
              <h2
                id="stay-summary-heading"
                className="font-savoy-sans text-[10px] tracking-[0.18em] text-savoy-charcoal/60"
              >
                STAY SUMMARY
              </h2>
              <div className="mt-5 space-y-4">
                <div className="flex items-baseline justify-between gap-3">
                  <span className={labelClassName}>ROOM RATE PER NIGHT</span>
                  <PriceDisplay
                    price={previewConfirmation.room.pricePerNight}
                    currency={previewConfirmation.room.currency}
                  />
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <span className={labelClassName}>NUMBER OF NIGHTS</span>
                  <span className="font-savoy-sans text-sm text-savoy-charcoal">
                    {numberOfNights}
                  </span>
                </div>
                {previewConfirmation.room.breakfastIncluded && (
                  <p className="border-t border-savoy-warm-grey/70 pt-4 font-savoy-sans text-xs leading-relaxed text-savoy-charcoal/70">
                    Breakfast included
                  </p>
                )}
                <div className="border-t border-savoy-warm-grey/70 pt-4">
                  <p className="mb-2 font-savoy-sans text-[10px] tracking-[0.12em] text-savoy-charcoal/60">
                    ESTIMATED ACCOMMODATION TOTAL
                  </p>
                  <PriceDisplay
                    price={estimatedAccommodationTotal}
                    currency={previewConfirmation.room.currency}
                    suffix=""
                  />
                </div>
              </div>
            </section>

            <section aria-labelledby="what-happens-next-heading">
              <h2
                id="what-happens-next-heading"
                className="font-savoy-sans text-[10px] tracking-[0.18em] text-savoy-charcoal/60"
              >
                WHAT HAPPENS NEXT
              </h2>
              <div className="mt-4 space-y-3 font-savoy-sans text-sm leading-relaxed text-savoy-charcoal/75">
                <p>
                  Once a real booking is completed, the confirmed reservation reference and final stay details will appear here.
                </p>
                <p>
                  Booking communication can also be sent through the hotel&apos;s configured notification channels.
                </p>
              </div>
            </section>

            <div className="border-t border-savoy-warm-grey/70 pt-6">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="w-full border border-savoy-charcoal bg-savoy-charcoal px-4 py-3 font-savoy-sans text-[10px] tracking-[0.16em] text-savoy-ivory transition-colors duration-200 hover:bg-savoy-charcoal/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-savoy-champagne"
              >
                Return to Rooms
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
