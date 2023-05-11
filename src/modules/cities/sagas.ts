import { call, put, takeLatest } from 'redux-saga/effects'

import { CITIES_API } from '../../core/api/api'

import { citiesSlice } from './slice'

// @ts-ignore
function* getCities({ payload }) {
  try {
    // @ts-ignore
    const response = yield call(
      CITIES_API.get,
      `/direct?q=${payload}&limit=10&appid=6cd90c72844e5ca514ba4ef91db1d0bb`,
    )

    yield put(citiesSlice.actions.setCities(response.data))
  } catch (error) {
    console.error(error)
  }
}

export function* watchGetCities() {
  // @ts-ignore
  yield takeLatest(citiesSlice.actions.requestCities.type, getCities)
}
