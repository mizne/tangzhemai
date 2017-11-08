import { StatisticsItem } from './models/statistics.model'

import {
  FETCH_ORDERS_STATISTICS_OF_TODAY,
  LOAD_SUCCESS_ORDERS_OF_TODAY,
  FETCH_ORDERS_STATISTICS_OF_THIS_MONTH,
  LOAD_SUCCESS_ORDERS_OF_THIS_MONTH,
  FETCH_ORDERS_STATISTICS_OF_THIS_YEAR,
  LOAD_SUCCESS_ORDERS_OF_THIS_YEAR,
  Actions
} from './statistics.action'

export interface State {
  loading: boolean
  ordersStatisticsOfToday: StatisticsItem[]
  ordersStatisticsOfThisMonth: StatisticsItem[]
  ordersStatisticsOfThisYear: StatisticsItem[]
}

const initialState: State = {
  loading: false,
  ordersStatisticsOfToday: [],
  ordersStatisticsOfThisMonth: [],
  ordersStatisticsOfThisYear: [],
}

export function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case FETCH_ORDERS_STATISTICS_OF_TODAY:
    case FETCH_ORDERS_STATISTICS_OF_THIS_MONTH:
    case FETCH_ORDERS_STATISTICS_OF_THIS_YEAR:
      return {
        ...state,
        loading: true
      }

    case LOAD_SUCCESS_ORDERS_OF_TODAY:
      return {
        ...state,
        loading: false,
        ordersStatisticsOfToday: action.todayStatistics
      }

    case LOAD_SUCCESS_ORDERS_OF_THIS_MONTH:
      return {
        ...state,
        loading: false,
        ordersStatisticsOfThisMonth: action.thisMonthStatistics
      }

    case LOAD_SUCCESS_ORDERS_OF_THIS_YEAR:
      
      return {
        ...state,
        loading: false,
        ordersStatisticsOfThisYear: action.thisYearStatistics
      }

    default: {
      return state
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getLoading: (s: State) => boolean = 
(state) => state.loading

export const getOrdersStatisticsOfToday: (s: State) => any[] = 
(state) => state.ordersStatisticsOfToday

export const getOrdersStatisticsOfThisMonth: (s: State) => any[] = 
(state) => state.ordersStatisticsOfThisMonth

export const getOrdersStatisticsOfThisYear: (s: State) => any[] = 
(state) => state.ordersStatisticsOfThisYear
