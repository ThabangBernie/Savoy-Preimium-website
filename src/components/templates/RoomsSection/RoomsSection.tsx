import { RoomCard } from '@/components/organisms/RoomCard'
import type { Room } from '@/types/room'

interface RoomsSectionProps {
  rooms: readonly Room[]
  onViewRoom?: (room: Room) => void
}

export function RoomsSection({ rooms, onViewRoom }: RoomsSectionProps) {
  return (
    <section
      aria-labelledby="rooms-section-heading"
      className="bg-savoy-ivory py-14 sm:py-18 lg:py-20"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 xl:px-14">
        <header className="mb-8 max-w-2xl sm:mb-10">
          <h2
            id="rooms-section-heading"
            className="font-savoy-display text-3xl text-savoy-charcoal sm:text-4xl"
          >
            Rooms &amp; Suites
          </h2>
          <p className="mt-3 font-savoy-sans text-sm leading-relaxed text-savoy-charcoal/70 sm:text-base">
            Discover comfortable rooms and spacious suites designed for a refined
            stay.
          </p>
        </header>

        {rooms.length === 0 ? (
          <p className="font-savoy-sans text-sm text-savoy-charcoal/70">
            No rooms are currently available to display.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {rooms.map((room) => (
              <li key={room.id} className="h-full min-w-0">
                <RoomCard room={room} onViewRoom={onViewRoom} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}