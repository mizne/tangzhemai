import { Action } from '@ngrx/store'

import { StatisticsItem } from '../statistics/models/statistics.model'

export const FETCH_TODAY_STATISTICS = '[Home] Fetch Today Statistics'
export const FETCH_TODAY_STATISTICS_SUCCESS = '[Home] Fetch Today Statistics Success'
export const FETCH_TODAY_STATISTICS_FAILURE = '[Home] Fetch Today Statistics Failure'

export class FetchTodayStatisticsAction implements Action {
  readonly type = FETCH_TODAY_STATISTICS
}
export class FetchTodayStatisticsSuccessAction implements Action {
  readonly type = FETCH_TODAY_STATISTICS_SUCCESS
  constructor(public todayStatistics: StatisticsItem[]) {}
}
export class FetchTodayStatisticsFailureAction implements Action {
  readonly type = FETCH_TODAY_STATISTICS_FAILURE
}

export type Actions = 
FetchTodayStatisticsAction |
FetchTodayStatisticsSuccessAction |
FetchTodayStatisticsFailureAction
