import { REQUEST_STATUS } from '../../core/api/types'

export interface Weather {
  id: string
  name: string
  city: string
  coord: {
    lat: number
    lon: number
  }
  weather: any
  main: {
    temp: number
    feels_like: number
  }
  wind: { speed: number }
}

export interface WeatherRequest {
  id: string
  lat: number | null
  lon: number | null
  navigate?: unknown
}

export interface WeatherState {
  items: Weather[]
  status: REQUEST_STATUS
}
