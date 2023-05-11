import { useState, ChangeEvent, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { debounce } from 'debounce'

import { RootState, useAppDispatch, useAppSelector } from '../../../../modules'

import { weatherActions } from '../../../../modules/weather/slice'
import { citiesActions, citiesSlice } from '../../../../modules/cities/slice'

import { Container, Item } from './styled'

export const Search = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const cities = useAppSelector((state: RootState) => state.cities.items)

  const [inputValue, setInputValue] = useState('')

  const handleSetInputValue = debounce(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value)
    },
    800,
  )

  const search = useCallback(
    (value: string) => {
      dispatch(citiesSlice.actions.requestCities(value))
    },
    [dispatch],
  )

  const clear = useCallback(
    () => dispatch(citiesActions.clearCities()),
    [dispatch],
  )

  const getWeather = (id: string, lat: number, lon: number) =>
    dispatch(weatherActions.requestWeather({ id, lat, lon, navigate }))

  useEffect(() => {
    if (inputValue.trim() === '') {
      clear()
      return
    }
    if (inputValue) {
      search(inputValue)
    }
  }, [inputValue])

  return (
    <Container>
      <input placeholder='find city...' onChange={handleSetInputValue} />

      <br />
      {cities?.map((city, i) => (
        <Item
          key={`${city.name}${i}`}
          onClick={() => getWeather(city.name, city.lat, city.lon)}
        >
          {city.name} - {city.lat}/{city.lon}
        </Item>
      ))}
    </Container>
  )
}
