import { createSelector } from '@ngrx/store'

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
  ordersStatisticsOfToday: any[]
  todayChartData: any[]
  ordersStatisticsOfThisMonth: any[]
  monthChartData: any[]
  ordersStatisticsOfThisYear: any[]
  yearChartData: any[]
}

const initialState: State = {
  loading: false,
  ordersStatisticsOfToday: [],
  todayChartData: [],
  ordersStatisticsOfThisMonth: [],
  monthChartData: [],
  ordersStatisticsOfThisYear: [],
  yearChartData: []
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
      const todayChartData = [
        {
          data: action.payload.map(e => e.merchantAmount.value).map(Number),
          label: '转给商户的钱'
        },
        {
          data: action.payload.map(e => e.totalPrice.value).map(Number),
          label: '订单价格'
        }
      ]
      return {
        ...state,
        todayChartData,
        loading: false,
        ordersStatisticsOfToday: action.payload
      }

    case LOAD_SUCCESS_ORDERS_OF_THIS_MONTH:
      const monthChartData = [
        {
          data: action.payload.map(e => e.merchantAmount.value).map(Number),
          label: '转给商户的钱'
        },
        {
          data: action.payload.map(e => e.totalPrice.value).map(Number),
          label: '订单价格'
        }
      ]
      return {
        ...state,
        monthChartData,
        loading: false,
        ordersStatisticsOfThisMonth: action.payload
      }

    case LOAD_SUCCESS_ORDERS_OF_THIS_YEAR:
      const yearChartData = [
        {
          data: action.payload.map(e => e.merchantAmount.value).map(Number),
          label: '转给商户的钱'
        },
        {
          data: action.payload.map(e => e.totalPrice.value).map(Number),
          label: '订单价格'
        }
      ]
      return {
        ...state,
        yearChartData,
        loading: false,
        ordersStatisticsOfThisYear: action.payload
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
(state) => state.todayChartData

export const getOrdersStatisticsOfThisMonth: (s: State) => any[] = 
(state) => state.monthChartData

export const getOrdersStatisticsOfThisYear: (s: State) => any[] = 
(state) => state.yearChartData
