import { StatisticsItem, GoodsStatistics } from '../models/statistics.model'

import * as fromStatistics from './order-statistics.action'

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

export function reducer(state: State = initialState, action: fromStatistics.Actions): State {
  switch (action.type) {
    case fromStatistics.FETCH_ORDERS_STATISTICS_OF_TODAY:
    case fromStatistics.FETCH_ORDERS_STATISTICS_OF_THIS_MONTH:
    case fromStatistics.FETCH_ORDERS_STATISTICS_OF_THIS_YEAR:
      return {
        ...state,
        loading: true
      }

    case fromStatistics.LOAD_SUCCESS_ORDERS_OF_TODAY:
      return {
        ...state,
        loading: false,
        ordersStatisticsOfToday: action.todayStatistics
      }
    case fromStatistics.LOAD_SUCCESS_ORDERS_OF_THIS_MONTH:
      return {
        ...state,
        loading: false,
        ordersStatisticsOfThisMonth: action.thisMonthStatistics
      }
    case fromStatistics.LOAD_SUCCESS_ORDERS_OF_THIS_YEAR:
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

export const getLoading: (s: State) => boolean = state => state.loading

export const getOrdersStatisticsOfToday: (s: State) => any[] = state =>
  state.ordersStatisticsOfToday
export const getOrdersStatisticsOfThisMonth: (s: State) => any[] = state =>
  state.ordersStatisticsOfThisMonth
export const getOrdersStatisticsOfThisYear: (s: State) => any[] = state =>
  state.ordersStatisticsOfThisYear
