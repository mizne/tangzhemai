import { Action } from '@ngrx/store'

import { StatisticsItem } from '../models/statistics.model'

export const FETCH_ORDERS_STATISTICS_OF_TODAY = '[Statistics] FetchOrdersStatisticsOfToday'
export const LOAD_SUCCESS_ORDERS_OF_TODAY = '[Statistics] LoadSuccessOrdersOfToday'
export const LOAD_FAILURE_ORDERS_OF_TODAY = '[Statistics] LoadFailureOrdersOfToday'

export const FETCH_ORDERS_STATISTICS_OF_THIS_MONTH = '[Statistics] FetchOrdersStatisticsOfThisMonth'
export const LOAD_SUCCESS_ORDERS_OF_THIS_MONTH = '[Statistics] LoadSuccessOrdersOfThisMonth'
export const LOAD_FAILURE_ORDERS_OF_THIS_MONTH = '[Statistics] LoadFailureOrdersOfThisMonth'

export const FETCH_ORDERS_STATISTICS_OF_THIS_YEAR = '[Statistics] FetchOrdersStatisticsOfThisYear'
export const LOAD_SUCCESS_ORDERS_OF_THIS_YEAR = '[Statistics] LoadSuccessOrdersOfThisYear'
export const LOAD_FAILURE_ORDERS_OF_THIS_YEAR = '[Statistics] LoadFailureOrdersOfThisYear'

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class FetchOrdersStatisticsOfTodayAction implements Action {
  readonly type = FETCH_ORDERS_STATISTICS_OF_TODAY
}
export class LoadSuccessOrdersOfTodayAction implements Action {
  readonly type = LOAD_SUCCESS_ORDERS_OF_TODAY
  constructor(public todayStatistics: StatisticsItem[]) {}
}
export class LoadFailureOrdersOfTodayAction implements Action {
  readonly type = LOAD_FAILURE_ORDERS_OF_TODAY
}


export class FetchOrdersStatisticsOfThisMonthAction implements Action {
  readonly type = FETCH_ORDERS_STATISTICS_OF_THIS_MONTH
}
export class LoadSuccessOrdersOfThisMonthAction implements Action {
  readonly type = LOAD_SUCCESS_ORDERS_OF_THIS_MONTH
  constructor(public thisMonthStatistics: StatisticsItem[]) {}
}
export class LoadFailureOrdersOfThisMonthAction implements Action {
  readonly type = LOAD_FAILURE_ORDERS_OF_THIS_MONTH
}


export class FetchOrdersStatisticsOfThisYearAction implements Action {
  readonly type = FETCH_ORDERS_STATISTICS_OF_THIS_YEAR
}
export class LoadSuccessOrdersOfThisYearAction implements Action {
  readonly type = LOAD_SUCCESS_ORDERS_OF_THIS_YEAR
  constructor(public thisYearStatistics: StatisticsItem[]) {}
}
export class LoadFailureOrdersOfThisYearAction implements Action {
  readonly type = LOAD_FAILURE_ORDERS_OF_THIS_YEAR
}



/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions =
  | FetchOrdersStatisticsOfTodayAction
  | LoadSuccessOrdersOfTodayAction
  | LoadFailureOrdersOfTodayAction

  | FetchOrdersStatisticsOfThisMonthAction
  | LoadSuccessOrdersOfThisMonthAction
  | LoadFailureOrdersOfThisMonthAction

  | FetchOrdersStatisticsOfThisYearAction
  | LoadSuccessOrdersOfThisYearAction
  | LoadFailureOrdersOfThisYearAction

