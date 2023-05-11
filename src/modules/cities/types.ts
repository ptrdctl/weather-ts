import { REQUEST_STATUS } from '../../core/api/types'

export interface City {
  name: string
  lat: number
  lon: number
}

export interface CitiesState {
  items: City[]
  status: REQUEST_STATUS
}
