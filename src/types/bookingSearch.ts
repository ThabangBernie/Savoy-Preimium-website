import type { Room } from '@/types/room'

export type BookingSearchCriteria = {
  roomSlug: Room['slug']
  checkIn: string
  checkOut: string
  adults: number
  children: number
}
