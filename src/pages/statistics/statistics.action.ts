import { Action } from '@ngrx/store'

import { StatisticsItem } from './models/statistics.model'

export const FETCH_ORDERS_STATISTICS_OF_TODAY =
  '[Statistics] FetchOrdersStatisticsOfToday'
export const LOAD_SUCCESS_ORDERS_OF_TODAY =
  '[Statistics] LoadSuccessOrdersOfToday'

export const FETCH_ORDERS_STATISTICS_OF_THIS_MONTH =
  '[Statistics] FetchOrdersStatisticsOfThisMonth'
export const LOAD_SUCCESS_ORDERS_OF_THIS_MONTH =
  '[Statistics] LoadSuccessOrdersOfThisMonth'

export const FETCH_ORDERS_STATISTICS_OF_THIS_YEAR =
  '[Statistics] FetchOrdersStatisticsOfThisYear'
export const LOAD_SUCCESS_ORDERS_OF_THIS_YEAR =
  '[Statistics] LoadSuccessOrdersOfThisYear'

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class FetchOrdersStatisticsOfToday implements Action {
  readonly type = FETCH_ORDERS_STATISTICS_OF_TODAY
}

export class LoadSuccessOrdersOfToday implements Action {
  readonly type = LOAD_SUCCESS_ORDERS_OF_TODAY

  constructor(public todayStatistics: StatisticsItem[]) {}
}

export class FetchOrdersStatisticsOfThisMonth implements Action {
  readonly type = FETCH_ORDERS_STATISTICS_OF_THIS_MONTH
}

export class LoadSuccessOrdersOfThisMonth implements Action {
  readonly type = LOAD_SUCCESS_ORDERS_OF_THIS_MONTH
  constructor(public thisMonthStatistics: StatisticsItem[]) {}
}

export class FetchOrdersStatisticsOfThisYear implements Action {
  readonly type = FETCH_ORDERS_STATISTICS_OF_THIS_YEAR
}

export class LoadSuccessOrdersOfThisYear implements Action {
  readonly type = LOAD_SUCCESS_ORDERS_OF_THIS_YEAR
  constructor(public thisYearStatistics: StatisticsItem[]) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions =
  | FetchOrdersStatisticsOfToday
  | LoadSuccessOrdersOfToday
  | FetchOrdersStatisticsOfThisMonth
  | LoadSuccessOrdersOfThisMonth
  | FetchOrdersStatisticsOfThisYear
  | LoadSuccessOrdersOfThisYear
