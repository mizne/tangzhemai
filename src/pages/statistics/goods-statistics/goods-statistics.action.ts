import { Action } from '@ngrx/store'

import { GoodsStatistics } from '../models/statistics.model'

export const FETCH_GOODS_STATISTICS_OF_TODAY = '[Statistics] FetchGoodsStatisticsOfToday'
export const LOAD_SUCCESS_GOODS_OF_TODAY = '[Statistics] LoadSuccessGoodsOfToday'
export const LOAD_FAILURE_GOODS_OF_TODAY = '[Statistics] LoadFailureGoodsOfToday'

export const FETCH_GOODS_STATISTICS_OF_THIS_MONTH = '[Statistics] FetchGoodsStatisticsOfThisMonth'
export const LOAD_SUCCESS_GOODS_OF_THIS_MONTH = '[Statistics] LoadSuccessGoodsOfThisMonth'
export const LOAD_FAILURE_GOODS_OF_THIS_MONTH = '[Statistics] LoadFailureGoodsOfThisMonth'

export const FETCH_GOODS_STATISTICS_OF_THIS_YEAR = '[Statistics] FetchGoodsStatisticsOfThisYear'
export const LOAD_SUCCESS_GOODS_OF_THIS_YEAR = '[Statistics] LoadSuccessGoodsOfThisYear'
export const LOAD_FAILURE_GOODS_OF_THIS_YEAR = '[Statistics] LoadFailureGoodsOfThisYear'

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class FetchGoodsStatisticsOfTodayAction implements Action {
  readonly type = FETCH_GOODS_STATISTICS_OF_TODAY
}
export class LoadSuccessGoodsOfTodayAction implements Action {
  readonly type = LOAD_SUCCESS_GOODS_OF_TODAY
  constructor(public todayGoodsStatistics: any) {}
}
export class LoadFailureGoodsOfTodayAction implements Action {
  readonly type = LOAD_FAILURE_GOODS_OF_TODAY
}


export class FetchGoodsStatisticsOfThisMonthAction implements Action {
  readonly type = FETCH_GOODS_STATISTICS_OF_THIS_MONTH
}
export class LoadSuccessGoodsOfThisMonthAction implements Action {
  readonly type = LOAD_SUCCESS_GOODS_OF_THIS_MONTH
  constructor(public thisMonthGoodsStatistics: any) {}
}
export class LoadFailureGoodsOfThisMonthAction implements Action {
  readonly type = LOAD_FAILURE_GOODS_OF_THIS_MONTH
}


export class FetchGoodsStatisticsOfThisYearAction implements Action {
  readonly type = FETCH_GOODS_STATISTICS_OF_THIS_YEAR
}
export class LoadSuccessGoodsOfThisYearAction implements Action {
  readonly type = LOAD_SUCCESS_GOODS_OF_THIS_YEAR
  constructor(public thisYearGoodsStatistics: any) {}
}
export class LoadFailureGoodsOfThisYearAction implements Action {
  readonly type = LOAD_FAILURE_GOODS_OF_THIS_YEAR
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions =
  | FetchGoodsStatisticsOfTodayAction
  | LoadSuccessGoodsOfTodayAction
  | LoadFailureGoodsOfTodayAction

  | FetchGoodsStatisticsOfThisMonthAction
  | LoadSuccessGoodsOfThisMonthAction
  | LoadFailureGoodsOfThisMonthAction

  | FetchGoodsStatisticsOfThisYearAction
  | LoadSuccessGoodsOfThisYearAction
  | LoadFailureGoodsOfThisYearAction
