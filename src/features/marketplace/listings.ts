export type DemoListing = {
  id: string
  make: string
  model: string
  year: number
  mileage: number
  price: number
  location: string
  certified: boolean
  inspected: boolean
  body: string
  fuel: 'Petrol' | 'Diesel'
  transmission: string
  seats: number
  description: string
  image: string
}

/** Placeholder stock until real listings exist in the DB. */
export const demoListings: DemoListing[] = [
  {
    id: 'l1',
    make: 'Toyota',
    model: 'Axio NZE161',
    year: 2016,
    mileage: 82000,
    price: 1550000,
    location: 'Westlands, Nairobi',
    certified: true,
    inspected: true,
    body: 'Sedan',
    fuel: 'Petrol',
    transmission: 'Automatic (CVT)',
    seats: 5,
    description:
      'One local owner, full service history with engine and gearbox mounts replaced at 60,000 km.',
    image: '/media/cars/red-classic.jpg',
  },
  {
    id: 'l2',
    make: 'Honda',
    model: 'Fit GK5',
    year: 2015,
    mileage: 94000,
    price: 1320000,
    location: 'Mombasa Road',
    certified: false,
    inspected: true,
    body: 'Hatchback',
    fuel: 'Petrol',
    transmission: 'Automatic (CVT)',
    seats: 5,
    description:
      'Freshly serviced hybrid-adjacent daily runner with new tyres and a clean interior.',
    image: '/media/cars/blue-sport.jpg',
  },
  {
    id: 'l3',
    make: 'Toyota',
    model: 'Noah Voxy',
    year: 2017,
    mileage: 118000,
    price: 2480000,
    location: 'Ngong Road',
    certified: true,
    inspected: true,
    body: 'MPV',
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 7,
    description:
      'Seven-seater family van with power doors, rear camera and a documented import history.',
    image: '/media/cars/studio-orange.jpg',
  },
  {
    id: 'l4',
    make: 'Mazda',
    model: 'Demio DJ',
    year: 2014,
    mileage: 101000,
    price: 1080000,
    location: 'Thika Road',
    certified: false,
    inspected: true,
    body: 'Hatchback',
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    description:
      'Tidy and economical commuter with SkyActiv engine and a recent brake overhaul.',
    image: '/media/cars/porsche-orange.jpg',
  },
  {
    id: 'l5',
    make: 'Toyota',
    model: 'Prado TX',
    year: 2013,
    mileage: 152000,
    price: 5300000,
    location: 'Kilimani, Nairobi',
    certified: true,
    inspected: true,
    body: 'SUV',
    fuel: 'Diesel',
    transmission: 'Automatic',
    seats: 7,
    description:
      'Single-family Prado with full logbook, new radiator and immaculate leather interior.',
    image: '/media/cars/mercedes-dark.jpg',
  },
  {
    id: 'l6',
    make: 'Nissan',
    model: 'Note E11',
    year: 2012,
    mileage: 118000,
    price: 760000,
    location: 'Mombasa',
    certified: false,
    inspected: false,
    body: 'Hatchback',
    fuel: 'Petrol',
    transmission: 'Automatic (CVT)',
    seats: 5,
    description:
      'Honest city car priced for a first buyer — inspection recommended before viewing.',
    image: '/media/cars/engine-bay.jpg',
  },
  {
    id: 'l7',
    make: 'Suzuki',
    model: 'Swift Sport',
    year: 2018,
    mileage: 64000,
    price: 1680000,
    location: 'Riverside, Nairobi',
    certified: true,
    inspected: true,
    body: 'Hatchback',
    fuel: 'Petrol',
    transmission: 'Manual',
    seats: 5,
    description:
      'Enthusiast-owned Swift Sport in standard trim with a documented service trail.',
    image: '/media/cars/bmw-workshop.jpg',
  },
  {
    id: 'l8',
    make: 'Toyota',
    model: 'Corolla Fielder',
    year: 2016,
    mileage: 89000,
    price: 1630000,
    location: 'Kisumu',
    certified: false,
    inspected: true,
    body: 'Estate',
    fuel: 'Petrol',
    transmission: 'Automatic (CVT)',
    seats: 5,
    description:
      'Spacious estate with new suspension bushes and a clean motor-vehicle search.',
    image: '/media/cars/road-drive.jpg',
  },
]

export function getListing(id: string | undefined) {
  if (!id) return undefined
  return demoListings.find((listing) => listing.id === id)
}

export function formatKsh(value: number): string {
  return `KSh ${new Intl.NumberFormat('en-KE').format(value)}`
}

export function formatMileage(value: number): string {
  return `${new Intl.NumberFormat('en-KE').format(value)} km`
}
