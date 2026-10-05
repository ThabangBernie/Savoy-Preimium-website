import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/organisms/Header'
import { Hero } from '@/components/organisms/Hero'
import { BookingBar } from '@/components/organisms/BookingBar'
import { RoomsSection } from '@/components/templates/RoomsSection'
import { rooms } from '@/data/rooms'
import type { Room } from '@/types/room'

export function HomePage() {
  const navigate = useNavigate()

  const handleViewRoom = (room: Room) => {
    navigate(`/rooms/${room.slug}`)
  }

  return (
    <>
      <Header />
      <Hero />
      <BookingBar />
      <RoomsSection rooms={rooms} onViewRoom={handleViewRoom} />
    </>
  )
}
