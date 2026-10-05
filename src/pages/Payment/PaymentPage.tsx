import { Header } from '@/components/organisms/Header'
import { PriceDisplay } from '@/components/atoms/PriceDisplay'
import { rooms } from '@/data/rooms'

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

export function PaymentPage() {
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

  // This is temporary frontend preview data only. It must be replaced by validated booking and pricing data before payment integration.
  const previewPayment = {
    room,
    checkIn: '2026-10-10',
    checkOut: '2026-10-12',
    adults: 2,
    children: 1,
  }

  const numberOfNights = getNumberOfNights(
    previewPayment.checkIn,
    previewPayment.checkOut,
  )
  const estimatedAccommodationTotal =
    previewPayment.room.pricePerNight * numberOfNights
  const guestSummary = `${previewPayment.adults} ${previewPayment.adults === 1 ? 'Adult' : 'Adults'}${previewPayment.children ? `, ${previewPayment.children} ${previewPayment.children === 1 ? 'Child' : 'Children'}` : ''}`

  return (
    <main className="min-h-screen bg-savoy-ivory text-savoy-charcoal">
      <Header />

      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-8 sm:px-8 xl:px-14">
        <div className="mb-8 max-w-2xl">
          <p className="font-savoy-sans text-[10px] tracking-[0.18em] text-savoy-charcoal/60">
            PAYMENT
          </p>
          <h1 className="mt-3 font-savoy-display text-4xl leading-tight text-savoy-charcoal sm:text-5xl">
            Secure Payment
          </h1>
          <p className="mt-4 font-savoy-sans text-sm leading-relaxed text-savoy-charcoal/75">
            Review the amount and continue to our secure payment provider when payment becomes available.
          </p>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.75fr)] lg:gap-7">
          <section
            aria-labelledby="payment-method-heading"
            className="border border-savoy-warm-grey bg-white px-5 py-4 sm:px-7 sm:py-6"
          >
            <h2
              id="payment-method-heading"
              className="font-savoy-sans text-[10px] tracking-[0.18em] text-savoy-charcoal/60"
            >
              PAYMENT METHOD
            </h2>

            <p className="mt-4 max-w-xl font-savoy-sans text-sm leading-relaxed text-savoy-charcoal/75">
              Payment will be completed securely through Savoy&apos;s approved payment provider.
            </p>

            <div className="mt-6 border border-savoy-warm-grey bg-savoy-ivory p-5 sm:p-6">
              <p className="font-savoy-sans text-[10px] tracking-[0.16em] text-savoy-charcoal/60">
                SECURE PAYMENT PROVIDER
              </p>

              <div className="mt-4 space-y-3">
                <h3 className="font-savoy-display text-2xl leading-snug text-savoy-charcoal sm:text-[2rem]">
                  Secure online payment
                </h3>
                <p className="font-savoy-sans text-sm leading-relaxed text-savoy-charcoal/75">
                  Your payment details will be entered securely with the payment provider. Savoy will not collect or store your full card details on this page.
                </p>
              </div>
            </div>

            <p className="mt-5 font-savoy-sans text-xs leading-relaxed text-savoy-charcoal/65">
              Payment will be processed by a secure external payment provider. Savoy will not store your full card number or security code.
            </p>
          </section>

          <aside className="border border-savoy-warm-grey bg-white p-5 sm:p-7">
            <section aria-labelledby="payment-summary-heading">
              <h2
                id="payment-summary-heading"
                className="font-savoy-sans text-[10px] tracking-[0.18em] text-savoy-charcoal/60"
              >
                BOOKING SUMMARY
              </h2>

              <dl className="mt-5 space-y-4">
                <div className="flex items-start justify-between gap-3 border-b border-savoy-warm-grey/70 pb-3">
                  <dt className="font-savoy-sans text-[10px] tracking-[0.12em] text-savoy-charcoal/60">
                    ROOM
                  </dt>
                  <dd className="max-w-[12rem] text-right font-savoy-sans text-sm text-savoy-charcoal">
                    {previewPayment.room.name}
                  </dd>
                </div>

                <div className="flex items-start justify-between gap-3 border-b border-savoy-warm-grey/70 pb-3">
                  <dt className="font-savoy-sans text-[10px] tracking-[0.12em] text-savoy-charcoal/60">
                    CHECK-IN
                  </dt>
                  <dd className="text-right font-savoy-sans text-sm text-savoy-charcoal">
                    {formatStayDate(previewPayment.checkIn)}
                  </dd>
                </div>

                <div className="flex items-start justify-between gap-3 border-b border-savoy-warm-grey/70 pb-3">
                  <dt className="font-savoy-sans text-[10px] tracking-[0.12em] text-savoy-charcoal/60">
                    CHECK-OUT
                  </dt>
                  <dd className="text-right font-savoy-sans text-sm text-savoy-charcoal">
                    {formatStayDate(previewPayment.checkOut)}
                  </dd>
                </div>

                <div className="flex items-start justify-between gap-3 border-b border-savoy-warm-grey/70 pb-3">
                  <dt className="font-savoy-sans text-[10px] tracking-[0.12em] text-savoy-charcoal/60">
                    GUESTS
                  </dt>
                  <dd className="text-right font-savoy-sans text-sm text-savoy-charcoal">
                    {guestSummary}
                  </dd>
                </div>

                <div className="flex items-start justify-between gap-3 border-b border-savoy-warm-grey/70 pb-3">
                  <dt className="font-savoy-sans text-[10px] tracking-[0.12em] text-savoy-charcoal/60">
                    NUMBER OF NIGHTS
                  </dt>
                  <dd className="text-right font-savoy-sans text-sm text-savoy-charcoal">
                    {numberOfNights} {numberOfNights === 1 ? 'night' : 'nights'}
                  </dd>
                </div>

                <div className="flex items-baseline justify-between gap-3 border-b border-savoy-warm-grey/70 pb-3">
                  <dt className="font-savoy-sans text-[10px] tracking-[0.12em] text-savoy-charcoal/60">
                    ROOM RATE
                  </dt>
                  <dd>
                    <PriceDisplay
                      price={previewPayment.room.pricePerNight}
                      currency={previewPayment.room.currency}
                    />
                  </dd>
                </div>

                {previewPayment.room.breakfastIncluded && (
                  <div className="border-b border-savoy-warm-grey/70 pb-3">
                    <p className="font-savoy-sans text-xs uppercase tracking-[0.12em] text-savoy-charcoal/60">
                      Breakfast included
                    </p>
                  </div>
                )}

                <div className="pt-1">
                  <p className="mb-2 font-savoy-sans text-[10px] tracking-[0.12em] text-savoy-charcoal/60">
                    ESTIMATED ACCOMMODATION TOTAL
                  </p>
                  <PriceDisplay
                    price={estimatedAccommodationTotal}
                    currency={previewPayment.room.currency}
                    suffix=""
                  />
                </div>
              </dl>
            </section>

            <div className="mt-7 border-t border-savoy-warm-grey/70 pt-6">
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="w-full border border-savoy-charcoal bg-savoy-charcoal px-4 py-3 font-savoy-sans text-[10px] tracking-[0.16em] text-savoy-ivory disabled:cursor-not-allowed disabled:opacity-50"
              >
                Proceed to Secure Payment
              </button>
              <p className="mt-3 font-savoy-sans text-xs leading-relaxed text-savoy-charcoal/65">
                Payment will become available after room availability and booking details are confirmed.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
