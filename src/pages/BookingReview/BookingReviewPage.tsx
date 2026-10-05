import { Header } from '@/components/organisms/Header'
import { PriceDisplay } from '@/components/atoms/PriceDisplay'
import { rooms } from '@/data/rooms'
import type { BookingSearchCriteria } from '@/types/bookingSearch'
import type { GuestDetails } from '@/types/guestDetails'
import type { Room } from '@/types/room'

const millisecondsPerDay = 24 * 60 * 60 * 1000

function getNumberOfNights(checkIn: string, checkOut: string) {
  return Math.round((Date.parse(checkOut) - Date.parse(checkIn)) / millisecondsPerDay)
}

function formatStayDate(value: string) {
  return new Intl.DateTimeFormat('en-ZA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`))
}

type PreviewBookingReview = {
  room: Room
  search: BookingSearchCriteria
  guest: GuestDetails
}

export function BookingReviewPage() {
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

  // This is temporary frontend preview data only. It must be replaced by validated booking-flow data once real availability and booking state are connected.
  const previewBookingReview: PreviewBookingReview = {
    room,
    search: {
      roomSlug: room.slug,
      checkIn: '2026-10-10',
      checkOut: '2026-10-12',
      adults: 2,
      children: 1,
    },
    guest: {
      firstName: 'Thabang',
      lastName: 'Morena',
      email: 'joxicraft@joxiboysngirl.co.za',
      phone: '0712345678',
      specialRequests: '',
    },
  }

  const { room: previewRoom, search, guest } = previewBookingReview
  const numberOfNights = getNumberOfNights(search.checkIn, search.checkOut)
  const estimatedAccommodationTotal = previewRoom.pricePerNight * numberOfNights
  const labelClassName =
    'font-savoy-sans text-[10px] tracking-[0.12em] text-savoy-charcoal/60'
  const valueClassName =
    'min-w-0 break-words text-right font-savoy-sans text-sm leading-relaxed text-savoy-charcoal'

  return (
    <main className="min-h-screen bg-savoy-ivory text-savoy-charcoal">
      <Header />

      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-8 sm:px-8 xl:px-14">
        <div className="mb-8">
          <p className="font-savoy-sans text-[10px] tracking-[0.18em] text-savoy-charcoal/60">
            BOOKING REVIEW
          </p>
          <h1 className="mt-3 font-savoy-display text-4xl leading-tight text-savoy-charcoal sm:text-5xl">
            Booking Review
          </h1>
          <p className="mt-4 max-w-xl font-savoy-sans text-sm leading-relaxed text-savoy-charcoal/75">
            Review your stay and guest details before continuing.
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
                <dd className={valueClassName}>{previewRoom.name}</dd>
                <dt className={labelClassName}>ROOM CATEGORY</dt>
                <dd className={valueClassName}>{previewRoom.category}</dd>
                <dt className={labelClassName}>CHECK-IN</dt>
                <dd className={valueClassName}>{formatStayDate(search.checkIn)}</dd>
                <dt className={labelClassName}>CHECK-OUT</dt>
                <dd className={valueClassName}>{formatStayDate(search.checkOut)}</dd>
                <dt className={labelClassName}>ADULTS</dt>
                <dd className={valueClassName}>{search.adults}</dd>
                <dt className={labelClassName}>CHILDREN</dt>
                <dd className={valueClassName}>{search.children}</dd>
                <dt className={labelClassName}>NUMBER OF NIGHTS</dt>
                <dd className={valueClassName}>
                  {numberOfNights} {numberOfNights === 1 ? 'night' : 'nights'}
                </dd>
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
                <dt className={labelClassName}>GUEST NAME</dt>
                <dd className={valueClassName}>
                  {guest.firstName} {guest.lastName}
                </dd>
                <dt className={labelClassName}>EMAIL</dt>
                <dd className={valueClassName}>{guest.email}</dd>
                <dt className={labelClassName}>PHONE</dt>
                <dd className={valueClassName}>{guest.phone}</dd>
                <dt className={labelClassName}>SPECIAL REQUESTS</dt>
                <dd className={valueClassName}>
                  {guest.specialRequests || 'None'}
                </dd>
              </dl>
            </section>
          </div>

          <aside className="border border-savoy-warm-grey bg-white p-5 sm:p-7">
            <section aria-labelledby="price-summary-heading">
              <h2
                id="price-summary-heading"
                className="font-savoy-sans text-[10px] tracking-[0.18em] text-savoy-charcoal/60"
              >
                PRICE SUMMARY
              </h2>
              <div className="mt-5 space-y-4">
                <div className="flex items-baseline justify-between gap-3">
                  <span className={labelClassName}>ROOM RATE PER NIGHT</span>
                  <PriceDisplay
                    price={previewRoom.pricePerNight}
                    currency={previewRoom.currency}
                  />
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <span className={labelClassName}>NUMBER OF NIGHTS</span>
                  <span className="font-savoy-sans text-sm text-savoy-charcoal">
                    {numberOfNights}
                  </span>
                </div>
                {previewRoom.breakfastIncluded && (
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
                    currency={previewRoom.currency}
                    suffix=""
                  />
                </div>
              </div>
            </section>

            <div className="mt-7 border-t border-savoy-warm-grey/70 pt-6">
              <button
                type="button"
                disabled
                className="w-full border border-savoy-charcoal bg-savoy-charcoal px-4 py-3 font-savoy-sans text-[10px] tracking-[0.16em] text-savoy-ivory opacity-50"
              >
                Continue to Payment
              </button>
              <p className="mt-3 font-savoy-sans text-xs leading-relaxed text-savoy-charcoal/65">
                Payment will become available after the booking details and availability are confirmed.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}