import { GoodsStatistics } from '../models/statistics.model'

import * as fromGoodsStatistics from './goods-statistics.action'

export interface State {
  loading: boolean
  goodsStatisticsOfToday: GoodsStatistics[]
  goodsStatisticsOfThisMonth: GoodsStatistics[]
  goodsStatisticsOfThisYear: GoodsStatistics[]
}

const initialState: State = {
  loading: false,
  goodsStatisticsOfToday: [],
  goodsStatisticsOfThisMonth: [],
  goodsStatisticsOfThisYear: []
}

export function reducer(state: State = initialState, action: fromGoodsStatistics.Actions): State {
  switch (action.type) {
    case fromGoodsStatistics.FETCH_GOODS_STATISTICS_OF_TODAY:
    case fromGoodsStatistics.FETCH_GOODS_STATISTICS_OF_THIS_MONTH:
    case fromGoodsStatistics.FETCH_GOODS_STATISTICS_OF_THIS_YEAR:
      return {
        ...state,
        loading: true
      }

    case fromGoodsStatistics.LOAD_SUCCESS_GOODS_OF_TODAY:
      return {
        ...state,
        loading: false,
        goodsStatisticsOfToday: action.todayGoodsStatistics
      }
    case fromGoodsStatistics.LOAD_SUCCESS_GOODS_OF_THIS_MONTH:
      return {
        ...state,
        loading: false,
        goodsStatisticsOfThisMonth: action.thisMonthGoodsStatistics
      }
    case fromGoodsStatistics.LOAD_SUCCESS_GOODS_OF_THIS_YEAR:
      return {
        ...state,
        loading: false,
        goodsStatisticsOfThisYear: action.thisYearGoodsStatistics
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

export const getGoodsStatisticsOfToday: (s: State) => GoodsStatistics[] = state =>
  state.goodsStatisticsOfToday
export const getGoodsStatisticsOfThisMonth: (s: State) => GoodsStatistics[] = state =>
  state.goodsStatisticsOfThisMonth
export const getGoodsStatisticsOfThisYear: (s: State) => GoodsStatistics[] = state =>
  state.goodsStatisticsOfThisYear
