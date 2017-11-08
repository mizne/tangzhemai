import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromStatisticsIndex from '../statistics.reducer'
import * as fromRoot from '../../../app/reducers'

export interface StatisticsState {
  statisticsIndex: fromStatisticsIndex.State
}

export interface State extends fromRoot.State {
  statistics: StatisticsState
}

export const reducers = {
  statisticsIndex: fromStatisticsIndex.reducer
}

export const getStatisticsModuleState = createFeatureSelector<StatisticsState>('statistics')

export const getStatisticsIndexState = createSelector(
  getStatisticsModuleState, 
  (state: StatisticsState) => state.statisticsIndex)

export const getOrdersStatisticsOfToday = createSelector(
  getStatisticsIndexState,
  fromStatisticsIndex.getOrdersStatisticsOfToday
)
export const getOrdersStatisticsOfThisMonth = createSelector(
  getStatisticsIndexState,
  fromStatisticsIndex.getOrdersStatisticsOfThisMonth
)
export const getOrdersStatisticsOfThisYear = createSelector(
  getStatisticsIndexState,
  fromStatisticsIndex.getOrdersStatisticsOfThisYear
)
export const getStatisticsLoading = createSelector(
  getStatisticsIndexState,
  fromStatisticsIndex.getLoading
)

