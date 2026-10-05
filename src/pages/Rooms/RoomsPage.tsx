import { rooms } from '@/data/rooms'
import { RoomsSection } from '@/components/templates/RoomsSection'

export function RoomsPage() {
  return <RoomsSection rooms={rooms} />
}