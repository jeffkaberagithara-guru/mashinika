export type Latitude = number
export type Longitude = number

/** WGS84 coordinate pair (lng/lat). */
export interface GeoPoint {
  latitude: Latitude
  longitude: Longitude
}

export interface GeoBounds {
  southwest: GeoPoint
  northeast: GeoPoint
}

export interface GeoLocation extends GeoPoint {
  /** Human-friendly address, best-effort. */
  address: Address | null
  /** Landmark used for directions, e.g. "near Total Petrol Station". */
  landmark: string | null
  /** Estate / neighbourhood label, e.g. "Kilimani". */
  area: string | null
}

export interface Address {
  line1: string | null
  line2: string | null
  locality: string | null
  region: string | null
  country: string | null
  postalCode: string | null
}