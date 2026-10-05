export const roomCategories = [
  'Standard/Classic Room',
  'Deluxe Room',
  'Twin Room',
  'Family Room',
  'Executive Room',
  'Premium/Executive Suite',
] as const

export type RoomCategory = (typeof roomCategories)[number]

export type RoomCurrency = 'ZAR'

export type BedConfiguration =
  | '1 Queen Bed'
  | '1 Queen/King Bed'
  | '2 Single Beds'
  | '1 Large Bed plus family sleeping arrangement'
  | '1 King Bed'

export type RoomFeature =
  | 'Television'
  | 'Air conditioning'
  | 'Seating area'
  | 'Tea and coffee setup'
  | 'Separate lounge area'
  | 'Large lounge television'
  | 'Long lounge seating'
  | 'Separate bedroom'
  | 'Bathtub area'
  | 'Separate toilet/bathroom area'

export type ApproximateRoomSize = {
  minimumSquareMetres: number
  maximumSquareMetres: number
  estimated: true
}

export type Room = {
  id: string
  slug: string
  name: string
  category: RoomCategory
  shortDescription: string
  pricePerNight: number
  currency: RoomCurrency
  breakfastIncluded: boolean
  maxAdults: number
  maxChildren: number
  bedConfiguration: BedConfiguration
  approximateSize: ApproximateRoomSize
  features: RoomFeature[]
  image: string
  floor: number | null
  accessible: boolean
  featured: boolean
}