import { PriceDisplay } from '@/components/atoms/PriceDisplay'
import { RoomMeta } from '@/components/molecules/RoomMeta'
import type { Room } from '@/types/room'

interface RoomCardProps {
  room: Room
  onViewRoom?: (room: Room) => void
}

export function RoomCard({ room, onViewRoom }: RoomCardProps) {
  return (
    <article className="flex h-full min-w-0 flex-col border border-neutral-200 bg-white">
      <div className="aspect-[4/3] w-full overflow-hidden bg-savoy-warm-grey/30">
        <img
          src={room.image}
          alt={`${room.name} interior`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-savoy-sans text-[10px] tracking-[0.18em] text-savoy-charcoal/60">
          {room.category.toUpperCase()}
        </p>

        <h3 className="mt-2 font-savoy-display text-xl leading-tight text-savoy-charcoal sm:text-2xl">
          {room.name}
        </h3>

        <p className="mt-3 font-savoy-sans text-sm leading-relaxed text-savoy-charcoal/70">
          {room.shortDescription}
        </p>

        <div className="mt-5">
          <RoomMeta
            maxAdults={room.maxAdults}
            maxChildren={room.maxChildren}
            bedConfiguration={room.bedConfiguration}
            approximateSize={room.approximateSize}
            breakfastIncluded={room.breakfastIncluded}
          />
        </div>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-x-4 gap-y-3 border-t border-savoy-warm-grey/70 pt-5">
          <PriceDisplay price={room.pricePerNight} currency={room.currency} />

          <button
            type="button"
            aria-label={`View ${room.name}`}
            onClick={() => onViewRoom?.(room)}
            className="inline-flex cursor-pointer items-center px-2 py-2.5 -mx-2 border-b border-savoy-champagne/80 font-savoy-sans text-[10px] tracking-[0.16em] text-savoy-charcoal transition-colors duration-200 hover:border-savoy-champagne hover:text-savoy-champagne focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-savoy-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            View Room
          </button>
        </div>
      </div>
    </article>
  )
}
