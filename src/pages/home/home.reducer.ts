import * as fromHome from './home.action'

import { StatisticsItem } from '../statistics/models/statistics.model'

export interface State {
  loading: boolean
  todayStatistics: StatisticsItem[]
}

const initialState: State = {
  loading: false,
  todayStatistics: []
}

export function reducer(
  state: State = initialState,
  action: fromHome.Actions
): State {
  switch (action.type) {
    case fromHome.FETCH_TODAY_STATISTICS:
      return {
        ...state,
        loading: false
      }
    case fromHome.FETCH_TODAY_STATISTICS_SUCCESS:
      return {
        ...state,
        loading: true,
        todayStatistics: action.todayStatistics
      }
    case fromHome.FETCH_TODAY_STATISTICS_FAILURE: 
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getTodayStatistics = (state: State) => state.todayStatistics