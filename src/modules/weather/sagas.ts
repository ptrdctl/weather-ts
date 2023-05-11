import { call, put, takeLatest } from 'redux-saga/effects'

import { WEATHER_API } from '../../core/api/api'

import { weatherActions } from './slice'

// @ts-ignore
function* getWeather({ payload: { id, lat, lon, navigate } }) {
  try {
    // @ts-ignore
    const response = yield call(
      WEATHER_API.get,
      `/weather?lat=${lat}&lon=${lon}&units=metric&appid=6cd90c72844e5ca514ba4ef91db1d0bb`,
    )

    const updatedWeather = { ...response.data, id, name: id }

    yield put(weatherActions.setWeather(updatedWeather))
    if (navigate) {
      navigate(`/weather/${updatedWeather.id}?lat=${lat}&lon=${lon}`)
    }
  } catch (error) {
    console.error(error)
  }
}

export function* watchGetWeather() {
  // @ts-ignore
  yield takeLatest(weatherActions.requestWeather.type, getWeather)
}
