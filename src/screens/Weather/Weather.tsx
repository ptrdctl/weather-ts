import { useEffect } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../../modules'
import { useParams, useSearchParams } from 'react-router-dom'

import { weatherActions } from '../../modules/weather/slice'
import { getWeatherById } from '../../modules/weather/selectors'

import { Container, Line } from './styled'

export function Weather() {
  const dispatch = useAppDispatch()
  const { id } = useParams()

  const [searchParams] = useSearchParams()
  const weather = useAppSelector((state: RootState) =>
    getWeatherById(state, id ?? ''),
  )

  useEffect(() => {
    const coord = {
      lat: Number(searchParams.get('lat')) ?? null,
      lon: Number(searchParams.get('lon')) ?? null,
    }
    if (!weather) {
      dispatch(weatherActions.requestWeather({ ...coord, id: id ?? '' }))
    }
  }, [weather])
  // @ts-ignore

  if (!weather) {
    return <>Loading...</>
  }
  return (
    <Container>
      <Line>City: {weather?.name}</Line>
      <Line>Temperature: {Math.round(+weather?.main?.temp ?? 0)}</Line>
      <Line>Feels like: {weather?.main?.feels_like}</Line>
      <Line>Weather: {weather?.weather[0]?.main}</Line>
      <Line>Weather description: {weather?.weather[0]?.description}</Line>
      <Line>Wind speed: {weather?.wind?.speed}</Line>
    </Container>
  )
}
