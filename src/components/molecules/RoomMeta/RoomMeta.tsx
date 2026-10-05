import type { Room } from '@/types/room'

type RoomMetaProps = Pick<
  Room,
  | 'maxAdults'
  | 'maxChildren'
  | 'bedConfiguration'
  | 'approximateSize'
  | 'breakfastIncluded'
>

export function RoomMeta({
  maxAdults,
  maxChildren,
  bedConfiguration,
  approximateSize,
  breakfastIncluded,
}: RoomMetaProps) {
  const adults = `${maxAdults} ${maxAdults === 1 ? 'Adult' : 'Adults'}`
  const children =
    maxChildren > 0
      ? `${maxChildren} ${maxChildren === 1 ? 'Child' : 'Children'}`
      : null
  const guestSummary = children ? `${adults} · ${children}` : adults

  return (
    <div className="space-y-2.5">
      <div
        aria-label="Room details"
        className="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-savoy-sans text-xs leading-relaxed text-savoy-charcoal/75"
      >
        <span className="inline-flex items-center">
          <span className="sr-only">Guests: </span>
          {guestSummary}
        </span>
        <span className="inline-flex items-center">
          <span className="sr-only">Bed configuration: </span>
          {bedConfiguration}
        </span>
        <span className="inline-flex max-w-full items-center break-words">
          <span className="sr-only">Room size: </span>
          {approximateSize.minimumSquareMetres}–
          {approximateSize.maximumSquareMetres} m²
          {approximateSize.estimated && (
            <span className="ml-1 text-savoy-charcoal/55">(approx.)</span>
          )}
        </span>
      </div>

      {breakfastIncluded && (
        <p className="font-savoy-sans text-xs leading-relaxed text-savoy-charcoal/70">
          Breakfast included
        </p>
      )}
    </div>
  )
}